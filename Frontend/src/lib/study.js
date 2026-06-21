import { educationLogos } from "./static-assets";

export const studyPath = [
  {
    id: "fermi",
    logo: educationLogos.fermi,
    logoAlt: "Logo Polo tecnico scientifico E. Fermi",
    school: "Polo tecnico scientifico E. Fermi",
    place: "Lucca",
    period: "2019 – 2024",
    degree: "Diploma in tecnologie informatiche",
  },
  {
    id: "unipi",
    logo: educationLogos.unipi,
    logoAlt: "Logo Università di Pisa",
    school: "Università di Pisa",
    place: "Pisa",
    period: "2024 – in corso",
    degree: `Laurea triennale in Computer Science`,
    details: [
      "Corsi rilevanti:   Analisi | Architettura e Sistemi Operativi | Programmazione & Algoritmica | Ricerca Operativa | Algebra Lineare | Calcolo Numerico",
    ],
  },
];
