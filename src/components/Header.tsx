import { useState } from "react";
import { Menu, X, CarFront } from "lucide-react";
import type { Route } from "../data";
import { navigation } from "../data";
import { useScrolled, go } from "../hooks";

export default function Header({ route }: { route: Route }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const nav = (href: Route) => { go(href); setOpen(false); };

  return (
    <>
      <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
        <div className="header-inner">
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); nav("/"); }} className="brand">
            <span className="brand-mark">
              <CarFront size={20} strokeWidth={2.4} />
            </span>
            <span className="brand-text">
              <strong>TRANSGO</strong>
              <small>Group Mobility</small>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((n) => (
              <a key={n.href} href={n.href}
                onClick={(e) => { e.preventDefault(); nav(n.href); }}
                className={`nav-link${route === n.href ? " nav-link--active" : ""}`}>
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="header-right">
            <a href="/contact"
              onClick={(e) => { e.preventDefault(); nav("/contact"); }}
              className="btn-primary header-cta">
              Hubungi Kami
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
            <span className="brand-mark">
              <CarFront size={18} strokeWidth={2.4} />
            </span>
            <span className="brand-text">
              <strong>TRANSGO</strong>
              <small>Group Mobility</small>
            </span>
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
            Hubungi Kami
          </a>
          <div className="mobile-nav-info">
            <span>+62-811-8118-894</span>
            <span>@transgo.id</span>
          </div>
        </div>
      )}
    </>
  );
}
