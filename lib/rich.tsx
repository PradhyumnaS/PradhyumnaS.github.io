import { Fragment, type ReactNode } from "react";

/**
 * Renders "*italic*" as serif italics and "^accent^" in vermilion.
 * Keeps copy in content/site.ts free of JSX.
 */
export function rich(text: string): ReactNode {
  const parts = text.split(/(\*[^*]+\*|\^[^^]+\^)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("*")) return <em key={i} className="font-serif italic">{part.slice(1, -1)}</em>;
    if (part.startsWith("^")) return <span key={i} className="text-vermilion">{part.slice(1, -1)}</span>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}
