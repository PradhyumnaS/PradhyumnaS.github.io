import { education, publication } from "@/content/site";
import SectionHead from "@/components/fx/SectionHead";

export default function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="relative py-28 md:py-40">
      <SectionHead no="04" name="Research & Schooling" aside="Papers, degrees" />

      <div className="gutter mt-12 md:mt-20">
        <h2 id="research-title" className="font-serif text-[clamp(3rem,5.6vw,6.5rem)] leading-[0.85] tracking-[-0.04em]" data-split>
          On the <em className="text-vermilion">record</em>
        </h2>
      </div>

      <div className="gutter mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-8">
        {/* Citation card */}
        <a
          href={`https://doi.org/${publication.doi}`}
          target="_blank"
          rel="noreferrer"
          className="group relative block overflow-hidden border border-line bg-ink-2 p-6 transition-colors duration-700 hover:border-bone/30 md:p-10 lg:col-span-7"
          data-cursor="Read ↗"
          data-reveal
        >
          <div className="label flex justify-between gap-4 text-ash">
            <span>Publication</span>
            <span className="text-vermilion">{publication.venue}</span>
          </div>
          <div className="rule mt-3" />
          <p className="mt-10 font-serif text-[clamp(1.75rem,2.4vw,2.6rem)] leading-[1.02] tracking-[-0.02em] md:mt-16">
            <span className="italic">NeuroSphere:</span> Optimizing Mental Wellness Through Reinforcement Learning
          </p>
          <p className="mt-6 max-w-[52ch] text-bone/70">{publication.abstract}</p>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-4 md:mt-20">
            <p className="label text-ash">
              DOI <span className="text-bone/85">{publication.doi}</span>
            </p>
            <span className="label flex items-center gap-2 text-bone">
              Read the paper
              <span className="text-vermilion transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </span>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-10 select-none font-serif text-[16rem] italic leading-none text-bone/[0.03] transition-colors duration-700 group-hover:text-vermilion/10"
          >
            §
          </span>
        </a>

        {/* Schooling */}
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="label text-ash" data-reveal>Schooling</p>
          <ol className="mt-4">
            {education.map((e, i) => (
              <li key={e.school} className="border-t border-line py-8" data-reveal={0.08 * (i + 1)}>
                <p className="label text-ash">{e.years}</p>
                <p className="mt-3 font-serif text-[clamp(1.5rem,1.8vw,1.9rem)] leading-[1.02] tracking-[-0.015em]">{e.school}</p>
                <p className="mt-2 text-bone/80">{e.degree}</p>
                <p className="label mt-3 text-vermilion">{e.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
