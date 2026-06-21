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
    period: "2026 – attuale",
    summary:
      "Supporto operativo e progettuale su infrastruttura e applicativi aziendali, in team multidisciplinare.",
    highlights: [
      "Gestione e monitoraggio di ambienti e servizi IT",
      "Collaborazione su evolutive software e documentazione tecnica",
      "Stack: ambienti Windows/Linux, strumenti di ticketing e automazione base",
    ],
  },
];
