import { useLazySkillIcon } from "../../hooks/useLazySkillIcon";

function SkillIcon({ iconKey }) {
  const { ref, src } = useLazySkillIcon(iconKey, Boolean(iconKey));

  if (!iconKey) {
    return null;
  }

  return (
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
  );
}

function SkillGroupCard({ group, featured = false }) {
  return (
    <article
      className={`skill-card surface-panel relative flex h-full flex-col overflow-hidden p-6 md:p-8`}
    >
      <header className="skill-card__header relative">
        <h3 className="skill-card__title">{group.title}</h3>
        <p className="skill-card__summary">{group.summary}</p>
      </header>

      <ul
        className="skill-card__tags relative mt-auto flex flex-wrap pt-5"
        aria-label={`Competenze: ${group.title}`}
      >
        {group.items.map((item) => {
          return (
            <li key={item.label}>
              <button type="button" className={`skill-tag motion-press`}>
                <SkillIcon iconKey={item.icon} />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default SkillGroupCard;
