export const motionTiming = {
  ease: [0.22, 1, 0.36, 1],
  fast: 0.16,
  base: 0.32,
  slow: 0.62,
} as const;

export const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
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
  hidden: { opacity: 0 },
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
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
} as const;

export const cardReveal = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionTiming.fast,
      ease: motionTiming.ease,
    },
  },
} as const;

export const subtleHover = {
  y: -4,
  scale: 1.01,
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
