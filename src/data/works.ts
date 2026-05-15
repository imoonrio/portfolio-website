export type WorkCategory = 'Brand' | 'Campaign' | 'Digital' | 'Event' | 'Print';

export type Work = {
  id: string;
  title: string;
  titleZh: string;
  category: WorkCategory;
  year: string;
  description: string;
  descriptionZh: string;
  image: string;
  previewImage: string;
  images: string[];
  sourcePath?: string;
  featured?: boolean;
  link?: string;
};

export const works: Work[] = [
  {
    id: 'skincare-packaging',
    title: 'Skincare Packaging System',
    titleZh: '护肤产品包装设计及延展',
    category: 'Print',
    year: '2026',
    description:
      'A skincare packaging and extension system covering product presentation, visual rhythm, and refined material-led communication.',
    descriptionZh: '围绕护肤产品包装与延展视觉建立的系列方案，强调产品呈现、版式节奏与精致的材质表达。',
    image: '/works/new/skincare-packaging/01.png',
    previewImage: '/works/previews/skincare-packaging.jpg',
    images: [
      '/works/new/skincare-packaging/01.png',
      '/works/new/skincare-packaging/02.png',
      '/works/new/skincare-packaging/03.png',
      '/works/new/skincare-packaging/04.png',
      '/works/new/skincare-packaging/05.png',
      '/works/new/skincare-packaging/06.png',
      '/works/new/skincare-packaging/07.png'
    ],
    featured: true
  },
  {
    id: 'skincare-brochure',
    title: 'Skincare Brochure Design',
    titleZh: '护肤画册设计',
    category: 'Print',
    year: '2026',
    description:
      'A brochure design project for skincare communication, balancing product information, editorial pacing, and clean visual hierarchy.',
    descriptionZh: '面向护肤品传播的画册设计项目，在产品信息、阅读节奏与清爽视觉层级之间建立平衡。',
    image: '/works/new/skincare-brochure/01.png',
    previewImage: '/works/previews/skincare-brochure.jpg',
    images: [
      '/works/new/skincare-brochure/01.png',
      '/works/new/skincare-brochure/02.png',
      '/works/new/skincare-brochure/03.png',
      '/works/new/skincare-brochure/04.png',
      '/works/new/skincare-brochure/05.png',
      '/works/new/skincare-brochure/06.png'
    ]
  },
  {
    id: 'winter-solar-term-posters',
    title: 'Winter Solar Term Composite Posters',
    titleZh: '解放动力冬季节气创意合成海报设计',
    category: 'Campaign',
    year: '2026',
    description:
      'A seasonal poster series built with composite imagery, atmospheric storytelling, and consistent brand-led visual cues.',
    descriptionZh: '冬季节气主题的创意合成海报系列，以场景化叙事、氛围塑造和统一品牌视觉线索组织画面。',
    image: '/works/new/winter-solar-term-posters/01.png',
    previewImage: '/works/previews/winter-solar-term-posters.jpg',
    images: [
      '/works/new/winter-solar-term-posters/01.png',
      '/works/new/winter-solar-term-posters/02.png',
      '/works/new/winter-solar-term-posters/03.png',
      '/works/new/winter-solar-term-posters/04.png',
      '/works/new/winter-solar-term-posters/05.png',
      '/works/new/winter-solar-term-posters/06.png',
      '/works/new/winter-solar-term-posters/07.png',
      '/works/new/winter-solar-term-posters/08.png',
      '/works/new/winter-solar-term-posters/09.png',
      '/works/new/winter-solar-term-posters/10.png'
    ]
  },
  {
    id: 'jiefang-experience-officer-identity',
    title: 'Experience Officer Logo and Visual Identity',
    titleZh: '解放体验官Logo及品牌视觉识别系统',
    category: 'Brand',
    year: '2026',
    description:
      'A logo and identity system for a brand-facing experience role, extending from symbol logic to practical visual applications.',
    descriptionZh: '围绕体验官角色建立的 Logo 与品牌视觉识别系统，从标志逻辑延展到多场景应用表达。',
    image: '/works/new/jiefang-experience-officer-identity/01.png',
    previewImage: '/works/previews/jiefang-experience-officer-identity.jpg',
    images: [
      '/works/new/jiefang-experience-officer-identity/01.png',
      '/works/new/jiefang-experience-officer-identity/02.png',
      '/works/new/jiefang-experience-officer-identity/03.png',
      '/works/new/jiefang-experience-officer-identity/04.png',
      '/works/new/jiefang-experience-officer-identity/05.png',
      '/works/new/jiefang-experience-officer-identity/06.png'
    ]
  },
  {
    id: 'jiefangxing-app-visual-system',
    title: 'Jiefangxing App Visual System',
    titleZh: '解放行APP界面视觉识别系统',
    category: 'Digital',
    year: '2026',
    description:
      'A mobile interface visual system with screen layouts, operational content, and a consistent digital brand expression.',
    descriptionZh: '围绕移动端界面建立的视觉识别系统，覆盖页面布局、运营内容与统一的数字品牌表达。',
    image: '/works/new/jiefangxing-app-visual-system/01.png',
    previewImage: '/works/previews/jiefangxing-app-visual-system.jpg',
    images: [
      '/works/new/jiefangxing-app-visual-system/01.png',
      '/works/new/jiefangxing-app-visual-system/02.png',
      '/works/new/jiefangxing-app-visual-system/03.png',
      '/works/new/jiefangxing-app-visual-system/04.png',
      '/works/new/jiefangxing-app-visual-system/05.png',
      '/works/new/jiefangxing-app-visual-system/06.png',
      '/works/new/jiefangxing-app-visual-system/07.png',
      '/works/new/jiefangxing-app-visual-system/08.png',
      '/works/new/jiefangxing-app-visual-system/09.png',
      '/works/new/jiefangxing-app-visual-system/10.png',
      '/works/new/jiefangxing-app-visual-system/11.png',
      '/works/new/jiefangxing-app-visual-system/12.png',
      '/works/new/jiefangxing-app-visual-system/13.png',
      '/works/new/jiefangxing-app-visual-system/14.png',
      '/works/new/jiefangxing-app-visual-system/15.png',
      '/works/new/jiefangxing-app-visual-system/16.png'
    ]
  },
  {
    id: 'jiefang-night-event-visual',
    title: 'Jiefang Night Event Visual System',
    titleZh: '解放之夜线下活动视觉设计',
    category: 'Event',
    year: '2026',
    description:
      'An offline event visual system for stage atmosphere, campaign identity, and supporting materials across the event journey.',
    descriptionZh: '面向线下活动场景的视觉系统，覆盖舞台氛围、活动识别与现场传播物料延展。',
    image: '/works/new/jiefang-night-event-visual/01.png',
    previewImage: '/works/previews/jiefang-night-event-visual.jpg',
    images: [
      '/works/new/jiefang-night-event-visual/01.png',
      '/works/new/jiefang-night-event-visual/02.png',
      '/works/new/jiefang-night-event-visual/03.png',
      '/works/new/jiefang-night-event-visual/04.png',
      '/works/new/jiefang-night-event-visual/05.png',
      '/works/new/jiefang-night-event-visual/06.png',
      '/works/new/jiefang-night-event-visual/07.png',
      '/works/new/jiefang-night-event-visual/08.png',
      '/works/new/jiefang-night-event-visual/09.png',
      '/works/new/jiefang-night-event-visual/10.png'
    ]
  },
  {
    id: 'hand-drawn-aroma-standee',
    title: 'Hand-Drawn Aroma Standee',
    titleZh: '手绘香薰主题展架',
    category: 'Event',
    year: '2026',
    description:
      'A hand-drawn aroma standee concept combining soft illustration, product mood, and approachable display communication.',
    descriptionZh: '以手绘插画语言呈现香薰主题展架，将产品气质、陈列传播与亲和视觉表达结合。',
    image: '/works/new/hand-drawn-aroma-standee/01.png',
    previewImage: '/works/previews/hand-drawn-aroma-standee.jpg',
    images: [
      '/works/new/hand-drawn-aroma-standee/01.png',
      '/works/new/hand-drawn-aroma-standee/02.png',
      '/works/new/hand-drawn-aroma-standee/03.png',
      '/works/new/hand-drawn-aroma-standee/04.png',
      '/works/new/hand-drawn-aroma-standee/05.png',
      '/works/new/hand-drawn-aroma-standee/06.png',
      '/works/new/hand-drawn-aroma-standee/07.png',
      '/works/new/hand-drawn-aroma-standee/08.png'
    ]
  },
  {
    id: 'fairy-tale-picture-book',
    title: 'Fairy Tale Picture Book Adaptation',
    titleZh: '童话故事创意改编儿童绘本设计',
    category: 'Print',
    year: '2026',
    description:
      'A children’s picture book adaptation exploring narrative pacing, character-led scenes, and warm illustration-based storytelling.',
    descriptionZh: '童话故事创意改编绘本设计，围绕叙事节奏、角色场景和温暖插画表达展开。',
    image: '/works/new/fairy-tale-picture-book/01.png',
    previewImage: '/works/previews/fairy-tale-picture-book.jpg',
    images: [
      '/works/new/fairy-tale-picture-book/01.png',
      '/works/new/fairy-tale-picture-book/02.png',
      '/works/new/fairy-tale-picture-book/03.png',
      '/works/new/fairy-tale-picture-book/04.png',
      '/works/new/fairy-tale-picture-book/05.png',
      '/works/new/fairy-tale-picture-book/06.png',
      '/works/new/fairy-tale-picture-book/07.png'
    ]
  }
];

export const featuredWork = works.find((work) => work.featured) ?? works[0];

export function getCategories() {
  return ['All', ...Array.from(new Set(works.map((work) => work.category))).sort()];
}
