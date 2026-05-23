import Button from "./Button";

function ProjectCard({ project, size = "default" }) {
  const { title, description, link, status } = project;
  const isComingSoon = status === "coming-soon" || !link;

  const sizeClass =
    size === "featured"
      ? "lg:col-span-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-between lg:p-10"
      : "p-6 md:p-8";

  return (
    <article
      className={`surface-panel motion-lift group flex h-full flex-col ${sizeClass}`}
    >
      <div>
        {isComingSoon && (
          <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-deep">
            In preparazione
          </span>
        )}
        <h3
          className={`font-display font-bold text-ink ${size === "featured" ? "mt-4 text-2xl md:text-3xl" : "mt-3 text-lg"}`}
        >
          {title}
        </h3>
        <p
          className={`mt-3 leading-relaxed text-ink-muted ${size === "featured" ? "text-base md:text-lg" : "text-sm"}`}
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
          <span className="text-sm font-medium text-ink-soft">
            Case study in arrivo: screenshot, stack e repository
          </span>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
