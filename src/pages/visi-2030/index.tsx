import { BatteryCharging, Building2, ChartNoAxesCombined, Car, Landmark, Network, ShieldCheck, TrendingUp, Wrench } from "lucide-react";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";
import { useLang } from "../../i18n";
import { buildMetricSnapshot, useSiteMetrics } from "../../siteMetrics";

export default function Vision2030Page() {
  const { lang, t } = useLang();
  const { metrics } = useSiteMetrics();
  const vi = t.vision;
  const metricSnapshot = buildMetricSnapshot(metrics);
  const targetCopy = {
    current: lang === "id" ? "Saat ini" : "Current",
    target: "2030",
    growth: lang === "id" ? "Perubahan" : "Growth",
  };

  const pillarIcons = [
    <Network size={24} />, <BatteryCharging size={24} />, <Wrench size={24} />,
    <ChartNoAxesCombined size={24} />, <ShieldCheck size={24} />, <Building2 size={24} />,
  ];
  const targetIcons = [<Car size={28} />, <Landmark size={28} />, <TrendingUp size={28} />];

  return (
    <>
      <PageHero kicker={vi.heroKicker} title={vi.heroTitle} copy={vi.heroCopy} />

      <FadeSection className="section vision-hero-section">
        <div className="vision-signal-card">
          <div>
            <SectionLabel>{vi.signalLabel}</SectionLabel>
            <h2>{vi.signalH2}</h2>
            <p>{vi.signalP}</p>
          </div>
          <div className="vision-signal-metrics">
            <div><strong>{metrics.totalFleet}</strong><span>Current Fleet</span></div>
            <div><strong>{metrics.aum}</strong><span>Assets Managed</span></div>
            <div><strong>2030</strong><span>Platform Target</span></div>
          </div>
        </div>
      </FadeSection>

      {/* ── Target 2030 ──────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt vision-target-section">
        <div className="section-head">
          <SectionLabel>{vi.targetLabel}</SectionLabel>
          <h2>{vi.targetH2}</h2>
          <p className="section-sub">{vi.targetSub}</p>
        </div>
        <div className="vision-target-grid">
          {vi.targetItems.map((item, i) => {
            const liveTarget = metricSnapshot.targetItems[i];
            return (
            <article key={item.unit} className="vision-target-card">
              <div className="vision-target-card-hero">
                <div className="vision-target-card-top">
                  <div className="vision-target-icon">{targetIcons[i]}</div>
                  <span className="vision-target-index">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <span className="vision-target-eyebrow">{targetCopy.target}</span>
                  <div className="vision-target-value">{liveTarget?.value ?? item.value}</div>
                  <div className="vision-target-unit">{item.unit}</div>
                </div>
              </div>
              <div className="vision-target-card-body">
                <div className="vision-target-compare">
                  <div className="vision-target-step">
                    <span>{targetCopy.current}</span>
                    <strong>{liveTarget?.current ?? item.current}</strong>
                  </div>
                  <span className="vision-target-arrow" aria-hidden="true">→</span>
                  <div className="vision-target-step vision-target-step--growth">
                    <span>{targetCopy.growth}</span>
                    <strong>{liveTarget?.growth ?? item.growth}</strong>
                  </div>
                </div>
                <div className="vision-target-rail" aria-hidden="true">
                  <span />
                </div>
                <p className="vision-target-desc">{item.desc}</p>
              </div>
            </article>
          )})}
        </div>
        <p className="vision-target-note">{vi.targetNote}</p>
      </FadeSection>

      <FadeSection className="section vision-pillars-section">
        <div className="section-head">
          <SectionLabel>{vi.pillarsLabel}</SectionLabel>
          <h2>{vi.pillarsH2}</h2>
          <p className="section-sub">{vi.pillarsSub}</p>
        </div>
        <div className="vision-pillars-grid">
          {vi.pillarsItems.map((p, i) => (
            <article key={p.title} className="vision-pillar-card">
              <span className="vision-pillar-icon">{pillarIcons[i]}</span>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      <FadeSection className="section vision-roadmap-section">
        <div className="section-head">
          <SectionLabel>{vi.roadmapLabel}</SectionLabel>
          <h2>{vi.roadmapH2}</h2>
        </div>
        <div className="vision-roadmap">
          {vi.roadmapItems.map((m) => (
            <article key={m.year} className="vision-roadmap-card">
              <span>{m.year}</span>
              <h3>{m.title}</h3>
              <p>{m.copy}</p>
            </article>
          ))}
        </div>
      </FadeSection>
    </>
  );
}
