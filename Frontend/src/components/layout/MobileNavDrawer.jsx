import { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { siteNav, headerCta } from "../../lib/navigation";

function MobileNavDrawer({ open, onClose }) {
  const closeButtonRef = useRef(null);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-60 md:hidden"
        onClose={onClose}
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
                      onClick={onClose}
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
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <a
                      href={headerCta.href}
                      download={headerCta.download}
                      className="btn-primary mt-4 w-full"
                      onClick={onClose}
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
  );
}

export default MobileNavDrawer;
