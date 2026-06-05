import { useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowUpRight,
  BarChart3,
  BookOpenText,
  BriefcaseBusiness,
  Clock3,
  FileText,
  Filter,
  GraduationCap,
  Languages,
  Mail,
  Medal,
  Network,
  Sparkles,
  Target,
} from "lucide-react";
import { Experience, ExperienceKind, labels, Locale, profile } from "./profile";

type FilterKind = "all" | ExperienceKind;

const filterOrder: FilterKind[] = ["all", "research", "internship", "project"];
const sectionIds = ["overview", "academic-research", "experience", "capabilities", "notes", "contact"] as const;
const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const chapterCopy = {
  zh: {
    academicLabel: "Chapter 02 / 学术与研究",
    academicTitle: "Academic Foundation + Featured Research",
    academicDeck: "从会计与大数据会计基础出发，延展到可解释机器学习、FOF 基金筛选与城市 ESG 观察。",
    fieldLabel: "Chapter 03 / 经历索引",
    fieldTitle: "经历索引",
    fieldDeck: "把研究、支付清结算、数据产品运营与风险识别放在同一条经历索引中，观察数据如何进入真实业务现场。",
    notesLabel: "Chapter 04 / 思考档案",
    notesTitle: "Notes / Reflections",
    notesDeck:
      "一些关于金融、数据、AI、职业叙事和产品观察的短札。它们不是主轴，但帮助呈现我如何把经历整理成判断。",
    capabilitiesLabel: "Chapter 05 / 能力收束",
    capabilitiesTitle: "Capabilities + Contact",
    capabilitiesDeck: "用能力矩阵、荣誉记录和邮箱入口，收束到可以继续对话的地方。",
  },
  en: {
    academicLabel: "Chapter 02 / Academic & Research",
    academicTitle: "Academic Foundation + Featured Research",
    academicDeck:
      "A bridge from accounting and big data accounting foundations to interpretable machine learning, FOF selection, and Shenzhen ESG research.",
    fieldLabel: "Chapter 03 / Experience Index",
    fieldTitle: "Experience Index",
    fieldDeck:
      "Connecting research, payment clearing, data product operations, and risk identification into one experience index, observing how data enters real business contexts.",
    notesLabel: "Chapter 04 / Thinking Archive",
    notesTitle: "Notes / Reflections",
    notesDeck:
      "Short notes on finance, data, AI, career narrative, and product observation. They are not the main axis, but they show how I turn experience into judgment.",
    capabilitiesLabel: "Chapter 05 / Closing Layer",
    capabilitiesTitle: "Capabilities + Contact",
    capabilitiesDeck: "A final layer of skills, honors, and contact for continuing the conversation.",
  },
} satisfies Record<Locale, Record<string, string>>;

const heroContent = {
  zh: {
    kicker: "在金融、数据与人的判断之间",
    title: ["金融、数据", "与人的判断"],
    subtitle: "我关注金融系统、数据模型与人的判断如何共同影响真实商业决策。",
    intro:
      "会计与金融基础、机器学习研究、跨境支付清结算和数据产品运营经验，共同构成我理解商业决策的一条线索。",
    tags: ["FinTech", "Business Analytics", "Data-driven Finance", "Accounting x AI", "Research & Product Thinking"],
    portfolio: "Personal Portfolio",
    positioning: "Finance / Data / AI",
    primaryAction: "邮件联系",
    researchAction: "查看科研",
    experienceAction: "浏览经历",
    mapTitle: "Personal Signal Map",
    mapSubtitle: "Research, payment flows, data products, and human judgment",
    note: "Signal is not only data. It is data interpreted through context, incentives, and people.",
  },
  en: {
    kicker: "Finance, data, and the space between decisions",
    title: ["Finance, Data", "& Human Judgment"],
    subtitle: "I explore how financial systems, data models, and human decisions interact in real business contexts.",
    intro:
      "My work connects accounting and finance foundations with machine learning research, cross-border payment reconciliation, and data product operations.",
    tags: ["FinTech", "Business Analytics", "Data-driven Finance", "Accounting x AI", "Research & Product Thinking"],
    portfolio: "Personal Portfolio",
    positioning: "Finance / Data / AI",
    primaryAction: "Contact Me",
    researchAction: "View Research",
    experienceAction: "Explore Experience",
    mapTitle: "Personal Signal Map",
    mapSubtitle: "Research, payment flows, data products, and human judgment",
    note: "Signal is not only data. It is data interpreted through context, incentives, and people.",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

const signalNodes = [
  { id: "pbfj", x: 16, y: 22, label: { zh: "PBFJ 研究", en: "PBFJ Research" } },
  { id: "xgboost", x: 47, y: 14, label: { zh: "XGBoost / SHAP", en: "XGBoost / SHAP" } },
  { id: "fof", x: 78, y: 29, label: { zh: "FOF 筛选", en: "FOF Selection" } },
  { id: "judgment", x: 53, y: 42, label: { zh: "人的判断", en: "Human Judgment" }, featured: true },
  { id: "photonpay", x: 20, y: 57, label: { zh: "PhotonPay", en: "PhotonPay" } },
  { id: "payment", x: 50, y: 62, label: { zh: "跨境支付", en: "Cross-border Payment" } },
  { id: "sde", x: 82, y: 69, label: { zh: "深圳数据交易所", en: "Shenzhen Data Exchange" } },
  { id: "risk", x: 23, y: 82, label: { zh: "风险识别", en: "Risk Identification" } },
  { id: "product", x: 58, y: 86, label: { zh: "数据产品", en: "Data Product" } },
] satisfies Array<{
  id: string;
  x: number;
  y: number;
  label: Record<Locale, string>;
  featured?: boolean;
}>;

const signalConnections = [
  [16, 22, 47, 14],
  [47, 14, 78, 29],
  [47, 14, 53, 42],
  [20, 57, 50, 62],
  [50, 62, 82, 69],
  [53, 42, 50, 62],
  [23, 82, 58, 86],
  [58, 86, 82, 69],
  [23, 82, 53, 42],
] as const;

const organizationNotes: Record<
  string,
  {
    summary: Record<Locale, string>;
    mark: "photonpay" | "sde" | "research" | "project";
  }
> = {
  "fof-ml": {
    mark: "research",
    summary: {
      zh: "SSCI 一区金融期刊，论文聚焦 FOF 基金筛选、组合构建与可解释机器学习。",
      en: "SSCI Q1 finance journal publication on FOF fund screening, portfolio construction, and interpretable machine learning.",
    },
  },
  photonpay: {
    mark: "photonpay",
    summary: {
      zh: "PhotonPay 是面向全球企业的支付与金融基础设施平台；该段经历体现跨境支付资金流、财务流程与对账能力。",
      en: "PhotonPay provides global payment and financial infrastructure for businesses; this experience highlights reconciliation, fund flow, and finance operations exposure.",
    },
  },
  sde: {
    mark: "sde",
    summary: {
      zh: "深圳数据交易所聚焦数据要素流通与数据产品市场化；该段经历强化数据 API、产品运营与交易数据洞察。",
      en: "Shenzhen Data Exchange focuses on data element circulation and data product commercialization; this role connects data APIs, product operations, and transaction insights.",
    },
  },
  "risk-id": {
    mark: "project",
    summary: {
      zh: "从用户研究、风控痛点到模型功能设计，把金融异常识别问题转化为可落地产品原型。",
      en: "Translated financial anomaly detection pain points into a practical product prototype through user research and model design.",
    },
  },
};

function text(value: Record<Locale, string>, locale: Locale) {
  return value[locale];
}

function experienceKindLabel(kind: ExperienceKind, locale: Locale) {
  const labelsByKind = {
    research: { zh: "研究发表", en: "Research Publication" },
    internship: { zh: "现场经历", en: "Field Experience" },
    project: { zh: "项目工作室", en: "Project Studio" },
  } satisfies Record<ExperienceKind, Record<Locale, string>>;

  return labelsByKind[kind][locale];
}

function App() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [activeFilter, setActiveFilter] = useState<FilterKind>("all");
  const [activeExperienceId, setActiveExperienceId] = useState("photonpay");

  const copy = labels[locale];
  const hero = heroContent[locale];
  const chapter = chapterCopy[locale];
  const featuredPublication = profile.experiences.find((experience) => experience.id === "fof-ml") ?? profile.experiences[0];
  const secondaryResearch = profile.experiences.find((experience) => experience.id === "esg-book");
  const filteredExperiences = useMemo(
    () =>
      activeFilter === "all"
        ? profile.experiences
        : profile.experiences.filter((experience) => experience.kind === activeFilter),
    [activeFilter],
  );

  const activeExperience =
    profile.experiences.find((experience) => experience.id === activeExperienceId) ?? profile.experiences[0];

  return (
    <main className="site-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <header className="topbar">
        <a className="brand-mark" href="#overview" aria-label="Yingbin Chen portfolio home">
          <span>YC</span>
        </a>
        <div className="masthead-kicker" aria-label="Portfolio positioning">
          <span>{hero.portfolio}</span>
          <strong>{hero.positioning}</strong>
        </div>
        <nav className="nav-links" aria-label="Primary navigation">
          {copy.nav.map((item, index) => (
            <a href={`#${sectionIds[index]}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <button
          className="icon-button language-button"
          type="button"
          onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
          aria-label="Switch language"
          title="Switch language"
        >
          <Languages size={18} />
          <span>{copy.language}</span>
        </button>
      </header>

      <section className="hero portfolio-chapter chapter-opening" id="overview">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={16} />
            <span>{hero.kicker}</span>
          </div>
          <h1 aria-label={locale === "zh" ? hero.title.join("") : hero.title.join(" ")}>
            <span>{hero.title[0]}</span>
            <span>{hero.title[1]}</span>
          </h1>
          <p className="headline">{hero.subtitle}</p>
          <p className="intro">{hero.intro}</p>
          <div className="identity-tags" aria-label="Portfolio focus areas">
            {hero.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="hero-actions" aria-label="Hero actions">
            <a className="primary-action" href={`mailto:${profile.email}`}>
              <Mail size={18} />
              <span>{hero.primaryAction}</span>
            </a>
            <a className="secondary-action" href="#experience">
              <span>{hero.experienceAction}</span>
              <ArrowUpRight size={16} />
            </a>
            <a className="secondary-action" href="#research">
              <span>{hero.researchAction}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <SignalMap locale={locale} />

      </section>

      <section className="portfolio-chapter chapter-academic" id="academic-research">
        <ChapterIntro label={chapter.academicLabel} title={chapter.academicTitle} deck={chapter.academicDeck} />

      <section className="section-band education-band">
        <SectionHeading icon={<GraduationCap size={22} />} title={copy.education} />
        <div className="education-grid">
          <div>
            <h2>{text(profile.education.school, locale)}</h2>
            <p>{text(profile.education.degree, locale)}</p>
            <p className="education-bridge">
              {locale === "zh"
                ? "会计学与大数据会计方向构成了我理解金融系统、数据分析与商业决策的基础。"
                : "My accounting and big data accounting background forms the foundation for understanding financial systems, data analysis, and business decision-making."}
            </p>
            <span className="period">{text(profile.education.period, locale)}</span>
          </div>
          <div className="fact-grid">
            {profile.education.facts.map((fact) => (
              <div className="fact" key={fact.value}>
                <span>{text(fact.label, locale)}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <p className="coursework">
          <BookOpenText size={18} />
          <span>
            <strong>{copy.coursework}: </strong>
            {text(profile.education.coursework, locale)}
          </span>
        </p>
      </section>

      <section className="publication-feature section-band" id="research">
        <div className="research-heading-row">
          <SectionHeading icon={<FileText size={22} />} title={locale === "zh" ? "研究作品集" : "Research Portfolio"} />
          <p>
            {locale === "zh"
              ? "用可解释模型、金融问题和城市 ESG 观察，整理我对数据如何进入决策的理解。"
              : "A curated view of how interpretable models, financial questions, and Shenzhen ESG research shape my understanding of data-driven decisions."}
          </p>
        </div>
        <div className="research-showcase">
        <article className="featured-research-card publication-grid">
          <figure className="journal-cover">
            <img src={assetPath("assets/pbfj-cover.jpg")} alt="Pacific-Basin Finance Journal cover by Elsevier" />
            <figcaption>Pacific-Basin Finance Journal / Elsevier</figcaption>
          </figure>
          <div className="publication-content">
            <div className="meta-row">
              <span>SSCI Q1</span>
              <span>Elsevier</span>
              <span>{text(featuredPublication.role, locale)}</span>
              <span>{text(featuredPublication.period, locale)}</span>
            </div>
            <h2>{text(featuredPublication.title, locale)}</h2>
            <p>{text(featuredPublication.summary, locale)}</p>
            <div className="contribution-grid">
              {["FOF", "XGBoost", "SHAP", "Asset Allocation", "Explainable AI"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <ul className="publication-list">
              {featuredPublication.bullets[locale].map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {featuredPublication.link && (
              <a className="text-link" href={featuredPublication.link} target="_blank" rel="noreferrer">
                DOI: 10.1016/j.pacfin.2026.103198
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </article>
        {secondaryResearch && (
          <article className="secondary-research-card">
            <div className="secondary-card-index">02</div>
            <div>
              <div className="meta-row">
                <span>{text(secondaryResearch.period, locale)}</span>
                <span>{text(secondaryResearch.role, locale)}</span>
              </div>
              <h3>{text(secondaryResearch.title, locale)}</h3>
              <p>{text(secondaryResearch.summary, locale)}</p>
              <div className="contribution-grid compact">
                {secondaryResearch.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        )}
        </div>
      </section>
      </section>

      <section className="portfolio-chapter chapter-field section-band" id="experience">
        <ChapterIntro label={chapter.fieldLabel} title={chapter.fieldTitle} deck={chapter.fieldDeck} compact />
        <div className="section-header-row">
          <div>
            <SectionHeading icon={<Clock3 size={22} />} title={copy.timeline} />
            <p className="section-deck">
              {locale === "zh"
                ? "把研究、支付清结算、数据产品和风险识别放在同一条经验索引中，观察数据如何进入真实业务现场。"
                : "A field index across research, reconciliation, data products, and risk identification, tracing how data enters real business contexts."}
            </p>
          </div>
          <div className="filters" aria-label="Experience filters">
            <Filter size={16} />
            {filterOrder.map((kind) => (
              <button
                className={activeFilter === kind ? "filter active" : "filter"}
                key={kind}
                type="button"
                onClick={() => {
                  setActiveFilter(kind);
                  const firstMatch =
                    kind === "all"
                      ? profile.experiences[0]
                      : profile.experiences.find((experience) => experience.kind === kind);
                  if (firstMatch) setActiveExperienceId(firstMatch.id);
                }}
              >
                {copy.filters[kind]}
              </button>
            ))}
          </div>
        </div>

        <div className="experience-layout">
          <div className="timeline-list">
            {filteredExperiences.map((experience) => (
              <ExperienceButton
                experience={experience}
                isActive={activeExperience.id === experience.id}
                key={experience.id}
                locale={locale}
                onClick={() => setActiveExperienceId(experience.id)}
              />
            ))}
          </div>
          <ExperienceDetail experience={activeExperience} locale={locale} />
        </div>
      </section>

      <section className="portfolio-chapter chapter-notes section-band" id="notes">
        <ChapterIntro label={chapter.notesLabel} title={chapter.notesTitle} deck={chapter.notesDeck} />
        <div className="notes-grid" aria-label={chapter.notesTitle}>
          {profile.notes.map((note, index) => (
            <article className={index === 0 ? "note-card featured" : "note-card"} key={note.id}>
              <div className="note-topline">
                <span>{text(note.status, locale)}</span>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
              </div>
              {index === 0 && (
                <div className="note-feature-line" aria-hidden="true">
                  <span>{locale === "zh" ? "数字" : "Numbers"}</span>
                  <i />
                  <span>{locale === "zh" ? "规则" : "Rules"}</span>
                  <i />
                  <span>{locale === "zh" ? "判断" : "Judgment"}</span>
                </div>
              )}
              <h3>{text(note.title, locale)}</h3>
              {index === 0 && (
                <blockquote>
                  {locale === "zh"
                    ? "AI 改变处理信息的速度，但不会替代理解商业语境的责任。"
                    : "AI changes the speed of processing information, but not the responsibility of understanding business context."}
                </blockquote>
              )}
              <p>{text(note.summary, locale)}</p>
              <div className="note-tags">
                {note.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-chapter chapter-capabilities" id="capabilities">
        <ChapterIntro
          label={chapter.capabilitiesLabel}
          title={chapter.capabilitiesTitle}
          deck={chapter.capabilitiesDeck}
        />

      <section className="section-band" id="skills">
        <SectionHeading icon={<Network size={22} />} title={copy.skills} />
        <div className="skills-grid">
          {profile.skillGroups.map((group) => (
            <article className="skill-group" key={text(group.name, locale)}>
              <h3>{text(group.name, locale)}</h3>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-band honors-band" id="honors">
        <SectionHeading icon={<Medal size={22} />} title={copy.honors} />
        <div className="honor-list">
          {profile.honors.map((honor) => (
            <article className="honor" key={honor[locale]}>
              <Medal size={18} />
              <span>{honor[locale]}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div>
          <SectionHeading icon={<Target size={22} />} title={copy.contactTitle} />
          <p>{copy.contactBody}</p>
          <small>{copy.privacy}</small>
        </div>
        <a className="primary-action" href={`mailto:${profile.email}`}>
          <Mail size={18} />
          <span>{profile.email}</span>
        </a>
      </section>
      </section>
    </main>
  );
}

function ChapterIntro({
  label,
  title,
  deck,
  compact = false,
}: {
  label: string;
  title: string;
  deck: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "chapter-intro compact" : "chapter-intro"}>
      <span>{label}</span>
      <div>
        <h2>{title}</h2>
        <p>{deck}</p>
      </div>
    </div>
  );
}

function SignalMap({ locale }: { locale: Locale }) {
  const hero = heroContent[locale];

  return (
    <aside className="signal-map-card" aria-label={hero.mapTitle}>
      <div className="signal-map-topline">
        <span>{hero.mapTitle}</span>
        <strong>YC / 2026</strong>
      </div>
      <div className="signal-map-canvas">
        <svg className="signal-map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="signal-gradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.18" />
              <stop offset="48%" stopColor="#67e8f9" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          {signalConnections.map(([x1, y1, x2, y2]) => (
            <line className="signal-connection" key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </svg>
        {signalNodes.map((node) => (
          <span
            className={node.featured ? "signal-node featured" : "signal-node"}
            key={node.id}
            style={{ "--x": `${node.x}%`, "--y": `${node.y}%` } as CSSProperties}
          >
            {text(node.label, locale)}
          </span>
        ))}
      </div>
      <div className="signal-map-footer">
        <span>{hero.mapSubtitle}</span>
        <p>{hero.note}</p>
      </div>
    </aside>
  );
}

function SectionHeading({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="section-heading">
      {icon}
      <span>{title}</span>
    </div>
  );
}

function ExperienceButton({
  experience,
  isActive,
  locale,
  onClick,
}: {
  experience: Experience;
  isActive: boolean;
  locale: Locale;
  onClick: () => void;
}) {
  return (
    <button className={isActive ? "timeline-item active" : "timeline-item"} type="button" onClick={onClick}>
      <span className="timeline-icon">
        <TimelineMark experience={experience} />
      </span>
      <span>
        <em className="timeline-kind">{experienceKindLabel(experience.kind, locale)}</em>
        <strong>{text(experience.title, locale)}</strong>
        <small>
          {text(experience.role, locale)} · {text(experience.period, locale)}
        </small>
      </span>
    </button>
  );
}

function TimelineMark({ experience }: { experience: Experience }) {
  if (experience.id === "photonpay") {
    return <img src={assetPath("assets/photonpay-logo-cropped.png")} alt="" aria-hidden="true" />;
  }

  if (experience.id === "sde") {
    return <img src={assetPath("assets/shenzhen-data-exchange-logo.svg")} alt="" aria-hidden="true" />;
  }

  return experience.kind === "internship" ? <BriefcaseBusiness size={18} /> : <BookOpenText size={18} />;
}

function ExperienceDetail({ experience, locale }: { experience: Experience; locale: Locale }) {
  const copy = labels[locale];
  const orgNote = organizationNotes[experience.id] ?? {
    mark: "project" as const,
    summary: { zh: text(experience.organization, "zh"), en: text(experience.organization, "en") },
  };

  return (
    <article className="experience-detail">
      <div className="org-context">
        <OrgMark mark={orgNote.mark} locale={locale} />
        <p>{orgNote.summary[locale]}</p>
      </div>
      <div className="detail-topline">
        <span className="detail-kind-label">{experienceKindLabel(experience.kind, locale)}</span>
        <span>{text(experience.period, locale)}</span>
        <span>{text(experience.role, locale)}</span>
      </div>
      <h2>{text(experience.title, locale)}</h2>
      <p className="organization">{text(experience.organization, locale)}</p>
      <p>{text(experience.summary, locale)}</p>
      <ul>
        {experience.bullets[locale].map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="detail-footer">
        <div className="tag-row">
          {experience.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {experience.link && (
          <a href={experience.link} target="_blank" rel="noreferrer">
            {copy.publication}
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </article>
  );
}

function OrgMark({ mark, locale }: { mark: "photonpay" | "sde" | "research" | "project"; locale: Locale }) {
  if (mark === "photonpay") {
    return (
      <div className="org-mark logo-mark photonpay-logo-mark">
        <img src={assetPath("assets/photonpay-logo-cropped.png")} alt="PhotonPay logo" />
        <strong>PhotonPay</strong>
      </div>
    );
  }

  if (mark === "sde") {
    return (
      <div className="org-mark logo-mark sde-logo-mark">
        <img src={assetPath("assets/shenzhen-data-exchange-logo.svg")} alt={locale === "zh" ? "深圳数据交易所 logo" : "Shenzhen Data Exchange logo"} />
      </div>
    );
  }

  return (
    <div className="org-mark word-mark">
      <BarChart3 size={18} />
      <strong>{mark === "research" ? experienceKindLabel("research", locale) : experienceKindLabel("project", locale)}</strong>
    </div>
  );
}

export { App };
