export type Locale = "zh" | "en";

export type Localized = Record<Locale, string>;

export type ExperienceKind = "research" | "internship" | "project";

export interface Experience {
  id: string;
  kind: ExperienceKind;
  title: Localized;
  organization: Localized;
  role: Localized;
  period: Localized;
  summary: Localized;
  bullets: Record<Locale, string[]>;
  tags: string[];
  link?: string;
}

export interface SkillGroup {
  name: Localized;
  items: string[];
}

export interface Note {
  id: string;
  title: Localized;
  summary: Localized;
  tags: string[];
  status: Localized;
}

export const profile = {
  name: {
    zh: "陈应斌",
    en: "Yingbin Chen",
  },
  location: {
    zh: "深圳",
    en: "Shenzhen, China",
  },
  email: "chenyingbinn@163.com",
  headline: {
    zh: "金融科技、商业分析与大数据会计交叉方向的候选人",
    en: "FinTech, business analytics, and data-driven accounting candidate",
  },
  intro: {
    zh: "哈尔滨工业大学（深圳）会计学（大数据会计方向）本科生，关注机器学习在金融决策、资金风控与数据产品运营中的应用。拥有 SSCI 一区论文、ESG 书稿、跨境支付财务对账和数据交易平台运营经历。",
    en: "B.B.A. candidate in Accounting with a Big Data Accounting focus at Harbin Institute of Technology, Shenzhen. I work across interpretable machine learning, financial decision-making, reconciliation workflows, and data product operations.",
  },
  interests: {
    zh: ["金融科技", "商业分析", "会计与金融交叉", "可解释机器学习"],
    en: ["FinTech", "Business Analytics", "Accounting-Finance", "Interpretable ML"],
  },
  education: {
    school: {
      zh: "哈尔滨工业大学（深圳）",
      en: "Harbin Institute of Technology, Shenzhen",
    },
    degree: {
      zh: "经济管理学院 · 会计学（大数据会计方向）",
      en: "School of Economics and Management · B.B.A. in Accounting",
    },
    period: {
      zh: "2023.08 - 2027.07（预计）",
      en: "Aug. 2023 - Jul. 2027 Expected",
    },
    facts: [
      { label: { zh: "GPA", en: "GPA" }, value: "3.53 / 4.0" },
      { label: { zh: "专业排名", en: "Ranking" }, value: "17 / 76" },
      { label: { zh: "CET-6", en: "CET-6" }, value: "525" },
    ],
    coursework: {
      zh: "Python 数据分析、数据库原理与应用、机器学习应用、统计学、会计学相关课程",
      en: "Python Data Analysis, Database Principles and Applications, Machine Learning Applications, Statistics, Accounting-related Courses",
    },
  },
  metrics: [
    {
      value: "SSCI Q1",
      label: {
        zh: "Pacific-Basin Finance Journal 论文第三作者",
        en: "Third author in Pacific-Basin Finance Journal",
      },
    },
    {
      value: "5+",
      label: {
        zh: "需求文档与深度访谈沉淀",
        en: "Requirement documents and stakeholder interviews",
      },
    },
    {
      value: "2",
      label: {
        zh: "数据 API 产品优化参与",
        en: "Data API product optimizations supported",
      },
    },
    {
      value: "TOP3",
      label: {
        zh: "高频需求行业识别",
        en: "High-frequency demand industries identified",
      },
    },
  ],
  experiences: [
    {
      id: "fof-ml",
      kind: "research",
      title: {
        zh: "FOF Solution Selection and Application Using Interpretable Machine Learning Models",
        en: "FOF Solution Selection and Application Using Interpretable Machine Learning Models",
      },
      organization: {
        zh: "Pacific-Basin Finance Journal（SSCI 一区，Elsevier）",
        en: "Pacific-Basin Finance Journal (SSCI Q1, Elsevier)",
      },
      role: {
        zh: "第三作者",
        en: "Third Author",
      },
      period: {
        zh: "2026",
        en: "2026",
      },
      summary: {
        zh: "围绕 FOF 组合构建与基金筛选，使用 XGBoost 与 SHAP 搭建可解释机器学习框架。",
        en: "Built an interpretable machine learning framework for fund screening and FOF portfolio construction using XGBoost and SHAP.",
      },
      bullets: {
        zh: [
          "负责机器学习部分的原理梳理与建模实现，覆盖数据清洗、特征工程、样本平衡、参数优化、模型评估与结果可视化。",
          "将模型输出与资产配置、风险收益权衡等金融理论结合，参与英文论文写作、修改与实证验证。",
        ],
        en: [
          "Owned machine learning implementation across data cleaning, feature engineering, sample balancing, parameter tuning, model evaluation, and visualization.",
          "Connected model outputs with asset allocation and risk-return theory while contributing to English manuscript writing and revision.",
        ],
      },
      tags: ["XGBoost", "SHAP", "FOF", "Finance"],
      link: "https://doi.org/10.1016/j.pacfin.2026.103198",
    },
    {
      id: "esg-book",
      kind: "research",
      title: {
        zh: "Towards A Multi-stakeholder Collaborated ESG Ecosystem: A Shenzhen Perspective",
        en: "Towards A Multi-stakeholder Collaborated ESG Ecosystem: A Shenzhen Perspective",
      },
      organization: {
        zh: "ESG 方向书稿",
        en: "ESG Book Project",
      },
      role: {
        zh: "主要撰写成员",
        en: "Major Contributor",
      },
      period: {
        zh: "已出版",
        en: "Published",
      },
      summary: {
        zh: "从深圳产业结构、资本市场与可持续发展实践出发，分析 ESG 生态体系与多利益相关者协同机制。",
        en: "Analyzed Shenzhen's ESG ecosystem through industry structure, capital markets, sustainable development, and multi-stakeholder collaboration.",
      },
      bullets: {
        zh: [
          "调研国内外 ESG 发展现状，比较不同地区 ESG 实践模式与制度环境。",
          "参与文献综述、案例分析与章节撰写，提出面向深圳实践的 ESG 生态优化建议。",
        ],
        en: [
          "Researched ESG practices across China and global markets, comparing regional practices and institutional environments.",
          "Contributed to literature review, case analysis, and chapter writing with recommendations for Shenzhen's ESG ecosystem.",
        ],
      },
      tags: ["ESG", "Research", "Case Study"],
    },
    {
      id: "photonpay",
      kind: "internship",
      title: {
        zh: "深圳光子跃动科技有限公司（PhotonPay）",
        en: "PhotonPay",
      },
      organization: {
        zh: "财务部 Funds and Reconciliation",
        en: "Funds and Reconciliation Department",
      },
      role: {
        zh: "财务实习生",
        en: "Finance Intern",
      },
      period: {
        zh: "2026.03 - 2026.06",
        en: "Mar. 2026 - Jun. 2026",
      },
      summary: {
        zh: "参与跨境支付业务资金对账，理解资金流、业务流与财务流程之间的连接。",
        en: "Supported reconciliation for cross-border payment transactions and deepened understanding of fund flows, business flows, and finance processes.",
      },
      bullets: {
        zh: [
          "协助核对平台交易记录、银行流水及内部系统数据，支持资金结算与 reconciliation 流程。",
          "识别并跟进交易差异、资金异常及数据不一致问题，整理资金流转数据与对账结果。",
        ],
        en: [
          "Verified platform transaction records, bank statements, and internal system data to support fund settlement and reconciliation workflows.",
          "Followed up on reconciliation discrepancies, fund exceptions, and data inconsistencies while organizing fund flow records.",
        ],
      },
      tags: ["Reconciliation", "Cross-border Payment", "Finance Ops"],
    },
    {
      id: "sde",
      kind: "internship",
      title: {
        zh: "深圳数据交易所",
        en: "Shenzhen Data Exchange",
      },
      organization: {
        zh: "市场发展部",
        en: "Market Development Department",
      },
      role: {
        zh: "数据产品运营实习生",
        en: "Data Product Operations Intern",
      },
      period: {
        zh: "2025.06 - 2025.09",
        en: "Jun. 2025 - Sep. 2025",
      },
      summary: {
        zh: "参与数据产品上架与运营，连接数据供需、竞品分析和交易数据洞察。",
        en: "Supported data product listing and operations by connecting demand discovery, competitor analysis, and transaction data insight.",
      },
      bullets: {
        zh: [
          "梳理数据供需双方需求，形成需求文档 5 份，推动 2 个数据 API 产品功能优化。",
          "对比分析 3 家主流数据交易平台的定价机制与产品结构，输出竞品分析报告。",
          "使用 Python pandas 清洗并可视化平台交易数据，识别高频需求行业 TOP3。",
        ],
        en: [
          "Prepared 5 requirement documents and contributed to 2 data API product optimizations.",
          "Compared pricing mechanisms and product structures across 3 major data trading platforms.",
          "Used Python pandas to clean and visualize transaction data, identifying the top 3 high-frequency demand industries.",
        ],
      },
      tags: ["Python", "Data Products", "Market Analysis"],
    },
    {
      id: "risk-id",
      kind: "project",
      title: {
        zh: "金融交易风险识别：用户研究与模型功能设计",
        en: "Financial Transaction Risk Identification: User Research and Model Design",
      },
      organization: {
        zh: "小组项目",
        en: "Team Project",
      },
      role: {
        zh: "小组负责人",
        en: "Team Leader",
      },
      period: {
        zh: "2024.06 - 2025.01",
        en: "Jun. 2024 - Jan. 2025",
      },
      summary: {
        zh: "围绕金融平台交易异常识别，设计机器学习异常检测功能原型与模型评估框架。",
        en: "Designed a machine-learning-based anomaly detection prototype and evaluation framework for abnormal financial platform transactions.",
      },
      bullets: {
        zh: [
          "对风控相关人员开展 5 次深度访谈，识别交易异常预警核心痛点。",
          "撰写产品功能说明文档，涵盖数据流、模型触发逻辑与人工复核流程。",
          "使用混淆矩阵分析召回率与误报率之间的权衡，并提出优化建议。",
        ],
        en: [
          "Conducted 5 interviews with risk control personnel to identify pain points in transaction anomaly alerts.",
          "Drafted function documentation covering data flow, model trigger logic, and manual review workflows.",
          "Used confusion matrix analysis to evaluate recall and false positive tradeoffs and propose optimization ideas.",
        ],
      },
      tags: ["Risk Control", "Product Design", "Model Evaluation"],
    },
  ] satisfies Experience[],
  skillGroups: [
    {
      name: { zh: "数据与建模", en: "Data & Modeling" },
      items: ["Python", "pandas", "matplotlib", "SQL", "MySQL", "XGBoost", "SHAP", "Feature Engineering"],
    },
    {
      name: { zh: "财务与分析", en: "Finance & Analytics" },
      items: ["Reconciliation", "Excel", "Pivot Tables", "Business Analytics", "Empirical Research"],
    },
    {
      name: { zh: "研究与工具", en: "Research & Tools" },
      items: ["Literature Review", "Academic Writing", "Case Analysis", "ChatGPT", "Claude", "Kimi", "Cursor"],
    },
    {
      name: { zh: "语言能力", en: "Languages" },
      items: ["Mandarin Native", "English CET-6 525"],
    },
  ] satisfies SkillGroup[],
  honors: [
    {
      zh: "中国国际大学生创新创业大赛 · 省级银奖 | 金融 AI 反欺诈模型构建",
      en: "Provincial Silver Award, China International College Students' Innovation Competition | Financial AI Anti-fraud Model",
    },
    {
      zh: "“正大杯”市场调研大赛 · 省级二等奖",
      en: "Provincial Second Prize, Zhengda Cup Market Research Competition",
    },
    {
      zh: "校级优秀学生 | 2024 - 2025 学年、校级二等奖学金",
      en: "Outstanding Student, HIT Shenzhen, 2024-2025; University Second-class Scholarship",
    },
  ],
  notes: [
    {
      id: "accounting-ai-era",
      title: {
        zh: "AI 时代，会计为什么仍然重要",
        en: "Why Accounting Still Matters in the AI Era",
      },
      summary: {
        zh: "会计不只是记录数字，也是在解释经济活动、组织规则和商业判断。AI 可以提高效率，但人的专业判断仍然重要。",
        en: "Accounting is not only about recording numbers; it is also about interpreting economic activities, rules, and business judgment. AI can improve efficiency, but professional judgment remains essential.",
      },
      tags: ["Accounting", "AI", "Judgment"],
      status: {
        zh: "笔记",
        en: "Notes",
      },
    },
    {
      id: "career-narrative-finance-data-ai",
      title: {
        zh: "如何围绕金融、数据与 AI 重建职业叙事",
        en: "Building My Career Narrative Around Finance, Data, and AI",
      },
      summary: {
        zh: "从会计金融基础、SSCI 论文、跨境支付实习到数据产品运营，我正在重新理解自己的职业主线。",
        en: "From accounting and finance foundations to SSCI research, cross-border payment experience, and data product operations, I am rebuilding my career narrative around finance, data, and AI.",
      },
      tags: ["Career Narrative", "FinTech", "Data"],
      status: {
        zh: "笔记",
        en: "Notes",
      },
    },
    {
      id: "data-to-decisions",
      title: {
        zh: "数据如何把商业问题转化为决策",
        en: "How Data Turns Business Problems into Decisions",
      },
      summary: {
        zh: "无论是 FOF 基金筛选、数据产品运营，还是金融交易风险识别，数据的价值都在于帮助人做出更好的判断。",
        en: "Whether in FOF fund screening, data product operations, or financial transaction risk identification, the value of data lies in helping people make better decisions.",
      },
      tags: ["Data Analytics", "Decision Making", "Business"],
      status: {
        zh: "笔记",
        en: "Notes",
      },
    },
    {
      id: "gamer-to-product-observer",
      title: {
        zh: "从玩家到产品观察者",
        en: "From Gamer to Product Observer",
      },
      summary: {
        zh: "我长期关注游戏产品，也希望把玩家体验转化为对用户体验、运营机制、内容生态和产品设计的观察。",
        en: "As a long-time game player, I hope to transform player experience into observations on user experience, operation mechanisms, content ecosystems, and product design.",
      },
      tags: ["Product Thinking", "User Experience", "Games"],
      status: {
        zh: "产品笔记",
        en: "Product Note",
      },
    },
    {
      id: "valorant-product-analysis",
      title: {
        zh: "无畏契约产品分析：从玩家体验到产品策略",
        en: "VALORANT Product Analysis: From Player Experience to Product Strategy",
      },
      summary: {
        zh: "基于长期玩家体验，我从产品设计、国服本地化、商业化体系、竞品对比和 AI 赋能规划等角度分析《无畏契约》的产品逻辑。",
        en: "Based on long-term VALORANT gameplay experience, I analyze its product logic from product design, localization, monetization, competition, and AI-driven strategy perspectives.",
      },
      tags: ["Game Product", "User Experience", "AI Strategy"],
      status: {
        zh: "精选产品分析",
        en: "Selected Product Analysis",
      },
    },
  ] satisfies Note[],
};

export const labels = {
  zh: {
    nav: ["概览", "研究", "经历", "能力", "思考", "联系"],
    language: "EN",
    contact: "邮件联系",
    education: "学术基础",
    coursework: "核心课程",
    highlights: "关键亮点",
    timeline: "经历时间线",
    filters: {
      all: "全部",
      research: "科研",
      internship: "实习",
      project: "项目",
    },
    details: "查看细节",
    publication: "论文链接",
    skills: "技能矩阵",
    honors: "荣誉奖项",
    contactTitle: "把数据、金融流程与可解释模型连接起来",
    contactBody: "欢迎就金融科技、商业分析、数据产品运营、财务数据分析和研究合作机会联系我。",
    privacy: "公开页面仅展示邮箱，去敏简历不包含手机号。",
  },
  en: {
    nav: ["Overview", "Research", "Experience", "Capabilities", "Notes", "Contact"],
    language: "中",
    contact: "Email me",
    education: "Academic Foundation",
    coursework: "Relevant coursework",
    highlights: "Key highlights",
    timeline: "Experience timeline",
    filters: {
      all: "All",
      research: "Research",
      internship: "Internship",
      project: "Project",
    },
    details: "View details",
    publication: "Publication link",
    skills: "Skill matrix",
    honors: "Honors",
    contactTitle: "Connecting data, finance workflows, and interpretable models",
    contactBody: "Open to opportunities in FinTech, business analytics, data product operations, financial data analysis, and research collaboration.",
    privacy: "This public site displays email only; redacted resumes do not include a phone number.",
  },
} satisfies Record<Locale, Record<string, unknown>>;
