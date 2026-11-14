"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// A full field of slow, domain-warped smoke. The cursor carries a soft lamp through it.
const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);
  float t = uTime * 0.035;

  // Domain-warped fbm: billowing, folding smoke.
  vec2 s = p * 1.05;
  vec2 q = vec2(fbm(s + vec2(0.0, t)), fbm(s + vec2(5.2, 1.3) - t * 0.8));
  vec2 r = vec2(
    fbm(s + 2.2 * q + vec2(1.7, 9.2) + t * 1.2),
    fbm(s + 2.2 * q + vec2(8.3, 2.8) - t * 0.9)
  );
  float smoke = fbm(s + 2.0 * r + vec2(t * 0.6, 0.0));
  smoke = smoothstep(0.12, 0.98, smoke);
  float fold = smoothstep(0.35, 0.95, length(r)) * 0.35;

  // Soft ambient light from above, plus a lamp that follows the cursor.
  vec2 m = vec2((uMouse.x - 0.5) * aspect, uMouse.y - 0.5);
  float ambient = 0.62 + 0.38 * smoothstep(-0.6, 0.6, p.y + 0.1);
  float lamp = exp(-length(p - m) * 2.2) * 0.55;
  float light = ambient + lamp;

  vec3 bone = vec3(0.925, 0.905, 0.87);
  vec3 col = vec3(0.022) + bone * (smoke * 0.46 + fold * smoke * 0.2) * light;

  // Ember: a single warm breath in the lower left.
  float ember = exp(-length(p - vec2(-0.55 * aspect, -0.55)) * 2.4);
  col += vec3(1.0, 0.23, 0.12) * ember * (0.06 + 0.025 * sin(uTime * 0.6));

  // Vignette, a darker floor for the type, and dither against banding.
  col *= smoothstep(1.45, 0.3, length(p * vec2(0.85, 1.25)));
  col *= mix(0.72, 1.0, smoothstep(0.0, 0.6, vUv.y));
  col += (hash(vUv * uRes + uTime) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function NoirBeam({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ dpr: 1, alpha: false, antialias: false, powerPreference: "low-power" });
    } catch {
      return; // No WebGL: the CSS gradient underneath stays.
    }
    const gl = renderer.gl;
    gl.clearColor(0.027, 0.027, 0.027, 1);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 2s ease";
    el.appendChild(canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: [1, 1] },
        uMouse: { value: [0.5, 0.5] },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    // Soft smoke doesn't need full resolution.
    const SCALE = 0.5;
    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(Math.max(1, w * SCALE), Math.max(1, h * SCALE));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      program.uniforms.uRes.value = [w, h];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const target = [0.5, 0.5];
    const mouse = program.uniforms.uMouse.value as number[];
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target[0] = (e.clientX - r.left) / r.width;
      target[1] = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      mouse[0] += (target[0] - mouse[0]) * 0.04;
      mouse[1] += (target[1] - mouse[1]) * 0.04;
      program.uniforms.uTime.value = (now - start) / 1000 + 20;
      renderer.render({ scene: mesh });
    };

    if (reduce) {
      program.uniforms.uTime.value = 24;
      renderer.render({ scene: mesh });
    } else {
      raf = requestAnimationFrame(frame);
    }
    requestAnimationFrame(() => (canvas.style.opacity = "1"));

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={host}
      aria-hidden
      className={className}
      style={{
        background:
          "radial-gradient(70% 60% at 55% 35%, rgba(236,231,222,0.14), transparent 70%), radial-gradient(30% 30% at 12% 95%, rgba(255,59,31,0.06), transparent 70%), #070707",
      }}
    />
  );
}
