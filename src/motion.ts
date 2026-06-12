export const motionTiming = {
  ease: [0.22, 1, 0.36, 1],
  fast: 0.16,
  base: 0.32,
  slow: 0.62,
} as const;

export const sectionReveal = {
  hidden: { opacity: 0.88, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTiming.slow,
      ease: motionTiming.ease,
    },
  },
} as const;

export const reducedSectionReveal = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionTiming.base,
      ease: motionTiming.ease,
    },
  },
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.015,
    },
  },
} as const;

export const cardReveal = {
  hidden: { opacity: 0.92, y: 10, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionTiming.base,
      ease: motionTiming.ease,
    },
  },
} as const;

export const reducedCardReveal = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionTiming.fast,
      ease: motionTiming.ease,
    },
  },
} as const;

export const subtleHover = {
  y: -5,
  scale: 1.012,
  transition: {
    duration: motionTiming.fast,
    ease: motionTiming.ease,
  },
} as const;

export function getRevealVariants(shouldReduceMotion: boolean | null) {
  return shouldReduceMotion ? reducedSectionReveal : sectionReveal;
}

export function getCardVariants(shouldReduceMotion: boolean | null) {
  return shouldReduceMotion ? reducedCardReveal : cardReveal;
}

export function getHoverMotion(shouldReduceMotion: boolean | null) {
  return shouldReduceMotion ? undefined : subtleHover;
}
