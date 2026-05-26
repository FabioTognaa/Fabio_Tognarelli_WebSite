import { useEffect, useRef, useState } from "react";
import { loadSkillIcon } from "../lib/skill-icons";

export function useLazySkillIcon(iconKey, enabled = true) {
  const [src, setSrc] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled || !iconKey) {
      setSrc(null);
      return undefined;
    }

    const node = ref.current;
    if (!node) {
      return undefined;
    }

    let cancelled = false;

    const load = () => {
      loadSkillIcon(iconKey).then((url) => {
        if (!cancelled && url) {
          setSrc(url);
        }
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      load();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [enabled, iconKey]);

  return { ref, src };
}
