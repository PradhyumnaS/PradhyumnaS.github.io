"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Infinite marquee whose speed (and direction) follows scroll velocity.
 */
export default function Marquee({
  children,
  reverse = false,
  speed = 40,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = root.current!.querySelector<HTMLElement>(".mq-track")!;
        const tween = gsap.fromTo(
          track,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration: speed, ease: "none", repeat: -1 },
        );
        let base = 1;
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            base = v < 0 ? -1 : 1;
            const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 300);
            gsap.to(tween, { timeScale: base * boost, duration: 0.2, overwrite: true });
            gsap.to(tween, { timeScale: base, duration: 1.2, delay: 0.2, ease: "power2.out" });
          },
        });
        return () => st.kill();
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cn("overflow-hidden", className)} aria-hidden>
      <div className="mq-track flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
