import { useEffect, useRef, useState } from "react";
import { observeReveal } from "../../lib/revealObserver";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  once = true,
  ...props
}) {
  const Component = as;
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const node = ref.current;
    if (!node) return;

    let unobserve = () => {};
    unobserve = observeReveal(node, (isIntersecting) => {
      if (isIntersecting) {
        setVisible(true);
        if (once) unobserve();
      } else if (!once) {
        setVisible(false);
      }
    });
    return unobserve;
  }, [once]);

  return (
    <Component
      ref={ref}
      className={`reveal-scroll${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Reveal;
