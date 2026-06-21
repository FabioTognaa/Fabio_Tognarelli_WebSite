---
name: Fabio Tognarelli Portfolio
description: Portfolio personale caldo e preciso — craft frontend con voce umana
colors:
  canvas: "oklch(96.5% 0.012 85)"
  surface: "oklch(99% 0.006 90)"
  ink: "oklch(20% 0.045 265)"
  ink-muted: "oklch(48% 0.025 265)"
  ink-soft: "oklch(62% 0.02 265)"
  hero: "oklch(16% 0.05 265)"
  hero-elevated: "oklch(22% 0.055 262)"
  accent: "oklch(62% 0.19 250)"
  accent-deep: "oklch(48% 0.16 252)"
  accent-glow: "oklch(78% 0.12 250)"
  line: "oklch(88% 0.02 265)"
  on-hero: "oklch(96% 0.01 265)"
  on-accent: "oklch(98% 0.005 265)"
  success-surface: "oklch(96% 0.04 145)"
  success-border: "oklch(78% 0.12 145)"
  success-text: "oklch(32% 0.08 145)"
  error-surface: "oklch(96% 0.03 25)"
  error-border: "oklch(78% 0.12 25)"
  error-text: "oklch(38% 0.12 25)"
typography:
  display:
    fontFamily: '"Bricolage Grotesque Variable", ui-sans-serif, system-ui, sans-serif'
    fontWeight: 700
    letterSpacing: "-0.02em"
  section-heading:
    fontFamily: '"Bricolage Grotesque Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  hero-title:
    fontFamily: '"Bricolage Grotesque Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(2.5rem, 6vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  body:
    fontFamily: '"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-large:
    fontFamily: '"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1.125rem"
    fontWeight: 300
    lineHeight: 1.625
  label:
    fontFamily: '"Bricolage Grotesque Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.2em"
rounded:
  pill: "9999px"
  panel: "1rem"
  panel-lg: "1.75rem"
  field: "0.5rem"
spacing:
  section-y: "clamp(3.25rem, 6.5vw, 7rem)"
  section-x: "1.25rem"
  section-x-md: "2.5rem"
  section-x-lg: "4rem"
  button-x: "1.5rem"
  button-y: "0.75rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-on-dark:
    backgroundColor: "{colors.on-hero}"
    textColor: "{colors.hero}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-ghost-on-dark:
    backgroundColor: "{colors.hero-elevated}"
    textColor: "{colors.on-hero}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  surface-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "0"
---

# Design System: Fabio Tognarelli Portfolio

## Overview

**Creative North Star: "Il Ritratto Aperto"**

Un portfolio che si presenta come un ritratto professionale: metà presenza umana, metà prova tecnica. La pagina non urla competenza con badge e metriche; apre con calore (hero scuro, foto, citazioni) e lascia che tipografia, spaziatura e accessibilità dimostrino il craft. Densità moderata, respiro generoso, motion essenziale.

Il sistema rifiuta esplicitamente template SaaS, portfolio studente generico, corporate freddo e qualsiasi estetica "AI slop". La qualità emerge da contrasto tipografico, layering tonale e contenuto autentico, non da effetti decorativi.

**Key Characteristics:**

- Palette calda (canvas avorio) con blocchi hero profondi e accent blu-viola controllato
- Coppia display + body: Bricolage Grotesque per gerarchia, Hanken Grotesk per lettura
- Pulsanti pill, bordi sottili, ombre solo a stato (hover, scroll header)
- Motion minima: reveal in ingresso, lift leggero al hover; `prefers-reduced-motion` disattiva tutto
- Layout editoriale alternato (citazioni / prosa, numeri roadmap, griglie asimmetriche)
- Timeline credential con logo istituzionale + pannello surface (Esperienza e Formazione)
- Bande di sezione a tinta surface (`/50`, `/90`) per ritmo verticale senza nested card

## Colors

Toni neutri caldi verso hue 85–265; un solo accent saturo (250) per CTA, label e focus.

### Primary

- **Pisa Blue-Violet** (oklch(62% 0.19 250)): accent principale su CTA light, section label, link attivi, anelli focus, numeri roadmap attenuati
- **Deep Signal** (oklch(48% 0.16 252)): hover su button primary, testo accent più assertivo
- **Soft Glow** (oklch(78% 0.12 250)): hover su button dark, label hero, stati luminosi su sfondo scuro

### Neutral

- **Warm Canvas** (oklch(96.5% 0.012 85)): sfondo pagina, drawer hover, gradienti ambient
- **Paper Surface** (oklch(99% 0.006 90)): pannelli, card, ghost button fill
- **Ink Deep** (oklch(20% 0.045 265)): testo primario, titoli
- **Ink Muted** (oklch(48% 0.025 265)): corpo secondario, nav default
- **Ink Soft** (oklch(62% 0.02 265)): meta, autori citazioni, hint
- **Night Hero** (oklch(16% 0.05 265)): blocco hero, gradient overlay foto
- **Hero Elevated** (oklch(22% 0.055 262)): ghost button su dark, stati elevati
- **Hairline** (oklch(88% 0.02 265)): bordi card, divisori roadmap, header border
- **On Hero** (oklch(96% 0.01 265)): testo su hero scuro
- **On Accent** (oklch(98% 0.005 265)): testo su button accent

### Named Rules

**The Restrained Accent Rule.** L'accent copre CTA, label di sezione, focus e pochi punti di scansione. Non tintare intere sezioni; la rarità mantiene peso visivo.

**The Tinted Neutral Rule.** Mai nero o bianco puri. Neutri sempre leggermente tintati verso 265 (ink) o 85 (canvas).

## Typography

**Display Font:** Bricolage Grotesque Variable (ui-sans-serif fallback)
**Body Font:** Hanken Grotesk (ui-sans-serif fallback)

**Character:** Display con personalità e tracking tight; body leggero e leggibile. Coppia calda ma precisa, adatta a recruiter che scansionano in pochi minuti.

### Hierarchy

- **Hero Display** (800, clamp(2.5rem, 6vw, 4.25rem), 1.02): nome in home hero; massimo impatto
- **Section Heading** (700, clamp(2.25rem, 5vw, 3.5rem), 1.05): titoli pagina (About, Skills, Projects)
- **Section Label** (600, 0.75rem, uppercase, tracking 0.2em): eyebrow accent sopra ogni sezione
- **Entry Period** (600, 0.75rem, uppercase, tracking wider): periodo su timeline studio/esperienza; accent, inline nel pannello
- **Quote / Editorial** (500–600, clamp(1.125rem, 2.2vw, 1.35rem), 1.35): citazioni About, tono narrativo
- **Body** (400 light, 1rem–1.125rem, 1.625): prosa, descrizioni; max ~65–100ch dove applicabile
- **UI Label** (600, 0.875rem–0.9375rem): button, nav, tag skill

### Named Rules

**The Display-Body Split Rule.** Bricolage solo per titoli, label e citazioni; Hanken per tutto ciò che si legge a lungo.

## Elevation

Sistema ibrido: superfici piatte a riposo, profondità via contrasto tonale (canvas → surface → hero) e ombre solo come feedback di stato. Il body ha gradienti radiali fissi molto leggeri (opacity 0.35) per atmosfera, non per simulare vetro.

### Shadow Vocabulary

- **Primary lift** (`0 8px 24px oklch(48% 0.16 252 / 0.35)`): button primary a riposo
- **Portrait frame** (`0 32px 64px oklch(20% 0.04 265 / 0.12)`): card foto profilo
- **Card hover** (`0 12px 28px oklch(20% 0.04 265 / 0.06)`): skill card al hover
- **Header scrolled** (`0 10px 40px oklch(16% 0.05 265 / 0.1)`): site header con scroll

### Named Rules

**The Flat-Until-Interaction Rule.** Card e pannelli senza ombra a riposo. Ombre compaiono su hover, scroll o elementi "sollevati" (portrait, CTA).

## Components

### Buttons

- **Shape:** pill (rounded-full), padding 12px 24px, font 0.875rem semibold
- **Primary (light):** accent fill, on-accent text, shadow primary lift; hover accent-deep + translateY(-3px)
- **Primary on dark:** on-hero fill, hero text; hover accent-glow fill + hero text
- **Ghost:** surface/80 + hairline border; hover border/text accent
- **Ghost on dark:** hero-elevated/50 + border on-hero/25; hover accent-glow border
- **Focus:** outline 2px accent (o accent-glow su dark), offset 2px
- **Active:** scale 0.98, 120ms

### Chips / Tags

- **Skill tag:** pill, border hairline, surface bg, ink-muted text; hover border accent/40, lift -2px
- **Focus:** ring accent/50, offset surface

### Cards / Containers

- **Surface panel:** rounded-2xl (16px), border hairline, surface bg, no shadow at rest
- **Skill card:** surface-panel + top accent bar 3px (opacity 0.55); hover shadow card hover
- **Portrait frame:** rounded 1.75–2rem, border hairline, gradient overlay bottom su foto
- **Project card:** surface-panel + motion-lift; variante featured con padding e type scale maggiori
- **Status chip:** pill accent/15 bg, accent-deep text ("In preparazione")

### Page layout bands

- **Study / experience sections:** `section-pad` su `bg-surface/50` e `bg-surface/90` alternati; max-width 6xl
- **Skills section:** max-width 7xl (xl: 88rem), griglia 2 colonne gap-6, reveal stagger 80ms

### Inputs / Fields

- **Motion field:** min-height 44px, outline none
- **Focus:** ring accent/45 2px, translateY(-2px)
- **Error:** border/ring error-border, error-surface context

### Navigation

- **Site header:** sticky, canvas/80 + backdrop-blur-md, border-bottom hairline/60; scrolled → surface/96 + header shadow
- **Nav link:** ink-muted, 0.875rem medium; hover ink + lift -1px
- **Drawer link:** block, rounded-xl, px-3 py-3.5; hover canvas bg
- **Brand on scroll:** scale 0.97 subtle

### Signature: About Quote

- **Mark:** grande virgoletta decorativa accent
- **Text:** display medium, clamp responsive
- **Author:** ink-soft, rule accent/50 prima del nome

### Signature: Roadmap List

- **Numbers:** display 2.5rem, accent/65 opacity, tracking tight
- **Steps:** grid 3.5rem + 1fr, border-bottom hairline tra step

### Signature: Timeline Entry

Shared pattern (`StudyEntry`, `ExperienceEntry`):

- **Layout:** grid logo column + pannello; `md:grid-cols-[auto_1fr]`, gap 4–8, stack verticale gap 10–16 tra entry
- **Logo:** `study-logo` h-11 md:h-12, object-contain, max-w 7.5rem
- **Panel:** `surface-panel` p-6 md:p-8; period accent → titolo display → meta place → body muted
- **Experience variant:** ruolo semibold tra titolo e place (`experience-role`, tracking -0.01em)
- **Detail list:** border-top hairline/80, bullet accent 4px rounded-full (non side-stripe), testo sm muted

## Do's and Don'ts

### Do:

- **Do** usare OKLCH per tutti i token colore; tintare neutri verso 265/85
- **Do** mantenere touch target minimo 44px (min-h-11) su controlli interattivi
- **Do** rispettare `prefers-reduced-motion`: animazioni e transform disattivati
- **Do** alternare layout editoriale (quote/prosa, intro a due colonne su lg)
- **Do** riusare Timeline Entry per credenziali omogenee (logo + pannello, stesso ritmo spacing)
- **Do** guidare lo scan recruiter: CV, skills, contatto raggiungibili senza scroll infinito

### Don't:

- **Don't** usare template SaaS generici: hero metric, card grid identiche, gradient text, glassmorphism decorativo
- **Don't** eccedere con animazioni o effetti flashy che distraono dal contenuto
- **Don't** cadere nel corporate freddo o nel clone LinkedIn impersonale
- **Don't** replicare portfolio studente generico (Bootstrap look, sezioni interchangeable)
- **Don't** produrre interfacce "AI slop": pattern prevedibili, tipografia piatta, identità interchangeable
- **Don't** usare border-left/right spessi colorati come accento su card o liste
- **Don't** animare proprietà di layout (width, height, grid); solo transform/opacity
