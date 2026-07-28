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
    content: "vercel.json: CSP (self + Web3Forms + hCaptcha wildcard), Permissions-Policy, nosniff, Referrer-Policy, X-Frame-Options; verifica solo su preview Vercel"
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

### Inventario reale (non inventare allowlist)

| Origine | Uso nel sito |
|---|---|
| `'self'` | JS/CSS/font (@fontsource), immagini/PDF in `public/`, asset Vite |
| `https://api.web3forms.com` | `fetch` POST da `ContactPage.jsx` (non form HTML nativo) |
| `https://hcaptcha.com` + `https://*.hcaptcha.com` | widget `@hcaptcha/react-hcaptcha` (script, iframe, style, XHR, immagini challenge) |

Niente Google Fonts CDN, niente analytics, niente Supabase in runtime. I link esterni (GitHub, LinkedIn, …) sono navigazione utente: non servono in CSP.

**Correzione rispetto alla bozza precedente:** la CSP “baseline” senza hCaptcha **rompe** Contact (widget + challenge). Non hardcodare solo `js.hcaptcha.com` / `newassets.hcaptcha.com`: la doc ufficiale chiede i wildcard perché i subdomain cambiano per regione/tempo.

### Cosa fare

Aggiungere in `vercel.json` un blocco `headers` su `/(.*)` (stesso scope del rewrite):

**Content-Security-Policy** (una riga, direttive essenziali):

```
default-src 'self';
script-src 'self' https://hcaptcha.com https://*.hcaptcha.com;
style-src 'self' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com;
img-src 'self' data: https://hcaptcha.com https://*.hcaptcha.com;
font-src 'self';
connect-src 'self' https://api.web3forms.com https://hcaptcha.com https://*.hcaptcha.com;
frame-src https://hcaptcha.com https://*.hcaptcha.com;
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
object-src 'none'
```

Note operative:

- `'unsafe-inline'` su `style-src`: necessario per CSS runtime Vite/Tailwind **e** per hCaptcha.
- `form-action 'self'` basta: il submit va via `fetch`, non via `action=` verso Web3Forms. Non allargare `form-action` a terzi senza bisogno.
- `frame-src` esplicito: senza di esso, `default-src 'self'` blocca l’iframe hCaptcha.
- Non aggiungere `'unsafe-eval'` (non enterprise hCaptcha; non serve al bundle attuale).
- Non mettere CSP in `index.html` meta se la gestisci già come header Vercel (una sola fonte di verità).

**Altri header:**

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `X-Frame-Options: DENY` (compat browser vecchi; ridondante con `frame-ancestors 'none'`, ok tenerli entrambi)

### Come verificare (obbligatorio su preview Vercel)

`pnpm dev` / `pnpm preview` **non** applicano `vercel.json`. Test reale:

```bash
pnpm build && pnpm lint
pnpm deploy:preview
curl -sI "https://<preview>.vercel.app/" | grep -iE 'content-security|x-content-type|referrer-policy|permissions-policy|x-frame'
```

Smoke sulla preview:

1. Home: font e layout ok
2. Skills / About: icone e immagini ok
3. Contact: widget hCaptcha si carica; challenge completabile
4. Contact: submit → success (rete verso `api.web3forms.com`)
5. DevTools Console: zero `Refused to …` CSP

Se qualcosa fallisce, la console indica la direttiva da allargare — non allargare preventivamente oltre l’inventario sopra.

---


Il todo elenca anche skip-link / headings / skill buttons: lo **skip-link è già presente**. Eventuali fix headings/skill-button a11y vanno trattati come micro-pass a11y separato (o appendice breve) solo dopo aver confermato i problemi reali nel markup corrente — non mescolarli al remount/CSS senza evidenza.

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

Smoke test generico: home, contact submit (+ hCaptcha), download CV, navigazione mobile.

**Fase 3 in più:** header verificabili solo su URL Vercel (`deploy:preview`); locale Vite non basta. Console senza errori CSP.
