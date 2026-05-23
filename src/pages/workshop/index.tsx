import { BatteryCharging, ChartNoAxesCombined, CircleGauge, Fan, House, Wrench } from "lucide-react";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";
import { useLang } from "../../i18n";

export default function WorkshopPage() {
  const { t } = useLang();
  const ws = t.workshop;

  const svcIcons = [<Wrench size={30} />, <CircleGauge size={30} />, <Fan size={30} />, <BatteryCharging size={30} />, <House size={30} />, <ChartNoAxesCombined size={30} />];

  return (
    <>
      <PageHero kicker={ws.heroKicker} title={ws.heroTitle} copy={ws.heroCopy} />

      {/* ── Workshop hero card ────────────────────────────────────────────── */}
      <FadeSection className="section workshop-overview-section">
        <div className="workshop-hero">
          <div className="workshop-hero-text">
            <SectionLabel>{ws.overviewLabel}</SectionLabel>
            <h2>{ws.overviewH2}</h2>
            <p>{ws.overviewP}</p>
            <div className="workshop-stats">
              {ws.overviewStats.map((s) => (
                <div key={s.l} className="workshop-stat">
                  <span>{s.v}</span>
                  <p>{s.l}</p>
                </div>
              ))}
            </div>
            <p className="workshop-note">{ws.overviewNote}</p>
          </div>
          <div className="workshop-hero-img" />
        </div>
      </FadeSection>

      {/* ── Capabilities ──────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt workshop-caps-section">
        <div className="section-head">
          <SectionLabel>{ws.capsLabel}</SectionLabel>
          <h2>{ws.capsH2}</h2>
        </div>
        <div className="workshop-caps-grid">
          {ws.capsItems.map((w) => (
            <article key={w.code} className="workshop-cap">
              <span className="workshop-code">{w.code}</span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      {/* ── Service coverage ──────────────────────────────────────────────── */}
      <FadeSection className="section workshop-services-section">
        <div className="section-head">
          <SectionLabel>{ws.servicesLabel}</SectionLabel>
          <h2>{ws.servicesH2}</h2>
        </div>
        <div className="svc-grid">
          {ws.servicesItems.map((s, i) => (
            <article key={s.t} className="svc-card">
              <span className="svc-icon">{svcIcons[i]}</span>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
      </FadeSection>
    </>
  );
}
