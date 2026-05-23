import { useEffect, useRef } from "react";
import { go } from "../../hooks";
import { FadeSection, Badge, SectionLabel } from "../../components/ui";
import MarqueeTicker from "../../components/MarqueeTicker";
import PricingSection from "../../components/PricingSection";
import { useLang } from "../../i18n";
import { buildMetricSnapshot, useSiteMetrics } from "../../siteMetrics";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { t } = useLang();
  const { metrics } = useSiteMetrics();
  const metricSnapshot = buildMetricSnapshot(metrics);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    const timer = setTimeout(() => {
      if (!el) return;
      el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const statsLabels = [t.home.heroStatVehicles, "Motor EV", "Mobil ICE", "AUM"];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="hero-wrap">
        <div className="hero-bg-pattern" />
        <div className="hero-bg-radial" />
        <section ref={heroRef} className="hero-content">
          <Badge label="PT Transgo Group Mobility" />
          <h1 className="hero-h1">
            {t.home.heroLine1}<br />
            <span className="hero-accent">{t.home.heroLine2}</span><br />
            {t.home.heroLine3}
          </h1>
          <p className="hero-sub">{t.home.heroSub}</p>
          <div className="hero-actions">
            <a href="/4w-fleet-operator" onClick={(e) => { e.preventDefault(); go("/4w-fleet-operator"); }} className="btn-primary btn-lg">
              {t.home.heroBtnFleet}
            </a>
            <a href="/investor-partners" onClick={(e) => { e.preventDefault(); go("/investor-partners"); }} className="btn-outline btn-lg">
              {t.home.heroBtnInvestor}
            </a>
          </div>
          <div className="hero-stats">
            {metricSnapshot.heroStats.map((s, i) => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-val">{s.value}</span>
                <span className="hero-stat-label">{statsLabels[i] ?? s.label}</span>
                <span className="hero-stat-sub">{s.description}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Marquee ──────────────────────────────────────────────────────── */}
      <MarqueeTicker />

      {/* ── Business models ──────────────────────────────────────────────── */}
      <FadeSection className="biz-section">
        <div className="biz-section-inner">
          <div className="biz-section-head">
            <SectionLabel>{t.home.bizLabel}</SectionLabel>
            <h2>{t.home.bizH2a}<br />{t.home.bizH2b}</h2>
            <p className="section-sub">{t.home.bizSub}</p>
          </div>
          <div className="biz-grid">
            {t.businessModels.map((m, i) => {
              const liveModel = metricSnapshot.businessModels[i];
              return (
              <article
                key={m.code}
                className="biz-card"
                style={{ "--biz-color": i === 0 ? "#2B44CC" : i === 1 ? "#4A9EFF" : "#F59E0B" } as React.CSSProperties}
              >
                <div className="biz-card-top">
                  <span className="biz-code">{m.code}</span>
                </div>
                <div className="biz-stat">
                  <span className="biz-stat-num">{liveModel?.stat ?? m.stat}</span>
                  <span className="biz-stat-unit">{liveModel?.unit ?? m.unit}</span>
                </div>
                <div className="biz-card-body">
                  <h3 className="biz-title">{m.full}</h3>
                  <p className="biz-desc">{m.desc}</p>
                </div>
                <div className="biz-pillar-tag">{t.home.bizPillarTag} · 0{i + 1}</div>
              </article>
            )})}
          </div>
        </div>
      </FadeSection>

      {/* ── Investor highlight ──────────────────────────────────────────── */}
      <FadeSection className="investor-blue-section">
        <div className="investor-blue-card">
          <div className="investor-blue-copy">
            <SectionLabel>{t.home.investorLabel}</SectionLabel>
            <h2>{t.home.investorH2}</h2>
            <p>{t.home.investorP}</p>
            <div className="investor-blue-actions">
              <a href="/investor-partners" onClick={(e) => { e.preventDefault(); go("/investor-partners"); }} className="btn-primary btn-lg">
                {t.home.investorBtn}
              </a>
              <span>{t.home.investorTagline}</span>
            </div>
          </div>
          <div className="investor-blue-metrics" aria-label="Investor metrics">
            <div>
              <span className="investor-blue-value">{metrics.aum}</span>
              <span className="investor-blue-label">Assets Under Managed</span>
            </div>
            <div>
              <span className="investor-blue-value">{metrics.totalFleet}</span>
              <span className="investor-blue-label">Operating Vehicles</span>
            </div>
            <div>
              <span className="investor-blue-value">{metrics.evMotor}</span>
              <span className="investor-blue-label">EV Motor Units</span>
            </div>
            <div>
              <span className="investor-blue-value">{metrics.iceCar}</span>
              <span className="investor-blue-label">ICE Car Units</span>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── Milestones ───────────────────────────────────────────────────── */}
      <FadeSection className="section milestone-section">
        <div className="section-head">
          <SectionLabel>{t.home.milestonesLabel}</SectionLabel>
          <h2>{t.home.milestonesH2}</h2>
          <p className="section-sub">{t.home.milestonesSub}</p>
        </div>
        <div className="milestone-scroll" aria-label="Transgo milestones">
          <div className="milestone-track">
            {t.milestones.map((m, i) => (
              <article key={`${m.date}-${m.title}`} className="milestone-card">
                <div className="milestone-pin">
                  <span className="milestone-dot" />
                  <span className="milestone-index">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="milestone-body">
                  <span className="milestone-date">{m.date}</span>
                  <h4 className="milestone-title">{m.title}</h4>
                  <p className="milestone-desc">{m.desc}</p>
                  <div className="milestone-tags">
                    {m.fleet && <span className="milestone-fleet">{m.fleet} {t.home.milestonesUnit}</span>}
                    {m.partner && <span className="milestone-partner">{m.partner}</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Pricing preview ───────────────────────────────────────────────── */}
      <FadeSection className="section section--alt">
        <PricingSection preview />
      </FadeSection>

      {/* ── Partners ─────────────────────────────────────────────────────── */}
      <FadeSection className="section partner-section">
        <div className="section-head">
          <SectionLabel>{t.home.partnersLabel}</SectionLabel>
          <h2>{t.home.partnersH2}</h2>
        </div>
        <div className="partner-chips">
          {["Gojek", "Grab", "Maxim", "inDrive", "Maka Motors", "Tunas Rent", "Sun Motor", "Cakrawala"].map((p) => (
            <span key={p} className="partner-chip">{p}</span>
          ))}
        </div>
      </FadeSection>
    </>
  );
}
