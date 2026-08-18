# Agent context

## Stack

React 19 · Vite 8 · Tailwind CSS v4 · React Router v7 · pnpm 11 ·
**No TypeScript** (plain .js/.jsx) · **No test framework** · Deploys via Vercel

`package.json` pins `packageManager`: `pnpm@11.22.0`. Contact form is **Web3Forms + hCaptcha** (no backend, no Supabase).

## Commands

| Action | Command |
|---|---|
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Preview | `pnpm preview` |
| Lint | `pnpm lint` |
| Deploy prod | `pnpm deploy` |
| Deploy preview | `pnpm deploy:preview` |

Formatting uses Prettier with `prettier-plugin-tailwindcss` (no dedicated script — run `prettier --write .` yourself).

Before closing non-trivial changes, run `pnpm build`, `pnpm lint`, and `pnpm audit --audit-level high`. There is no CI workflow in the repo.

## Project structure

- **Vite config is at repo root** (`vite.config.js`). `root` is `Frontend/`, `publicDir` is `Frontend/public/`, `outDir` is repo-root `dist/`, `envDir` is repo root
- **Entry:** `Frontend/index.html` → `Frontend/src/main.jsx` → `Frontend/src/components/App.jsx`
- **7 lazy routes** in `App.jsx`: `/`, `/about`, `/studies`, `/skills`, `/contact`, `/projects`, `*` (PageNotFound)
- All routes render inside **PageShell** (`SiteHeader` + skip link + `<Suspense>` around `<Outlet>` + `SiteFooter`), `<ScrollToTop>` on nav
- **Page copy/data** lives in `Frontend/src/lib/` (`about.js`, `experience.js`, `projects.js`, `skills.js`, `study.js`, `navigation.js`) — edit those modules, not hardcoded strings in page components
- **CSS:** Tailwind v4 `@theme` custom tokens + component classes in `@layer components` inside `Frontend/src/index.css`
- **Static assets** (images, CV PDF, logos) are centralized via `Frontend/src/lib/static-assets.js` — use that module, not raw paths. Skill icons go through `skill-icons.js` + `useLazySkillIcon`
- **SPA routing** handled server-side: `vercel.json` rewrites all routes to `/index.html` and sets CSP / security headers (must stay in sync with Web3Forms + hCaptcha origins)
- **Fonts:** `@fontsource-variable/bricolage-grotesque` + `@fontsource/hanken-grotesk`
- **pnpm-workspace.yaml** pins transitive security overrides; keep it when bumping Vercel/CLI deps

Production builds run the `rejectImpeccableLive` Vite plugin: if `Frontend/index.html` contains Impeccable Live / `localhost:8400`, the build fails (that snippet triggers suspicious permission prompts on mobile).

## Design workflow

For any UI or frontend design work, load impeccable context first:

```bash
node .agents/skills/impeccable/scripts/load-context.mjs
```

Strategic and visual specs live at the project root:

- **PRODUCT.md** — register (`brand`), users, purpose, personality, anti-references, principles, accessibility
- **DESIGN.md** — OKLCH tokens, typography, elevation, components, do's and don'ts

Register default: **brand** (personal portfolio; design is the product).

Sidecar for live panel / extended tokens: `.impeccable/design.json`.

## Notes

- The `impeccable` skill (`.agents/skills/impeccable/`) handles all design work — load it with the skill tool when the task matches its description. `.agents/` and `.impeccable/` are gitignored.
- There is no CI, no pre-commit hooks, no type checking.
- Contact keys (Web3Forms access key, hCaptcha sitekey) are public by design and live in `ContactPage.jsx`. Do not move them to a backend-style secret. Env vars, if added, go in `.env` at repo root (`envDir`).
