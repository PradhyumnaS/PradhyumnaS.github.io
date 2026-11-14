"use client";

import { useEffect } from "react";
import { gsap, SplitText, MOTION_OK } from "@/lib/gsap";

/**
 * One controller for the whole issue's entrance choreography:
 *  [data-split]  — lines rise out of a mask
 *  [data-reveal] — fade + lift
 *  [data-wipe]   — image frames wipe open, inner media settles from a zoom
 * Content is fully visible without JS or with reduced motion.
 */
export default function Reveals() {
  useEffect(() => {
    let mm: gsap.MatchMedia | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: 1.4,
                stagger: 0.08,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 36,
            duration: 1.3,
            delay: Number(el.dataset.reveal) || 0,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-wipe]").forEach((el) => {
          const inner = el.querySelector<HTMLElement>("img, video, canvas");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
          tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" });
          if (inner) tl.from(inner, { scale: 1.25, duration: 2, ease: "expo.out" }, 0.2);
        });
      });
    });

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, []);

  return null;
}
