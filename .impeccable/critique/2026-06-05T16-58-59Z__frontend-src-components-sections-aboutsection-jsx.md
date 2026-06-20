---
target: Frontend/src/components/sections/AboutSection.jsx
total_score: 30
p0_count: 0
p1_count: 2
p2_count: 3
p3_count: 0
timestamp: 2026-06-05T16-58-59Z
slug: frontend-src-components-sections-aboutsection-jsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Scroll-reveal funziona; nessun feedback su download CV |
| 2 | Match System / Real World | 3 | Copy con errori ortografici ("far si", "e'", "conoscienze"); mix filosofia + tech senza ponte esplicito |
| 3 | User Control and Freedom | 4 | Sezione informativa, nessuna trappola |
| 4 | Consistency and Standards | 3 | `section-label` ripetuto; `font-light` negli obiettivi vs `font-normal` in `.about-prose` |
| 5 | Error Prevention | 4 | n/a per sezione statica |
| 6 | Recognition Rather Than Recall | 3 | Citazioni senza contesto per chi non conosce gli autori |
| 7 | Flexibility and Efficiency | 3 | n/a; portfolio scroll-only |
| 8 | Aesthetic and Minimalist Design | 3 | Buona gerarchia quote/prose; blocco Obiettivi 01/02/03 aggiunge rumore template |
| 9 | Error Recovery | 4 | n/a |
| 10 | Help and Documentation | 3 | n/a |
| **Total** | | **30/40** | **Good** |

## Anti-Patterns Verdict

**LLM assessment**: Non urla "AI slop", ma ci sono segnali moderati. Il layout zigzag quote+prose ha personalità e distanza dai template centrati. I rischi: card citazione con ombra morbida (pattern portfolio comune), label uppercase ripetute (`Chi sono` + `Obiettivi`), griglia numerata 01/02/03 vicina all'hero-metric template. Font pair Bricolage/Hanken Grotesk è fuori dalla reflex-reject list. OKLCH tinted neutrals + accent blu: committed ma non banale.

**Deterministic scan**: Non disponibile. `detect.mjs` ha restituito `bundled detector not found`; `live-server.mjs` e `detect-antipatterns-browser.js` assenti nel repo. Nessun overlay browser iniettato.

**Manual anti-pattern check** (SKILL.md absolute bans):
- Side-stripe borders: assenti (linea autore inline, accent sopra `.about-prose` è top-rule, ok)
- Gradient text: assente
- Glassmorphism: assente
- Hero-metric template: **borderline** nel blocco Obiettivi (numeri grandi + label + testo)
- Identical card grids: Obiettivi 3-col ripetitiva ma non icon+heading+text
- Repeated uppercase section labels: **presente** (Chi sono, Obiettivi)

## Overall Impression

La sezione comunica intento e valori con una composizione asimmetrica credibile. Il blocco citazione+testo è il punto più forte dopo il recente refactor. Il gap principale è la credibilità del copy (errori di battitura) e il blocco Obiettivi che riporta la sezione verso pattern da landing generica.

## What's Working

1. **Layout `.about-row` asimmetrico**: griglia 1.08/0.92 con gap fluidi dà respiro e ritmo editoriale senza centratura pigra.
2. **Gerarchia tipografica citazioni**: `about-quote` con display font medium vs `.about-prose` body più leggibile crea contrasto chiaro tra voce citata e narrativa personale.
3. **Semantica HTML**: `figure` + `blockquote` + `figcaption` e `aria-labelledby` sulla section sono solidi per screen reader e SEO.

## Priority Issues

**[P1] Errori ortografici nel body copy**
- **Why**: Un recruiter (Jordan) legge il testo come prova di attenzione al dettaglio; "far si", "e'", "conoscienze" minano fiducia.
- **Fix**: Correggere in "far sì", "è", "conoscenze".
- **Suggested command**: `clarify AboutSection copy`

**[P1] Ordine DOM vs ordine visivo nella riga 2**
- **Why**: `.about-row--reverse` inverte solo con CSS `order`; screen reader e tastiera seguono il DOM (citazione prima del testo). Sam e Jordan percepiscono un flusso incoerente.
- **Fix**: Mettere il paragrafo prima della citazione nel DOM della seconda riga, oppure usare `grid-template-areas` senza `order`.
- **Suggested command**: `adapt AboutSection responsive/a11y`

**[P2] Blocco Obiettivi vicino all'hero-metric template**
- **Why**: Numeri 01/02/03 grandi + tre colonne + CTA è il cliché SaaS che impeccable bandisce; stacca dal tono personale delle citazioni.
- **Fix**: Sostituire con lista narrativa, timeline verticale, o numerazione più discreta integrata nel testo.
- **Suggested command**: `distill AboutSection objectives` o `bolder AboutSection`

**[P2] Titolo sezione troppo stretto (`max-w-[22ch]`)**
- **Why**: Il titolo va a capo in modo brusco; riduce impatto del display heading su viewport medie.
- **Fix**: Allargare a ~28–32ch o rimuovere il cap.
- **Suggested command**: `typeset AboutSection heading`

**[P2] Label uppercase ripetute come grammatica di sezione**
- **Why**: `section-label` su Chi sono e Obiettivi è scaffolding da template AI (brand ban impeccable).
- **Fix**: Tenere una sola kicker forte; per Obiettivi usare h3 display senza label uppercase.
- **Suggested command**: `distill AboutSection labels`

## Persona Red Flags

**Jordan (First-Timer / recruiter)**: "proof of work" negli obiettivi senza spiegazione; citazioni buddiste senza filo conduttore esplicito; errori ortografici nel primo paragrafo letto dopo l'hero.

**Sam (Accessibility)**: Riga 2: ordine di lettura SR non corrisponde al layout visivo. `reveal-scroll` parte da `opacity: 0` (mitigato da `prefers-reduced-motion`). Contrasto `.about-prose` oklch(38%) su canvas ~96%: probabilmente AA, da verificare.

**Casey (Mobile)**: Su viewport strette entrambe le righe impilano citazione→testo; la seconda perde il zigzag. Blocco Obiettivi + CTA richiede molto scroll.

## Minor Observations

- Tre link "Scarica CV" nella pagina: ridondante ma non grave.
- `about-quote__mark` come `"` letterale: funziona; SVG o entità tipografica sarebbe più pulito.
- Obiettivi `font-light` vs `.about-prose` `font-normal`: micro-inconsistenza.
- Manca `PRODUCT.md`: critique senza ancoraggio brand esplicito.

## Cognitive Load

Checklist: 8/8 pass (basso carico). Informazione chunked in coppie quote+testo e blocco obiettivi separato.

## Questions to Consider

- Le citazioni servono come prova di carattere o come decorazione? Una riga di contesto le ancorerebbe al portfolio.
- Il blocco Obiettivi deve competere visivamente con le citazioni, o essere un epilogo più quieto?
- Su mobile, invertire l'ordine nella seconda riga manterrebbe il ritmo zigzag?
