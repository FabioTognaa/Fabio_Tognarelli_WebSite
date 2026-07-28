import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

function PageFallback() {
  return (
    <div
      className="section-pad mx-auto min-h-[50vh] max-w-6xl"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Caricamento pagina</span>
      <div className="bg-line/40 h-3 w-24 animate-pulse rounded-full" />
      <div className="bg-line/50 mt-4 h-10 w-2/3 max-w-md animate-pulse rounded-lg" />
      <div className="bg-line/30 mt-6 h-4 w-full max-w-lg animate-pulse rounded-full" />
      <div className="bg-line/30 mt-3 h-4 w-4/5 max-w-md animate-pulse rounded-full" />
    </div>
  );
}

function PageShell({ className = "" }) {
  const location = useLocation();

  return (
    <div className={`flex min-h-dvh flex-col ${className}`}>
      <a href="#main-content" className="skip-link">
        Vai al contenuto
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Suspense fallback={<PageFallback />}>
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}

export default PageShell;
