import type { ReactNode } from "react";

/** The running head every section opens with: number, name, rule, aside. */
export default function SectionHead({ no, name, aside }: { no: string; name: string; aside?: ReactNode }) {
  return (
    <div className="gutter" data-reveal>
      <div className="label flex items-baseline justify-between gap-6 pb-3 text-ash">
        <span>
          <span className="text-vermilion">{no}</span> <span className="text-bone/30">—</span> {name}
        </span>
        {aside ? <span className="text-right">{aside}</span> : null}
      </div>
      <div className="rule" />
    </div>
  );
}
