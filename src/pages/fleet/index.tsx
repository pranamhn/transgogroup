import { FadeSection, PageHero, SectionLabel } from "../../components/ui";
import PricingSection from "../../components/PricingSection";
import { useLang } from "../../i18n";
import { useSiteMetrics } from "../../siteMetrics";

export default function FleetPage() {
  const { t } = useLang();
  const { metrics } = useSiteMetrics();
  const fl = t.fleet;
  const overviewStats = [
    { v: metrics.iceCar, l: fl.overviewStats[0]?.l ?? "Mobil ICE" },
    { v: metrics.operatingCities, l: fl.overviewStats[1]?.l ?? "Kota Operasi" },
    { v: metrics.fleetModels, l: fl.overviewStats[2]?.l ?? "Model Armada" },
  ];

  return (
    <>
      <PageHero kicker={fl.heroKicker} title={fl.heroTitle} copy={fl.heroCopy} />

      {/* ── Fleet visual ──────────────────────────────────────────────────── */}
      <FadeSection className="section fleet-overview-section">
        <div className="fleet-board">
          <div className="fleet-photo">
            <div className="fleet-visual-grid" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
            <div className="fleet-route-line fleet-route-line--one" />
            <div className="fleet-route-line fleet-route-line--two" />
            <div className="fleet-signal-card">
              <span>{fl.utilLabel}</span>
              <strong>{fl.activeLabel}</strong>
            </div>
            <div className="fleet-photo-panel">
              <span>{fl.panelLabel}</span>
              <strong>{metrics.iceCar}</strong>
              <p>{fl.panelSub}</p>
            </div>
          </div>
          <div className="fleet-copy">
            <SectionLabel>{fl.overviewLabel}</SectionLabel>
            <h3>{fl.overviewH3}</h3>
            <ul className="feature-list">
              {fl.overviewFeatures.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <div className="fleet-stats-row">
              {overviewStats.map((s) => (
                <div key={s.l} className="fleet-mini-stat">
                  <span>{s.v}</span>
                  <p>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── Full pricing ──────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt fleet-pricing-section">
        <PricingSection showEvBand={false} />
      </FadeSection>

      {/* ── Fleet contact channel ─────────────────────────────────────────── */}
      <FadeSection className="section fleet-contact-section">
        <div className="fleet-contact-card">
          <div className="fleet-contact-copy">
            <SectionLabel>{fl.contactLabel}</SectionLabel>
            <h2>{fl.contactH2}</h2>
            <p>{fl.contactP}</p>
          </div>
          <div className="fleet-contact-actions">
            <a href="https://www.instagram.com/transgo.fleetpartner" target="_blank" rel="noreferrer" className="fleet-contact-link">
              <span>Instagram</span>
              <strong>@transgo.fleetpartner</strong>
            </a>
            <a href="https://wa.me/628211549384" target="_blank" rel="noreferrer" className="fleet-contact-link fleet-contact-link--wa">
              <span>WhatsApp</span>
              <strong>+62 821-1549-384</strong>
            </a>
          </div>
        </div>
      </FadeSection>

      {/* ── Fleet coverage ────────────────────────────────────────────────── */}
      <FadeSection className="section fleet-coverage-section">
        <div className="section-head">
          <SectionLabel>{fl.coverageLabel}</SectionLabel>
          <h2>{fl.coverageH2}</h2>
          <p className="section-sub">{fl.coverageSub}</p>
        </div>
        <div className="cities-grid">
          {["Jakarta", "Depok", "Tangerang", "Bekasi", "Bandung", "Semarang", "Yogyakarta", "Surabaya", "Malang", "Solo"].map((c) => (
            <div key={c} className="city-chip">{c}</div>
          ))}
        </div>
      </FadeSection>

      {/* ── Terms highlight ───────────────────────────────────────────────── */}
      <FadeSection className="section section--alt fleet-terms-section">
        <div className="section-head">
          <SectionLabel>{fl.termsLabel}</SectionLabel>
          <h2>{fl.termsH2}</h2>
          <p className="section-sub">{fl.termsSub}</p>
        </div>
        <div className="terms-grid">
          {fl.termsItems.map((term) => (
            <article key={term.t} className="term-card">
              <h4>{term.t}</h4>
              <p>{term.d}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      {/* ── Driver process ────────────────────────────────────────────────── */}
      <FadeSection className="section">
        <div className="process-wrap">
          <div className="section-head">
            <SectionLabel>{fl.processLabel}</SectionLabel>
            <h2>{fl.processH2}</h2>
          </div>
          <div className="process-grid">
            {fl.processSteps.map((s) => (
              <article key={s.step} className="process-card">
                <span className="process-step">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </FadeSection>
    </>
  );
}
