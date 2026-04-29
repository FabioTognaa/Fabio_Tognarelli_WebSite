//* CARD DEI LINGUAGGI DI PROGRAMMAZIONE SEZIONE SKILLS

function SkillCard({ skill }) {
  const { title, icons, description, tags } = skill;
  return (
    <div className="relative flex h-full flex-col rounded-lg p-6 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
      {/* Icone della card */}
      
        <div className="mb-4 flex items-center gap-3">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="transition-transform duration-200 hover:scale-110"
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="h-8 w-auto max-w-12 object-contain"
              />
            </div>
          ))}
        </div>
      

      {/* Title */}
      <h3 className="mb-10 text-xl font-bold tracking-tight text-[#0a2342]">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-10 leading-relaxed text-slate-700">
        {description}
      </p>

      {/* tags  */}
      <div className="mt-auto flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
              className="w-fit shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-medium whitespace-nowrap text-slate-700"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
export default SkillCard;
