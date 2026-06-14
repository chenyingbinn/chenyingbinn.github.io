import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { Languages } from "lucide-react";
import { ClosingIndex } from "./scenes/ClosingIndex";
import { OpeningStatement } from "./scenes/OpeningStatement";
import { PracticePathScene } from "./scenes/PracticePathScene";
import { ResearchObject } from "./scenes/ResearchObject";
import { useLenisScroll } from "./hooks/useLenisScroll";
import { Locale, profile } from "./profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const navItems = {
  zh: [
    { label: "开场", href: "#overview" },
    { label: "研究对象", href: "#academic-research" },
    { label: "实践路径", href: "#experience" },
    { label: "索引", href: "#capabilities" },
    { label: "联系", href: "#contact" },
  ],
  en: [
    { label: "Opening", href: "#overview" },
    { label: "Research Object", href: "#academic-research" },
    { label: "Practice Path", href: "#experience" },
    { label: "Index", href: "#capabilities" },
    { label: "Contact", href: "#contact" },
  ],
} satisfies Record<Locale, Array<{ label: string; href: string }>>;

function App() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [activeExperienceId, setActiveExperienceId] = useState("photonpay");
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useLenisScroll(Boolean(shouldReduceMotion));

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      const mm = gsap.matchMedia();

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".v4-opening-word", { yPercent: 38, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.95, stagger: 0.12 })
        .fromTo(".v4-opening-signature, .v4-opening-caption, .v4-scroll-cue", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.08 }, "-=0.42")
        .fromTo(".v4-opening-visual", { scale: 1.08, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.18 }, "-=0.94");

      mm.add("(min-width: 960px)", () => {
        const openingPin = ScrollTrigger.create({
          trigger: ".v4-opening",
          start: "top top",
          end: "+=86%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 0.6,
        });

        const openingExit = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".v4-opening",
              start: "top top",
              end: "+=86%",
              scrub: 0.8,
            },
          })
          .to(".v4-opening-visual", { scale: 0.74, xPercent: 9, yPercent: -10, autoAlpha: 0.2, ease: "none" }, 0)
          .to(".v4-opening-word.finance", { xPercent: -8, autoAlpha: 0.32, ease: "none" }, 0)
          .to(".v4-opening-word.data", { xPercent: 12, autoAlpha: 0.42, ease: "none" }, 0)
          .to(".v4-opening-word.judgment", { yPercent: -34, autoAlpha: 0.18, ease: "none" }, 0)
          .to(".v4-opening-caption, .v4-opening-signature", { y: -58, autoAlpha: 0.08, ease: "none" }, 0);

        const researchOpen = gsap.fromTo(
          ".v4-research-object .v4-research-title, .v4-research-object .v4-publication-meta, .v4-research-object .v4-annotations",
          { y: 78, autoAlpha: 0.55, scale: 0.985 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".v4-research-object",
              start: "top 78%",
              end: "top 26%",
              scrub: 0.8,
            },
          },
        );

        const practicePath = gsap.fromTo(
          ".v4-path-station, .v4-path-detail",
          { y: 56, autoAlpha: 0.5 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.055,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".v4-practice-path",
              start: "top 74%",
              end: "top 24%",
              scrub: 0.7,
            },
          },
        );

        return () => {
          openingPin.kill();
          openingExit.kill();
          researchOpen.kill();
          practicePath.kill();
        };
      });

      return () => mm.revert();
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

  return (
    <main className="v4-site" ref={rootRef}>
      <header className="v4-index-nav">
        <a className="v4-index-mark" href="#overview" aria-label="Yingbin Chen portfolio home">
          <img src={assetPath("favicon.svg")} alt="" aria-hidden="true" />
          <span>YC</span>
        </a>
        <nav aria-label="Primary navigation">
          {navItems[locale].map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="v4-language-toggle"
          type="button"
          onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
          aria-label="Switch language"
        >
          <Languages size={16} />
          <span>{locale === "zh" ? "EN" : "中文"}</span>
        </button>
      </header>

      <OpeningStatement assetPath={assetPath} locale={locale} />
      <ResearchObject assetPath={assetPath} locale={locale} />
      <PracticePathScene
        activeExperienceId={activeExperienceId}
        assetPath={assetPath}
        locale={locale}
        onSelectExperience={setActiveExperienceId}
      />
      <ClosingIndex locale={locale} />
    </main>
  );
}

export { App };
