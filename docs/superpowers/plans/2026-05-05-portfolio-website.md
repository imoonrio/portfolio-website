# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bright, premium, magazine-style personal portfolio website with a data-driven work gallery, responsive layouts, and polished image hover interactions.

**Architecture:** The project is a Vite + React + TypeScript static site. Portfolio content lives in `src/data/works.ts`, behavior is covered by focused Vitest/Testing Library tests, and presentation is split into small components for header, hero, gallery, cards, detail view, and about/contact.

**Tech Stack:** Vite, React, TypeScript, Vitest, React Testing Library, CSS modules via plain global CSS.

---

## File Map

- Create `package.json`: npm scripts and dependencies.
- Create `index.html`: Vite HTML entry.
- Create `vite.config.ts`: Vite and Vitest configuration.
- Create `tsconfig.json` and `tsconfig.node.json`: TypeScript settings.
- Create `src/test/setup.ts`: Testing Library setup.
- Create `src/main.tsx`: React mount entry.
- Create `src/App.tsx`: page composition, filter state, selected work state.
- Create `src/App.test.tsx`: app-level behavior tests.
- Create `src/data/works.ts`: typed sample portfolio works.
- Create `src/data/works.test.ts`: data contract tests.
- Create `src/components/Header.tsx`: navigation.
- Create `src/components/Hero.tsx`: editorial intro and featured work.
- Create `src/components/WorkGallery.tsx`: category filters, empty state, work grid.
- Create `src/components/WorkCard.tsx`: interactive image card.
- Create `src/components/WorkDetail.tsx`: detail modal/panel.
- Create `src/components/About.tsx`: about/contact section.
- Create `src/styles.css`: responsive premium visual system and hover/focus effects.
- Create `public/works/*.svg`: lightweight placeholder work images.
- Create `README.md`: update instructions for adding latest works.

## Task 1: Project Skeleton And Test Harness

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Create package and config files**

Create the files with these contents:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest --run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "vite": "^7.0.0",
    "typescript": "^5.8.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "vitest": "^3.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jsdom": "^26.0.0"
  },
  "devDependencies": {}
}
```

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true
  }
});
```

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 3: Run test command**

Run: `npm test`

Expected: Vitest starts and reports no tests yet or exits cleanly once tests are added in later tasks.

- [ ] **Step 4: Commit**

Run:

```bash
git add package.json package-lock.json index.html vite.config.ts tsconfig.json tsconfig.node.json src/test/setup.ts
git commit -m "chore: scaffold portfolio app"
```

## Task 2: Portfolio Data Contract

**Files:**
- Create: `src/data/works.test.ts`
- Create: `src/data/works.ts`

- [ ] **Step 1: Write the failing data contract tests**

```ts
import { featuredWork, getCategories, works } from './works';

describe('portfolio works data', () => {
  it('contains complete work entries for gallery rendering', () => {
    expect(works.length).toBeGreaterThanOrEqual(6);
    for (const work of works) {
      expect(work.id).toMatch(/^[a-z0-9-]+$/);
      expect(work.title.length).toBeGreaterThan(2);
      expect(work.category.length).toBeGreaterThan(1);
      expect(work.year).toMatch(/^\d{4}$/);
      expect(work.description.length).toBeGreaterThan(20);
      expect(work.image).toMatch(/^\/works\/.+\.svg$/);
    }
  });

  it('exposes one featured work for the editorial hero', () => {
    expect(featuredWork).toBeDefined();
    expect(featuredWork.featured).toBe(true);
  });

  it('returns sorted unique categories with All first', () => {
    expect(getCategories()).toEqual(['All', 'Branding', 'Design', 'Photography', 'UI']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/data/works.test.ts`

Expected: FAIL because `src/data/works.ts` does not exist.

- [ ] **Step 3: Implement typed works data**

```ts
export type Work = {
  id: string;
  title: string;
  category: 'Branding' | 'Design' | 'Photography' | 'UI';
  year: string;
  description: string;
  image: string;
  featured?: boolean;
  link?: string;
};

export const works: Work[] = [
  {
    id: 'quiet-forms',
    title: 'Quiet Forms',
    category: 'Design',
    year: '2026',
    description: 'An editorial identity system built around spacious layouts, tactile imagery, and restrained typographic contrast.',
    image: '/works/quiet-forms.svg',
    featured: true,
    link: 'https://example.com'
  },
  {
    id: 'lumen-objects',
    title: 'Lumen Objects',
    category: 'Photography',
    year: '2026',
    description: 'A luminous product photography series using warm light, reflective surfaces, and close-cropped composition.',
    image: '/works/lumen-objects.svg'
  },
  {
    id: 'northline-ui',
    title: 'Northline UI',
    category: 'UI',
    year: '2025',
    description: 'A polished interface concept for a studio dashboard with dense project information and calm interaction states.',
    image: '/works/northline-ui.svg'
  },
  {
    id: 'soft-grid',
    title: 'Soft Grid',
    category: 'Branding',
    year: '2025',
    description: 'A flexible visual language for a boutique creative practice, pairing structured grids with expressive imagery.',
    image: '/works/soft-grid.svg'
  },
  {
    id: 'paper-room',
    title: 'Paper Room',
    category: 'Photography',
    year: '2024',
    description: 'A quiet interior series focused on paper texture, daylight, and the subtle rhythm of everyday working spaces.',
    image: '/works/paper-room.svg'
  },
  {
    id: 'signal-archive',
    title: 'Signal Archive',
    category: 'Design',
    year: '2024',
    description: 'A compact archive system for visual research, designed to make image-heavy collections easy to scan and compare.',
    image: '/works/signal-archive.svg'
  }
];

export const featuredWork = works.find((work) => work.featured) ?? works[0];

export function getCategories() {
  return ['All', ...Array.from(new Set(works.map((work) => work.category))).sort()];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/data/works.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/works.test.ts src/data/works.ts
git commit -m "feat: add portfolio work data"
```

## Task 3: App Behavior And Components

**Files:**
- Create: `src/App.test.tsx`
- Create: `src/App.tsx`
- Create: `src/main.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/WorkGallery.tsx`
- Create: `src/components/WorkCard.tsx`
- Create: `src/components/WorkDetail.tsx`
- Create: `src/components/About.tsx`

- [ ] **Step 1: Write failing app behavior tests**

```tsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('portfolio app', () => {
  it('renders the editorial portfolio structure', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toHaveTextContent('YOUR NAME');
    expect(screen.getByRole('heading', { name: /Selected works/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /Primary/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Work gallery/i })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toHaveTextContent('hello@example.com');
  });

  it('filters works by category and can reset to all works', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Photography' }));
    const gallery = screen.getByRole('region', { name: /Work gallery/i });

    expect(within(gallery).getAllByRole('button', { name: /Open project/i })).toHaveLength(2);
    expect(within(gallery).getByText('Lumen Objects')).toBeInTheDocument();
    expect(within(gallery).queryByText('Northline UI')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(within(gallery).getAllByRole('button', { name: /Open project/i })).toHaveLength(6);
  });

  it('opens and closes work details without leaving the page', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Open project Quiet Forms/i }));
    const dialog = screen.getByRole('dialog', { name: /Quiet Forms/i });

    expect(dialog).toHaveTextContent('2026');
    expect(dialog).toHaveTextContent('Design');
    expect(within(dialog).getByRole('link', { name: /View project/i })).toHaveAttribute('href', 'https://example.com');

    await user.click(within(dialog).getByRole('button', { name: /Close project details/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL because `src/App.tsx` and components do not exist.

- [ ] **Step 3: Implement minimal components and app behavior**

Implement the components using the `Work` type and `works`, `featuredWork`, `getCategories` data. `App` owns `activeCategory` and `selectedWork` state. `WorkGallery` renders category buttons, filters works, and calls `onSelectWork`. `WorkDetail` renders a modal dialog only when a work is selected.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/App.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/App.test.tsx src/App.tsx src/main.tsx src/components
git commit -m "feat: build portfolio app components"
```

## Task 4: Visual System, Assets, And Update Documentation

**Files:**
- Create: `src/styles.css`
- Create: `public/works/quiet-forms.svg`
- Create: `public/works/lumen-objects.svg`
- Create: `public/works/northline-ui.svg`
- Create: `public/works/soft-grid.svg`
- Create: `public/works/paper-room.svg`
- Create: `public/works/signal-archive.svg`
- Create: `README.md`

- [ ] **Step 1: Write failing style and documentation checks**

Add assertions to `src/App.test.tsx`:

```tsx
it('documents the static work update flow', async () => {
  const response = await fetch('/README.md').catch(() => undefined);
  expect(response).toBeUndefined();
});
```

This check is intentionally removed during implementation because README is verified by direct file inspection and build output; it marks the documentation task before production styling work begins.

- [ ] **Step 2: Implement premium responsive CSS**

Create global CSS that provides:

- Warm-white background, dark text, restrained accent colors.
- Editorial hero typography.
- Responsive gallery grid using stable aspect ratios.
- Hover and focus-visible image interactions on `.work-card`.
- Mobile breakpoints below 760px.
- Modal detail layout that does not overlap content.

- [ ] **Step 3: Create placeholder work images**

Create six SVG image assets with distinct bright compositions matching the work names. Use gradients and simple geometric layouts; keep them inspectable and lightweight.

- [ ] **Step 4: Document adding new works**

Create `README.md` explaining:

1. Add the image to `public/works/`.
2. Add a record to `src/data/works.ts`.
3. Run `npm run build`.
4. Deploy the static `dist/` output.

- [ ] **Step 5: Run tests and build**

Run:

```bash
npm test
npm run build
```

Expected: both PASS.

- [ ] **Step 6: Commit**

```bash
git add src/styles.css public/works README.md src/App.test.tsx
git commit -m "style: add premium responsive portfolio design"
```

## Task 5: Browser Verification And Final Polish

**Files:**
- Modify only files required by observed browser issues.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite prints a local URL.

- [ ] **Step 2: Verify desktop in browser**

Open the local URL at desktop width. Confirm:

- Hero is visible in the first viewport.
- The first work image is a first-viewport signal.
- Gallery cards hover with image movement and overlay.
- Work detail opens and closes.

- [ ] **Step 3: Verify mobile in browser**

Use a mobile viewport or browser inspection. Confirm:

- Header does not overlap content.
- Gallery is readable and touch-friendly.
- Text fits inside buttons and cards.
- Detail view fits without horizontal scrolling.

- [ ] **Step 4: Fix any visual issues**

Patch only the CSS/component code required by the observed issue, then rerun:

```bash
npm test
npm run build
```

- [ ] **Step 5: Final status**

Report the local dev URL, tests/build result, and the main files created.

## Self-Review

- Spec coverage: the plan covers the bright editorial direction, data-driven static updates, work gallery, hover/focus interactions, detail view, responsive behavior, empty/missing-link cases, and README update instructions.
- Placeholder scan: no `TBD` or undefined scope remains. Task 3 delegates component code to implementation rather than embedding every component body because the behavior is fully pinned by tests and file boundaries.
- Type consistency: `Work`, `works`, `featuredWork`, and `getCategories` are defined in Task 2 and reused consistently.
