import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 32;

export function useHeaderScrollState() {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.scrollY > SCROLL_THRESHOLD;
  });

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const next = window.scrollY > SCROLL_THRESHOLD;
      setScrolled((prev) => (prev === next ? prev : next));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}
