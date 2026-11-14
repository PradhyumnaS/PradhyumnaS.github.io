"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { profile, sections, links } from "@/content/site";
import { cn } from "@/lib/cn";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const toggleBtn = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(overlay.current, { visibility: "visible" })
        .fromTo(overlay.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" })
        .from(".menu-link", { yPercent: 105, duration: 0.9, stagger: 0.05, ease: "expo.out" }, 0.35)
        .from(".menu-meta", { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.05 }, 0.5);
    },
    { scope: overlay },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      t.timeScale(1).play();
      const first = overlay.current?.querySelector<HTMLElement>("a");
      window.setTimeout(() => first?.focus(), 400);
    } else {
      lenis?.start();
      t.timeScale(1.6).reverse();
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToTarget(`#${id}`), 350);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 mix-blend-difference transition-transform duration-700 ease-[var(--ease-expo)]",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div className="gutter flex items-center justify-between gap-4 py-5 text-bone">
          <a href="#top" onClick={go("top")} className="font-serif text-xl leading-none tracking-tight" aria-label="Back to the cover">
            {profile.initials}
          </a>
          <p className="label hidden text-bone/70 md:block">
            <span className="text-vermilion">●</span> {profile.role}
          </p>
          <p className="label hidden text-bone/70 lg:block">
            M.Sc. Autonomous Systems <span className="text-bone/40">—</span> Universität Stuttgart
          </p>
          <div className="flex items-center gap-6">
            <button
              ref={toggleBtn}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-overlay"
              className="label group flex items-center gap-2 text-bone"
            >
              <span className="relative block h-2.5 w-5" aria-hidden>
                <span className={cn("absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500", open && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500", open && "-translate-y-[4px] -rotate-45")} />
              </span>
              {open ? "Close" : "Index"}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlay}
        id="menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
        aria-hidden={!open}
        inert={!open}
        className="invisible fixed inset-0 z-40 flex flex-col justify-between bg-ink-2 pb-[var(--gutter)] pt-24"
      >
        <nav className="gutter">
          <ol className="divide-y divide-line border-y border-line">
            {sections.map((s) => (
              <li key={s.id} className="overflow-hidden">
                <a
                  href={`#${s.id}`}
                  onClick={go(s.id)}
                  className="menu-link group flex items-baseline gap-4 py-2 md:gap-8 md:py-3"
                >
                  <span className="label w-8 shrink-0 text-ash">{s.no}</span>
                  <span className="font-serif text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1] tracking-[-0.02em] transition-[color,transform] duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4 group-hover:italic group-hover:text-vermilion">
                    {s.title}
                  </span>
                  <span className="label ml-auto hidden text-ash md:block">{s.note}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="gutter flex flex-wrap items-end justify-between gap-4">
          <a className="menu-meta label text-ash hover:text-bone" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="flex gap-6">
            <a className="menu-meta label text-ash hover:text-bone" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="menu-meta label text-ash hover:text-bone" href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
      </div>
    </>
  );
}
