function ProjectCard({ project }) {
  const { title, description, link } = project;
  const workInProgress = title === "";

  if (workInProgress) {
    return (
      <div className="m-8 flex animate-pulse items-center justify-center rounded-lg border border-blue-900 p-10 text-xl font-medium text-blue-900 md:m-0 md:p-18">
        <p className="text-lg md:text-3xl">Work in progress...</p>
      </div>
    );
  }

  return (
    <div className="m-8 flex h-full flex-col justify-between rounded-lg p-6 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl md:m-0">
      <h3 className="mb-4 text-xl font-bold tracking-tight">{title}</h3>
      <p className="mb-6 leading-relaxed text-slate-700">{description}</p>

      {link ? (
        <a
          className="w-fit rounded-full border border-blue-300 px-4 py-1.5 text-sm font-semibold text-[#0a2342] transition-all duration-100 ease-linear hover:scale-105 hover:bg-blue-300 hover:text-gray-100"
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          Visita progetto
        </a>
      ) : null}
    </div>
  );
}
export default ProjectCard;
