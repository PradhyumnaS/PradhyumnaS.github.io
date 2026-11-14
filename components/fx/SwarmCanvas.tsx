"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small boids simulation standing in for the drone-swarm project:
 * agents flock, sweep the field, avoid obstacles, and "find" a target
 * that respawns. The cursor acts as an extra obstacle.
 */
type Agent = { x: number; y: number; vx: number; vy: number; trail: { x: number; y: number }[] };

export default function SwarmCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({ found: 0, step: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const N = 16;
    const agents: Agent[] = Array.from({ length: N }, () => ({
      x: rand(0.1, 0.25) * w,
      y: rand(0.65, 0.9) * h,
      vx: rand(-1, 1),
      vy: rand(-1, 1),
      trail: [],
    }));
    const obstacles = Array.from({ length: 7 }, () => ({ x: rand(0.2, 0.9), y: rand(0.15, 0.85), r: rand(14, 30) }));
    let target = { x: rand(0.6, 0.9), y: rand(0.15, 0.4) };
    let found = 0;
    let step = 0;
    let pulse = 0;
    const pointer = { x: -999, y: -999 };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -999;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 });
    io.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // survey grid
      ctx.strokeStyle = "rgba(236,231,222,0.05)";
      ctx.lineWidth = 1;
      const gs = 40;
      ctx.beginPath();
      for (let x = 0; x < w; x += gs) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
      }
      for (let y = 0; y < h; y += gs) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
      }
      ctx.stroke();

      // obstacles
      for (const o of obstacles) {
        ctx.beginPath();
        ctx.arc(o.x * w, o.y * h, o.r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(236,231,222,0.18)";
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // target
      const tx = target.x * w;
      const ty = target.y * h;
      ctx.strokeStyle = "#ff3b1f";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(tx, ty, 6 + pulse * 26, 0, Math.PI * 2);
      ctx.globalAlpha = 1 - pulse;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(tx - 8, ty);
      ctx.lineTo(tx + 8, ty);
      ctx.moveTo(tx, ty - 8);
      ctx.lineTo(tx, ty + 8);
      ctx.stroke();

      // agents — top-down quadcopters
      const TAU = Math.PI * 2;
      const L = 6.5;
      for (const a of agents) {
        const heading = Math.atan2(a.vy, a.vx);

        // sensor footprint
        ctx.beginPath();
        ctx.arc(a.x, a.y, 20, 0, TAU);
        ctx.strokeStyle = "rgba(236,231,222,0.05)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(heading + Math.PI / 4 + Math.sin(step * 0.05 + a.x * 0.01) * 0.06);

        // arms
        ctx.strokeStyle = "rgba(236,231,222,0.8)";
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(-L, -L);
        ctx.lineTo(L, L);
        ctx.moveTo(L, -L);
        ctx.lineTo(-L, L);
        ctx.stroke();

        // rotors + spinning blades
        const corners = [
          [-L, -L],
          [L, -L],
          [L, L],
          [-L, L],
        ];
        corners.forEach(([cx, cy], i) => {
          ctx.beginPath();
          ctx.arc(cx, cy, 3.6, 0, TAU);
          ctx.fillStyle = "rgba(236,231,222,0.08)";
          ctx.fill();
          ctx.strokeStyle = "rgba(236,231,222,0.55)";
          ctx.lineWidth = 1;
          ctx.stroke();
          const sp = step * 0.8 * (i % 2 ? 1 : -1) + i;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(sp) * 3.4, cy + Math.sin(sp) * 3.4);
          ctx.lineTo(cx - Math.cos(sp) * 3.4, cy - Math.sin(sp) * 3.4);
          ctx.strokeStyle = "rgba(236,231,222,0.45)";
          ctx.stroke();
        });

        // body
        ctx.fillStyle = "#ece7de";
        ctx.fillRect(-2.6, -2.6, 5.2, 5.2);
        ctx.restore();

        // nose light (shows heading)
        ctx.beginPath();
        ctx.arc(a.x + Math.cos(heading) * 4.5, a.y + Math.sin(heading) * 4.5, 1.3, 0, TAU);
        ctx.fillStyle = "#ff3b1f";
        ctx.fill();
      }
    };

    const update = () => {
      step++;
      pulse = (pulse + 0.015) % 1;
      const tx = target.x * w;
      const ty = target.y * h;
      let reached = 0;

      for (const a of agents) {
        let cx = 0, cy = 0, ax = 0, ay = 0, sx = 0, sy = 0, n = 0;
        for (const b of agents) {
          if (a === b) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 90 * 90) {
            cx += b.x; cy += b.y; ax += b.vx; ay += b.vy; n++;
            if (d2 < 34 * 34) { sx -= (dx / (d2 + 1)) * 34; sy -= (dy / (d2 + 1)) * 34; }
          }
        }
        let fx = 0, fy = 0;
        if (n) {
          fx += ((cx / n - a.x) * 0.0008) + ((ax / n - a.vx) * 0.03);
          fy += ((cy / n - a.y) * 0.0008) + ((ay / n - a.vy) * 0.03);
        }
        fx += sx * 0.06; fy += sy * 0.06;

        // seek target
        const tdx = tx - a.x, tdy = ty - a.y;
        const td = Math.hypot(tdx, tdy) || 1;
        fx += (tdx / td) * 0.035; fy += (tdy / td) * 0.035;
        if (td < 60) reached++;

        // avoid obstacles + cursor
        const avoid = (ox: number, oy: number, r: number, k: number) => {
          const dx = a.x - ox, dy = a.y - oy;
          const d = Math.hypot(dx, dy) || 1;
          if (d < r + 26) { fx += (dx / d) * k * (1 - d / (r + 26)); fy += (dy / d) * k * (1 - d / (r + 26)); }
        };
        for (const o of obstacles) avoid(o.x * w, o.y * h, o.r, 0.9);
        avoid(pointer.x, pointer.y, 50, 2.2);

        // walls
        if (a.x < 20) fx += 0.3; if (a.x > w - 20) fx -= 0.3;
        if (a.y < 20) fy += 0.3; if (a.y > h - 20) fy -= 0.3;

        a.vx += fx; a.vy += fy;
        const sp = Math.hypot(a.vx, a.vy);
        const max = 1.35, min = 0.35;
        if (sp > max) { a.vx = (a.vx / sp) * max; a.vy = (a.vy / sp) * max; }
        if (sp < min) { a.vx = (a.vx / (sp || 1)) * min; a.vy = (a.vy / (sp || 1)) * min; }
        a.x += a.vx; a.y += a.vy;
        
      }

      if (reached > N * 0.3) {
        found++;
        target = { x: rand(0.1, 0.9), y: rand(0.12, 0.88) };
        setStats({ found, step });
      } else if (step % 30 === 0) {
        setStats({ found, step });
      }
    };

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      update();
      draw();
    };
    if (reduce) {
      for (let i = 0; i < 240; i++) update();
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="relative h-full w-full bg-ink">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Simulation: a swarm of drones flocking around obstacles to locate a target"
      />
      <div className="label pointer-events-none absolute left-4 top-4 space-y-1 text-ash">
        <p>sim / ppo-swarm-v2</p>
        <p>agents <span className="text-bone">16</span></p>
      </div>
      <div className="label pointer-events-none absolute bottom-4 left-4 right-4 flex justify-between text-ash">
        <span>
          targets found <span className="tabular-nums text-vermilion">{String(stats.found).padStart(2, "0")}</span>
        </span>
        <span className="tabular-nums">t = {stats.step}</span>
      </div>
    </div>
  );
}
