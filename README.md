# 06_website

Minimal marketing site scaffold for `onchain-rail`, intended for simple Vercel
deployment and collaborative editing.

## Routes

- `/` landing page
- `/about` project overview
- `/blog` blog index
- `/blog/[slug]` blog detail pages

## Structure

```text
06_website/
|-- package.json
|-- tsconfig.json
|-- next.config.ts
|-- src/
|   |-- app/
|   |   |-- about/page.tsx
|   |   |-- blog/[slug]/page.tsx
|   |   |-- blog/page.tsx
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |-- components/
|   |   |-- footer.tsx
|   |   |-- hero.tsx
|   |   |-- post-card.tsx
|   |   `-- site-header.tsx
|   `-- content/
|       |-- posts.ts
|       `-- site.ts
|-- public/
`-- README.md
```

## Local run

```sh
npm install
npm run dev
```

## Vercel

This folder is ready to deploy as a standalone Next.js project. In Vercel,
point the project root at `06_website/`.
