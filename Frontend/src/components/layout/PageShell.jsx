import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

function PageShell({ children, className = "" }) {
  return (
    <div className={`flex min-h-dvh flex-col ${className}`}>
      <SiteHeader />
      <main id="main-content" className="flex-1 page-enter">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export default PageShell;
