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
      "Tema WordPress custom (PHP + Tailwind) per il CdL Digital Technologies Engineering: template, componenti UI e manutenzione in produzione su digitaltech.ing.unipi.it.",
    context: "Professional project",
    stack: [
      { label: "Wordpress", icon: "wordpress" },
      { label: "PHP", icon: "php" },
      { label: "Tailwind", icon: "tailwind" },
    ],
    github: "",
    link: "https://digitaltech.ing.unipi.it/",
  },
  {
    id: "slot-2",
    title: "V-Shuttle",
    description: `Simulatore di un pannello di controllo per un veicolo a guida autonoma. Progetto per un hackaton organizzato da Hastega. E' stato classificato al 2° posto su 15 gruppi partecipanti.`,
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
    title: "MapReducer",
    description:
      "Runtime MapReduce in C, distribuito come libreria statica. I worker girano su thread C11 e si scambiano record via pipe; il programma client registra le funzioni map/reduce e lancia il job. Completo di relazione approfondita su scelte architetturali, design patterns e funzionamento interno.",
    stack: [{ label: "C", icon: "c" }],
    github: "https://github.com/FabioTognaa/MapReducer---Tognarelli-Fabio",
    link: "",
  },
  {
    id: "slot-4",
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
