/**
 * Every word on the site lives here.
 * Update this file to update the portfolio — components only read from it.
 */

export const profile = {
  firstName: "Pradhyumna",
  lastName: "Shashi Bhushan",
  initials: "P.S.B.",
  role: "AI/ML Engineer & Technical Lead",
  email: "pradhyumna.sb@gmail.com",
  city: "Stuttgart, DE",
  timezone: "Europe/Berlin",
  coords: "48.7758° N — 9.1829° E",
  issue: "N° 01",
  edition: "Winter 2026 Edition",
  deck: "AI & Software Engineer. I build practical AI — LLMs, computer vision and cloud systems that make it to production.",
  currently:
    "Reading for an M.Sc. in Autonomous Systems at the University of Stuttgart. Open to AI/ML engineering roles and a few select freelance builds.",
};

export const links = {
  github: "https://github.com/PradhyumnaS",
  linkedin: "https://www.linkedin.com/in/pradhyumna-s-62956425b",
  // TODO: paste your résumé link here (Drive / PDF URL). The Résumé link stays hidden while this is empty.
  resume: "",
};

export const sections = [
  { id: "prologue", no: "01", title: "Prologue", note: "Who, and why" },
  { id: "work", no: "02", title: "Selected Work", note: "Five features" },
  { id: "experience", no: "03", title: "Experience", note: "Roles & impact" },
  { id: "research", no: "04", title: "Research & Schooling", note: "Papers, degrees" },
  { id: "skills", no: "05", title: "Skills", note: "Tools & technologies" },
  { id: "contact", no: "06", title: "Correspondence", note: "Write to me" },
] as const;

export const prologue = {
  // *word* renders in italic serif; ^word^ renders in vermilion.
  statement:
    "Hi, I'm Pradhyumna — an AI and Software Engineer with over two years of experience in LLMs, VLMs, AI/ML engineering, computer vision and cloud architecture. I've led *enterprise AI/ML delivery* on Azure, worked on diverse projects across India and handled multiple international ones — including AI solutions for ICAR, IIMR and Roquette, ONDC integrations, and EMR platforms for aesthetic clinics in ^Dubai^. I enjoy building *practical* AI that solves real-world problems across industries.",
};

export type WorkMedia =
  | { kind: "image"; src: string; alt: string; secondary?: { src: string; alt: string } }
  | { kind: "video"; src: string; poster: string; alt: string; secondary?: { src: string; alt: string } }
  | { kind: "swarm" }
  | { kind: "voice" };

export type Work = {
  slug: string;
  title: string;
  dek: string;
  client: string;
  role: string;
  year: string;
  points: string[];
  url?: string;
  urlLabel?: string;
  media: WorkMedia;
};

export const work: Work[] = [
  {
    slug: "snaptank",
    title: "Snaptank",
    dek: "Every guest, every photo — found by face and delivered to WhatsApp before the party ends.",
    client: "Quant Innovations FZE, Dubai",
    role: "Lead engineer — web, mobile, ML",
    year: "2025 — 26",
    points: [
      "A face-recognition engine that matches a single guest selfie against thousands of event photos in seconds.",
      "Instant delivery to WhatsApp and email, with QR registration, watermarking, sponsor branding and live event analytics.",
      "A web dashboard plus iOS and Android apps, subscriptions, an admin console and a partner programme.",
    ],
    url: "https://www.snaptank.ai",
    urlLabel: "snaptank.ai",
    media: {
      kind: "image",
      src: "/work/snaptank/preview.webp",
      alt: "Guests at a sunset yacht party — the kind of event Snaptank delivers photos for",
      secondary: { src: "/work/snaptank/hero.webp", alt: "Snaptank campaign artwork: a camera scattering instant prints" },
    },
  },
  {
    slug: "asttona",
    title: "Asttona",
    dek: "The quiet precision of a modern clinic — an EMR and CRM for aesthetic and dental practices.",
    client: "Quant Innovations FZE, Dubai",
    role: "Full-stack & AI engineer",
    year: "2026",
    points: [
      "One platform for every clinic: patient records, digital consent, before/after imaging, bookings, billing, inventory and a patient portal.",
      "A private AI assistant for clinic staff — patient data stays inside the clinic, and staff approve every action it takes.",
      "Built to UAE healthcare standards, with encryption, multi-factor sign-in and a tamper-evident audit trail.",
    ],
    url: "https://asttona.com",
    urlLabel: "asttona.com",
    media: {
      kind: "image",
      src: "/work/asttona/platform.webp",
      alt: "The Asttona clinic dashboard on a laptop and phone in a calm clinic interior",
      secondary: { src: "/work/asttona/clinic.webp", alt: "A clinician reviewing a patient record on a tablet" },
    },
  },
  {
    slug: "letsdecide",
    title: "LetsDecide",
    dek: "Ending the “I don't know, you decide” loop — friends swipe together and the app finds the unanimous match.",
    client: "Quant Innovations FZE, Dubai",
    role: "Sole engineer — product to stores",
    year: "2026",
    points: [
      "Real-time swipe rooms for movies, restaurants, recipes and plans — with tie-breaks, leaderboards and match celebrations.",
      "“Rhea”, a voice-enabled planning assistant that suggests what to do next based on the weather and your calendar.",
      "Bill splitting from a photo of the receipt, eleven languages including right-to-left Arabic, live on iOS and Android.",
    ],
    url: "https://letsdecide.app",
    urlLabel: "letsdecide.app",
    media: {
      kind: "video",
      src: "/work/letsdecide/movies.mp4",
      poster: "/work/letsdecide/movies-poster.webp",
      alt: "A dim cinema with movie posters — LetsDecide's movie-night category",
      secondary: { src: "/work/letsdecide/splash.webp", alt: "The gold LetsDecide wordmark" },
    },
  },
  {
    slug: "swarm",
    title: "Swarm SAR",
    dek: "Search-and-rescue drone swarms that learn to coordinate — and to save battery — on their own.",
    client: "Research project",
    role: "Reinforcement-learning engineer",
    year: "2025",
    points: [
      "Multi-agent reinforcement learning with Proximal Policy Optimization for swarm coordination in obstacle-laden terrain.",
      "Reward shaping and state-space optimisation for battery-aware search strategies.",
      "Over 90% mission success across diverse simulated scenarios.",
    ],
    media: { kind: "swarm" },
  },
  {
    slug: "opusai",
    title: "OpusAI",
    dek: "An interview coach that listens, then raises the bar — adaptive voice interviews and resume-aware job matching.",
    client: "Independent product",
    role: "Founder & engineer",
    year: "2025",
    points: [
      "Adaptive voice interviews that calibrate question difficulty from real-time feedback — a 50% lift in session completion.",
      "NLP resume parsing and job matching that surfaced ~15 relevant roles per candidate in their first week.",
    ],
    media: { kind: "voice" },
  },
];

export const experience = [
  {
    years: "Apr — Nov 2026",
    role: "Technical Lead",
    company: "Sagility",
    via: "via Roy Partners",
    tag: "Enterprise AI/ML · Azure",
    points: [
      "Led architecture and end-to-end delivery of enterprise AI/ML solutions on Microsoft Azure — machine learning, data engineering, cloud infrastructure and production deployment.",
      "Set technical strategy, architecture standards, security controls and deployment practice across the AI/ML and cloud stack.",
    ],
  },
  {
    years: "Dec 2024 — Apr 2026",
    role: "AI Officer",
    company: "RootsGoods",
    via: "AgriTech",
    tag: "Agentic LLMs · RAG",
    points: [
      "Built a multilingual agentic LLM with Retrieval-Augmented Generation and BiLSTM forecasting that gives farmers real-time maize prices and connects buyers across 12+ regions.",
      "Integrated ONDC and eNAM to link buyers and sellers across the agricultural supply chain — increasing market reach by 30%.",
    ],
  },
  {
    years: "Sep — Dec 2024",
    role: "Software Development Intern",
    company: "Noesys Software",
    via: "Pvt. Ltd.",
    tag: "LLM pipelines · Automation",
    points: [
      "Built and released Python LLM pipelines on Clarifai that automated workflows and lifted operational efficiency by more than 20%.",
      "Designed a Chrome extension that scraped structured data from 10+ websites, cutting manual collection time by 70%.",
    ],
  },
];

export const publication = {
  venue: "IEEE SSITCON 2025",
  title: "NeuroSphere: Optimizing Mental Wellness Through Reinforcement Learning",
  doi: "10.1109/SSITCON66133.2025.11342145",
  abstract:
    "A peer-reviewed paper on applying reinforcement learning to personalised mental-wellness support.",
};

export const education = [
  {
    school: "University of Stuttgart",
    degree: "M.Sc. Computer Science — Autonomous Systems",
    years: "2026 — Present",
    note: "Stuttgart, Germany",
  },
  {
    school: "Dayananda Sagar College of Engineering",
    degree: "B.E. Information Science & Engineering",
    years: "2022 — 2026",
    note: "CGPA 9.39 / 10",
  },
];

export const toolkit = [
  {
    label: "Languages & ML",
    items: ["Python", "TypeScript", "PyTorch", "TensorFlow", "LangChain", "AutoGen", "Java", "C"],
  },
  {
    label: "Product engineering",
    items: ["Next.js", "React", "FastAPI", "WebSockets", "Capacitor", "Stable-Baselines3", "OpenCV", "Hugging Face"],
  },
  {
    label: "Data & cloud",
    items: ["Azure", "AWS", "Docker", "PostgreSQL", "MongoDB", "Redis", "Firebase", "NeonDB", "Vercel", "Prometheus"],
  },
];
