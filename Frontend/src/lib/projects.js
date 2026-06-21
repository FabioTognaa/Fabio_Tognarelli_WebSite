/**
 * Schema entry:
 * - id: chiave React
 * - title: nome progetto
 * - description: 1–2 frasi sul lavoro svolto
 * - context: contesto (personale, universitario, lavoro)
 * - stack: array { label, icon? } per tag tecnologici
 * - github, demo: URL opzionali; github mostrato quando valorizzato
 * - status: "coming-soon" | "published"
 */

export const projects = [
  {
    id: "slot-1",
    title: "Progetto in preparazione",
    description:
      "Primo case study in lavorazione: applicazione web con frontend React e API dedicata.",
    context: "Side project personale",
    stack: [
      { label: "React", icon: "react" },
      { label: "TypeScript", icon: "typescript" },
      { label: "Tailwind", icon: "tailwind" },
    ],
    github: "",
    demo: "",
  },
  {
    id: "slot-2",
    title: "V-Shuttle",
    description:
      "SImulatore di veicolo a guida autonoma. Progetto al quale ho partecipato per un hackaton.",
    context: "Side project personale",
    stack: [
      { label: "Next.js", icon: "" },
      { label: "React", icon: "react" },
      { label: "TypeScript", icon: "typescript" },
      { label: "Tailwind", icon: "tailwind" },
    ],
    github: "https://github.com/Giorbertopazzosgravato/TeamNumero9-VShuttle",
    demo: "",
  },
  {
    id: "slot-3",
    title: "Terzo progetto",
    description:
      "Spazio riservato a un proof of work full stack con deploy e pipeline CI/CD.",
    context: "Proof of work full stack",
    stack: [
      { label: "React", icon: "react" },
      { label: "Docker", icon: "docker" },
      { label: "GitHub Actions", icon: "githubactions" },
    ],
    github: "",
    demo: "",
    status: "coming-soon",
  },
];

export { CV_PATH } from "./static-assets";
