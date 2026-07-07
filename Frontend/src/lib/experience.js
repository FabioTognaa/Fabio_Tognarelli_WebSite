import { educationLogos } from "./static-assets";

/**
 * Schema entry:
 * - id: chiave React
 * - logo, logoAlt: asset logo azienda
 * - company: nome azienda o contesto lavorativo
 * - ruolo: titolo professionale
 * - place: sede
 * - period: intervallo temporale
 * - summary: 1–2 frasi sul contesto
 * - highlights: array di responsabilità, stack o risultati
 */

export const experiencePath = [
  {
    id: "jevis",
    logo: educationLogos.jevis,
    logoAlt: "Logo JEVIS",
    company: "JEVIS",
    ruolo: "Junior IT Associate",
    place: "Pisa",
    period: "Apr 2026 – now",
    summary:
      "Supporto clienti su gestione, progettazione e consulenza IT. Parallelamente sviluppo software interni per rafforzare l’offerta tecnologica dell’azienda.",
    highlights: [
      "Gestione e monitoraggio di ambienti e servizi IT",
      "Stack: ambienti Windows/Linux, Wordpress con pipeline Headless CMS e Python.",
      "Framework: React, Tailwind, Fastapi, PostgreSQL",
    ],
  },
];
