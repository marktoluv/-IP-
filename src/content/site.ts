export type Lang = 'zh' | 'en';

export type WorkCategory = 'art' | 'motion' | 'concept';

type LocalizedText = Record<Lang, string>;

export type Work = {
  id: string;
  category: WorkCategory;
  image: string;
  video?: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
};

type ProfileEntry = {
  label: string;
  title: string;
  body: string;
};

type FeatureEntry = {
  id: 'video' | 'host' | 'ambassador' | 'content';
  title: string;
  description: string;
};

type CollaborationEntry = {
  id: 'brand' | 'production' | 'licensing';
  title: string;
  description: string;
};

export type SiteCopy = {
  brand: {
    name: string;
    latinName: string;
    descriptor: string;
  };
  nav: {
    home: string;
    profile: string;
    works: string;
    capabilities: string;
    collaboration: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    scrollHint: string;
    image: string;
    imageAlt: string;
  };
  profile: {
    eyebrow: string;
    title: string;
    introduction: string;
    identity: ProfileEntry;
    story: ProfileEntry;
    personality: ProfileEntry;
    coreValue: ProfileEntry;
    quote: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
    all: string;
    art: string;
    motion: string;
    concept: string;
    viewWork: string;
    conceptBadge: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    description: string;
    items: FeatureEntry[];
  };
  collaboration: {
    eyebrow: string;
    title: string;
    description: string;
    options: CollaborationEntry[];
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      demoNotice: string;
      submit: string;
      required: string;
      success: string;
    };
  };
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    backHome: string;
  };
  footer: {
    tagline: string;
    navigation: string;
    social: string;
    rights: string;
    backToTop: string;
  };
};

export const copy: Record<Lang, SiteCopy> = {
  zh: {
    brand: {
      name: '亦岚',
      latinName: 'EIRA',
      descriptor: '数字叙事艺术家',
    },
    nav: {
      home: '首页',
      profile: '人物档案',
      works: '作品',
      capabilities: '能力',
      collaboration: '合作',
      contact: '联系',
      openMenu: '打开导航',
      closeMenu: '关闭导航',
      switchLanguage: '切换至英文',
    },
    hero: {
      eyebrow: '写实数字人 IP · 数字叙事艺术家',
      title: '让情绪，拥有形状。',
      description:
        '亦岚 EIRA，来自记忆档案馆的中性数字人。以影像、声音与叙事，将难以言说的情绪变成可以被看见的世界。',
      primaryCta: '探索作品',
      secondaryCta: '认识亦岚',
      scrollHint: '向下探索',
      image: '/media/hero-eira.webp',
      imageAlt: '数字人亦岚的写实肖像',
    },
    profile: {
      eyebrow: '01 / 人物档案',
      title: '在真实与想象之间，留下人的温度。',
      introduction:
        '亦岚是一位写实、中性的数字叙事艺术家。TA 以人的情绪为原点，在技术与艺术之间构建可持续生长的身份。',
      identity: {
        label: '身份',
        title: '介于此刻与未来',
        body: '不是某个人的复制品，而是拥有独立审美、表达方式与故事的数字生命。',
      },
      story: {
        label: '世界观',
        title: '来自记忆档案馆',
        body: '亦岚穿行于被保存的片段：一束光、一段声音、一次告别。每一份记忆，都是新叙事的起点。',
      },
      personality: {
        label: '性格',
        title: '安静，敏锐，自由',
        body: '以观察代替喧哗，以温柔回应变化；在克制的表达中保留好奇与锋芒。',
      },
      coreValue: {
        label: '核心价值',
        title: '将情绪转化为影像',
        body: '用鲜明而可信的视觉语言，为创作者与品牌建立更有共鸣的连接。',
      },
      quote: '“我收藏那些还没有名字的感受。”',
    },
    portfolio: {
      eyebrow: '02 / 精选作品',
      title: '一座持续生长的视觉档案馆。',
      description: '从静态影像到动态叙事，探索亦岚不断变化的面貌。',
      all: '全部',
      art: '艺术影像',
      motion: '动态影像',
      concept: '商业概念',
      viewWork: '查看作品',
      conceptBadge: '概念作品',
    },
    capabilities: {
      eyebrow: '03 / 创作能力',
      title: '一个角色，多种表达。',
      description: '以统一的数字身份，适配不同媒介、场景与品牌语言。',
      items: [
        {
          id: 'video',
          title: '视频生成',
          description: '将创意脚本转化为有节奏、有情绪的数字影像。',
        },
        {
          id: 'host',
          title: '虚拟主播',
          description: '以稳定的角色形象与表达方式，连接直播、发布与互动场景。',
        },
        {
          id: 'ambassador',
          title: '品牌代言',
          description: '让品牌价值融入人物故事，建立可延展的视觉记忆。',
        },
        {
          id: 'content',
          title: '内容创作',
          description: '围绕主题持续产出摄影、短片与跨媒介叙事内容。',
        },
      ],
    },
    collaboration: {
      eyebrow: '04 / 商业合作',
      title: '让想象成为值得记住的合作。',
      description: '以亦岚的数字身份与创作语言，共同构建有辨识度的品牌内容。',
      options: [
        {
          id: 'brand',
          title: '品牌合作',
          description: '共创视觉企划、品牌故事与长期数字形象。',
        },
        {
          id: 'production',
          title: '广告制作',
          description: '面向发布、社交和展览场景制作影像内容。',
        },
        {
          id: 'licensing',
          title: '内容授权',
          description: '授权使用指定角色形象及已完成的原创视觉内容。',
        },
      ],
      cta: '发起合作',
    },
    contact: {
      eyebrow: '05 / 联系',
      title: '让我们从一个想法开始。',
      description: '分享你的品牌、项目或灵感，一起探索亦岚的下一种可能。',
      form: {
        name: '姓名',
        namePlaceholder: '如何称呼你',
        email: '电子邮箱',
        emailPlaceholder: 'name@company.com',
        company: '品牌 / 公司',
        companyPlaceholder: '你的团队或品牌名称',
        message: '项目想法',
        messagePlaceholder: '介绍你的想法、时间安排与合作需求',
        demoNotice: '演示模式：信息只在本地验证，不会发送或保存。',
        submit: '验证演示表单',
        required: '请填写必填信息',
        success: '验证通过。这是演示表单，信息未发送或保存。',
      },
    },
    notFound: {
      eyebrow: '404 / 页面未找到',
      title: '这段记忆尚未归档。',
      description: '你访问的页面可能已经移动，或从未存在。',
      backHome: '返回首页',
    },
    footer: {
      tagline: '收藏感受，重塑想象。',
      navigation: '导航',
      social: '关注亦岚',
      rights: '保留所有权利',
      backToTop: '返回顶部',
    },
  },
  en: {
    brand: {
      name: 'EIRA',
      latinName: 'EIRA',
      descriptor: 'Digital narrative artist',
    },
    nav: {
      home: 'Home',
      profile: 'The Persona',
      works: 'Works',
      capabilities: 'Capabilities',
      collaboration: 'Collaborate',
      contact: 'Contact',
      openMenu: 'Open navigation',
      closeMenu: 'Close navigation',
      switchLanguage: 'Switch to Chinese',
    },
    hero: {
      eyebrow: 'Realistic digital human IP · Narrative artist',
      title: 'Give emotion a form.',
      description:
        'EIRA is an androgynous digital human from the Archive of Memory. Through image, sound and story, they make the unspoken visible.',
      primaryCta: 'Explore the works',
      secondaryCta: 'Meet EIRA',
      scrollHint: 'Scroll to explore',
      image: '/media/hero-eira.webp',
      imageAlt: 'Realistic portrait of the digital human EIRA',
    },
    profile: {
      eyebrow: '01 / The Persona',
      title: 'A human pulse between reality and imagination.',
      introduction:
        'EIRA is a realistic, androgynous digital narrative artist. They begin with human emotion and build an evolving identity where technology meets art.',
      identity: {
        label: 'Identity',
        title: 'Between now and next',
        body: 'A digital being with an independent aesthetic, voice and story, rather than a replica of one person.',
      },
      story: {
        label: 'World',
        title: 'From the Archive of Memory',
        body: 'EIRA moves through preserved fragments: a beam of light, a voice, a farewell. Every memory becomes the beginning of a new story.',
      },
      personality: {
        label: 'Personality',
        title: 'Quiet, perceptive, free',
        body: 'They observe before they speak and meet change with tenderness, keeping curiosity and an edge within a restrained presence.',
      },
      coreValue: {
        label: 'Core value',
        title: 'Emotion into imagery',
        body: 'A distinctive and believable visual language that helps creators and brands form deeper connections.',
      },
      quote: '“I collect feelings that do not yet have names.”',
    },
    portfolio: {
      eyebrow: '02 / Selected Works',
      title: 'An ever-evolving visual archive.',
      description: 'From still images to moving stories, discover the many facets of EIRA.',
      all: 'All',
      art: 'Art imagery',
      motion: 'Motion',
      concept: 'Commercial concepts',
      viewWork: 'View work',
      conceptBadge: 'Concept project',
    },
    capabilities: {
      eyebrow: '03 / Capabilities',
      title: 'One identity. Many expressions.',
      description: 'A consistent digital persona across mediums, settings and brand languages.',
      items: [
        {
          id: 'video',
          title: 'Video generation',
          description: 'Turn creative scripts into digital films with rhythm and feeling.',
        },
        {
          id: 'host',
          title: 'Virtual hosting',
          description: 'Bring a consistent character and voice to live, launch and interactive settings.',
        },
        {
          id: 'ambassador',
          title: 'Brand ambassador',
          description: 'Weave brand values into the persona and create enduring visual memory.',
        },
        {
          id: 'content',
          title: 'Content creation',
          description: 'Create photography, short films and cross-media stories around a theme.',
        },
      ],
    },
    collaboration: {
      eyebrow: '04 / Collaborations',
      title: 'Make imagination worth remembering.',
      description: 'Build distinctive brand content through EIRA’s digital identity and creative language.',
      options: [
        {
          id: 'brand',
          title: 'Brand partnerships',
          description: 'Co-create visual campaigns, brand stories and lasting digital identities.',
        },
        {
          id: 'production',
          title: 'Advertising production',
          description: 'Produce visual content for launches, social platforms and exhibitions.',
        },
        {
          id: 'licensing',
          title: 'Content licensing',
          description: 'License selected character imagery and completed original visual works.',
        },
      ],
      cta: 'Start a collaboration',
    },
    contact: {
      eyebrow: '05 / Contact',
      title: 'It starts with an idea.',
      description: 'Share your brand, project or spark of inspiration. Let us imagine what EIRA could become next.',
      form: {
        name: 'Name',
        namePlaceholder: 'What should we call you?',
        email: 'Email',
        emailPlaceholder: 'name@company.com',
        company: 'Brand / company',
        companyPlaceholder: 'Your team or brand name',
        message: 'Project idea',
        messagePlaceholder: 'Tell us about the idea, timeline and collaboration you have in mind',
        demoNotice: 'Demo mode: Information is validated locally and is not sent or saved.',
        submit: 'Validate demo form',
        required: 'Please complete the required fields',
        success: 'Validation complete. Nothing was sent or saved.',
      },
    },
    notFound: {
      eyebrow: '404 / Page not found',
      title: 'This memory has not been archived.',
      description: 'The page may have moved, or it may never have existed.',
      backHome: 'Back to home',
    },
    footer: {
      tagline: 'Collect feeling. Reimagine possibility.',
      navigation: 'Navigation',
      social: 'Follow EIRA',
      rights: 'All rights reserved',
      backToTop: 'Back to top',
    },
  },
};

export const works: Work[] = [
  {
    id: 'origin-portrait',
    category: 'art',
    image: '/media/origin-portrait.webp',
    title: { zh: '原点肖像', en: 'Portrait of an Origin' },
    subtitle: { zh: '数字肖像 · 2026', en: 'Digital portrait · 2026' },
    description: {
      zh: '一次关于身份的凝视：亦岚在光与阴影之间，第一次看向镜头。',
      en: 'A study of identity: EIRA meets the camera for the first time between light and shadow.',
    },
  },
  {
    id: 'after-light',
    category: 'art',
    image: '/media/after-light.webp',
    title: { zh: '余光之后', en: 'After the Light' },
    subtitle: { zh: '艺术影像 · 2026', en: 'Art imagery · 2026' },
    description: {
      zh: '当一束光离开，记忆仍在皮肤与空间里缓慢回响。',
      en: 'After light departs, memory continues to echo across skin and space.',
    },
  },
  {
    id: 'soft-machines',
    category: 'art',
    image: '/media/soft-machines.webp',
    title: { zh: '柔软的机器', en: 'Soft Machines' },
    subtitle: { zh: '视觉实验 · 2026', en: 'Visual experiment · 2026' },
    description: {
      zh: '以细腻的材质与克制的科技线索，想象数字生命的触感。',
      en: 'Subtle textures and restrained technological cues imagine the feeling of digital life.',
    },
  },
  {
    id: 'motion-01',
    category: 'motion',
    image: '/media/motion-01.webp',
    video: '/media/eira-motion.webm',
    title: { zh: '记忆有形', en: 'Memory in Motion' },
    subtitle: { zh: '动态影像 · 2026', en: 'Motion study · 2026' },
    description: {
      zh: '亦岚在呼吸、回望与微小的动作中，让一段记忆逐渐显形。',
      en: 'Through breath, a glance and subtle movement, EIRA lets a memory take shape.',
    },
  },
  {
    id: 'aura-objects',
    category: 'concept',
    image: '/media/aura-objects.webp',
    title: { zh: '气息之物', en: 'Objects of Aura' },
    subtitle: { zh: '概念作品 · 香氛视觉企划', en: 'Concept project · Fragrance visual direction' },
    description: {
      zh: '为虚构香氛品牌构思的视觉叙事。概念作品，仅用于呈现亦岚在品牌合作中的创作方向。',
      en: 'A visual story for a fictional fragrance house. Concept project showing EIRA’s creative direction for brand collaboration.',
    },
  },
  {
    id: 'atelier-zero',
    category: 'concept',
    image: '/media/atelier-zero.webp',
    title: { zh: '零号工坊', en: 'Atelier Zero' },
    subtitle: { zh: '概念作品 · 时装影像企划', en: 'Concept project · Fashion film direction' },
    description: {
      zh: '为虚构时装企划创作的人物与服装影像。概念作品，仅用于展示数字人代言与内容创作的可能性。',
      en: 'Character and fashion imagery for a fictional label. Concept project illustrating possibilities in digital ambassadorship and content creation.',
    },
  },
];
