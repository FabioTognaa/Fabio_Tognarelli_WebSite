/**
 * Carosello orizzontale dei progetti (scroll nativo + snap CSS).
 * L'indice attivo segue lo scroll via IntersectionObserver, non scroll events.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ProjectCard from "./ProjectCard";

// ID univoco dell'hint di accessibilità per chi usa il carosello progetti
const HINT_ID = "projects-carousel-hint";

// Selettore per individuare ogni slide/progetto all'interno del track (usato per scroll e observer)
const SLIDE_SELECTOR = "[data-slide-index]";

// Array di soglie di visibilità (0.0, 0.1, ..., 1.0) per l'IntersectionObserver,
// utile per capire "quanto" di ciascuno slide è visibile, in modo granulare (passi del 10%)
const VISIBILITY_THRESHOLDS = Array.from({ length: 11 }, (_, step) => step * 0.1);

//se si preferisce ridurre l'animazione
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

//funzione per selezionare una slide
function getSlides(track) {
  return [...track.querySelectorAll(SLIDE_SELECTOR)];
}

/** Indice dello slide con la maggior parte visibile nel track. */
function indexOfMostVisible(slides, visibilityBySlide) {
  let bestIndex = 0;
  let bestRatio = 0;

  slides.forEach((slide, index) => {
    const ratio = visibilityBySlide.get(slide) ?? 0;
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestIndex = index;
    }
  });

  return bestRatio > 0 ? bestIndex : null;
}

/** @param {{ projects: import("../../lib/projects").projects }} props */
function ProjectsCarousel({ projects }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const lastIndex = projects.length - 1;
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < lastIndex;

  const scrollToIndex = useCallback((index) => {
    const slide = trackRef.current?.querySelector(
      `${SLIDE_SELECTOR}[data-slide-index="${index}"]`,
    );
    if (!slide) return;

    slide.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || projects.length === 0) return;

    track.scrollLeft = 0;
    const resetFrame = requestAnimationFrame(() => setActiveIndex(0));

    const slides = getSlides(track);
    if (slides.length === 0) return;

    const visibilityBySlide = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityBySlide.set(entry.target, entry.intersectionRatio);
        });

        const nextIndex = indexOfMostVisible(slides, visibilityBySlide);
        if (nextIndex !== null) {
          setActiveIndex(nextIndex);
        }
      },
      { root: track, threshold: VISIBILITY_THRESHOLDS },
    );

    slides.forEach((slide) => observer.observe(slide));

    return () => {
      cancelAnimationFrame(resetFrame);
      observer.disconnect();
    };
  }, [projects.length]);

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft" && canGoPrev) {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
      return;
    }

    if (event.key === "ArrowRight" && canGoNext) {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    }
  }

  return (
    <div className="projects-carousel">
      <div
        ref={trackRef}
        className="projects-carousel__track"
        role="list"
        aria-label="Elenco progetti"
        tabIndex={0}
        aria-describedby={HINT_ID}
        onKeyDown={handleKeyDown}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="projects-carousel__slide"
            role="listitem"
            data-slide-index={index}
            aria-current={index === activeIndex ? "true" : undefined}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="projects-carousel__controls">
        <div className="projects-carousel__nav">
          <button
            type="button"
            className="projects-carousel__btn motion-press"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={!canGoPrev}
            aria-label="Progetto precedente"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            className="projects-carousel__btn motion-press"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={!canGoNext}
            aria-label="Progetto successivo"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <p
          className="projects-carousel__counter text-ink-soft font-display text-sm font-semibold tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="sr-only">Progetto </span>
          {activeIndex + 1}
          <span aria-hidden="true"> / </span>
          <span className="sr-only"> di </span>
          {projects.length}
        </p>
      </div>

      <p
        className="projects-carousel__hint text-ink-soft text-sm"
        id={HINT_ID}
      >
        Scorri orizzontalmente.
      </p>
    </div>
  );
}

export default ProjectsCarousel;
