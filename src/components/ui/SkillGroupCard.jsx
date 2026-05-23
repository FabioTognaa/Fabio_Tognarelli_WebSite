import { skillKey } from "../../lib/skills";
import { useLazySkillIcon } from "../../hooks/useLazySkillIcon";

function SkillIcon({ iconKey, className, width, height }) {
  const { ref, src } = useLazySkillIcon(iconKey, Boolean(iconKey));

  return (
    <span
      ref={ref}
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      aria-hidden
    >
      {src ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-contain"
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      ) : null}
    </span>
  );
}

function SkillTag({
  item,
  groupId,
  variant,
  showIcon,
  isActive,
  onSelect,
}) {
  const isFeatured = variant === "featured";
  const key = skillKey(groupId, item.label);

  return (
    <li>
      <button
        type="button"
        className={`skill-tag motion-press${isActive ? " skill-tag--active" : ""}${
          isFeatured ? " skill-tag--featured" : ""
        }`}
        aria-pressed={isActive}
        onClick={() => onSelect(key, item)}
      >
        {showIcon && item.icon && (
          <SkillIcon
            iconKey={item.icon}
            className={isFeatured ? "h-4 w-4 opacity-80" : "h-3.5 w-3.5 opacity-80"}
            width={16}
            height={16}
          />
        )}
        <span>{item.label}</span>
      </button>
    </li>
  );
}

function SkillGroupCard({
  group,
  variant = "compact",
  activeSkillKey,
  onSkillSelect,
}) {
  const isFeatured = variant === "featured";
  const featuredIcons = group.items
    .map((item) => item.icon)
    .filter(Boolean)
    .slice(0, 5);

  const activeItem = group.items.find(
    (item) => skillKey(group.id, item.label) === activeSkillKey,
  );

  return (
    <article
      className={`skill-card skill-card--${group.id} surface-panel group relative flex h-full flex-col overflow-hidden ${
        isFeatured
          ? "justify-between p-8 md:p-10"
          : "flex-1 p-6 md:p-8"
      }`}
    >
      <div
        className="skill-card__glow pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <h3
            className={`font-display font-bold text-ink ${
              isFeatured ? "text-2xl md:text-3xl" : "text-lg"
            }`}
          >
            {group.title}
          </h3>

          {isFeatured && featuredIcons.length > 0 && (
            <ul
              className="flex shrink-0 gap-1.5 opacity-90"
              aria-label="Tecnologie principali"
            >
              {featuredIcons.map((iconKey) => (
                <li key={iconKey}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line/80 bg-surface/90">
                    <SkillIcon iconKey={iconKey} className="h-5 w-5" width={20} height={20} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p
          className={`leading-relaxed text-ink-muted ${
            isFeatured ? "mt-3 max-w-prose text-base" : "mt-2 text-sm"
          }`}
        >
          {group.summary}
        </p>

        {activeItem && (
          <p
            className="skill-insight mt-4"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="font-semibold text-accent">{activeItem.label}</span>
            <span className="text-ink-muted"> · {activeItem.hint}</span>
          </p>
        )}
      </div>

      <ul
        className={`relative flex flex-wrap gap-2 ${isFeatured ? "mt-8" : activeItem ? "mt-5" : "mt-5"}`}
        aria-label={`Competenze: ${group.title}`}
      >
        {group.items.map((item) => (
          <SkillTag
            key={item.label}
            item={item}
            groupId={group.id}
            variant={variant}
            showIcon={!isFeatured}
            isActive={skillKey(group.id, item.label) === activeSkillKey}
            onSelect={onSkillSelect}
          />
        ))}
      </ul>
    </article>
  );
}

export default SkillGroupCard;
