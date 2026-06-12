import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const fieldNodes = [
  { className: "signal-field-node node-a" },
  { className: "signal-field-node node-b" },
  { className: "signal-field-node node-c" },
  { className: "signal-field-node node-d" },
  { className: "signal-field-node node-e" },
  { className: "signal-field-node node-f" },
];

export function SignalField() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.28], [0, -56]);
  const scale = useTransform(scrollYProgress, [0, 0.28], [1, 1.045]);
  const opacity = useTransform(scrollYProgress, [0, 0.32], [1, 0.42]);

  return (
    <motion.div
      aria-hidden="true"
      className="signal-field"
      style={shouldReduceMotion ? undefined : { opacity, scale, y }}
    >
      <span className="signal-field-plane plane-a" />
      <span className="signal-field-plane plane-b" />
      <span className="signal-field-line line-a" />
      <span className="signal-field-line line-b" />
      <span className="signal-field-line line-c" />
      {fieldNodes.map((node) => (
        <span className={node.className} key={node.className} />
      ))}
    </motion.div>
  );
}
