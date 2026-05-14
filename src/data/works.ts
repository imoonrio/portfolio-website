export type WorkCategory = 'Branding' | 'Design' | 'Photography' | 'UI';

export type Work = {
  id: string;
  title: string;
  titleZh: string;
  category: WorkCategory;
  year: string;
  description: string;
  descriptionZh: string;
  image: string;
  featured?: boolean;
  link?: string;
};

export const works: Work[] = [
  {
    id: 'quiet-forms',
    title: 'Quiet Forms',
    titleZh: '静默形态',
    category: 'Design',
    year: '2026',
    description:
      'An editorial identity system built around spacious layouts, tactile imagery, and restrained typographic contrast.',
    descriptionZh: '一套以留白版式、触感图像和克制字体对比构建的杂志式视觉识别系统。',
    image: '/works/quiet-forms.svg',
    featured: true,
    link: 'https://example.com'
  },
  {
    id: 'lumen-objects',
    title: 'Lumen Objects',
    titleZh: '流光物件',
    category: 'Photography',
    year: '2026',
    description:
      'A luminous product photography series using warm light, reflective surfaces, and close-cropped composition.',
    descriptionZh: '一组以暖光、反射材质和近距离构图呈现的产品摄影系列。',
    image: '/works/lumen-objects.svg'
  },
  {
    id: 'northline-ui',
    title: 'Northline UI',
    titleZh: '北线界面',
    category: 'UI',
    year: '2025',
    description:
      'A polished interface concept for a studio dashboard with dense project information and calm interaction states.',
    descriptionZh: '一个面向工作室仪表盘的界面概念，兼顾高密度项目信息与平静的交互状态。',
    image: '/works/northline-ui.svg'
  },
  {
    id: 'soft-grid',
    title: 'Soft Grid',
    titleZh: '柔性网格',
    category: 'Branding',
    year: '2025',
    description:
      'A flexible visual language for a boutique creative practice, pairing structured grids with expressive imagery.',
    descriptionZh: '为精品创意实践打造的灵活视觉语言，将结构化网格与富有表现力的图像结合。',
    image: '/works/soft-grid.svg'
  },
  {
    id: 'paper-room',
    title: 'Paper Room',
    titleZh: '纸间',
    category: 'Photography',
    year: '2024',
    description:
      'A quiet interior series focused on paper texture, daylight, and the subtle rhythm of everyday working spaces.',
    descriptionZh: '一组安静的室内摄影，关注纸张纹理、自然光和日常工作空间的细微节奏。',
    image: '/works/paper-room.svg'
  },
  {
    id: 'signal-archive',
    title: 'Signal Archive',
    titleZh: '信号档案',
    category: 'Design',
    year: '2024',
    description:
      'A compact archive system for visual research, designed to make image-heavy collections easy to scan and compare.',
    descriptionZh: '一个用于视觉研究的紧凑档案系统，让大量图像资料更容易浏览、比较和管理。',
    image: '/works/signal-archive.svg'
  }
];

export const featuredWork = works.find((work) => work.featured) ?? works[0];

export function getCategories() {
  return ['All', ...Array.from(new Set(works.map((work) => work.category))).sort()];
}
