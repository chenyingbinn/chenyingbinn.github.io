import { ArrowUpRight, BarChart3, BookOpenText, BriefcaseBusiness } from "lucide-react";
import type { CSSProperties } from "react";
import type { Experience, ExperienceKind, Locale } from "../profile";
import { labels, profile } from "../profile";

function text(value: Record<Locale, string>, locale: Locale) {
  return value[locale];
}

function kindLabel(kind: ExperienceKind, locale: Locale) {
  const copy = {
    research: { zh: "研究起点", en: "Research Start" },
    internship: { zh: "业务现场", en: "Business Field" },
    project: { zh: "模型闭环", en: "Model Loop" },
  } satisfies Record<ExperienceKind, Record<Locale, string>>;

  return copy[kind][locale];
}

const pathIds = ["fof-ml", "photonpay", "sde", "risk-id"];

const sceneCopy = {
  zh: {
    label: "Practice Path / 实践路径",
    title: "从研究对象进入现实系统",
    deck: "这不是经历列表，而是一条证据路径：模型方法、资金流程、数据产品与风险判断在不同现场被反复校准。",
    workflow: "Workflow",
    judgment: "Judgment",
  },
  en: {
    label: "Practice Path",
    title: "From research object into operating systems",
    deck:
      "Not a resume list, but an evidence route: model methods, fund flows, data products, and risk judgment are tested across different contexts.",
    workflow: "Workflow",
    judgment: "Judgment",
  },
} satisfies Record<Locale, Record<string, string>>;

export function PracticePathScene({
  activeExperienceId,
  assetPath,
  locale,
  onSelectExperience,
}: {
  activeExperienceId: string;
  assetPath: (path: string) => string;
  locale: Locale;
  onSelectExperience: (id: string) => void;
}) {
  const stations = pathIds
    .map((id) => profile.experiences.find((experience) => experience.id === id))
    .filter(Boolean) as Experience[];
  const activeExperience =
    stations.find((experience) => experience.id === activeExperienceId) ??
    stations.find((experience) => experience.id === "photonpay") ??
    stations[0];
  const copy = sceneCopy[locale];
  const globalCopy = labels[locale];

  return (
    <section className="v4-practice-path" id="experience" aria-labelledby="practice-path-title">
      <div className="v4-scene-number v4-scene-number-dark" aria-hidden="true">
        <span>03</span>
        <i />
        <span>Evidence Route</span>
      </div>
      <div className="v4-path-header">
        <span>{copy.label}</span>
        <h2 id="practice-path-title">{copy.title}</h2>
        <p>{copy.deck}</p>
      </div>

      <div className="v4-path-canvas">
        <div className="v4-route-line" aria-hidden="true" />
        <div className="v4-path-stations" aria-label={copy.label}>
          {stations.map((experience, index) => (
            <button
              className={activeExperience.id === experience.id ? "v4-path-station active" : "v4-path-station"}
              key={experience.id}
              onClick={() => onSelectExperience(experience.id)}
              style={{ "--station": index } as CSSProperties}
              type="button"
            >
              <span className="v4-station-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="v4-station-mark">
                <StationMark assetPath={assetPath} experience={experience} />
              </span>
              <span>
                <small>{kindLabel(experience.kind, locale)}</small>
                <strong>{text(experience.title, locale)}</strong>
              </span>
            </button>
          ))}
        </div>

        <article className="v4-path-detail" key={`${activeExperience.id}-${locale}`}>
          <div className="v4-detail-meta">
            <span>{kindLabel(activeExperience.kind, locale)}</span>
            <span>{text(activeExperience.period, locale)}</span>
            <span>{text(activeExperience.role, locale)}</span>
          </div>
          <h3>{text(activeExperience.title, locale)}</h3>
          <p className="v4-detail-org">{text(activeExperience.organization, locale)}</p>
          <p>{text(activeExperience.summary, locale)}</p>

          {activeExperience.workflow && (
            <div className="v4-workflow-route" aria-label={copy.workflow}>
              {activeExperience.workflow[locale].map((step, index) => (
                <span className="v4-workflow-node" key={step}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <strong>{step}</strong>
                </span>
              ))}
            </div>
          )}

          <ul className="v4-detail-evidence">
            {activeExperience.bullets[locale].map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          {activeExperience.judgment && (
            <blockquote className="v4-judgment-field">
              <span>{copy.judgment}</span>
              <p>{text(activeExperience.judgment, locale)}</p>
            </blockquote>
          )}

          <div className="v4-detail-tags">
            {activeExperience.tags.map((tag) => (
              <small key={tag}>{tag}</small>
            ))}
            {activeExperience.link && (
              <a href={activeExperience.link} target="_blank" rel="noopener noreferrer">
                {globalCopy.publication}
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

function StationMark({ assetPath, experience }: { assetPath: (path: string) => string; experience: Experience }) {
  if (experience.id === "photonpay") {
    return <img src={assetPath("assets/photonpay-logo-cropped.png")} alt="" aria-hidden="true" />;
  }

  if (experience.id === "sde") {
    return <img src={assetPath("assets/shenzhen-data-exchange-logo.svg")} alt="" aria-hidden="true" />;
  }

  if (experience.kind === "research") return <BookOpenText size={18} />;
  if (experience.kind === "internship") return <BriefcaseBusiness size={18} />;

  return <BarChart3 size={18} />;
}
