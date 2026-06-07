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
    zh: "连接金融流程、数据模型与商业判断的跨学科探索者",
    en: "Exploring the intersection of finance workflows, data models, and business judgment",
  },
  intro: {
    zh: "我以会计与金融为基础，关注机器学习、数据分析与业务流程如何共同影响真实商业决策。当前经历横跨可解释机器学习研究、ESG 生态分析、跨境支付清结算与数据产品运营。",
    en: "My work connects accounting and finance foundations with interpretable machine learning, ESG research, cross-border payment reconciliation, and data product operations. I am interested in how data models and business contexts jointly shape better decisions.",
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
      {
        label: { zh: "学术方向", en: "Academic Focus" },
        value: "Accounting & Finance × Data Analytics × Interpretable ML",
      },
    ],
    coursework: {
      zh: "会计与金融基础、统计与数据库、Python 数据分析、机器学习应用与实证研究方法",
      en: "Accounting and finance foundations, statistics and databases, Python-based data analysis, machine learning applications, and empirical research methods",
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
        zh: "在跨境支付与财务运营场景中，参与清结算、国际渠道手工入账、调账复核、基础会计审核与出纳支持，关注资金流、信息流与账务记录之间的一致性。",
        en: "Worked across cross-border payment reconciliation and finance operations, focusing on the consistency between fund flows, transaction information, and accounting records.",
      },
      bullets: {
        zh: [
          "围绕 BV、DBS 等国际渠道手工入账，核对渠道文件、资金流与系统交易信息，并根据双边信息整理可录入系统的入账文件。",
          "参与支付审核、扣费及收款手续费退费等调账复核，协助跟进支付失败、退票、入账时间差等异常场景，并及时同步 mentor 与运营团队。",
          "支持基础财务与出纳工作，包括单据管理、报销审核、国内对公/对私转账、部分外币转账及账户间资金调拨；整理多币种汇率数据以支撑产品手续费收取。",
        ],
        en: [
          "Reviewed manual entry files for international channels such as BV and DBS, cross-checking channel records, fund movements, and system transaction information before preparing entry files for internal processing.",
          "Supported payment review and adjustment checks for deductions and fee refunds, while helping follow up on exceptions such as payment failures, returned transactions, and timing differences between fund flows and system records.",
          "Assisted with accounting and treasury operations, including document management, reimbursement review, domestic transfers, selected foreign-currency payments, account-level fund allocation, and multi-currency FX data support for product fees.",
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
        zh: "参与数据产品上架与需求运营，接触金融、医疗、公共数据等行业场景及数据资产 ABS 前期对接，关注数据字段、接口说明、客户需求与交付方式之间的匹配。",
        en: "Supported data product listing and demand operations across scenarios such as finance, healthcare, public data, and preliminary data-asset ABS discussions, focusing on the alignment between data fields, API documentation, customer needs, and delivery methods.",
      },
      bullets: {
        zh: [
          "分类整理并更新客户需求文档，将分散需求沉淀为产品方向、字段需求、接口说明和后续优化线索。",
          "推动数据 API 产品的字段补充与接口说明优化，跟进客户后续需求并同步给产品与业务团队。",
          "使用 Python 对平台交易与需求数据进行清洗、统计和可视化，识别高频需求行业与数据产品机会，辅助平台运营判断。",
        ],
        en: [
          "Classified and updated customer demand documents, translating scattered requests into product directions, field requirements, API documentation needs, and follow-up optimization clues.",
          "Helped improve data API products by supplementing fields, refining interface descriptions, collecting follow-up customer needs, and synchronizing them with product and business teams.",
          "Used Python to clean, summarize, and visualize platform transaction and demand data, identifying high-frequency demand industries and potential data product opportunities for operational decision-making.",
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
        zh: "作为小组负责人，围绕金融交易反欺诈场景，结合从业者访谈、特征工程、机器学习建模与系统化应用方案，探索如何把交易数据转化为可执行的风控判断。",
        en: "Led a team project on financial transaction anti-fraud, connecting practitioner interviews, feature engineering, machine learning models, and system-level application design to translate transaction data into actionable risk-control judgments.",
      },
      bullets: {
        zh: [
          "基于约 104.86 万笔交易样本与极度不平衡的欺诈标签分布，参与数据清洗、探索性分析、衍生特征构建、特征筛选与 SMOTE 处理。",
          "比较 Logistic 回归、决策树与 XGBoost 等模型，使用 AUC、Recall、F2 等指标评估欺诈识别效果，并将模型选择与不同资源约束和业务场景对应。",
          "结合银行从业人员访谈，设计智能风控系统化应用思路，将模型评分与规则引擎、异常检测和人工审核结合为反欺诈闭环，形成模型方案与应用设计并获得相关竞赛认可。",
        ],
        en: [
          "Worked with approximately 1.05 million transaction records and a highly imbalanced fraud-label distribution, covering data cleaning, exploratory analysis, derived feature construction, feature selection, and SMOTE-based resampling.",
          "Compared Logistic Regression, Decision Tree, and XGBoost models using AUC, Recall, and F2-oriented evaluation, linking model choice to different resource constraints and business scenarios.",
          "Incorporated interviews with banking practitioners into a system-level risk-control design, combining model scoring with rule engines, anomaly detection, and manual review as an anti-fraud decision loop, with related competition recognition.",
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
      items: ["Mandarin Native", "English academic reading & writing"],
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
    education: "学术根基",
    coursework: "知识基础",
    highlights: "代表性信号",
    timeline: "实践路径",
    filters: {
      all: "全部",
      research: "科研",
      internship: "实习",
      project: "项目",
    },
    details: "查看细节",
    publication: "论文链接",
    skills: "能力结构",
    honors: "外部认可",
    contactTitle: "让金融流程、数据模型与商业判断形成连接",
    contactBody: "欢迎就金融科技、商业分析、数据产品运营、财务数据分析和研究合作机会联系我。",
    privacy: "公开页面仅展示邮箱，不包含手机号、个人敏感材料或完整简历文件。",
  },
  en: {
    nav: ["Overview", "Research", "Experience", "Capabilities", "Notes", "Contact"],
    language: "中",
    contact: "Email me",
    education: "Academic Grounding",
    coursework: "Knowledge Base",
    highlights: "Representative Signals",
    timeline: "Practice Path",
    filters: {
      all: "All",
      research: "Research",
      internship: "Internship",
      project: "Project",
    },
    details: "View details",
    publication: "Publication link",
    skills: "Capability Map",
    honors: "Recognition",
    contactTitle: "Connecting finance workflows, data models, and business judgment",
    contactBody: "Open to opportunities in FinTech, business analytics, data product operations, financial data analysis, and research collaboration.",
    privacy: "This public site displays email only and does not include phone numbers, sensitive personal materials, or full resume files.",
  },
} satisfies Record<Locale, Record<string, unknown>>;
