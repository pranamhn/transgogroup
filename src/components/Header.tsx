import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import type { Route } from "../data";
import { navigation } from "../data";
import { useScrolled, go } from "../hooks";
import { useLang } from "../i18n";

const SERVICE_HREFS: Route[] = ["/2w-fleet-operator", "/4w-fleet-operator", "/workshop", "/gps-service"];

export default function Header({ route }: { route: Route }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const nav = (href: Route) => { go(href); setOpen(false); setSvcOpen(false); };

  const serviceLinks = [
    { label: "2W Fleet Operator", sub: t.nav.twoWSub,     href: "/2w-fleet-operator" as Route },
    { label: "4W Fleet Operator", sub: t.nav.fourWSub,    href: "/4w-fleet-operator" as Route },
    { label: "Workshop",          sub: t.nav.workshopSub, href: "/workshop" as Route },
    { label: "GPS Service",       sub: t.nav.gpsSub,      href: "/gps-service" as Route },
  ];

  const navLabel = (href: Route, label: string) =>
    href === "/visi-2030" ? t.nav.visi2030 : label;

  return (
    <>
      <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
        <div className="header-inner">
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); nav("/"); }} className="brand">
            <span className="brand-name">TRANSGO GROUP</span>
          </a>

          {/* Desktop nav */}
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((n) =>
              n.href === "/2w-fleet-operator" ? (
                <div
                  key={n.href}
                  className="nav-dropdown-wrap"
                  onMouseEnter={() => setSvcOpen(true)}
                  onMouseLeave={() => setSvcOpen(false)}
                >
                  <a
                    href={n.href}
                    onClick={(e) => { e.preventDefault(); nav(n.href); }}
                    className={`nav-link nav-link--has-dropdown${SERVICE_HREFS.includes(route) ? " nav-link--active" : ""}`}
                  >
                    {n.label}
                    <ChevronDown size={13} className={`nav-chevron${svcOpen ? " nav-chevron--open" : ""}`} />
                  </a>
                  <div className={`nav-dropdown${svcOpen ? " nav-dropdown--open" : ""}`}>
                    {serviceLinks.map((s) => (
                      <a
                        key={s.href}
                        href={s.href}
                        onClick={(e) => { e.preventDefault(); nav(s.href); }}
                        className={`dropdown-item${route === s.href ? " dropdown-item--active" : ""}`}
                      >
                        <span className="dropdown-item-label">{s.label}</span>
                        <span className="dropdown-item-sub">{s.sub}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a key={n.href} href={n.href}
                  onClick={(e) => { e.preventDefault(); nav(n.href); }}
                  className={`nav-link${route === n.href ? " nav-link--active" : ""}`}>
                  {navLabel(n.href, n.label)}
                </a>
              )
            )}
          </nav>

          {/* Right */}
          <div className="header-right">
            <button
              className="lang-toggle"
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              aria-label="Switch language"
            >
              <span className={lang === "id" ? "lang-active" : ""}>ID</span>
              <span className="lang-sep">|</span>
              <span className={lang === "en" ? "lang-active" : ""}>EN</span>
            </button>
            <a href="/contact"
              onClick={(e) => { e.preventDefault(); nav("/contact"); }}
              className="btn-primary header-cta">
              {t.header.contact}
            </a>
            <button
              className="hamburger"
              onClick={() => setOpen(!open)}
              aria-label={open ? t.header.closeMenu : t.header.openMenu}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="mobile-nav" role="dialog" aria-label="Mobile navigation">
          <div className="mobile-nav-brand">
            <img src="/logo.svg" height={28} alt="Transgo Group Mobility" className="brand-logo" />
          </div>
          {navigation.map((n) => (
            <a key={n.href} href={n.href}
              className={`mobile-nav-link${route === n.href ? " active" : ""}`}
              onClick={(e) => { e.preventDefault(); nav(n.href); }}>
              {navLabel(n.href, n.label)}
              <span className="mobile-nav-arrow">→</span>
            </a>
          ))}
          <div className="mobile-lang-row">
            <button
              className={`mobile-lang-btn${lang === "id" ? " mobile-lang-btn--active" : ""}`}
              onClick={() => setLang("id")}
            >ID</button>
            <button
              className={`mobile-lang-btn${lang === "en" ? " mobile-lang-btn--active" : ""}`}
              onClick={() => setLang("en")}
            >EN</button>
          </div>
          <a href="/contact"
            className="mobile-nav-cta"
            onClick={(e) => { e.preventDefault(); nav("/contact"); }}>
            {t.header.contact}
          </a>
          <div className="mobile-nav-info">
            <span>{t.header.mobileInstagram}</span>
            <span>{t.header.mobileLinkedin}</span>
          </div>
        </div>
      )}
    </>
  );
}
