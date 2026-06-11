import Button from "./Button";

function ProjectCard({ project, size = "default" }) {
  const { title, description, link, status } = project;
  const isComingSoon = status === "coming-soon" || !link;

  const sizeClass =
    size === "featured"
      ? "project-card--featured p-6 md:p-9 lg:p-10"
      : "p-6 md:p-8";

  return (
    <article
      className={`surface-panel motion-lift group flex h-full flex-col ${sizeClass}`}
    >
      <div>
        {isComingSoon && (
          <span className="bg-accent/15 text-accent-deep inline-block rounded-full px-3 py-1 text-xs font-semibold">
            In preparazione
          </span>
        )}
        <h3
          className={`font-display text-ink font-bold ${size === "featured" ? "mt-4 text-2xl md:text-3xl" : "mt-3 text-lg"}`}
        >
          {title}
        </h3>
        <p
          className={`text-ink-muted mt-3 leading-relaxed ${size === "featured" ? "text-base md:text-lg" : "text-sm"}`}
        >
          {description}
        </p>
      </div>

      <div className="mt-6">
        {link && !isComingSoon ? (
          <Button variant="ghost" href={link} className="text-sm">
            Apri progetto
          </Button>
        ) : (
          <span className="text-ink-soft text-sm font-medium">
            Case study in arrivo: screenshot, stack e repository
          </span>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
