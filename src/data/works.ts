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
    description:
      'An editorial identity system built around spacious layouts, tactile imagery, and restrained typographic contrast.',
    image: '/works/quiet-forms.svg',
    featured: true,
    link: 'https://example.com'
  },
  {
    id: 'lumen-objects',
    title: 'Lumen Objects',
    category: 'Photography',
    year: '2026',
    description:
      'A luminous product photography series using warm light, reflective surfaces, and close-cropped composition.',
    image: '/works/lumen-objects.svg'
  },
  {
    id: 'northline-ui',
    title: 'Northline UI',
    category: 'UI',
    year: '2025',
    description:
      'A polished interface concept for a studio dashboard with dense project information and calm interaction states.',
    image: '/works/northline-ui.svg'
  },
  {
    id: 'soft-grid',
    title: 'Soft Grid',
    category: 'Branding',
    year: '2025',
    description:
      'A flexible visual language for a boutique creative practice, pairing structured grids with expressive imagery.',
    image: '/works/soft-grid.svg'
  },
  {
    id: 'paper-room',
    title: 'Paper Room',
    category: 'Photography',
    year: '2024',
    description:
      'A quiet interior series focused on paper texture, daylight, and the subtle rhythm of everyday working spaces.',
    image: '/works/paper-room.svg'
  },
  {
    id: 'signal-archive',
    title: 'Signal Archive',
    category: 'Design',
    year: '2024',
    description:
      'A compact archive system for visual research, designed to make image-heavy collections easy to scan and compare.',
    image: '/works/signal-archive.svg'
  }
];

export const featuredWork = works.find((work) => work.featured) ?? works[0];

export function getCategories() {
  return ['All', ...Array.from(new Set(works.map((work) => work.category))).sort()];
}
