/**
 * Scheda singolo progetto per la pagina Projects.
 *
 * Mostra contesto, titolo, descrizione, stack tecnologico (con icone lazy-loaded)
 * e link a repository/demo. Se mancano link e lo status è "coming-soon",
 * compare un messaggio placeholder al posto dei pulsanti.
 */
import Button from "./Button";
import { useLazySkillIcon } from "../../hooks/useLazySkillIcon";

/** Badge stack: label + icona opzionale caricata solo quando entra in viewport. */
function StackTag({ item }) {
  const { ref, src } = useLazySkillIcon(item.icon, Boolean(item.icon));

  return (
    <span className="project-stack-tag">
      {item.icon ? (
        <span
          ref={ref}
          className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center opacity-80"
          aria-hidden
        >
          {src ? (
            <img
              src={src}
              alt=""
              className="h-full w-full object-contain"
              width={14}
              height={14}
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </span>
      ) : null}
      <span>{item.label}</span>
    </span>
  );
}

/** @param {{ project: import("../../lib/projects").projects[number] }} props */
function ProjectCard({ project }) {
  const { title, description, context, stack, github, link, mentions, status } =
    project;
  const isComingSoon = status === "coming-soon";
  const hasGithub = Boolean(github?.trim());
  const hasLink = Boolean(link?.trim());
  const mentionLinks = (mentions ?? []).filter(
    (mention) => mention.label?.trim() && mention.link?.trim(),
  );
  const hasActions = hasGithub || hasLink || mentionLinks.length > 0;

  return (
    <article className="project-card surface-panel motion-lift flex h-full flex-col p-6 md:p-8 lg:p-10">
      {/* Intestazione: meta (contesto, badge) + titolo + descrizione. */}
      <header className="project-card__header">
        <div className="flex flex-wrap items-center gap-3">
          <p className="project-card__context">{context}</p>
          {isComingSoon && (
            <span className="bg-accent/15 text-accent-deep inline-block rounded-full px-3 py-1 text-xs font-semibold">
              In preparazione
            </span>
          )}
        </div>
        <h3 className="font-display text-ink mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h3>
        <p className="text-ink-muted mt-4 text-base leading-relaxed md:text-lg">
          {description}
        </p>
      </header>

      {stack?.length > 0 && (
        <ul
          className="project-card__stack mt-6 flex flex-wrap gap-2"
          aria-label={`Stack: ${title}`}
        >
          {stack.map((item) => (
            <li key={item.label}>
              <StackTag item={item} />
            </li>
          ))}
        </ul>
      )}

      {/* Footer in fondo alla card: link esterni o testo placeholder. */}
      <footer className="project-card__actions mt-auto pt-8">
        {hasActions ? (
          <div className="flex flex-wrap gap-3">
            {hasGithub && (
              <Button variant="ghost" href={github} className="text-sm">
                Repository GitHub
              </Button>
            )}
            {hasLink && (
              <Button variant="ghost" href={link} className="text-sm">
                Visita il sito
              </Button>
            )}
            {mentionLinks.map((mention) => (
              <Button
                key={mention.link}
                variant="ghost"
                href={mention.link}
                className="text-sm"
              >
                {mention.label}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-ink-soft text-sm font-medium">
            Case study in arrivo: repository, demo e note tecniche.
          </p>
        )}
      </footer>
    </article>
  );
}

export default ProjectCard;
