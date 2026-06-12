import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { getRevealVariants } from "../motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      id={id}
      initial="hidden"
      variants={getRevealVariants(shouldReduceMotion)}
      viewport={{ once: true, amount: 0.18 }}
      whileInView="visible"
    >
      {children}
    </motion.section>
  );
}
