function SchoolCard({ school, title, date, descr }) {
  //* CARD PER LA SCUOLA DELLA SEZIONE PERCORSO STUDI

  return (
    <div className="mb-12 flex flex-1 flex-col items-start gap-0 rounded-lg bg-transparent p-4 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl/20 md:mb-0 md:flex-row md:gap-10 md:p-6">
      <img
        src={school}
        alt="school logo"
        className="my-0 mb-4 ml-0 h-16 w-auto md:mb-0 md:h-full md:w-1/5"
      />
      <div>
        <h3 className="text-xl md:text-3xl">{title}</h3>
        <p className="mt-1 text-sm font-semibold md:text-base">{date}</p>
        <p className="mt-2 text-base font-light md:text-lg">{descr}</p>
      </div>
    </div>
  );
}
export default SchoolCard;
