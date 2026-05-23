import { useRef, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useHeaderScrollState } from "../../hooks/useHeaderScrollState";
import { siteNav, headerCta } from "../../lib/navigation";

function NavLink({ item, onNavigate, className }) {
  const base = className;

  if (item.type === "route") {
    return (
      <Link to={item.href} className={base} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} className={base} onClick={onNavigate}>
      {item.label}
    </a>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrolled = useHeaderScrollState();
  const closeButtonRef = useRef(null);
  const close = () => setOpen(false);

  const linkClass = "drawer-link";

  return (
    <header
      className="site-header"
      data-scrolled={scrolled ? "" : undefined}
    >
      <a href="#main-content" className="skip-link">
        Salta al contenuto
      </a>
      <div className="site-header__bar">
        <Link
          to="/"
          className="site-header__brand font-display text-lg font-bold tracking-tight text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Fabio Tognarelli
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navigazione principale"
        >
          {siteNav.map((item) => (
            <NavLink key={item.label} item={item} className="nav-link" />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={headerCta.href}
            download={headerCta.href}
            className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex"
          >
            {headerCta.label}
          </a>

          <button
            type="button"
            className="touch-target rounded-xl text-ink md:hidden"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Apri menu</span>
            <Bars3Icon className="h-7 w-7" aria-hidden />
          </button>
        </div>
      </div>

      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[60] md:hidden"
          onClose={close}
          initialFocus={closeButtonRef}
        >
          <TransitionChild
            as={Fragment}
            enter="drawer-backdrop-enter duration-[420ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="drawer-backdrop-enter duration-[300ms]"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-hero/40 backdrop-blur-sm"
              aria-hidden="true"
            />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <TransitionChild
                  as={Fragment}
                  enter="drawer-panel-enter duration-[420ms]"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="drawer-panel-enter duration-[300ms]"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel
                    id="mobile-menu"
                    aria-labelledby="mobile-menu-title"
                    className="mobile-drawer pointer-events-auto flex w-screen max-w-xs flex-col bg-surface shadow-2xl"
                  >
                    <div className="flex items-center justify-between border-b border-line/70 px-6 py-4">
                      <DialogTitle
                        id="mobile-menu-title"
                        className="font-display text-lg font-bold text-ink"
                      >
                        Menu
                      </DialogTitle>
                      <button
                        ref={closeButtonRef}
                        type="button"
                        className="touch-target rounded-xl text-ink"
                        onClick={close}
                      >
                        <span className="sr-only">Chiudi menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden />
                      </button>
                    </div>

                    <nav
                      className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-6"
                      aria-label="Navigazione mobile"
                    >
                      {siteNav.map((item) => (
                        <NavLink
                          key={item.label}
                          item={item}
                          onNavigate={close}
                          className={linkClass}
                        />
                      ))}
                      <a
                        href={headerCta.href}
                        download={headerCta.href}
                        className="btn-primary mt-4 w-full"
                        onClick={close}
                      >
                        {headerCta.label}
                      </a>
                    </nav>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}

export default SiteHeader;
