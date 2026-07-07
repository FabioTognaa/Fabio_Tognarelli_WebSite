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

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrolled = useHeaderScrollState();
  const closeButtonRef = useRef(null);
  const close = () => setOpen(false);

  return (
    <>
      <header className="site-header" data-scrolled={scrolled ? "" : undefined}>
        <div className="site-header__bar">
          {/* Lista di NavLink per la navigazione principale */}
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
              download={headerCta.href}
              className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex"
            >
              {headerCta.label}
            </a>

            <button
              type="button"
              className="touch-target text-ink rounded-xl md:hidden"
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
            className="relative z-60 md:hidden"
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
                className="bg-hero/40 fixed inset-0 backdrop-blur-sm"
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
                      className="mobile-drawer bg-surface pointer-events-auto flex w-screen max-w-xs flex-col shadow-2xl"
                    >
                      <div className="border-line/70 flex items-center justify-between border-b px-6 py-4">
                        <DialogTitle
                          id="mobile-menu-title"
                          className="font-display text-ink text-lg font-bold"
                        >
                          Menu
                        </DialogTitle>
                        <button
                          ref={closeButtonRef}
                          type="button"
                          className="touch-target text-ink rounded-xl"
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
                          <Link
                            key={item.label}
                            to={item.href}
                            className="drawer-link"
                            onClick={close}
                          >
                            {item.label}
                          </Link>
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
    </>
  );
}

export default SiteHeader;
