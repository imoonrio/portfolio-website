# Personal Portfolio Website

A bright, editorial portfolio website built with Vite, React, and TypeScript. The first version is static and data-driven so it can be deployed cheaply while staying easy to update.

## Run Locally

```bash
npm install
npm run dev
```

## Add Latest Works

1. Put the new image in `public/works/`.
2. Add a new record to `src/data/works.ts`.
3. Use a stable lowercase `id`, a title, category, year, description, and image path such as `/works/new-project.svg`.
4. Run `npm run build`.
5. Deploy the generated `dist/` folder.

Set `featured: true` on one work to use it in the hero. Only one featured work should be active at a time.

## Verify

```bash
npm test
npm run build
```
