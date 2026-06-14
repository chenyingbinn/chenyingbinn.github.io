import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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
import { AnimatedSection } from "./components/AnimatedSection";
import { NarrativeBridge } from "./components/NarrativeBridge";
import { SignalField } from "./components/SignalField";
import { useLenisScroll } from "./hooks/useLenisScroll";
import { usePointerParallax } from "./hooks/usePointerParallax";
import { getCardVariants, getHoverMotion, staggerContainer } from "./motion";
import { Experience, ExperienceKind, labels, Locale, profile } from "./profile";

type FilterKind = "all" | ExperienceKind;

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroSignalWorld = lazy(() =>
  import("./components/HeroSignalWorld").then((module) => ({ default: module.HeroSignalWorld })),
);

const filterOrder: FilterKind[] = ["all", "research", "internship", "project"];
const sectionIds = ["overview", "academic-research", "experience", "capabilities", "notes", "contact"] as const;
const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const chapterCopy = {
  zh: {
    academicLabel: "Chapter 02 / 学术根基",
    academicTitle: "Academic Grounding + Featured Research",
    academicDeck: "从会计与金融基础出发，延展到可解释机器学习、FOF 基金筛选与城市 ESG 观察，形成研究与方法训练的交叉路径。",
    fieldLabel: "Chapter 03 / 实践路径",
    fieldTitle: "Practice Path / 实践路径",
    fieldDeck: "把支付清结算、数据产品运营、风险识别与研究经历放在同一条实践路径中，观察数据如何进入真实业务现场。",
    capabilitiesLabel: "Chapter 04 / 能力结构",
    capabilitiesTitle: "Capability Map / 能力结构",
    capabilitiesDeck: "把研究与实践经历归纳为建模分析、金融业务理解、数据产品判断和研究表达四组能力。",
    notesLabel: "Chapter 05 / 思考档案",
    notesTitle: "Thinking Archive / 思考档案",
    notesDeck:
      "一些关于金融、数据、AI、职业叙事与产品观察的短札。它们不是履历补充，而是我整理经验、形成判断的方式。",
  },
  en: {
    academicLabel: "Chapter 02 / Academic Grounding",
    academicTitle: "Academic Grounding + Featured Research",
    academicDeck:
      "A path from accounting and finance foundations to interpretable machine learning, FOF selection, and Shenzhen ESG research.",
    fieldLabel: "Chapter 03 / Practice Path",
    fieldTitle: "Practice Path",
    fieldDeck:
      "Connecting payment reconciliation, data product operations, risk identification, and research experience into one practice path.",
    capabilitiesLabel: "Chapter 04 / Capability Map",
    capabilitiesTitle: "Capability Map",
    capabilitiesDeck:
      "A capability model synthesized from research and practice: modeling, finance operations, data products, and research communication.",
    notesLabel: "Chapter 05 / Thinking Archive",
    notesTitle: "Thinking Archive",
    notesDeck:
      "Short notes on finance, data, AI, career narrative, and product observation. They show how I organize experience into judgment.",
  },
} satisfies Record<Locale, Record<string, string>>;

const heroContent = {
  zh: {
    kicker: "在金融、数据与人的判断之间",
    title: ["金融、数据", "与人的判断"],
    subtitle: "我关注金融系统、数据模型与人的判断如何共同影响真实商业决策。",
    intro:
      "会计与金融基础、机器学习研究、跨境支付清结算和数据产品运营经验，共同构成我理解商业决策的一条线索。",
    positioningLine: "以会计金融为基础，持续向金融科技、数据产品、商业分析与财务数据分析方向延展。",
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
    positioningLine:
      "Grounded in accounting and finance, extending toward FinTech, data products, business analytics, and financial data analysis.",
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

function splitContribution(bullet: string) {
  const separator = bullet.includes("：") ? "：" : bullet.includes(":") ? ":" : "";

  if (!separator) {
    return { title: "", body: bullet };
  }

  const [title, ...bodyParts] = bullet.split(separator);

  return {
    title: title.trim(),
    body: bodyParts.join(separator).trim(),
  };
}

function App() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [activeFilter, setActiveFilter] = useState<FilterKind>("all");
  const [activeExperienceId, setActiveExperienceId] = useState("photonpay");
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const academicRef = useRef<HTMLElement>(null);
  const practiceRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: academicProgress } = useScroll({
    target: academicRef,
    offset: ["start 92%", "end 18%"],
  });
  const { scrollYProgress: practiceProgress } = useScroll({
    target: practiceRef,
    offset: ["start 92%", "end 18%"],
  });
  const environmentY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const environmentOpacity = useTransform(scrollYProgress, [0, 0.18, 0.72, 1], [0.95, 1, 0.82, 0.72]);
  const academicDrift = useTransform(academicProgress, [0, 1], [12, -12]);
  const practiceDrift = useTransform(practiceProgress, [0, 1], [10, -14]);
  const cardVariants = getCardVariants(shouldReduceMotion);
  const hoverMotion = getHoverMotion(shouldReduceMotion);
  usePointerParallax(heroRef, shouldReduceMotion);
  useLenisScroll(Boolean(shouldReduceMotion));

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".hero-signal-stage",
          { autoAlpha: 0, scale: 1.08, y: 34 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 1.15 },
        )
        .fromTo(
          ".hero-copy .eyebrow, .hero-copy h1, .hero-copy .headline, .hero-copy .intro, .hero-copy .positioning-line, .hero-copy .hero-actions",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.075 },
          "-=0.62",
        );

      gsap.to(".hero-signal-stage", {
        autoAlpha: 0.1,
        scale: 0.66,
        y: -172,
        x: 86,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom+=55% top",
          scrub: true,
        },
      });

      gsap.to(".hero-copy", {
        y: -70,
        autoAlpha: 0.34,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "36% top",
          end: "bottom+=20% top",
          scrub: true,
        },
      });

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(min-width: 960px)", () => {
        const pin = ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          end: "+=72%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 0.5,
        });

        const archive = gsap.fromTo(
          ".archive-scene .education-band, .archive-scene .publication-feature",
          { y: 82, autoAlpha: 0.68, scale: 0.975 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".archive-scene",
              start: "top 82%",
              end: "top 32%",
              scrub: 0.7,
            },
          },
        );

        const corridor = gsap.fromTo(
          ".flow-corridor .timeline-item, .flow-corridor .experience-detail",
          { y: 42, autoAlpha: 0.72 },
          {
            y: 0,
            autoAlpha: 1,
            ease: "power2.out",
            stagger: 0.055,
            scrollTrigger: {
              trigger: ".flow-corridor",
              start: "top 78%",
              end: "top 34%",
              scrub: 0.65,
            },
          },
        );

        return () => {
          pin.kill();
          archive.kill();
          corridor.kill();
        };
      });

      gsap.fromTo(
        ".hero-research-bridge .bridge-copy, .hero-research-bridge p",
        { autoAlpha: 0.42, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hero-research-bridge",
            start: "top 82%",
            end: "center 58%",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        ".publication-feature .research-heading-row, .featured-research-card",
        { autoAlpha: 0.72, y: 34, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".publication-feature",
            start: "top 78%",
            end: "top 44%",
            scrub: 0.5,
          },
        },
      );

      return () => matchMedia.revert();
    },
    { scope: rootRef, dependencies: [shouldReduceMotion] },
  );

  useEffect(() => {
    const scrollToHash = () => {
      const targetId = window.location.hash.slice(1);
      if (!targetId) return;

      const scrollToTarget = () => {
        document.getElementById(decodeURIComponent(targetId))?.scrollIntoView({ block: "start" });
      };

      window.requestAnimationFrame(scrollToTarget);
      window.setTimeout(scrollToTarget, 120);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

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
    <main className="site-shell" ref={rootRef}>
      <motion.div
        className="site-environment"
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { opacity: environmentOpacity, y: environmentY }}
      >
        <span className="ambient-glow glow-a" />
        <span className="ambient-glow glow-b" />
        <span className="ambient-glow glow-c" />
        <span className="ambient-grid" />
        <span className="ambient-signal-line line-one" />
        <span className="ambient-signal-line line-two" />
      </motion.div>
      <header className="topbar">
        <a className="brand-mark" href="#overview" aria-label="Yingbin Chen portfolio home">
          <img className="brand-mark-image" src={assetPath("favicon.svg")} alt="" aria-hidden="true" />
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

      <AnimatedSection className="hero hero-stage portfolio-chapter chapter-opening act-one signal-cover-scene" id="overview" ref={heroRef}>
        <SignalField />
        <motion.div className="hero-copy" variants={staggerContainer}>
          <span className="act-label">Act 1 / Signal Cover</span>
          <div className="eyebrow">
            <Sparkles size={16} />
            <span>{hero.kicker}</span>
          </div>
          <h1 aria-label={locale === "zh" ? hero.title.join("") : hero.title.join(" ")}>
            <span>{hero.title[0]}</span>
            <span>{hero.title[1]}</span>
          </h1>
          <p className="headline">{hero.subtitle}</p>
          <div className="hero-editorial-note">
            <p className="intro">{hero.intro}</p>
            <p className="positioning-line">{hero.positioningLine}</p>
            <motion.div className="identity-tags" aria-label="Portfolio focus areas" variants={staggerContainer}>
              {hero.tags.map((tag) => (
                <motion.span key={tag} variants={cardVariants}>
                  {tag}
                </motion.span>
              ))}
            </motion.div>
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
        </motion.div>

        <div className="hero-signal-stage">
          <Suspense
            fallback={
              <div className="hero-signal-fallback" aria-hidden="true">
                <SignalField />
              </div>
            }
          >
            <HeroSignalWorld />
          </Suspense>
          <SignalMap locale={locale} />
        </div>
        <div className="hero-scroll-cue" aria-hidden="true">
          <span />
        </div>

      </AnimatedSection>
      <NarrativeBridge locale={locale} />

      <AnimatedSection
        className="portfolio-chapter chapter-academic archive-scene act-two"
        id="academic-research"
        ref={academicRef}
        style={shouldReduceMotion ? undefined : { y: academicDrift }}
      >
        <span className="act-label archive-label">Act 2 / Research Archive</span>
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
          {profile.education.facts.length > 0 && (
            <div className="fact-grid">
              {profile.education.facts.map((fact) => {
                const focusItems = fact.value.split(" × ");

                return (
                  <div className="fact education-focus-panel" key={fact.value}>
                    <span>{text(fact.label, locale)}</span>
                    {focusItems.length > 1 ? (
                      <div className="focus-chip-list" aria-label={fact.value}>
                        {focusItems.map((item, index) => (
                          <span className="focus-chip" key={item}>
                            {index > 0 && <i aria-hidden="true">×</i>}
                            <b>{item}</b>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <strong>{fact.value}</strong>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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
        <motion.div
          className="research-showcase"
          initial="hidden"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -8% 0px" }}
          whileInView="visible"
        >
        <motion.article
          className="featured-research-card publication-grid motion-card"
          variants={cardVariants}
          whileHover={hoverMotion}
        >
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
            {featuredPublication.publicationMeta && (
              <motion.div
                className="publication-meta"
                aria-label={locale === "zh" ? "论文信息" : "Publication information"}
                initial="hidden"
                variants={staggerContainer}
                viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
                whileInView="visible"
              >
                {featuredPublication.publicationMeta.map((item) => (
                  <motion.div
                    className={
                      text(item.label, "en") === "CRediT"
                        ? "publication-meta-item publication-meta-item--wide"
                        : "publication-meta-item"
                    }
                    key={text(item.label, locale)}
                    variants={cardVariants}
                  >
                    <span>{text(item.label, locale)}</span>
                    <strong>{text(item.value, locale)}</strong>
                  </motion.div>
                ))}
              </motion.div>
            )}
            <div className="contribution-grid">
              {["FOF", "XGBoost", "SHAP", "Asset Allocation", "Explainable AI"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <h3>{locale === "zh" ? "我的贡献" : "My Contribution"}</h3>
            <motion.div
              className="contribution-card-grid"
              initial="hidden"
              variants={staggerContainer}
              viewport={{ once: true, amount: 0.1, margin: "0px 0px -8% 0px" }}
              whileInView="visible"
            >
              {(featuredPublication.contribution?.[locale] ?? featuredPublication.bullets[locale]).map((bullet) => {
                const contribution = splitContribution(bullet);

                return (
                  <motion.article
                    className="contribution-card motion-card"
                    key={bullet}
                    variants={cardVariants}
                    whileHover={hoverMotion}
                  >
                    {contribution.title && <h4>{contribution.title}</h4>}
                    <p>{contribution.body}</p>
                  </motion.article>
                );
              })}
            </motion.div>
            {featuredPublication.researchSignal && (
              <motion.p
                className="research-signal"
                initial="hidden"
                variants={cardVariants}
                viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
                whileInView="visible"
              >
                {text(featuredPublication.researchSignal, locale)}
              </motion.p>
            )}
            {featuredPublication.link && (
              <a className="text-link" href={featuredPublication.link} target="_blank" rel="noopener noreferrer">
                DOI: 10.1016/j.pacfin.2026.103198
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </motion.article>
        {secondaryResearch && (
          <motion.article
            className="secondary-research-card motion-card"
            variants={cardVariants}
            whileHover={hoverMotion}
          >
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
          </motion.article>
        )}
        </motion.div>
      </section>
      </AnimatedSection>

      <AnimatedSection
        className="portfolio-chapter chapter-field section-band flow-corridor act-three"
        id="experience"
        ref={practiceRef}
        style={shouldReduceMotion ? undefined : { y: practiceDrift }}
      >
        <span className="act-label flow-label">Act 3 / Practice Flow Corridor</span>
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

        <motion.div className="experience-layout">
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
          <ExperienceDetail key={`${activeExperience.id}-${locale}`} experience={activeExperience} locale={locale} />
        </motion.div>
      </AnimatedSection>

      <AnimatedSection className="portfolio-chapter chapter-capabilities" id="capabilities">
        <span className="act-label closing-label">Act 4 / Capability + Closing</span>
        <ChapterIntro
          label={chapter.capabilitiesLabel}
          title={chapter.capabilitiesTitle}
          deck={chapter.capabilitiesDeck}
        />

      <section className="section-band" id="skills">
        <SectionHeading icon={<Network size={22} />} title={copy.skills} />
        <motion.div
          className="skills-grid"
          initial="hidden"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -8% 0px" }}
          whileInView="visible"
        >
          {profile.skillGroups.map((group) => (
            <motion.article
              className="skill-group motion-card"
              key={text(group.name, locale)}
              variants={cardVariants}
              whileHover={hoverMotion}
            >
              <h3>{text(group.name, locale)}</h3>
              <div className="skill-tags">
                {group.items[locale].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
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

      </AnimatedSection>

      <AnimatedSection className="portfolio-chapter chapter-notes section-band" id="notes">
        <ChapterIntro label={chapter.notesLabel} title={chapter.notesTitle} deck={chapter.notesDeck} />
        <motion.div
          className="notes-grid"
          aria-label={chapter.notesTitle}
          initial="hidden"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -8% 0px" }}
          whileInView="visible"
        >
          {profile.notes.map((note, index) => (
            <motion.article
              className={index === 0 ? "note-card featured motion-card" : "note-card motion-card"}
              key={note.id}
              variants={cardVariants}
              whileHover={hoverMotion}
            >
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
            </motion.article>
          ))}
        </motion.div>
      </AnimatedSection>

      <AnimatedSection className="contact-band" id="contact">
        <div>
          <SectionHeading icon={<Target size={22} />} title={copy.contactTitle} />
          <p>{copy.contactBody}</p>
          <small>{copy.privacy}</small>
        </div>
        <a className="primary-action" href={`mailto:${profile.email}`}>
          <Mail size={18} />
          <span>{profile.email}</span>
        </a>
      </AnimatedSection>
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
        <strong>Yingbin Chen / 2026</strong>
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
  const shouldReduceMotion = useReducedMotion();
  const hoverMotion = getHoverMotion(shouldReduceMotion);
  const orgNote = organizationNotes[experience.id] ?? {
    mark: "project" as const,
    summary: { zh: text(experience.organization, "zh"), en: text(experience.organization, "en") },
  };

  return (
    <motion.article
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="experience-detail motion-card"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.96, scale: 0.996, y: 8 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hoverMotion}
    >
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
      {experience.workflow && (
        <div
          className="workflow-strip"
          key={`${experience.id}-${locale}-workflow`}
          aria-label={locale === "zh" ? "业务流程" : "Workflow"}
        >
          {experience.workflow[locale].map((step, index) => (
            <span className="workflow-segment" key={step}>
              <span className="workflow-step">{step}</span>
              {index < experience.workflow![locale].length - 1 && (
                <span className="workflow-arrow">→</span>
              )}
            </span>
          ))}
        </div>
      )}
      <ul>
        {experience.bullets[locale].map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {experience.judgment && (
        <p className="judgment-block">
          <strong>{locale === "zh" ? "判断" : "Judgment"}</strong>
          <span>{text(experience.judgment, locale)}</span>
        </p>
      )}
      <div className="detail-footer">
        <div className="tag-row">
          {experience.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {experience.link && (
          <a href={experience.link} target="_blank" rel="noopener noreferrer">
            {copy.publication}
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </motion.article>
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
