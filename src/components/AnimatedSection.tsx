import { forwardRef, type ReactNode } from "react";
import { motion, useReducedMotion, type MotionStyle } from "motion/react";
import { getRevealVariants } from "../motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: MotionStyle;
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(function AnimatedSection(
  { children, className, id, style },
  ref,
) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      id={id}
      initial="hidden"
      ref={ref}
      style={style}
      variants={getRevealVariants(shouldReduceMotion)}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -8% 0px" }}
      whileInView="visible"
    >
      {children}
    </motion.section>
  );
});
