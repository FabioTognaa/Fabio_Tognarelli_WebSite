export const skillGroups = [
  {
    id: "backend",
    title: "Backend e Database",
    summary:
      "Endpoint REST, query su PostgreSQL e logica lato server: il ponte tra frontend, dati persistenti e servizi esterni.",
    items: [
      {
        label: "Node.js",
        icon: "nodejs",
        hint: "Script, piccole API e automazioni locali",
      },
      {
        label: "Python",
        icon: "python",
        hint: "Utility, dati e esercizi da contesto universitario",
      },
      {
        label: "FastAPI",
        icon: "fastapi",
        hint: "API RESTful e microservizi",
      },
      {
        label: "PostgreSQL",
        icon: "postgresql",
        hint: "Database relazionale e gestione di dati",
      },
    ],
  },
  {
    id: "AI",
    title: "AI & automazioni",
    summary:
      "Assistenti AI nel flusso di sviluppo, workflow agentici con n8n e integrazione di modelli nei progetti personali.",
    items: [
      {
        label: "Claude Code & Design",
        icon: "claudecode",
        hint: "Ecosistema Claude per integrazione AI nei progetti personali ",
      },
      {
        label: "Cursor",
        icon: "cursor",
        hint: "",
      },
      {
        label: "n8n",
        icon: "n8n",
        hint: "Worklow completamente automatizzati con AI agentica",
      },
    ],
  },
  {
    id: "tooling",
    title: "Tooling",
    summary:
      "Container con Docker e pipeline CI/CD su GitHub Actions: ambienti riproducibili e deploy automatizzati.",
    items: [
      { label: "Docker", icon: "docker", hint: "" },
      {
        label: "GitHub Actions",
        icon: "githubactions",
        hint: "Versioning ed automazioni cloud",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    summary: "Interfacce responsive, accessibili e curate nei dettagli.",
    items: [
      {
        label: "HTML",
        icon: "html",
        hint: "Struttura leggibile per screen reader e SEO",
      },
      {
        label: "CSS",
        icon: "css",
        hint: "Layout fluidi, token e animazioni con intento",
      },
      {
        label: "JavaScript",
        icon: "javascript",
        hint: "Logica UI, fetch e tooling senza framework",
      },
      {
        label: "React",
        icon: "react",
        hint: "Componenti, hooks e stato in progetti reali",
      },
      {
        label: "Tailwind CSS",
        icon: "tailwind",
        hint: "Design system rapido senza abbandonare la semantica",
      },
    ],
  },

  {
    id: "foundations",
    title: "Fondamenti",
    summary: "Basi solide da contesto universitario e progetti personali.",
    items: [
      {
        label: "Java",
        icon: "java",
        hint: "OOP e strutture dati da esami e laboratori",
      },
      { label: "C", icon: "c", hint: "Memoria, puntatori e basi di sistema" },
      {
        label: "C++",
        icon: "cpp",
        hint: "Astrazione e performance dove serve",
      },
    ],
  },
];

export function skillKey(groupId, label) {
  return `${groupId}:${label}`;
}
