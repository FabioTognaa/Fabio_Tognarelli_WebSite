const REVEAL_OPTIONS = { threshold: 0.14, rootMargin: "0px 0px -6% 0px" };

/** @type {IntersectionObserver | null} */
let observer = null;

/** @type {Map<Element, (visible: boolean) => void>} */
const listeners = new Map();

function ensureObserver() {
  if (observer || typeof window === "undefined") return observer;

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const notify = listeners.get(entry.target);
      if (notify) notify(entry.isIntersecting);
    }
  }, REVEAL_OPTIONS);

  return observer;
}

export function observeReveal(node, onVisible) {
  const io = ensureObserver();
  if (!io) return () => {};

  listeners.set(node, onVisible);
  io.observe(node);

  return () => {
    listeners.delete(node);
    io.unobserve(node);
    if (listeners.size === 0) {
      io.disconnect();
      observer = null;
    }
  };
}
