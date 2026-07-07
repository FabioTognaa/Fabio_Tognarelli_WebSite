# Agent context

## Stack

React 19 · Vite 7 · Tailwind CSS v4 · React Router v7 · pnpm 10 ·
**No TypeScript** (plain .js/.jsx) · **No test framework** · Deploys via Vercel

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

## Project structure

- **Vite root is `Frontend/`**, not the repo root — `vite.config.js` sets `root: Frontend/`, `outDir: dist/`, `envDir: <repo-root>`
- **Entry:** `Frontend/index.html` → `Frontend/src/main.jsx` → `Frontend/src/components/App.jsx`
- **7 lazy routes** in `App.jsx`: `/`, `/about`, `/studies`, `/skills`, `/contact`, `/projects`, `*` (PageNotFound)
- All routes rendered inside **PageShell** (`SiteHeader` + `<Outlet>` + `SiteFooter`), `<ScrollToTop>` on nav
- **CSS:** Tailwind v4 `@theme` custom tokens + all component classes in `@layer components` inside `Frontend/src/index.css`
- **Static assets** (images, CV PDF, logos) are centralized via `src/lib/static-assets.js` — use that module, not raw paths
- **Environment variables** live at repo root (not `Frontend/`), loaded via `envDir: <repo-root>`
- **SPA routing** handled server-side: `vercel.json` rewrites all routes to `/index.html`
- **Fonts:** `@fontsource-variable/bricolage-grotesque` + `@fontsource/hanken-grotesk`

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

- The `impeccable` skill (`.agents/skills/impeccable/`) handles all design work — load it with the skill tool when the task matches its description.
- There is no CI, no pre-commit hooks, no type checking.
- `@supabase/supabase-js` is in dependencies — if used, env vars go in `.env` at repo root.
