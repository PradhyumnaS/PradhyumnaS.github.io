import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/chrome/Cursor";
import Preloader from "@/components/chrome/Preloader";
import TopBar from "@/components/chrome/TopBar";
import Reveals from "@/components/fx/Reveals";
import { links, profile } from "@/content/site";

const serif = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const sans = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = `${profile.firstName} ${profile.lastName} — AI/ML Engineer & Technical Lead`;
const description =
  "Pradhyumna Shashi Bhushan builds intelligent systems — enterprise AI on Azure, agentic LLMs, and production platforms like Snaptank, Asttona and LetsDecide. M.Sc. Autonomous Systems, University of Stuttgart.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pradhyumnas.github.io"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    siteName: `${profile.firstName} — ${profile.issue}`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${profile.firstName} ${profile.lastName}`,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: "https://pradhyumnas.github.io",
  sameAs: [links.github, links.linkedin],
  alumniOf: ["Dayananda Sagar College of Engineering", "University of Stuttgart"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} is-loading`} suppressHydrationWarning>
      <body>
        <noscript>
          <style>{`#preloader{display:none!important}html.is-loading{overflow:auto!important}`}</style>
        </noscript>
        <a
          href="#index"
          className="label fixed left-4 top-4 z-[90] -translate-y-20 bg-bone px-3 py-2 text-ink focus:translate-y-0"
        >
          Skip to contents
        </a>
        <Preloader />
        <SmoothScroll />
        <Reveals />
        <TopBar />
        {children}
        <Cursor />
        <div className="grain" aria-hidden />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
