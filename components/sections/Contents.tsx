import { sections } from "@/content/site";
import SectionHead from "@/components/fx/SectionHead";

export default function Contents() {
  return (
    <section id="index" aria-labelledby="index-title" className="relative py-28 md:py-40">
      <SectionHead no="00" name="Contents" aside="In this issue" />
      <div className="gutter mt-12 grid gap-10 md:mt-20 md:grid-cols-12">
        <h2 id="index-title" className="font-serif text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.9] tracking-[-0.03em] md:col-span-4" data-split>
          In this <em className="text-vermilion">issue</em>
        </h2>
        <ol className="md:col-span-8">
          {sections.map((s, i) => (
            <li key={s.id} data-reveal={i * 0.06}>
              <a
                href={`#${s.id}`}
                className="group relative flex items-baseline gap-4 border-b border-line py-4 md:gap-6 md:py-5"
                data-cursor="Turn to"
              >
                <span className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-vermilion transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100" />
                <span className="label w-8 shrink-0 text-ash">{s.no}</span>
                <span className="font-serif text-[clamp(1.5rem,2vw,2.25rem)] leading-none tracking-[-0.015em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3 group-hover:italic">
                  {s.title}
                </span>
                <span className="leader hidden h-4 flex-1 self-end md:block" aria-hidden />
                <span className="label ml-auto hidden text-ash sm:block md:ml-0">{s.note}</span>
                <span className="label shrink-0 text-ash transition-colors group-hover:text-vermilion" aria-hidden>
                  p.{String(i * 8 + 4).padStart(2, "0")}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
