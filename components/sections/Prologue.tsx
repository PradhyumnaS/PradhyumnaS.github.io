"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { prologue, profile } from "@/content/site";
import { rich } from "@/lib/rich";
import SectionHead from "@/components/fx/SectionHead";

export default function Prologue() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Words ink in as you read.
        const split = new SplitText(".pr-statement", { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ".pr-statement", start: "top 78%", end: "bottom 45%", scrub: 0.6 },
          },
        );

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="prologue" aria-labelledby="prologue-title" className="relative py-28 md:py-40">
      <SectionHead no="01" name="Prologue" aside="Who, and why" />

      <div className="gutter mt-12 grid gap-12 md:mt-20 md:grid-cols-12">
        <div className="md:col-span-3">
          <h2 id="prologue-title" className="label text-ash" data-reveal>
            A note from the engineer
          </h2>
          <p className="mt-6 hidden font-serif text-7xl italic leading-none text-vermilion md:block" aria-hidden data-reveal>
            “
          </p>
        </div>
        <p className="pr-statement font-serif text-[clamp(1.6rem,2.5vw,2.75rem)] leading-[1.08] tracking-[-0.015em] md:col-span-9">
          {rich(prologue.statement)}
        </p>
      </div>

      <div className="gutter mt-20 grid md:mt-28 md:grid-cols-12" data-reveal>
        <div className="flex gap-4 border-l border-vermilion pl-5 md:col-span-6 md:col-start-7">
          <p className="label shrink-0 pt-1 text-vermilion">Currently</p>
          <p className="text-[1.05rem] leading-relaxed text-bone/80">{profile.currently}</p>
        </div>
      </div>
    </section>
  );
}
