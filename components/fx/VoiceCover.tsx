"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const QUESTIONS = [
  "Walk me through a system you designed end to end.",
  "Why that trade-off — and what would you change today?",
  "How would it behave at ten times the load?",
  "Tell me about a time a model failed in production.",
];

/** Typographic cover for OpusAI: a live voice waveform and the interviewer's questions. */
export default function VoiceCover() {
  const root = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState(0);
  const bars = 48;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".vbar").forEach((bar, i) => {
          gsap.to(bar, {
            scaleY: () => gsap.utils.random(0.15, 1),
            duration: () => gsap.utils.random(0.25, 0.6),
            ease: "sine.inOut",
            repeat: -1,
            repeatRefresh: true,
            yoyo: true,
            delay: i * 0.01,
          });
        });
      });
    },
    { scope: root },
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setQ((n) => (n + 1) % QUESTIONS.length), 3600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div ref={root} className="relative flex h-full w-full flex-col justify-between bg-ink p-6 md:p-10">
      <div className="label flex justify-between text-ash">
        <span>
          <span className="blink mr-2 inline-block size-1.5 rounded-full bg-vermilion align-middle" />
          Live interview — round 03
        </span>
        <span>difficulty ▲ adaptive</span>
      </div>

      <p
        key={q}
        className="font-serif text-[clamp(1.5rem,2.2vw,2.4rem)] italic leading-[1.05] tracking-[-0.01em] text-bone [animation:fadeUp_0.9s_var(--ease-expo)_both]"
        aria-live="polite"
      >
        “{QUESTIONS[q]}”
      </p>

      <div className="flex h-24 items-center gap-[3px]" aria-hidden>
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            className="vbar block h-full flex-1 origin-center rounded-full bg-bone/80"
            style={{ transform: `scaleY(${0.2 + 0.6 * Math.abs(Math.sin(i * 0.7))})` }}
          />
        ))}
      </div>
    </div>
  );
}
