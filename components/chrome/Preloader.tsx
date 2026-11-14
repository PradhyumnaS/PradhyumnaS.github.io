"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { getLenis } from "@/lib/lenis";
import { profile } from "@/content/site";

const SEEN_KEY = "noir:intro-seen";

function seenThisSession() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * The curtain. Rendered on the server so nothing flashes underneath it;
 * a counter runs to 100, the masthead bars slide, the curtain lifts.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const finish = () => {
        el.style.display = "none";
        document.documentElement.classList.remove("is-loading");
        getLenis()?.start();
        markIntroDone();
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
      };

      if (reduce || seenThisSession()) {
        gsap.to(el, { autoAlpha: 0, duration: reduce ? 0.2 : 0.5, onComplete: finish });
        return;
      }

      getLenis()?.stop();
      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: finish });
      tl.from(".pl-bar", { scaleX: 0, transformOrigin: "left", duration: 1.1, stagger: 0.08, ease: "expo.inOut" }, 0)
        .from(".pl-line", { yPercent: 110, duration: 1, stagger: 0.06, ease: "expo.out" }, 0.15)
        .to(
          counter,
          {
            v: 100,
            duration: 1.5,
            ease: "power3.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0,
        )
        .to(".pl-line", { yPercent: -110, duration: 0.6, stagger: 0.03, ease: "expo.in" }, 1.5)
        .to(".pl-bar", { scaleX: 0, transformOrigin: "right", duration: 0.6, stagger: 0.04, ease: "expo.in" }, 1.5)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.95, ease: "expo.inOut" }, 1.85);
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      id="preloader"
      aria-hidden
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink-2 p-[var(--gutter)] text-bone"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="flex items-start justify-between">
        <span className="line-mask">
          <span className="pl-line label block text-ash">{profile.issue} — {profile.edition}</span>
        </span>
        <span className="line-mask">
          <span className="pl-line label block text-ash">{profile.city}</span>
        </span>
      </div>

      <div className="space-y-3">
        <div className="pl-bar h-px w-full bg-line" />
        <div className="flex items-end justify-between gap-6">
          <span className="line-mask">
            <span className="pl-line block font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-[-0.02em]">
              {profile.firstName}
              <em className="text-vermilion">.</em>
            </span>
          </span>
          <span className="line-mask">
            <span
              ref={count}
              className="pl-line block font-mono text-[clamp(1.5rem,2.8vw,2.5rem)] leading-none tabular-nums text-ash"
            >
              000
            </span>
          </span>
        </div>
        <div className="pl-bar h-px w-full bg-vermilion" />
      </div>
    </div>
  );
}
