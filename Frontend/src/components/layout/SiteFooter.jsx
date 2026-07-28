import { Link } from "react-router-dom";
import { siteNav, socialLinks, headerCta } from "../../lib/navigation";

function SiteFooter() {
  return (
    <footer
      id="contatti"
      className="scroll-mt-header border-line bg-hero text-on-hero border-t pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="section-pad mx-auto max-w-6xl py-16!">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              Fabio Tognarelli
            </p>
            <p className="text-on-hero/75 mt-3 max-w-sm text-sm leading-relaxed">
              Studente di informatica a Pisa. Costruisco interfacce e software
              con attenzione al dettaglio e voglia di imparare sul campo.
            </p>
            <a
              href={headerCta.href}
              download={headerCta.download}
              className="btn-primary-on-dark mt-6 inline-flex text-sm"
            >
              Scarica CV
            </a>
          </div>

          <div>
            <p className="section-label text-accent-glow!">Navigazione</p>
            <ul className="mt-4 space-y-2 text-sm">
              {siteNav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="motion-link text-on-hero/80 hover:text-on-hero"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label text-accent-glow!">Contatti</p>
            <ul className="text-on-hero/85 mt-4 space-y-3 text-sm">
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
                  className="motion-link text-accent-glow hover:text-on-hero text-sm font-medium underline-offset-4 hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="border-on-hero/15 text-on-hero/55 mt-12 border-t pt-8 text-center text-xs md:text-left">
          &copy; 2026 Fabio Tognarelli
        </p>
      </div>
    </footer>
  );
}

export default SiteFooter;
