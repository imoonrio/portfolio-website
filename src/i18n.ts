import type { WorkCategory } from './data/works';

export type Language = 'en' | 'zh';

export const categoryLabels: Record<Language, Record<WorkCategory | 'All', string>> = {
  en: {
    All: 'All',
    Branding: 'Branding',
    Design: 'Design',
    Photography: 'Photography',
    UI: 'UI'
  },
  zh: {
    All: '全部',
    Branding: '品牌',
    Design: '设计',
    Photography: '摄影',
    UI: '界面'
  }
};

export const copy = {
  en: {
    languageToggle: '中文',
    navLabel: 'Primary navigation',
    brandAria: 'YOUR NAME home',
    nav: {
      work: 'Work',
      about: 'About',
      contact: 'Contact'
    },
    hero: {
      eyebrow: 'Independent portfolio',
      title: 'Selected works with quiet confidence.',
      text: 'A living collection of recent visual systems, interface studies, and image-led projects.',
      featuredAria: 'Open featured project'
    },
    gallery: {
      aria: 'Work gallery',
      eyebrow: 'Work index',
      title: 'Recent projects',
      filtersAria: 'Work filters',
      empty: 'No works match this filter.',
      reset: 'Reset',
      openProject: 'Open project'
    },
    detail: {
      close: 'Close',
      closeAria: 'Close project details',
      link: 'View project'
    },
    about: {
      eyebrow: 'About',
      title: 'Carefully composed work for clear visual stories.',
      profile: 'Studio profile'
    },
    backToTop: 'Back to top'
  },
  zh: {
    languageToggle: 'EN',
    navLabel: '主导航',
    brandAria: 'YOUR NAME 首页',
    nav: {
      work: '作品',
      about: '关于',
      contact: '联系'
    },
    hero: {
      eyebrow: '个人作品集',
      title: '精选作品，以安静而笃定的方式呈现。',
      text: '这里持续收录近期的视觉系统、界面研究和以图像为核心的创作项目。',
      featuredAria: '打开精选项目'
    },
    gallery: {
      aria: '作品画廊',
      eyebrow: '作品索引',
      title: '近期项目',
      filtersAria: '作品筛选',
      empty: '没有匹配该分类的作品。',
      reset: '重置',
      openProject: '打开项目'
    },
    detail: {
      close: '关闭',
      closeAria: '关闭项目详情',
      link: '查看项目'
    },
    about: {
      eyebrow: '关于',
      title: '用克制的构图，为视觉叙事建立清晰秩序。',
      profile: '工作室主页'
    },
    backToTop: '返回顶部'
  }
} as const;
