import { Link } from "react-router-dom";
import { siteNav, socialLinks, headerCta } from "../../lib/navigation";

function SiteFooter() {
  return (
    <footer
      id="contatti"
      className="scroll-mt-header border-t border-line bg-hero pb-[env(safe-area-inset-bottom,0px)] text-on-hero"
    >
      <div className="section-pad mx-auto max-w-6xl !py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              Fabio Tognarelli
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-on-hero/75">
              Studente di informatica a Pisa. Costruisco interfacce e software
              con attenzione al dettaglio e voglia di imparare sul campo.
            </p>
            <a
              href={headerCta.href}
              download={headerCta.href}
              className="btn-primary-on-dark mt-6 inline-flex text-sm"
            >
              Scarica CV
            </a>
          </div>

          <div>
            <p className="section-label !text-accent-glow">Navigazione</p>
            <ul className="mt-4 space-y-2 text-sm">
              {siteNav.map((item) =>
                item.type === "route" ? (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="motion-link text-on-hero/80 hover:text-on-hero"
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="motion-link text-on-hero/80 hover:text-on-hero"
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <p className="section-label !text-accent-glow">Contatti</p>
            <ul className="mt-4 space-y-3 text-sm text-on-hero/85">
              <li>
                <a
                  href="mailto:fabiotognaa@gmail.com"
                  className="motion-link hover:text-on-hero"
                >
                  fabiotognaa@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+393668381469"
                  className="motion-link hover:text-on-hero"
                >
                  +39 366 838 1469
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="motion-link text-sm font-medium text-accent-glow underline-offset-4 hover:text-on-hero hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-on-hero/15 pt-8 text-center text-xs text-on-hero/55 md:text-left">
          &copy; 2026 Fabio Tognarelli
        </p>
      </div>
    </footer>
  );
}

export default SiteFooter;
