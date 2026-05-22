import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import type { Route } from "../data";
import { navigation } from "../data";
import { useScrolled, go } from "../hooks";

const SERVICE_LINKS: { label: string; sub: string; href: Route }[] = [
  { label: "2W Fleet Operator", sub: "Motor EV untuk ojol & kurir", href: "/2w-fleet-operator" },
  { label: "4W Fleet Operator", sub: "Mobil untuk driver online", href: "/4w-fleet-operator" },
  { label: "Workshop",      sub: "Servis & perawatan fleet",      href: "/workshop"  },
];

export default function Header({ route }: { route: Route }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);

  const nav = (href: Route) => { go(href); setOpen(false); setSvcOpen(false); };

  return (
    <>
      <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
        <div className="header-inner">
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); nav("/"); }} className="brand">
            <img src="/logo.svg" height={36} alt="" className="brand-logo" />
            <span className="brand-name">TRANSGO</span>
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
                    className={`nav-link nav-link--has-dropdown${route === n.href ? " nav-link--active" : ""}`}
                  >
                    {n.label}
                    <ChevronDown size={13} className={`nav-chevron${svcOpen ? " nav-chevron--open" : ""}`} />
                  </a>
                  <div className={`nav-dropdown${svcOpen ? " nav-dropdown--open" : ""}`}>
                    {SERVICE_LINKS.map((s) => (
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
                  {n.label}
                </a>
              )
            )}
          </nav>

          {/* Right */}
          <div className="header-right">
            <a href="/contact"
              onClick={(e) => { e.preventDefault(); nav("/contact"); }}
              className="btn-primary header-cta">
              Hubungi
            </a>
            <button
              className="hamburger"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Tutup menu" : "Buka menu"}
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
              {n.label}
              <span className="mobile-nav-arrow">→</span>
            </a>
          ))}
          <a href="/contact"
            className="mobile-nav-cta"
            onClick={(e) => { e.preventDefault(); nav("/contact"); }}>
            Hubungi
          </a>
          <div className="mobile-nav-info">
            <span>@transgogroup</span>
            <span>LinkedIn: Transgo Group</span>
          </div>
        </div>
      )}
    </>
  );
}
