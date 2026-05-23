import { Activity, BarChart3, Bell, History, Map, Navigation, Smartphone } from "lucide-react";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";
import { useLang } from "../../i18n";
import { go } from "../../hooks";

const featureIcons: Record<string, React.ReactNode> = {
  map:      <Map size={24} />,
  geo:      <Navigation size={24} />,
  history:  <History size={24} />,
  behavior: <Activity size={24} />,
  alert:    <Bell size={24} />,
  report:   <BarChart3 size={24} />,
};

export default function GpsServicePage() {
  const { t } = useLang();
  const gps = t.gpsService;

  return (
    <>
      <PageHero kicker={gps.heroKicker} title={gps.heroTitle} copy={gps.heroCopy} />

      {/* ── Overview ──────────────────────────────────────────────────────── */}
      <FadeSection className="section gps-overview-section">
        <div className="gps-overview-card">
          <div className="gps-overview-text">
            <SectionLabel>{gps.overviewLabel}</SectionLabel>
            <h2>{gps.overviewH2}</h2>
            <p>{gps.overviewP}</p>
            <div className="gps-stats">
              {gps.overviewStats.map((s) => (
                <div key={s.l} className="gps-stat">
                  <strong>{s.v}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="gps-overview-visual">
            <div className="gps-map-mock">
              <Map size={48} />
              <div className="gps-ping gps-ping--1" />
              <div className="gps-ping gps-ping--2" />
              <div className="gps-ping gps-ping--3" />
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt gps-features-section">
        <div className="section-head">
          <SectionLabel>{gps.featuresLabel}</SectionLabel>
          <h2>{gps.featuresH2}</h2>
          <p className="section-sub">{gps.featuresSub}</p>
        </div>
        <div className="gps-features-grid">
          {gps.featuresItems.map((f) => (
            <article key={f.icon} className="gps-feature-card">
              <span className="gps-feature-icon">{featureIcons[f.icon]}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <FadeSection className="section gps-steps-section">
        <div className="section-head">
          <SectionLabel>{gps.stepsLabel}</SectionLabel>
          <h2>{gps.stepsH2}</h2>
        </div>
        <div className="gps-steps">
          {gps.stepsItems.map((s, i) => (
            <div key={s.title} className="gps-step">
              <div className="gps-step-num">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt gps-cta-section">
        <div className="gps-cta-card">
          <Smartphone size={32} className="gps-cta-icon" />
          <div>
            <SectionLabel>{gps.ctaLabel}</SectionLabel>
            <h2>{gps.ctaH2}</h2>
            <p>{gps.ctaP}</p>
          </div>
          <a
            href="/contact"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); go("/contact"); }}
          >
            {gps.ctaBtn}
          </a>
        </div>
      </FadeSection>
    </>
  );
}
