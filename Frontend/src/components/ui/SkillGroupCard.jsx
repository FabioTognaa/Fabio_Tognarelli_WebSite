import { useLazySkillIcon } from "../../hooks/useLazySkillIcon";

function SkillIcon({ iconKey }) {
  const { ref, src } = useLazySkillIcon(iconKey, Boolean(iconKey));
  const isPhp = iconKey === "php";
  const size = isPhp ? 18 : 14;

  if (!iconKey) {
    return null;
  }

  return (
    <span
      ref={ref}
      className={`inline-flex shrink-0 items-center justify-center opacity-80 ${isPhp ? "h-[1.125rem] w-[1.125rem]" : "h-3.5 w-3.5"}`}
      aria-hidden
    >
      {src ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-contain"
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
        />
      ) : null}
    </span>
  );
}

function SkillGroupCard({ group }) {
  return (
    <article
      className={`skill-card surface-panel relative flex h-full flex-col overflow-hidden p-6 md:p-8`}
    >
      <header className="skill-card__header relative">
        <h2 className="skill-card__title">{group.title}</h2>
        <p className="skill-card__summary">{group.summary}</p>
      </header>

      <ul
        className="skill-card__tags relative mt-auto flex flex-wrap pt-5"
        aria-label={`Competenze: ${group.title}`}
      >
        {group.items.map((item) => {
          return (
            <li key={item.label}>
              <span className="skill-tag">
                <SkillIcon iconKey={item.icon} />
                <span>{item.label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default SkillGroupCard;
