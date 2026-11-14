"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { profile } from "@/content/site";
import NoirBeam from "@/components/fx/NoirBeam";

export default function Masthead() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const name = new SplitText(".mh-name", { type: "chars", mask: "chars" });
        const tl = gsap.timeline({ paused: true });
        tl.from(name.chars, { yPercent: 110, duration: 1.6, stagger: 0.045, ease: "expo.out" }, 0)
          .from(".mh-rule", { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "expo.inOut" }, 0)
          .from(".mh-line", { yPercent: 110, duration: 1.2, stagger: 0.07, ease: "expo.out" }, 0.35)
          .from(".mh-fade", { autoAlpha: 0, y: 14, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.7);

        const off = onIntroDone(() => tl.play());

        // Cover recedes as you scroll into the issue.
        gsap.to(".mh-inner", {
          yPercent: 18,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => {
          off();
          name.revert();
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" aria-label="Cover" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <NoirBeam className="absolute inset-0" />

      <div className="mh-inner gutter relative z-10 flex min-h-[100svh] flex-1 flex-col pb-[var(--gutter)] pt-24 md:pt-28">
        <div className="mt-auto">
          <h1 className="sr-only">
            {profile.firstName} {profile.lastName} — {profile.role}
          </h1>
          <div aria-hidden>
            <p className="mh-name -ml-[0.04em] font-serif text-[21.6vw] md:text-[11vw] leading-[0.78] tracking-[-0.045em] text-bone">
              {profile.firstName}
            </p>
            <div className="mh-rule mt-[2.2vw] md:mt-[1.4vw] h-px w-full bg-bone/25" />
            <div className="mt-4 flex flex-col gap-6 md:mt-6 md:flex-row md:items-end md:justify-between">
              <span className="line-mask">
                <span className="mh-line block font-serif text-[clamp(2.25rem,4.2vw,4.75rem)] italic leading-[0.95] tracking-[-0.02em]">
                  <span className="text-vermilion">—</span> {profile.lastName}
                </span>
              </span>
              <div className="max-w-md md:pb-3 md:text-right">
                <span className="line-mask">
                  <span className="mh-line block font-serif text-[clamp(1.35rem,1.6vw,1.75rem)] italic leading-tight text-bone">
                    AI &amp; Software Engineer
                  </span>
                </span>
                <span className="line-mask mt-2">
                  <span className="mh-line block text-[clamp(0.95rem,1vw,1.1rem)] leading-snug text-bone/85">
                    I build <em className="font-serif text-[1.2em] italic text-bone">practical</em> AI — LLMs, computer vision
                  </span>
                </span>
                <span className="line-mask">
                  <span className="mh-line block text-[clamp(0.95rem,1vw,1.1rem)] leading-snug text-bone/85">and cloud systems that make it to production.</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-end justify-between md:mt-14">
            <a href="#index" className="mh-fade label group flex items-center gap-3 text-ash hover:text-bone" data-cursor="Read">
              <span className="relative block h-10 w-px overflow-hidden bg-bone/15">
                <span className="scroll-cue absolute inset-0 bg-vermilion" />
              </span>
              Begin reading
            </a>
            <p className="mh-fade label text-right text-ash">
              Issue {profile.issue.replace("N° ", "")} <span className="text-bone/30">/</span> Vol. 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
