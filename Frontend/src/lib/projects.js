/**
 * Schema entry:
 * - id: chiave React
 * - title: nome progetto
 * - description: 1–2 frasi sul lavoro svolto
 * - context: contesto (personale, universitario, lavoro)
 * - stack: array { label, icon? } per tag tecnologici
 * - github, link: URL opzionali per i pulsanti in footer
 * - mentions: array opzionale { label, link } per link a entità citate in descrizione
 * - status: "coming-soon" | "published"
 */

export const projects = [
  {
    id: "slot-1",
    title: "CdL x Unipi: Digital Technologies Engineering",
    description:
      "Sito web per un nuovo corso di laurea dell'Università di Pisa (UNIPI) con sede a Carrara. Ho curato lo sviluppo del progetto e attualmente ne gestisco la manutenzione e l'ottimizzazione.",
    context: "Professional project",
    stack: [
      { label: "Wordpress", icon: "wordpress" },
      { label: "PHP", icon: "" },
      { label: "Tailwind", icon: "tailwind" },
    ],
    github: "",
    link: "https://digitaltech.ing.unipi.it/",
  },
  {
    id: "slot-2",
    title: "V-Shuttle",
    description: `Simulatore di veicolo a guida autonoma. Progetto al quale ho partecipato per un hackaton organizzato da Hastega.`,
    context: "Side project personale",
    stack: [
      { label: "Next.js", icon: "nextjs" },
      { label: "React", icon: "react" },
      { label: "TypeScript", icon: "typescript" },
      { label: "Tailwind", icon: "tailwind" },
    ],
    github: "https://github.com/Giorbertopazzosgravato/TeamNumero9-VShuttle",
    link: "",
    mentions: [
      {
        label: "Hastega",
        link: "https://www.hastega.it/en/",
      },
    ],
  },
  {
    id: "slot-3",
    title: "Coming soon...",
    description:
      "Spazio riservato ai miei futuri progetti o a quelli che ancora non si possono trovare sul mio sito.",
    context: "",
    stack: [],
    github: "",
    link: "",
  },
];

export { CV_PATH, CV_FILENAME } from "./static-assets";
