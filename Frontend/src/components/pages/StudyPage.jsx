import Reveal from "../ui/Reveal";
import { studyPath } from "../../lib/study";

function StudyEntry({ entry, index }) {
  const hasDetails = entry.details?.length > 0;

  return (
    <Reveal
      as="li"
      delay={index * 100}
      className="grid gap-4 sm:gap-6 md:grid-cols-[auto_1fr] md:items-start md:gap-x-8"
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

      <article className="surface-panel p-6 md:p-8">
        <p className="text-accent text-xs font-semibold tracking-wider uppercase">
          {entry.period}
        </p>
        <h2 className="font-display text-ink mt-2 text-xl font-bold md:text-2xl">
          {entry.school}
        </h2>
        <p className="text-ink-soft mt-1 text-sm">{entry.place}</p>
        <p className="text-ink-muted mt-4 text-base leading-relaxed">
          {entry.degree}
        </p>

        {hasDetails && (
          <ul className="border-line/80 text-ink-muted mt-5 space-y-2 border-t pt-4 text-sm leading-relaxed">
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
        )}
      </article>
    </Reveal>
  );
}

function StudyPage() {
  return (
    <section
      id="percorso"
      className="section-pad bg-surface/50 scroll-mt-header"
      aria-labelledby="study-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="section-label">Percorso</p>
          <h1 id="study-heading" className="section-heading mt-3">
            Formazione
          </h1>
          <p className="prose-body mt-6">
            Fin dalle scuole ho sempre saputo quelli che sarebbero stati i miei
            interessi futuri. Ho cercato di focalizzare da sempre il mio
            percorso di studi sull'informatica
          </p>
        </Reveal>

        <span className="mt-10 flex flex-col gap-10 md:mt-14 md:gap-16">
          {studyPath.map((entry, index) => (
            <StudyEntry key={entry.id} entry={entry} index={index} />
          ))}
        </span>
      </div>
    </section>
  );
}

export default StudyPage;
