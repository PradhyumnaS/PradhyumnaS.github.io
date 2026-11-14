"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { work, type Work as WorkItem } from "@/content/site";
import { cn } from "@/lib/cn";
import SectionHead from "@/components/fx/SectionHead";
import SwarmCanvas from "@/components/fx/SwarmCanvas";
import VoiceCover from "@/components/fx/VoiceCover";

const STACK_MQ = "(min-width: 1024px) and (min-height: 760px)";

function Media({ item, index }: { item: WorkItem; index: number }) {
  const m = item.media;
  if (m.kind === "swarm") return <SwarmCanvas />;
  if (m.kind === "voice") return <VoiceCover />;

  return (
    <>
      {m.kind === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={m.src}
          alt={m.alt}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="ws-primary noir-media absolute inset-0 h-full w-full scale-[1.14] object-cover"
          style={{ objectPosition: item.slug === "asttona" ? "68% 50%" : "50% 35%" }}
        />
      ) : (
        <video
          className="ws-primary noir-media absolute inset-0 h-full w-full scale-[1.14] object-cover"
          src={m.src}
          poster={m.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={m.alt}
        />
      )}
      {m.secondary ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={m.secondary.src}
          alt={m.secondary.alt}
          loading="lazy"
          decoding="async"
          className="ws-secondary absolute bottom-[7%] left-[6%] z-10 aspect-[4/5] w-[34%] border border-bone/15 object-cover shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] transition-[filter] duration-1000 group-hover/spread:grayscale-0 md:grayscale"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
    </>
  );
}

function Spread({ item, index, total }: { item: WorkItem; index: number; total: number }) {
  const flip = index % 2 === 1;
  const no = String(index + 1).padStart(2, "0");
  const Frame = item.url ? "a" : "div";
  const frameProps = item.url
    ? { href: item.url, target: "_blank", rel: "noreferrer", "data-cursor": "Visit ↗", "aria-label": `Visit ${item.title} (opens in a new tab)` }
    : { "data-cursor": item.media.kind === "swarm" ? "Disturb" : "Listen" };

  return (
    <article
      className="ws-spread group/spread relative border-t border-line bg-ink stack:sticky stack:top-0 stack:h-[100svh] stack:overflow-hidden"
      aria-labelledby={`work-${item.slug}`}
    >
      <div className="ws-inner gutter flex h-full origin-top flex-col py-16 stack:pb-7 stack:pt-[4.5rem]">
        <header className="label grid grid-cols-2 gap-4 text-ash md:grid-cols-3">
          <span>
            Feature <span className="text-vermilion">N° {no}</span>
            <span className="text-bone/30"> / {String(total).padStart(2, "0")}</span>
          </span>
          <span className="text-right md:text-center">{item.client}</span>
          <span className="hidden text-right md:block">{item.year}</span>
        </header>
        <div className="rule mt-3" />

        <div className="mt-8 grid min-h-0 flex-1 gap-10 stack:mt-5 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className={cn("flex min-h-0 flex-col lg:col-span-5", flip ? "lg:order-2 lg:col-start-8" : "lg:order-1")}>
            <h3
              id={`work-${item.slug}`}
              className="font-serif text-[clamp(3rem,5.8vw,6.75rem)] leading-[0.84] tracking-[-0.035em]"
              data-split
            >
              {item.title}
            </h3>
            <p className="mt-4 max-w-[34ch] font-serif text-[clamp(1.15rem,1.35vw,1.4rem)] italic leading-[1.15] text-bone/85" data-reveal>
              {item.dek}
            </p>

            <ul className="mt-8 space-y-3 stack:mt-auto stack:space-y-2 stack:pt-6" data-reveal="0.1">
              {item.points.map((p, i) => (
                <li key={i} className="flex gap-4 text-[0.95rem] leading-relaxed text-bone/70 stack:text-[0.9rem] stack:leading-normal">
                  <span className="label shrink-0 pt-[0.3em] text-smoke">{String(i + 1).padStart(2, "0")}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-line pt-5 stack:mt-5 stack:pt-4" data-reveal="0.15">
              <dt className="label text-ash">Role</dt>
              <dd className="text-sm text-bone/85">{item.role}</dd>
            </dl>

            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group/cta label mt-6 stack:mt-4 inline-flex w-fit items-center gap-3 text-bone"
                data-reveal="0.2"
              >
                <span className="relative">
                  Visit {item.urlLabel}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-vermilion transition-transform duration-500 group-hover/cta:origin-left group-hover/cta:scale-x-100" />
                </span>
                <span className="text-vermilion transition-transform duration-500 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5">↗</span>
              </a>
            ) : (
              <p className="label mt-6 text-smoke stack:mt-4" data-reveal="0.2">
                {item.media.kind === "swarm" ? "Simulation — move your cursor through the swarm" : "Demo on request"}
              </p>
            )}
          </div>

          {/* Media */}
          <figure className={cn("flex min-h-0 flex-col lg:col-span-7", flip ? "lg:order-1 lg:col-start-1" : "lg:order-2")}>
            <Frame
              {...frameProps}
              className="ws-frame relative block aspect-[4/5] w-full overflow-hidden bg-ink-3 sm:aspect-[16/11] stack:aspect-auto stack:flex-1"
            >
              <Media item={item} index={index} />
            </Frame>
            <figcaption className="label mt-3 flex justify-between gap-4 text-smoke">
              <span>Fig. {no}</span>
              <span className="text-right">
                {item.media.kind === "image" || item.media.kind === "video" ? item.media.alt : item.dek.split("—")[0]}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const spreads = gsap.utils.toArray<HTMLElement>(".ws-spread");

      // Colour comes in for whichever spread is being read (used on touch screens).
      spreads.forEach((s) => {
        ScrollTrigger.create({ trigger: s, start: "top 55%", end: "bottom 45%", toggleClass: "is-active" });
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Video only plays (and only downloads) while its spread is on screen.
        gsap.utils.toArray<HTMLVideoElement>("video", root.current).forEach((v) => {
          ScrollTrigger.create({
            trigger: v,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => (self.isActive ? v.play().catch(() => {}) : v.pause()),
          });
        });

        spreads.forEach((s) => {
          const frame = s.querySelector(".ws-frame");
          const primary = s.querySelector(".ws-primary");
          const secondary = s.querySelector(".ws-secondary");
          gsap.fromTo(
            frame,
            { clipPath: "inset(18% 12% 18% 12%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "expo.out",
              duration: 1.8,
              scrollTrigger: { trigger: s, start: "top 70%", once: true },
            },
          );
          if (primary)
            gsap.fromTo(primary, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: true } });
          if (secondary)
            gsap.fromTo(secondary, { yPercent: 30 }, { yPercent: -20, ease: "none", scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: true } });
        });
      });

      // The stack: each spread sinks back as the next one slides over it.
      mm.add(`${STACK_MQ} and ${MOTION_OK}`, () => {
        spreads.forEach((s, i) => {
          const next = spreads[i + 1];
          if (!next) return;
          gsap.to(s.querySelector(".ws-inner"), {
            scale: 0.92,
            opacity: 0.25,
            filter: "blur(2px)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="relative pt-28 md:pt-40">
      <SectionHead no="02" name="Selected Work" aside={`(${String(work.length).padStart(2, "0")}) features`} />

      <div className="gutter mb-16 mt-12 grid gap-8 md:mb-28 md:mt-20 md:grid-cols-12">
        <h2 id="work-title" className="font-serif text-[clamp(3rem,5.6vw,6.5rem)] leading-[0.85] tracking-[-0.04em] md:col-span-8" data-split>
          Selected <em className="text-vermilion">work,</em>
          <br />
          2025 — 26
        </h2>
        <p className="self-end text-[1.05rem] leading-relaxed text-bone/70 md:col-span-4" data-reveal>
          Three production platforms built for{" "}
          <span className="text-bone">Quant Innovations FZE</span> in Dubai — shipped to the web, the App Store and Google Play — and two
          projects from research and my own studio.
        </p>
      </div>

      <div className="relative">
        {work.map((item, i) => (
          <Spread key={item.slug} item={item} index={i} total={work.length} />
        ))}
      </div>
    </section>
  );
}
