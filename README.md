# Personal Portfolio Website

A bright, editorial portfolio website built with Vite, React, and TypeScript. The first version is static and data-driven so it can be deployed cheaply while staying easy to update.

## Run Locally

```bash
npm install
npm run dev
```

## Deploy To Cloudflare Pages

This site is a static Vite app. Cloudflare Pages should build it from the
repository and publish the generated `dist/` folder.

Use these settings when creating the Pages project:

- Framework preset: `Vite`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node.js version: `22.16.0` (also pinned in `.node-version`)

The `public/_headers` file is copied into `dist/` during the build and sets
basic security headers plus long-lived caching for Vite's hashed assets.

## Add Latest Works

1. Put the new project image in `public/works/`.
2. Add a new record to `src/data/works.ts`.
3. Use a stable lowercase `id`, bilingual titles/descriptions, category, year, and an `images` array.
4. Set `image` to the first item in `images`; this is the cover image used in the hero and gallery.
5. Run `npm test` and `npm run build`.
6. Deploy the generated `dist/` folder.

Set `featured: true` on one work to use it in the hero. Only one featured work should be active at a time.

## Verify

```bash
npm test
npm run build
```
