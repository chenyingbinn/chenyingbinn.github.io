import { ArrowUpRight, BookOpenText } from "lucide-react";
import { motion } from "motion/react";
import type { Locale } from "../profile";
import { profile } from "../profile";

function text(value: Record<Locale, string>, locale: Locale) {
  return value[locale];
}

function splitContribution(bullet: string) {
  const separator = bullet.includes("：") ? "：" : bullet.includes(":") ? ":" : "";

  if (!separator) return { title: "", body: bullet };

  const [title, ...bodyParts] = bullet.split(separator);

  return {
    title: title.trim(),
    body: bodyParts.join(separator).trim(),
  };
}

const researchCopy = {
  zh: {
    label: "Opening the research object",
    eyebrow: "Research Object / 研究对象",
    grounding: "Academic Grounding",
    course: "Knowledge Base",
    contribution: "Annotations / 我的贡献",
    secondary: "Secondary archive",
    doi: "Archive DOI",
  },
  en: {
    label: "Opening the research object",
    eyebrow: "Research Object",
    grounding: "Academic Grounding",
    course: "Knowledge Base",
    contribution: "Annotations / My Contribution",
    secondary: "Secondary archive",
    doi: "Archive DOI",
  },
} satisfies Record<Locale, Record<string, string>>;

export function ResearchObject({ assetPath, locale }: { assetPath: (path: string) => string; locale: Locale }) {
  const featuredPublication = profile.experiences.find((experience) => experience.id === "fof-ml") ?? profile.experiences[0];
  const secondaryResearch = profile.experiences.find((experience) => experience.id === "esg-book");
  const copy = researchCopy[locale];

  return (
    <section className="v4-research-object" id="academic-research" aria-labelledby="research-object-title">
      <div className="v4-scene-number" aria-hidden="true">
        <span>02</span>
        <i />
        <span>Research Archive</span>
      </div>
      <div className="v4-research-stage">
        <aside className="v4-academic-index">
          <span>{copy.grounding}</span>
          <h2>{text(profile.education.school, locale)}</h2>
          <p>{text(profile.education.degree, locale)}</p>
          <time>{text(profile.education.period, locale)}</time>
          {profile.education.facts.map((fact) => (
            <div className="v4-focus-lines" key={fact.value}>
              <small>{text(fact.label, locale)}</small>
              {fact.value.split(" × ").map((item) => (
                <strong key={item}>{item}</strong>
              ))}
            </div>
          ))}
          <p className="v4-knowledge-base">
            <BookOpenText size={15} />
            <span>
              <b>{copy.course}</b>
              {text(profile.education.coursework, locale)}
            </span>
          </p>
        </aside>

        <article className="v4-publication-object">
          <div className="v4-publication-cover" aria-hidden="true">
            <img src={assetPath("assets/pbfj-cover.jpg")} alt="" />
            <span>Pacific-Basin Finance Journal</span>
          </div>

          <div className="v4-research-title">
            <span>{copy.eyebrow}</span>
            <h2 id="research-object-title">{text(featuredPublication.title, locale)}</h2>
            <p>{text(featuredPublication.summary, locale)}</p>
          </div>

          {featuredPublication.publicationMeta && (
            <dl className="v4-publication-meta">
              {featuredPublication.publicationMeta.map((item) => (
                <div key={text(item.label, locale)}>
                  <dt>{text(item.label, locale)}</dt>
                  <dd>{text(item.value, locale)}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="v4-annotations">
            <div className="v4-annotation-heading">
              <span>{copy.contribution}</span>
              {featuredPublication.link && (
                <a href={featuredPublication.link} target="_blank" rel="noopener noreferrer">
                  {copy.doi}
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>
            <div className="v4-annotation-grid">
              {(featuredPublication.contribution?.[locale] ?? featuredPublication.bullets[locale]).map((bullet) => {
                const contribution = splitContribution(bullet);

                return (
                  <motion.article className="v4-annotation-note" key={bullet} whileHover={{ y: -5 }}>
                    {contribution.title && <h3>{contribution.title}</h3>}
                    <p>{contribution.body}</p>
                  </motion.article>
                );
              })}
            </div>
            {featuredPublication.researchSignal && (
              <blockquote className="v4-research-signal">{text(featuredPublication.researchSignal, locale)}</blockquote>
            )}
          </div>
        </article>

        {secondaryResearch && (
          <aside className="v4-secondary-object">
            <span>{copy.secondary}</span>
            <h3>{text(secondaryResearch.title, locale)}</h3>
            <p>{text(secondaryResearch.summary, locale)}</p>
            <div>
              {secondaryResearch.tags.map((tag) => (
                <small key={tag}>{tag}</small>
              ))}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
