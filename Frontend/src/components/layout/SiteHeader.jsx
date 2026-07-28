import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { useHeaderScrollState } from "../../hooks/useHeaderScrollState";
import { siteNav, headerCta } from "../../lib/navigation";

const MobileNavDrawer = lazy(() => import("./MobileNavDrawer"));

function MenuIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [drawerReady, setDrawerReady] = useState(false);
  const scrolled = useHeaderScrollState();
  const close = () => setOpen(false);
  const openMenu = () => {
    setDrawerReady(true);
    setOpen(true);
  };

  return (
    <>
      <header className="site-header" data-scrolled={scrolled ? "" : undefined}>
        <div className="site-header__bar">
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Navigazione principale"
          >
            {siteNav.map((item) => (
              <Link key={item.label} to={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={headerCta.href}
              download={headerCta.download}
              className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex"
            >
              {headerCta.label}
            </a>

            <button
              type="button"
              className="touch-target text-ink rounded-xl md:hidden"
              onClick={openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Apri menu</span>
              <MenuIcon className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      {drawerReady ? (
        <Suspense fallback={null}>
          <MobileNavDrawer open={open} onClose={close} />
        </Suspense>
      ) : null}
    </>
  );
}

export default SiteHeader;
