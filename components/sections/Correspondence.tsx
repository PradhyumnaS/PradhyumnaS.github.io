"use client";

import { useEffect, useRef, useState } from "react";
import { links, profile } from "@/content/site";
import { scrollToTarget } from "@/lib/lenis";
import SectionHead from "@/components/fx/SectionHead";
import Magnetic from "@/components/fx/Magnetic";

export default function Correspondence() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const channels = [
    { label: "LinkedIn", href: links.linkedin },
    { label: "GitHub", href: links.github },
    ...(links.resume ? [{ label: "Résumé", href: links.resume }] : []),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden pt-28 md:pt-40">
      <SectionHead no="06" name="Correspondence" aside="Open to roles & select freelance" />

      <div className="gutter mt-12 md:mt-20">
        <h2 id="contact-title" className="font-serif text-[clamp(3rem,7vw,8rem)] leading-[0.86] tracking-[-0.045em]" data-split>
          Let&apos;s build
          <br />
          something <em className="text-vermilion">intelligent.</em>
        </h2>
      </div>

      <div className="gutter mt-16 grid items-center gap-12 md:mt-24 md:grid-cols-12">
        <div className="flex justify-center md:col-span-4" data-reveal>
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="group relative flex size-44 items-center justify-center overflow-hidden rounded-full bg-vermilion text-ink md:size-52"
              data-cursor=""
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-bone transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0" />
              <span className="relative text-center font-serif text-2xl italic leading-tight md:text-3xl">
                Write
                <br />
                to me
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="min-w-0 md:col-span-8">
          <p className="label text-ash" data-reveal>Direct line</p>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-3" data-reveal="0.05">
            <a
              href={`mailto:${profile.email}`}
              className="min-w-0 font-serif text-[clamp(1.5rem,2.6vw,2.75rem)] leading-none [overflow-wrap:anywhere] tracking-[-0.02em] underline decoration-line decoration-1 underline-offset-[0.18em] transition-colors hover:decoration-vermilion"
            >
              {profile.email}
            </a>
            <button type="button" onClick={copy} className="label text-ash hover:text-bone" aria-live="polite">
              {copied ? <span className="text-vermilion">Copied ✓</span> : "Copy address"}
            </button>
          </div>

          <ul className="mt-12 border-t border-line" data-reveal="0.1">
            {channels.map((c) => (
              <li key={c.label} className="border-b border-line">
                <a href={c.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-5">
                  <span className="font-serif text-[clamp(1.35rem,1.7vw,1.75rem)] leading-none transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3 group-hover:italic">
                    {c.label}
                  </span>
                  <span className="text-xl text-ash transition-[color,transform] duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-vermilion">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="mt-28 md:mt-40">
        <div className="gutter">
          <div className="rule" />
          <div className="relative z-10 flex justify-center py-10">
            <button type="button" onClick={() => scrollToTarget(0)} className="label text-bone hover:text-vermilion" data-cursor="Up">
              Back to cover ↑
            </button>
          </div>
        </div>
        <p
          aria-hidden
          className="pointer-events-none -mb-[0.22em] select-none text-center font-serif text-[24vw] italic leading-[0.8] tracking-[-0.05em] text-ink-3"
          data-reveal
        >
          Fin<span className="text-vermilion">.</span>
        </p>
      </footer>
    </section>
  );
}
