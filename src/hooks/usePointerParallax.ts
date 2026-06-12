import { useEffect, type RefObject } from "react";

export function usePointerParallax(ref: RefObject<HTMLElement | null>, disabled: boolean | null) {
  useEffect(() => {
    const element = ref.current;
    const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (!element || disabled || prefersCoarsePointer) {
      return;
    }

    let frame = 0;

    const update = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        element.style.setProperty("--pointer-x", x.toFixed(4));
        element.style.setProperty("--pointer-y", y.toFixed(4));
      });
    };

    const reset = () => {
      element.style.setProperty("--pointer-x", "0");
      element.style.setProperty("--pointer-y", "0");
    };

    element.addEventListener("pointermove", update);
    element.addEventListener("pointerleave", reset);
    reset();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", update);
      element.removeEventListener("pointerleave", reset);
    };
  }, [disabled, ref]);
}
