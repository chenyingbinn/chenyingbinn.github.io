import type { MotionValue } from "motion/react";
import { motion, useReducedMotion } from "motion/react";

interface ScrollSignalProps {
  progress: MotionValue<number>;
}

export function ScrollSignal({ progress }: ScrollSignalProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="scroll-signal" aria-hidden="true">
      <motion.span style={shouldReduceMotion ? undefined : { scaleY: progress }} />
    </div>
  );
}
