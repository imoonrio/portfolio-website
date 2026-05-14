import type { WorkCategory } from './data/works';

export type Language = 'en' | 'zh';

export const categoryLabels: Record<Language, Record<WorkCategory | 'All', string>> = {
  en: {
    All: 'All',
    Brand: 'Brand',
    Campaign: 'Campaign',
    Digital: 'Digital',
    Event: 'Event',
    Print: 'Print'
  },
  zh: {
    All: '全部',
    Brand: '品牌视觉',
    Campaign: '活动传播',
    Digital: '数字体验',
    Event: '线下活动',
    Print: '印刷物料'
  }
};

export const copy = {
  en: {
    languageToggle: '中文',
    navLabel: 'Primary navigation',
    floatingNavLabel: 'Fixed scroll navigation',
    brandAria: 'YOUR NAME home',
    nav: {
      home: 'Home',
      work: 'Work',
      about: 'About',
      contact: 'Contact'
    },
    hero: {
      eyebrow: 'Independent portfolio',
      title: 'Selected works',
      text: 'Presented with quiet confidence.',
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
      link: 'View project',
      previousImage: 'Previous image',
      nextImage: 'Next image',
      previousProject: 'Previous project',
      nextProject: 'Next project',
      viewDetails: 'View details',
      backToWorks: 'Back to works'
    },
    about: {
      eyebrow: 'About',
      title: 'Visual Designer',
      subtitle: 'Focused on brand communication, digital interfaces, and offline event visual systems.',
      intro:
        'A multidisciplinary visual designer with an art and design background, focused on automotive and mobility-related brand communication. The work spans campaign key visuals, social content systems, event materials, digital interfaces, and responsive website experiences.',
      portraitAria: 'Virtual profile character',
      profile: 'Studio profile',
      summary: [
        { label: 'Focus', value: 'Brand communication / Digital interface / Event visual system' },
        { label: 'Role', value: 'Design direction, visual execution, cross-functional collaboration' },
        { label: 'Strength', value: 'Translating business goals into structured, production-ready visual systems' }
      ],
      skillsTitle: 'Professional skills',
      skills: [
        'Key visual design and campaign visual systems',
        'WeChat longform, social posters, and content operation design',
        'Website, app, e-commerce, and responsive interface design',
        'Offline event materials, exhibition graphics, brochures, and VI guidelines',
        'Design planning, delivery management, and team communication'
      ],
      experienceTitle: 'Project experience',
      experiences: [
        {
          title: 'Automotive brand communication',
          text:
            'Led visual design for official social channels, seasonal campaigns, online posters, brand announcements, and internal/external communication materials.'
        },
        {
          title: 'Offline events and launch systems',
          text:
            'Created key visuals and extended production materials for launches, test drive events, conferences, exhibitions, vehicle displays, and guest-facing touchpoints.'
        },
        {
          title: 'Digital product and website design',
          text:
            'Designed official website pages, mobile interfaces, app and e-commerce screens, and responsive layouts with attention to information architecture and usability.'
        }
      ],
      contactTitle: 'Contact'
    },
    backToTop: 'Back to top'
  },
  zh: {
    languageToggle: 'EN',
    navLabel: '主导航',
    floatingNavLabel: '滚动固定导航',
    brandAria: 'YOUR NAME 首页',
    nav: {
      home: '首页',
      work: '作品',
      about: '关于',
      contact: '联系'
    },
    hero: {
      eyebrow: '个人作品集',
      title: '精选作品',
      text: '以安静而笃定的方式呈现。',
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
      link: '查看项目',
      previousImage: '上一张',
      nextImage: '下一张',
      previousProject: '上一个项目',
      nextProject: '下一个项目',
      viewDetails: '查看详情',
      backToWorks: '返回作品列表'
    },
    about: {
      eyebrow: '关于',
      title: '视觉设计师',
      subtitle: '专注品牌传播、数字界面与线下活动视觉系统。',
      intro:
        '具备美术与设计专业背景，长期服务于汽车及出行相关品牌的商业视觉项目。工作内容覆盖品牌主视觉、社交媒体长图文、节日热点海报、线下活动物料、数字界面、响应式网站与 VI 规范等方向。',
      portraitAria: '虚拟人物形象',
      profile: '工作室主页',
      summary: [
        { label: '核心方向', value: '品牌传播 / 数字界面 / 活动视觉系统' },
        { label: '角色能力', value: '设计统筹、视觉执行、跨团队协作' },
        { label: '专业优势', value: '将业务目标转译为清晰、有秩序、可落地的视觉方案' }
      ],
      skillsTitle: '专业技能',
      skills: [
        '品牌 KV、活动主视觉与整合传播视觉系统',
        '微信公众号长图文、朋友圈海报、节日节气与热点传播设计',
        '官网、App、电商平台与响应式页面视觉设计',
        '线下会展物料、展架海报、画册折页、VI 规范及延展物料',
        '设计计划制定、交付管理、团队沟通与项目协作'
      ],
      experienceTitle: '项目经历',
      experiences: [
        {
          title: '汽车品牌传播设计',
          text:
            '负责官方社交平台、品牌活动、节日热点、线上海报与企业内外部传播物料的视觉设计，建立稳定且可持续的内容表达方式。'
        },
        {
          title: '线下活动与发布会视觉系统',
          text:
            '完成新品上市、试驾、商演、会展及车辆展示相关的主视觉、会旗、展架、画册、文创与现场物料延展设计。'
        },
        {
          title: '数字产品与网站设计',
          text:
            '参与官网、移动端页面、App、电商平台及响应式页面设计，关注信息架构、页面布局、视觉一致性与上线落地。'
        }
      ],
      contactTitle: '联系方式'
    },
    backToTop: '返回顶部'
  }
} as const;
