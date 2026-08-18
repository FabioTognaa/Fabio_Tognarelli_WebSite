function CertificateCard({ certificate }) {
  return (
    <article className="skill-card surface-panel relative flex h-full flex-col overflow-hidden p-6 md:p-8">
      <header className="skill-card__header relative">
        <h2 className="skill-card__title">{certificate.title}</h2>
        {certificate.summary && (
          <p className="skill-card__summary">{certificate.summary}</p>
        )}
      </header>

      <ul
        className="skill-card__tags relative mt-auto flex flex-wrap pt-5"
        aria-label={`Certificati: ${certificate.title}`}
      >
        {certificate.links.map((link) => (
          <li key={link.href}>
            <a
              className="skill-tag hover:border-accent-glow transition-all duration-150 hover:-translate-y-1"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              type="application/pdf"
            >
              {link.label}
              <span className="sr-only">
                {" "}
                (PDF, si apre in una nuova scheda)
              </span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default CertificateCard;
