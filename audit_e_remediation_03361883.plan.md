---
name: Audit e remediation
overview: "Audit del portfolio: causa dei “permessi strani” già identificata e parzialmente fixata; restano hardening sicurezza (form, headers), igiene dipendenze/repo, fix perf/a11y e SEO/privacy senza cookie banner."
todos:
  - id: verify-permissions-fix
    content: Redeploy e verifica mobile; guardrail build contro re-iniezione impeccable-live/localhost:8400
    status: pending
  - id: harden-contact-form
    content: Env VITE_WEB3FORMS_ACCESS_KEY, honeypot, domain allowlist dashboard, validazione max length
    status: pending
  - id: security-headers
    content: Aggiungere CSP + Permissions-Policy + headers hardening in vercel.json
    status: pending
  - id: deps-hygiene
    content: Rimuovere @supabase/supabase-js, private:true, allineare audit overrides / README CI
    status: pending
  - id: runtime-perf-a11y
    content: Fix key remount App.jsx, skip-link, headings, skill buttons, download filename, import morti
    status: pending
  - id: css-icons-cleanup
    content: Rimuovere CSS morto; ottimizzare icone skill pesanti
    status: pending
  - id: seo-privacy
    content: favicon, robots, sitemap, canonical/twitter; pagina Privacy + link footer
    status: pending
  - id: git-hygiene
    content: Untrack o ripristinare .agents/.impeccable in modo coerente col .gitignore
    status: pending
  - id: product-followups
    content: "Fase successiva: certificazioni in public + dominio custom (ROADMAP)"
    status: pending
isProject: false
---

# Audit portfolio: problemi e piano di remediation

## Contesto

SPA React/Vite su Vercel, senza backend proprio. Form via Web3Forms. Nessun analytics/cookie di tracking. Bundle già ragionevole (~1.1MB dist, lazy routes, WebP). I problemi rilevati non sono “il sito è rotto”, ma **trust mobile, abuso form, debito tecnico e SEO/a11y**.

---

## 3. Alto — Security headers mancanti

[`vercel.json`](vercel.json) oggi ha solo lo SPA rewrite. Nessun header di hardening.

### Cosa fare

Aggiungere in `vercel.json` (headers su `/(.*)`):

- `Content-Security-Policy` (baseline: `default-src 'self'`; `script-src 'self'`; `connect-src 'self' https://api.web3forms.com`; `img-src 'self' data:`; `style-src 'self' 'unsafe-inline'` per Tailwind runtime; `font-src 'self'`; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'self' https://api.web3forms.com`)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()` (rinforza il punto “permessi”)
- `X-Frame-Options: DENY` (o solo CSP `frame-ancestors`)

Verificare post-deploy che form e font/icone funzionino ancora.

---

## 6. Medio — Performance / UX runtime

Obiettivo: meno lavoro inutile a ogni navigazione, meno flash, meno peso morto (CSS/icone/import), download CV corretto. Nessun redesign: solo fix snelli e verificabili.

Lo stato attuale è già in parte migliorato rispetto all’audit originale: `PageShell` ha già skip-link + `#main-content`, e `.page-enter` è già sul `<main>`. Resta però il problema principale in `App.jsx` (key sullo shell intero) e i cleanup sotto.

---

### 6.1 Remount totale ad ogni navigazione (priorità alta di questa fase)

In [`Frontend/src/components/App.jsx`](Frontend/src/components/App.jsx):

```jsx
<div key={location.pathname} className="page-enter">
  <ScrollToTop />
  <Suspense fallback={null}>
    <Routes>
      <Route element={<PageShell />}>…</Route>
    </Routes>
  </Suspense>
</div>
```

**Cosa succede oggi:** React tratta quel `div` come un componente nuovo a ogni cambio path. Quindi **smonta e rimonta** tutto ciò che c’è sotto: `PageShell`, `SiteHeader` (listener scroll, drawer Headless UI), `SiteFooter`, e solo dopo la nuova pagina. L’animazione `page-enter` riparte anche su header/footer. È un costo inutile e peggiora la sensazione di “sito che si ricarica” in navigazione interna.

**Come procedere:**

1. Togliere `key={location.pathname}` (e idealmente anche `page-enter`) dal wrapper esterno in `App.jsx`.
2. Lasciare `PageShell` stabile (header/footer vivono tra le route).
3. Animare solo il contenuto di pagina: o mantenere `.page-enter` sul `<main>` già presente in `PageShell`, oppure (se serve ri-triggerare l’animazione a ogni route) mettere la `key` **solo** intorno all’`<Outlet>` / a un wrapper interno del main — mai sullo shell.
4. Smoke test: navigare tra home → about → skills → contact; verificare che header non “lampeggia”, drawer mobile resta coerente, scroll-to-top continua a funzionare, animazione pagina ancora presente.

---

### 6.2 Suspense fallback (priorità media)

Oggi `fallback={null}`: mentre la lazy route scarica il chunk, l’utente vede un buco bianco/vuoto nel main.

**Come procedere:** un fallback minimale (non uno skeleton complesso): es. contenitore con `min-h` + eventuale pulse/aria-busy, allineato al layout esistente. Obiettivo: zero flash bianco, zero nuove dipendenze.

---

### 6.3 Import morti

[`HomePage.jsx`](Frontend/src/components/pages/HomePage.jsx) e [`PageNotFound.jsx`](Frontend/src/components/pages/PageNotFound.jsx) importano `PageShell` ma non lo usano (lo shell è già nel layout route). Rimuovere gli import. Verifica: `pnpm lint` / build pulita.

---

### 6.4 Attributo `download` del CV

`CV_PATH` è `/documents/cv-tognarelli-fabio.pdf`. Usarlo come valore di `download={…}` (header, footer, home, projects) è sbagliato: l’attributo HTML `download` vuole un **nome file** suggerito al browser (`cv-tognarelli-fabio.pdf`), non il path URL. L’`href` resta `CV_PATH`.

**Come procedere:** introdurre una costante tipo `CV_FILENAME` in `static-assets.js` (o derivarla dal path) e usarla in tutti i punti `download={…}`. Smoke test: click “Scarica CV” → file con nome sensato.

---

### 6.5 CSS morto (todo `css-icons-cleanup`)

In [`Frontend/src/index.css`](Frontend/src/index.css) ci sono regole non referenziate dal markup attuale:

- `.expand-panel*` / `.study-expand-trigger` (vecchio pattern accordion studi)
- `.site-header__brand`
- `.skills-hint`

**Come procedere:** grep per conferma zero usi in JSX, poi cancellare i blocchi (incluse le varianti `prefers-reduced-motion` collegate). **Non** toccare `.skip-link`: il markup c’è già in `PageShell`. Dopo: build + controllo visivo header/skills/studies.

---

### 6.6 Icone skill pesanti (todo `css-icons-cleanup`)

In `Frontend/src/assets/icons/skills/`: SVG/PNG grandi (es. `c-icon.svg` ~27KB, `java` ~20KB; diversi PNG). Oggi sono già lazy via `skill-icons.js`, ma restano pesanti al primo render della pagina Skills.

**Come procedere (in ordine):**

1. Misurare pesi attuali (`ls -la` / report build).
2. SVGO sui SVG troppo grandi; dove l’icona è un logo semplice, sostituire con SVG semplificato.
3. PNG → WebP (o SVG se conviene) aggiornando `skill-icons.js`.
4. Verifica visiva Skills page desktop/mobile; nessun cambio di API componenti.

---

### 6.7 Opzionale — code-split Headless UI / Heroicons

`SiteHeader` importa `@headlessui/react` + `@heroicons` in modo statico → finiscono nel vendor critico anche su desktop dove il drawer non serve.

**Come procedere (solo se dopo 6.1–6.6 resta tempo/valore):** lazy del drawer mobile o dynamic import delle dipendenze drawer-only. Non bloccante per chiudere la fase 6.

---

### 6.8 Fuori scope di questa sezione (ma nel todo `runtime-perf-a11y`)

Il todo elenca anche skip-link / headings / skill buttons: lo **skip-link è già presente**. Eventuali fix headings/skill-button a11y vanno trattati come micro-pass a11y separato (o appendice breve) solo dopo aver confermato i problemi reali nel markup corrente — non mescolarli al remount/CSS senza evidenza.

---

### Ordine di esecuzione proposto

1. Fix remount `App.jsx` + smoke navigazione  
2. Suspense fallback minimo  
3. Import morti + `CV_FILENAME`  
4. CSS morto  
5. Icone skill  
6. (Opzionale) split Headless UI  

Verifica fase: `pnpm build && pnpm lint`, poi smoke home / contact / CV / mobile nav.

---


## 9. Cookie policy / privacy (risposta ROADMAP)

**Cookie banner: non serve** finché non usi cookie/localStorage di tracking/analytics/ads. Oggi non risultano.

**Serve invece** una pagina leggera **Privacy** (gratis, markdown/JSX statico) che dichiari:

- nessun cookie di profilazione;
- il form invia nome/email/messaggio a Web3Forms (terza parte) per risponderti;
- email/telefono/CV pubblicati volontariamente;
- link alla privacy di Web3Forms.

Rischio legale concreto senza cookie banner: **basso**. Rischio senza alcuna informativa sul trattamento dei dati del form: **medio-basso** (soprattutto se ricevi molte candidature/contatti).

Footer: link “Privacy”.

---
### Verifica a ogni fase

```bash
pnpm build && pnpm lint && pnpm audit --audit-level high
```

Poi smoke test: home, contact submit, download CV, navigazione mobile, header CSP non rompe asset.
