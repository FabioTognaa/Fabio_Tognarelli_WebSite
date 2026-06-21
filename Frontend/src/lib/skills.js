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
      },
      {
        label: "Typescript",
        icon: "typescript",
      },
      {
        label: "Python",
        icon: "python",
      },
      {
        label: "FastAPI",
        icon: "fastapi",
      },
      {
        label: "PostgreSQL",
        icon: "postgresql",
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
      },
      {
        label: "Cursor",
        icon: "cursor",
      },
      {
        label: "n8n",
        icon: "n8n",
      },
    ],
  },
  {
    id: "tooling",
    title: "Tooling",
    summary:
      "Container con Docker e pipeline CI/CD su GitHub Actions: ambienti riproducibili e deploy automatizzati.",
    items: [
      { 
        label: "Docker", 
        icon: "docker"
      },
      {
        label: "GitHub Actions",
        icon: "githubactions",
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
        },
      {
        label: "CSS",
        icon: "css",
      },
      {
        label: "JavaScript",
        icon: "javascript",
      },
      {
        label: "React",
        icon: "react",
      },
      {
        label: "Tailwind CSS",
        icon: "tailwind",
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
      },
      { 
        label: "C", 
        icon: "c"},
      {
        label: "C++",
        icon: "cpp",
      },
    ],
  },
];

export function skillKey(groupId, label) {
  return `${groupId}:${label}`;
}
