import { useId, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Reveal from "../ui/Reveal";
import { studyPath } from "../../lib/study";


function StudyEntry({ entry, index }) {
  const detailsId = useId();
  const [expanded, setExpanded] = useState(false);
  const hasDetails = entry.details?.length > 0;

  return (
    <Reveal
      as="li"
      delay={index * 100}
      className="relative grid gap-4 pb-10 last:pb-0 sm:gap-6 sm:pb-12 md:grid-cols-[auto_1fr] md:items-start md:gap-x-8 md:pb-16"
    >
      <div className="flex shrink-0 items-start md:pt-1">
        <img
          src={entry.logo.src}
          srcSet={entry.logo.srcSet}
          sizes={entry.logo.sizes}
          alt={entry.logoAlt}
          className="study-logo h-11 w-auto max-w-30 object-contain md:h-12"
          width={120}
          height={48}
          loading="lazy"
          decoding="async"
        />
      </div>

      <article
        className={`surface-panel p-6 md:p-8`}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-accent text-xs font-semibold tracking-wider uppercase">
            {entry.period}
          </p>
        </div>
        <h3 className="font-display text-ink mt-2 text-xl font-bold md:text-2xl">
          {entry.school}
        </h3>
        <p className="text-ink-soft mt-1 text-sm">{entry.place}</p>
        <p className="text-ink-muted mt-4 text-base leading-relaxed">
          {entry.degree}
        </p>

        {hasDetails && (
          <div className="mt-5">
            <button
              type="button"
              className="study-expand-trigger"
              aria-expanded={expanded}
              aria-controls={detailsId}
              onClick={() => setExpanded((open) => !open)}
            >
              <span>
                {expanded ? "Nascondi dettagli" : "Dettagli del percorso"}
              </span>
              <ChevronDownIcon
                className="ease-fluid h-4 w-4 shrink-0 transition-transform duration-(--duration-ui)"
                style={{ transform: expanded ? "rotate(180deg)" : undefined }}
                aria-hidden
              />
            </button>

            <div
              id={detailsId}
              className="expand-panel"
              data-open={expanded ? "true" : "false"}
              aria-hidden={!expanded}
              {...(!expanded ? { inert: "" } : {})}
            >
              <div className="expand-panel__inner">
                <ul className="expand-panel__content border-line/80 text-ink-muted mt-4 space-y-2 border-t pt-4 text-sm leading-relaxed">
                  {entry.details.map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <span
                        className="bg-accent mt-2 h-1 w-1 shrink-0 rounded-full"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </article>
    </Reveal>
  );
}

function StudyTimeline() {
  return (
    <section
      id="percorso"
      className="section-pad border-line bg-surface/50 scroll-mt-header border-y"
      aria-labelledby="study-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="section-label">Percorso</p>
          <h2 id="study-heading" className="section-heading mt-3">
            Formazione
          </h2>
          <p className="prose-body mt-6">
            Dal diploma IT al triennale in Computer Science: un percorso
            orientato allo sviluppo software e al lavoro in team.
          </p>
        </Reveal>

        <ol className="relative mt-10 space-y-0 md:mt-14">
          {studyPath.map((entry, index) => (
            <StudyEntry key={entry.id} entry={entry} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}

export default StudyTimeline;
