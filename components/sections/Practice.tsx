"use client";

import { useState } from "react";
import { experience } from "@/content/site";
import { cn } from "@/lib/cn";
import SectionHead from "@/components/fx/SectionHead";

export default function Practice() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative bg-ink py-28 md:py-40">
      <SectionHead no="03" name="Experience" aside="2024 — now" />

      <div className="gutter mt-12 grid gap-8 md:mt-20 md:grid-cols-12">
        <h2 id="experience-title" className="font-serif text-[clamp(3rem,5.6vw,6.5rem)] leading-[0.85] tracking-[-0.04em] md:col-span-8" data-split>
          Work <em className="text-vermilion">experience</em>
        </h2>
        <p className="self-end text-[1.05rem] leading-relaxed text-bone/70 md:col-span-4" data-reveal>
          From an internship automating LLM pipelines to leading enterprise AI delivery — two and a half years, three desks, one
          habit: ship it to production.
        </p>
      </div>

      <div className="gutter mt-16 md:mt-24">
        <div className="label hidden grid-cols-12 gap-6 border-b border-line pb-3 text-smoke md:grid" aria-hidden>
          <span className="col-span-2">Dates</span>
          <span className="col-span-5">Role</span>
          <span className="col-span-3">Company</span>
          <span className="col-span-2 text-right">Focus</span>
        </div>

        <ol>
          {experience.map((e, i) => {
            const isOpen = open === i;
            return (
              <li key={e.company} className="border-b border-line" data-reveal={i * 0.06}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`xp-${i}`}
                  className="group relative grid w-full grid-cols-12 items-baseline gap-x-6 gap-y-2 py-6 text-left md:py-8"
                  data-cursor={isOpen ? "Close" : "Open"}
                >
                  <span className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-vermilion transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100" />
                  <span className="label col-span-12 text-ash md:col-span-2">{e.years}</span>
                  <span
                    className={cn(
                      "col-span-10 col-start-1 row-start-2 md:col-start-auto md:row-start-auto font-serif text-[clamp(1.5rem,2.2vw,2.4rem)] leading-[1] tracking-[-0.02em] transition-transform duration-700 ease-[var(--ease-expo)] md:col-span-5 md:group-hover:translate-x-3",
                      isOpen && "italic",
                    )}
                  >
                    {e.role}
                  </span>
                  <span className="col-span-12 row-start-3 text-bone/85 md:col-span-3 md:row-start-auto">
                    {e.company}
                    <span className="block text-sm text-ash">{e.via}</span>
                  </span>
                  <span className="label col-span-2 col-start-11 row-start-2 flex items-center justify-end gap-3 text-ash md:col-start-auto md:row-start-auto">
                    <span className="hidden lg:inline">{e.tag}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "relative inline-block size-3 shrink-0 transition-transform duration-500",
                        isOpen && "rotate-45 text-vermilion",
                      )}
                    >
                      <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                      <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
                    </span>
                  </span>
                </button>

                <div
                  id={`xp-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-expo)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <ul className="grid gap-4 pb-10 md:grid-cols-12 md:gap-6">
                      {e.points.map((p, j) => (
                        <li key={j} className="flex gap-4 text-[1rem] leading-relaxed text-bone/75 md:col-span-5 md:col-start-3 md:even:col-start-8">
                          <span className="label shrink-0 pt-[0.35em] text-vermilion">{String(j + 1).padStart(2, "0")}</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
