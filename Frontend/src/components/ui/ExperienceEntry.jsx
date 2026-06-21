import Reveal from "./Reveal";

function ExperienceEntry({ entry, index }) {
  const hasHighlights = entry.highlights?.length > 0;

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
          {entry.company}
        </h2>
        <p className="experience-role text-ink mt-2 text-base font-semibold md:text-lg">
          {entry.ruolo}
        </p>
        <p className="text-ink-soft mt-1 text-sm">{entry.place}</p>
        <p className="text-ink-muted mt-4 text-base leading-relaxed">
          {entry.summary}
        </p>

        {hasHighlights && (
          <ul className="border-line/80 text-ink-muted mt-5 space-y-2 border-t pt-4 text-sm leading-relaxed">
            {entry.highlights.map((line) => (
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

export default ExperienceEntry;
