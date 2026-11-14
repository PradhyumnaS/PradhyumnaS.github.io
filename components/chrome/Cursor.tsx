"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Vermilion dot + bone ring. Any element with data-cursor="Label" grows the ring
 * and prints the label inside it. Only on fine pointers.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const circle = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: reduce ? 0.05 : 0.55, ease: "expo.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: reduce ? 0.05 : 0.55, ease: "expo.out" });

    let visible = false;
    const move = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button");
      const value = t?.dataset.cursor ?? "";
      setLabel(value);
      const interactive = Boolean(t);
      gsap.to(text.current, { autoAlpha: value ? 1 : 0, duration: value ? 0.4 : 0.15, delay: value ? 0.08 : 0 });
      gsap.to(circle.current, {
        scale: value ? 2.4 : interactive ? 1.6 : 1,
        backgroundColor: value ? "rgba(236,231,222,1)" : "rgba(236,231,222,0)",
        borderColor: value ? "rgba(236,231,222,0)" : "rgba(236,231,222,0.45)",
        duration: 0.5,
        ease: "expo.out",
      });
      gsap.to(dot.current, { scale: interactive ? 0 : 1, duration: 0.3 });
    };

    const leave = () => {
      visible = false;
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
    };
    const down = () => gsap.to(ring.current, { scale: 0.85, duration: 0.2 });
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <div ref={ring} className="invisible fixed left-0 top-0 -ml-6 -mt-6 size-12 opacity-0">
        <div ref={circle} className="absolute inset-0 rounded-full border border-bone/45" />
        <span
          ref={text}
          className="label invisible absolute inset-0 flex items-center justify-center whitespace-nowrap text-[0.625rem] font-medium text-ink opacity-0"
        >
          {label}
        </span>
      </div>
      <div
        ref={dot}
        className="invisible fixed left-0 top-0 -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-vermilion opacity-0"
      />
    </div>
  );
}
