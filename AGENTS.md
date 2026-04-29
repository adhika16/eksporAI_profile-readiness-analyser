<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

Next.js 16.2.4 with React 19.2.4 — APIs, conventions, and file structure may differ from your training data. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

- No test script configured (Vitest/Jest not set up)
- No pre-commit hooks

## Project structure

- `app/` — Next.js App Router (page.tsx, layout.tsx, globals.css)
- `app/layout.tsx` — Root layout with Geist fonts
- `app/page.tsx` — Home page component

## Tech stack

- Next.js 16.2.4 (App Router)
- React 19.2.4
- Tailwind CSS v4
- TypeScript 5
- ESLint 9

## Tailwind

Uses Tailwind CSS v4 (not v3) — configuration is handled via CSS, not tailwind.config.ts.