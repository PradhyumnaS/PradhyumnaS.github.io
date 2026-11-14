import { toolkit } from "@/content/site";
import SectionHead from "@/components/fx/SectionHead";
import Marquee from "@/components/fx/Marquee";

const Star = () => (
  <svg viewBox="0 0 24 24" className="mx-[0.35em] inline-block size-[0.32em] shrink-0 fill-vermilion" aria-hidden>
    <path d="M12 0l2.6 8.4L23 12l-8.4 3.6L12 24l-2.6-8.4L1 12l8.4-3.6z" />
  </svg>
);

const styles = [
  "font-serif italic text-bone",
  "font-serif outline-text",
  "font-serif text-ash",
];

export default function Toolkit() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden py-28 md:py-40">
      <SectionHead no="05" name="Skills" aside="Tools & technologies" />

      <div className="gutter mt-12 md:mt-20">
        <h2 id="skills-title" className="sr-only">Skills</h2>
      </div>

      <div className="space-y-2 md:space-y-4">
        {toolkit.map((row, i) => (
          <Marquee key={row.label} reverse={i % 2 === 1} speed={38 + i * 8}>
            {row.items.map((item) => (
              <span
                key={item}
                className={`flex items-center whitespace-nowrap text-[clamp(3rem,6vw,6.5rem)] leading-[1.05] tracking-[-0.03em] ${styles[i]}`}
              >
                {item}
                <Star />
              </span>
            ))}
          </Marquee>
        ))}
      </div>

      <div className="gutter mt-20 grid gap-10 md:mt-28 md:grid-cols-3">
        {toolkit.map((row, i) => (
          <div key={row.label} data-reveal={i * 0.08}>
            <p className="label border-b border-line pb-3 text-vermilion">{row.label}</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.8rem] text-bone/75">
              {row.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
