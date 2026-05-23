import { go } from "../hooks";
import { useLang } from "../i18n";

export default function Footer() {
  const { t } = useLang();
  const ft = t.footer;

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <a href="/" onClick={(e) => { e.preventDefault(); go("/"); }} className="brand footer-logo">
            <img src="/logo.svg" height={36} alt="" className="brand-logo" />
            <span className="brand-name">TRANSGO</span>
          </a>
          <p className="footer-desc">{ft.desc}</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/transgogroup" target="_blank" rel="noreferrer" className="social-chip">
              Instagram @transgogroup
            </a>
            <a href="https://www.linkedin.com/company/transgo-group" target="_blank" rel="noreferrer" className="social-chip">
              LinkedIn Transgo Group
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div className="footer-col">
            <h4>{ft.colBusiness}</h4>
            {["Transgo Mobility", "EV Ride Mobility", "Transgo Garage", "Transgo GPS"].map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
          <div className="footer-col">
            <h4>{ft.colContact}</h4>
            <span>Instagram: @transgogroup</span>
            <span>LinkedIn: Transgo Group</span>
            <span>{ft.hours}</span>
            <span>Jl. Gatot Subroto No.18-20</span>
            <span>Setiabudi, Jakarta Selatan 12930</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{ft.copyright}</span>
        <span>{ft.tagline}</span>
      </div>
    </footer>
  );
}
