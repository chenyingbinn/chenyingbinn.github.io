import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Locale } from "../profile";

const bridgeCopy = {
  zh: {
    from: "Signal Field",
    middle: "研究方法",
    to: "Publication Archive",
    note: "从数据与判断的信号场，进入可验证的研究档案。",
  },
  en: {
    from: "Signal Field",
    middle: "Method Grounding",
    to: "Publication Archive",
    note: "From a field of signals and judgment into a verifiable research archive.",
  },
} satisfies Record<Locale, Record<string, string>>;

export function NarrativeBridge({ locale }: { locale: Locale }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.02, 0.24], [28, -18]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.24], [0.64, 1, 0.78]);
  const copy = bridgeCopy[locale];

  return (
    <motion.div
      aria-hidden="true"
      className="hero-research-bridge"
      style={shouldReduceMotion ? undefined : { opacity, y }}
    >
      <span className="bridge-trail trail-a" />
      <span className="bridge-trail trail-b" />
      <div className="bridge-copy">
        <span>{copy.from}</span>
        <i />
        <span>{copy.middle}</span>
        <i />
        <span>{copy.to}</span>
      </div>
      <p>{copy.note}</p>
    </motion.div>
  );
}
