//* TITOLO DI OGNI SEZIONE

function SectionTitle({ label }) {
  const sectionId = label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <h2
      id={sectionId}
      className="mt-20 ml-8 scroll-mt-28 text-6xl font-light md:ml-16 md:text-7xl"
    >
      {label}
    </h2>
  );
}
export default SectionTitle;
