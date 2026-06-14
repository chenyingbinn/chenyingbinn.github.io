import { Mail } from "lucide-react";
import type { Locale } from "../profile";
import { labels, profile } from "../profile";

function text(value: Record<Locale, string>, locale: Locale) {
  return value[locale];
}

const closingCopy = {
  zh: {
    label: "Closing Index / 收束索引",
    title: "能力、笔记与开放联系",
    deck: "在视觉叙事结束处，把能力结构、思考档案与公共联系入口折叠成一个简洁索引。",
    capability: "Capability Index",
    notes: "Notes Strip",
    notesTitle: "Thinking Archive",
    contact: "Open Channel",
  },
  en: {
    label: "Closing Index",
    title: "Capabilities, notes, and an open channel",
    deck: "At the end of the visual narrative, capabilities, notes, and contact are folded into a compact public index.",
    capability: "Capability Index",
    notes: "Notes Strip",
    notesTitle: "Thinking Archive",
    contact: "Open Channel",
  },
} satisfies Record<Locale, Record<string, string>>;

export function ClosingIndex({ locale }: { locale: Locale }) {
  const copy = closingCopy[locale];
  const globalCopy = labels[locale];

  return (
    <section className="v4-closing-index" id="capabilities" aria-labelledby="closing-index-title">
      <div className="v4-scene-number" aria-hidden="true">
        <span>04</span>
        <i />
        <span>Closing Index</span>
      </div>
      <div className="v4-closing-heading">
        <span>{copy.label}</span>
        <h2 id="closing-index-title">{copy.title}</h2>
        <p>{copy.deck}</p>
      </div>

      <div className="v4-index-grid">
        <section className="v4-capability-index" aria-labelledby="capability-index-title">
          <span>{copy.capability}</span>
          <h3 id="capability-index-title">{globalCopy.skills}</h3>
          <div className="v4-capability-list">
            {profile.skillGroups.map((group) => (
              <article key={text(group.name, locale)}>
                <h4>{text(group.name, locale)}</h4>
                <ul>
                  {group.items[locale].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="v4-notes-strip" id="notes" aria-labelledby="notes-strip-title">
          <span>{copy.notes}</span>
          <h3 id="notes-strip-title">{copy.notesTitle}</h3>
          <div>
            {profile.notes.map((note, index) => (
              <article key={note.id}>
                <small>{String(index + 1).padStart(2, "0")} / {text(note.status, locale)}</small>
                <h4>{text(note.title, locale)}</h4>
                <p>{text(note.summary, locale)}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="v4-contact-closing" id="contact" aria-labelledby="contact-title">
        <div>
          <span>{copy.contact}</span>
          <h3 id="contact-title">{globalCopy.contactTitle}</h3>
          <p>{globalCopy.contactBody}</p>
          <small>{globalCopy.privacy}</small>
        </div>
        <a href={`mailto:${profile.email}`}>
          <Mail size={18} />
          <span>{profile.email}</span>
        </a>
      </section>
    </section>
  );
}
