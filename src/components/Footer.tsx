import { CarFront } from "lucide-react";
import type { Route } from "../data";
import { navigation } from "../data";
import { go } from "../hooks";

export default function Footer({ route }: { route: Route }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="brand-mark footer-brand-mark">
              <CarFront size={18} strokeWidth={2.4} />
            </span>
            <div>
              <strong>TRANSGO GROUP MOBILITY</strong>
              <p>PT Transgo Mobility Rental</p>
            </div>
          </div>
          <p className="footer-desc">
            Platform rental armada untuk ekonomi ride-hailing Indonesia — mobil, motor listrik,
            dan bengkel full-service dalam satu ekosistem.
          </p>
          <div className="footer-social">
            <a href="https://www.instagram.com/transgo.id" target="_blank" rel="noreferrer" className="social-chip">
              Instagram @transgo.id
            </a>
            <a href="https://wa.me/6281181188894" target="_blank" rel="noreferrer" className="social-chip social-chip--wa">
              WhatsApp
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div className="footer-col">
            <h4>Platform</h4>
            {navigation.map((n) => (
              <a key={n.href} href={n.href}
                onClick={(e) => { e.preventDefault(); go(n.href); }}
                className={route === n.href ? "active" : ""}>
                {n.label}
              </a>
            ))}
          </div>
          <div className="footer-col">
            <h4>Unit Bisnis</h4>
            {["TMR", "EMR", "Transgo Garage", "Transgo EV", "Toprentcar.id",
              "Transgo Luxury", "Transgo Logistics"].map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
          <div className="footer-col">
            <h4>Kontak</h4>
            <span>+62-811-8118-894</span>
            <span>Jam Operasional: 08.00–21.00 WIB</span>
            <span>Jl. Gatot Subroto No.18-20</span>
            <span>Setiabudi, Jakarta Selatan 12930</span>
            <a href="mailto:info@transgo.id">info@transgo.id</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 PT Transgo Group Mobility. All rights reserved.</span>
        <span>Rental Mobil · Motor Listrik · Bengkel Fleet</span>
      </div>
    </footer>
  );
}
