import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenisScroll(disabled: boolean) {
  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isSmallViewport = window.matchMedia("(max-width: 860px)").matches;

    if (prefersCoarsePointer || isSmallViewport) return;

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, [disabled]);
}
