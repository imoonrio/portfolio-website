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

export type HeroSlide = {
  image: string;
  workId: Work['id'];
};

function optimizedAsset(folder: string, file: string) {
  return `/works/optimized/${folder}/${file}`;
}

function optimizedImages(folder: string, prefix: string, count: number, start = 1) {
  return Array.from({ length: count }, (_, index) => {
    const imageIndex = String(start + index).padStart(2, '0');

    return optimizedAsset(folder, `${prefix}_${imageIndex}.png`);
  });
}

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
    image: optimizedAsset('skincare-packaging', 'skincare_packaging_thumb_1_1.jpg'),
    previewImage: optimizedAsset('skincare-packaging', 'skincare_packaging_thumb_2_3.jpg'),
    images: optimizedImages('skincare-packaging', 'skincare_packaging', 7),
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
    image: optimizedAsset('skincare-brochure', 'skincare_brochure_thumb_1_1.png'),
    previewImage: optimizedAsset('skincare-brochure', 'skincare_brochure_thumb_2_3.png'),
    images: optimizedImages('skincare-brochure', 'skincare_brochure', 6)
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
    image: optimizedAsset('winter-solar-term-posters', 'winter_posters_thumb_1_1.png'),
    previewImage: optimizedAsset('winter-solar-term-posters', 'winter_posters_thumb_2_3.png'),
    images: optimizedImages('winter-solar-term-posters', 'winter_posters', 10)
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
    image: optimizedAsset('jiefang-experience-officer-identity', 'jiefang_identity_thumb_1_1.png'),
    previewImage: optimizedAsset('jiefang-experience-officer-identity', 'jiefang_identity_thumb_2_3.png'),
    images: optimizedImages('jiefang-experience-officer-identity', 'jiefang_identity', 6)
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
    image: optimizedAsset('jiefangxing-app-visual-system', 'jiefang_app_thumb_1_1.png'),
    previewImage: optimizedAsset('jiefangxing-app-visual-system', 'jiefang_app_thumb_2_3.png'),
    images: optimizedImages('jiefangxing-app-visual-system', 'jiefang_app', 10, 7)
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
    image: optimizedAsset('jiefang-night-event-visual', 'jiefang_night_thumb_1_1.png'),
    previewImage: optimizedAsset('jiefang-night-event-visual', 'jiefang_night_thumb_2_3.png'),
    images: optimizedImages('jiefang-night-event-visual', 'jiefang_night', 10)
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
    image: optimizedAsset('hand-drawn-aroma-standee', 'aroma_standee_thumb_1_1.png'),
    previewImage: optimizedAsset('hand-drawn-aroma-standee', 'aroma_standee_thumb_2_3.png'),
    images: optimizedImages('hand-drawn-aroma-standee', 'aroma_standee', 8)
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
    image: optimizedAsset('fairy-tale-picture-book', 'fairy_tale_book_thumb_1_1.png'),
    previewImage: optimizedAsset('fairy-tale-picture-book', 'fairy_tale_book_thumb_2_3.png'),
    images: optimizedImages('fairy-tale-picture-book', 'fairy_tale_book', 7)
  }
];

export const heroSlides: HeroSlide[] = [
  {
    workId: 'skincare-packaging',
    image: '/works/slides/skincare_packaging-slide.png'
  },
  {
    workId: 'skincare-brochure',
    image: '/works/slides/skincare-slide.png'
  },
  {
    workId: 'jiefang-experience-officer-identity',
    image: '/works/slides/jiefang_identity-slide.png'
  },
  {
    workId: 'jiefangxing-app-visual-system',
    image: '/works/slides/jiefang_app-slide.png'
  }
];

export const featuredWork = works.find((work) => work.featured) ?? works[0];

export function getCategories() {
  return ['All', ...Array.from(new Set(works.map((work) => work.category))).sort()];
}
