/**
 * Carosello orizzontale dei progetti.
 *
 * Ogni slide contiene un ProjectCard. L'utente può scorrere con touch/trackpad,
 * con i pulsanti prev/next o con le frecce ← → quando il track ha il focus.
 *
 * Architettura dello stato "attivo":
 * - `activeIndex` è l'unica fonte di verità per controlli UI (frecce, contatore, aria-current).
 * - Viene aggiornato da IntersectionObserver, non da scroll events: così resta corretto
 *   anche con scroll nativo, momentum touch e CSS scroll-snap senza dover calcolare offset.
 * - La navigazione programmatica (pulsanti/tastiera) usa scrollIntoView; l'observer
 *   aggiorna poi activeIndex quando lo slide entra in vista.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ProjectCard from "./ProjectCard";

/**
 * Rispetta prefers-reduced-motion per scroll programmatico.
 * Con "reduce" attivo evitiamo animazioni smooth che possono causare disagio.
 */
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** @param {{ projects: import("../../lib/projects").projects }} props */
function ProjectsCarousel({ projects }) {
  /** Elemento scrollabile che funge anche da root per IntersectionObserver. */
  const trackRef = useRef(null);
  /**
   * Ref per ogni slide, indicizzate come l'array projects.
   * Array mutabile: la callback ref in map() scrive slideRefs.current[index].
   */
  const slideRefs = useRef([]);
  /** Indice dello slide attualmente più visibile nel viewport del track. */
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * Porta in vista lo slide all'indice dato (pulsanti, tastiera).
   * `inline: "start"` allinea lo slide al bordo sinistro del track (coerente con scroll-snap).
   * `block: "nearest"` evita scroll verticale indesiderato se la pagina è scrollata.
   */
  const scrollToIndex = useCallback((index) => {
    const slide = slideRefs.current[index];
    if (!slide) return;

    slide.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  }, []);

  /**
   * Sincronizza activeIndex con lo scroll reale del track.
   *
   * Perché IntersectionObserver e non scrollLeft / scroll events:
   * - scrollLeft richiede di conoscere la larghezza di ogni slide (fragile con responsive).
   * - scroll events non dicono quale slide è "attivo", solo che qualcosa si è mosso.
   * - l'observer restituisce intersectionRatio per ogni slide rispetto al root (il track).
   *
   * La Map `ratios` accumula l'ultimo ratio noto per slide: l'observer notifica
   * solo le entry cambiate, quindi dobbiamo conservare i valori precedenti degli altri.
   *
   * Si ri-esegue quando cambia projects.length (nuovo elenco o mount): resetta scroll
   * e observer per evitare ref stale o indice fuori range.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = slideRefs.current.filter(Boolean);
    if (slides.length === 0) return;

    // Torna al primo progetto quando l'elenco cambia (es. filtri futuri).
    track.scrollLeft = 0;
    setActiveIndex(0);

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        // Aggiorna solo le entry che hanno cambiato intersezione in questo batch.
        entries.forEach((entry) => {
          ratios.set(entry.target, entry.intersectionRatio);
        });

        // Lo slide "attivo" è quello con ratio massimo = maggior parte visibile.
        let bestIndex = 0;
        let bestRatio = 0;

        slides.forEach((slide, index) => {
          const ratio = ratios.get(slide) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });

        // Evita di azzerare l'indice durante transizioni in cui nessuno è visibile.
        if (bestRatio > 0) {
          setActiveIndex(bestIndex);
        }
      },
      {
        root: track,
        // 11 soglie (0, 0.1, …, 1): il default [0] aggiornerebbe solo entrata/uscita totale.
        threshold: Array.from({ length: 11 }, (_, step) => step * 0.1),
      },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [projects.length]);

  /**
   * Navigazione da tastiera sul track (tabIndex={0}).
   * preventDefault evita lo scroll orizzontale nativo del browser sullo stesso tasto.
   */
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(Math.max(0, activeIndex - 1));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(Math.min(projects.length - 1, activeIndex + 1));
    }
  };

  /** Disabilita i pulsanti ai bordi invece di fare scroll a vuoto. */
  const canScrollPrev = activeIndex > 0;
  const canScrollNext = activeIndex < projects.length - 1;

  return (
    <div className="projects-carousel">
      {/*
        Track scrollabile orizzontalmente (overflow-x in CSS).
        tabIndex={0} lo rende focusabile: necessario per onKeyDown e per screen reader
        che devono sapere dove si trova il carosello nella tab order.
      */}
      <div
        ref={trackRef}
        className="projects-carousel__track"
        role="list"
        aria-label="Elenco progetti"
        tabIndex={0}
        aria-describedby="projects-carousel-hint"
        onKeyDown={handleKeyDown}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(node) => {
              // Callback ref: mantiene slideRefs allineato all'ordine di projects.map.
              slideRefs.current[index] = node;
            }}
            className="projects-carousel__slide"
            role="listitem"
            data-project-slide={index}
            // aria-current segnala agli AT quale progetto è in primo piano.
            aria-current={index === activeIndex ? "true" : undefined}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Controlli sotto il track: alternativa esplicita allo scroll gesture. */}
      <div className="projects-carousel__controls">
        <div className="projects-carousel__nav">
          <button
            type="button"
            className="projects-carousel__btn motion-press"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={!canScrollPrev}
            aria-label="Progetto precedente"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            className="projects-carousel__btn motion-press"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={!canScrollNext}
            aria-label="Progetto successivo"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {/*
          Contatore visivo "2 / 5" con annuncio accessibile:
          - aria-live="polite" legge il cambio senza interrompere la lettura in corso.
          - sr-only ricostruisce una frase ("Progetto 2 di 5") nascondendo la barra visiva.
          - tabular-nums evita salti di layout quando cambiano le cifre.
        */}
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

      {/* Hint collegato al track via aria-describedby (istruzioni per touch e tastiera). */}
      <p
        className="projects-carousel__hint text-ink-soft text-sm"
        id="projects-carousel-hint"
      >
        Scorri orizzontalmente.
      </p>
    </div>
  );
}

export default ProjectsCarousel;
