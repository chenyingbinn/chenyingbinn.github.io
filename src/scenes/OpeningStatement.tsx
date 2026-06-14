import { lazy, Suspense } from "react";
import { SignalField } from "../components/SignalField";
import type { Locale } from "../profile";

const HeroSignalWorld = lazy(() =>
  import("../components/HeroSignalWorld").then((module) => ({ default: module.HeroSignalWorld })),
);

const openingCopy = {
  zh: {
    caption: "金融、数据与人的判断",
    signature: "Yingbin Chen / Public Portfolio",
    cue: "Scroll to open the evidence",
    premise: "A visual essay on how signals become decisions.",
  },
  en: {
    caption: "Finance, Data & Human Judgment",
    signature: "Yingbin Chen / Public Portfolio",
    cue: "Scroll to open the evidence",
    premise: "A visual essay on how signals become decisions.",
  },
} satisfies Record<Locale, Record<string, string>>;

export function OpeningStatement({ assetPath, locale }: { assetPath: (path: string) => string; locale: Locale }) {
  const copy = openingCopy[locale];

  return (
    <section className="v4-opening" id="overview" aria-labelledby="opening-title">
      <SignalField />
      <div className="v4-opening-visual" aria-hidden="true">
        <Suspense
          fallback={
            <div className="v4-opening-fallback">
              <SignalField />
            </div>
          }
        >
          <HeroSignalWorld />
        </Suspense>
      </div>
      <div className="v4-opening-noise" aria-hidden="true" />
      <div className="v4-opening-index" aria-hidden="true">
        <span>01</span>
        <i />
        <span>04</span>
      </div>
      <div className="v4-opening-statement">
        <p className="v4-opening-signature">
          <img src={assetPath("favicon.svg")} alt="" aria-hidden="true" />
          <span>{copy.signature}</span>
        </p>
        <h1 id="opening-title">
          <span className="v4-opening-word finance">Finance</span>
          <span className="v4-opening-word data">Data</span>
          <span className="v4-opening-word judgment">Human Judgment</span>
        </h1>
        <div className="v4-opening-caption">
          <p>{copy.caption}</p>
          <small>{copy.premise}</small>
        </div>
      </div>
      <a className="v4-scroll-cue" href="#academic-research">
        <span>{copy.cue}</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
