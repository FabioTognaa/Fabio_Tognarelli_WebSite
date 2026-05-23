export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    summary: "Interfacce responsive, accessibili e curate nei dettagli.",
    featured: true,
    items: [
      {
        label: "HTML semantico",
        icon: "html",
        hint: "Struttura leggibile per screen reader e SEO",
      },
      {
        label: "CSS moderno",
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
    id: "backend",
    title: "Back-end e tooling",
    summary: "Script, piccole API e flusso di lavoro con Git.",
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
      { label: "Git", hint: "Branch, review e storia pulita in team" },
      { label: "REST", hint: "Contratti chiari tra client e server" },
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
      {
        label: "Strutture dati",
        hint: "Complessità e scelta del modello giusto",
      },
    ],
  },
];

export function skillKey(groupId, label) {
  return `${groupId}:${label}`;
}
