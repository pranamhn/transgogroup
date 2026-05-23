import { Activity, BarChart3, Bot, FileText, Gauge, Globe, Inbox, Map, Network, Search, Wrench, Zap } from "lucide-react";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";
import { useLang } from "../../i18n";
import { useSiteMetrics } from "../../siteMetrics";

const sevaFeatureIcons: Record<string, React.ReactNode> = {
  map:         <Map size={22} />,
  assign:      <Zap size={22} />,
  inspect:     <FileText size={22} />,
  payment:     <Activity size={22} />,
  maintenance: <Wrench size={22} />,
  report:      <BarChart3 size={22} />,
};

const flowquFeatureIcons: Record<string, React.ReactNode> = {
  scrape:   <Search size={22} />,
  ai:       <Bot size={22} />,
  chat:     <Inbox size={22} />,
  pipeline: <Gauge size={22} />,
};

export default function PlatformPage() {
  const { t } = useLang();
  const { metrics } = useSiteMetrics();
  const pl = t.platform;
  const overviewMetrics = pl.overviewMetrics.map((metric, i) => (
    i === 0 ? { ...metric, value: metrics.totalFleet } : metric
  ));

  return (
    <>
      <PageHero kicker={pl.heroKicker} title={pl.heroTitle} copy={pl.heroCopy} compact />

      {/* ── Overview metrics ─────────────────────────────────────────────── */}
      <FadeSection className="section platform-overview-section">
        <div className="section-head platform-overview-head">
          <SectionLabel>{pl.overviewLabel}</SectionLabel>
          <h2>{pl.overviewH2}</h2>
          <p className="section-sub">{pl.overviewP}</p>
        </div>
        <div className="platform-metric-grid">
          {overviewMetrics.map((m) => (
            <div key={m.label} className="platform-metric-card">
              <strong>{m.value}</strong>
              <span>{m.label}</span>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* ── SEVA Section ─────────────────────────────────────────────────── */}
      <FadeSection className="section platform-seva-section">
        <div className="platform-product-header">
          <div className="platform-product-badge seva">
            <span>sevaqu.com</span>
          </div>
          <SectionLabel>{pl.sevaLabel}</SectionLabel>
          <h2>{pl.sevaTagline}</h2>
          <p className="section-sub">{pl.sevaDesc}</p>
        </div>

        {/* SEVA Features grid */}
        <div className="platform-features-grid">
          {pl.sevaFeatures.map((f) => (
            <article key={f.title} className="platform-feature-card">
              <span className="platform-feature-icon seva-icon">{sevaFeatureIcons[f.icon]}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>

        {/* Products roadmap chips */}
        <div className="platform-products-row">
          <span className="platform-products-note">{pl.sevaProductsNote}</span>
          <div className="platform-products-chips">
            {pl.sevaProducts.map((prod, i) => (
              <span key={prod} className={`platform-prod-chip${i === 0 ? " platform-prod-chip--active" : ""}`}>
                {prod}
                {i > 0 && <em>Soon</em>}
              </span>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Before vs After ──────────────────────────────────────────────── */}
      <FadeSection className="section section--alt platform-compare-section">
        <div className="section-head">
          <SectionLabel>{pl.sevaCompareLabel}</SectionLabel>
          <h2>{pl.sevaCompareH2}</h2>
        </div>
        <div className="compare-panels">
          <div className="compare-panel compare-panel--before">
            <div className="compare-panel-header">
              <span className="compare-label compare-label--before">✗ Tanpa SEVA</span>
            </div>
            {pl.sevaCompare.map((row) => (
              <div key={row.aspect} className="compare-panel-item">
                <span className="compare-panel-aspect">{row.aspect}</span>
                <p className="compare-panel-text">{row.before}</p>
              </div>
            ))}
          </div>
          <div className="compare-panel compare-panel--after">
            <div className="compare-panel-header">
              <span className="compare-label compare-label--after">✓ Dengan SEVA</span>
            </div>
            {pl.sevaCompare.map((row) => (
              <div key={row.aspect} className="compare-panel-item">
                <span className="compare-panel-aspect">{row.aspect}</span>
                <p className="compare-panel-text">{row.after}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Flowqu Section ───────────────────────────────────────────────── */}
      <FadeSection className="section platform-flowqu-section">
        <div className="platform-product-header">
          <div className="platform-product-badge flowqu">
            <span>flowqu.com</span>
          </div>
          <SectionLabel>{pl.flowquLabel}</SectionLabel>
          <h2>{pl.flowquTagline}</h2>
          <p className="section-sub">{pl.flowquDesc}</p>
        </div>

        {/* Flowqu Features grid */}
        <div className="platform-features-grid">
          {pl.flowquFeatures.map((f) => (
            <article key={f.title} className="platform-feature-card">
              <span className="platform-feature-icon flowqu-icon">{flowquFeatureIcons[f.icon]}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>

        {/* Flowqu stats */}
        <div className="platform-flowqu-stats">
          {pl.flowquStats.map((s) => (
            <div key={s.label} className="platform-flowqu-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* ── Operating Flow ───────────────────────────────────────────────── */}
      <FadeSection className="section section--alt platform-flow-section">
        <div className="platform-flow-card">
          <div>
            <SectionLabel>{pl.flowLabel}</SectionLabel>
            <h2>{pl.flowH2}</h2>
            <p>{pl.flowP}</p>
          </div>
          <div className="platform-flow-list">
            {pl.flowSteps.map((item, index) => (
              <div key={item} className="platform-flow-item">
                <span className={index < 2 ? "platform-flow-tag flowqu-tag" : "platform-flow-tag seva-tag"}>
                  {index < 2 ? "Flowqu" : "SEVA"}
                </span>
                <div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Impact ───────────────────────────────────────────────────────── */}
      <FadeSection className="section platform-impact-section">
        <div className="platform-impact-card">
          <span className="platform-impact-icon"><Network size={26} /></span>
          <div>
            <SectionLabel>{pl.impactLabel}</SectionLabel>
            <h2>{pl.impactH2}</h2>
            <p>{pl.impactP}</p>
          </div>
          <div className="platform-impact-points">
            <span><Activity size={16} /> {pl.impactPoints[0]}</span>
            <span><BarChart3 size={16} /> {pl.impactPoints[1]}</span>
            <span><Globe size={16} /> {pl.impactPoints[2]}</span>
          </div>
        </div>
      </FadeSection>
    </>
  );
}
