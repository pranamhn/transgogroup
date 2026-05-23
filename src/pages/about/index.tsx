import { BarChart3, Building2, Car, CircuitBoard, Eye, Gem, ShieldCheck, Target, TrendingUp, Wrench, Zap } from "lucide-react";
import { subBrands } from "../../data";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";
import { useLang } from "../../i18n";
import { buildMetricSnapshot, useSiteMetrics } from "../../siteMetrics";

export default function AboutPage() {
  const { t } = useLang();
  const { metrics } = useSiteMetrics();
  const ab = t.about;
  const metricSnapshot = buildMetricSnapshot(metrics);

  const proofIcons = [<Car size={22} />, <BarChart3 size={22} />, <Building2 size={22} />, <CircuitBoard size={22} />];
  const strengthIcons = [<TrendingUp size={24} />, <ShieldCheck size={24} />, <Wrench size={24} />, <Zap size={24} />];

  return (
    <>
      <PageHero kicker={ab.heroKicker} title={ab.heroTitle} copy={ab.heroCopy} />

      {/* ── Company story ─────────────────────────────────────────────────── */}
      <FadeSection className="section about-thesis-section">
        <div className="editorial-grid">
          <div className="editorial-heading">
            <SectionLabel>{ab.thesisLabel}</SectionLabel>
            <h2>{ab.thesisH2}</h2>
            <div className="about-signal-card">
              <span className="about-signal-kicker">{ab.thesisSignalKicker}</span>
              <strong>{metrics.aum}</strong>
              <p>{ab.thesisSignalDesc}</p>
              <div className="about-signal-split">
                <span>{metrics.evMotor} EV Motor</span>
                <span>{metrics.iceCar} ICE Car</span>
              </div>
            </div>
          </div>
          <div className="editorial-card">
            <p>{ab.thesisP1}</p>
            <p>{ab.thesisP2}</p>
            <div className="about-investor-note">
              <span>{ab.thesisNoteLabel}</span>
              <p>{ab.thesisNoteP}</p>
            </div>
            <div className="editorial-stats">
              {metricSnapshot.aboutStats.map((s) => (
                <div key={s.l} className="editorial-stat">
                  <span>{s.v}</span>
                  <p>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeSection>

      <FadeSection className="section section--alt about-proof-section">
        <div className="section-head">
          <SectionLabel>{ab.proofLabel}</SectionLabel>
          <h2>{ab.proofH2}</h2>
          <p className="section-sub">{ab.proofSub}</p>
        </div>
        <div className="about-proof-grid">
          {ab.proofItems.map((item, i) => {
            const liveProof = metricSnapshot.proofItems[i];
            return (
            <article key={item.label} className="about-proof-card">
              <span className="about-proof-icon">{proofIcons[i]}</span>
              <strong>{liveProof?.value ?? item.value}</strong>
              <h3>{liveProof?.label ?? item.label}</h3>
              <p>{item.copy}</p>
            </article>
          )})}
        </div>
      </FadeSection>

      <FadeSection className="section about-strength-section">
        <div className="about-strength-wrap">
          <div className="about-strength-copy">
            <SectionLabel>{ab.strengthLabel}</SectionLabel>
            <h2>{ab.strengthH2}</h2>
            <p>{ab.strengthP}</p>
          </div>
          <div className="about-strength-grid">
            {ab.strengthItems.map((item, i) => (
              <article key={item.title} className="about-strength-card">
                <span>{strengthIcons[i]}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Vision & Mission ──────────────────────────────────────────────── */}
      <FadeSection className="section section--alt about-vm-section">
        <div className="vm-grid">
          <article className="vm-card">
            <div className="vm-icon"><Eye size={30} /></div>
            <h3>{ab.visionTitle}</h3>
            <p>{ab.visionP}</p>
          </article>
          <article className="vm-card">
            <div className="vm-icon"><Target size={30} /></div>
            <h3>{ab.missionTitle}</h3>
            <ul>{ab.missionItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="vm-card">
            <div className="vm-icon"><Gem size={30} /></div>
            <h3>{ab.valueTitle}</h3>
            <ul>{ab.valueItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </FadeSection>

      {/* ── Ecosystem ─────────────────────────────────────────────────────── */}
      <FadeSection className="section about-ecosystem-section">
        <div className="section-head">
          <SectionLabel>{ab.ecoLabel}</SectionLabel>
          <h2>{ab.ecoH2}</h2>
          <p className="section-sub">{ab.ecoSub}</p>
        </div>
        <div className="ecosystem-grid">
          {subBrands.map((b) => (
            <div key={b} className="ecosystem-chip">{b}</div>
          ))}
        </div>
      </FadeSection>

      {/* ── Roadmap ───────────────────────────────────────────────────────── */}
      <FadeSection className="section about-roadmap-section">
        <div className="section-head">
          <SectionLabel>{ab.roadmapLabel}</SectionLabel>
          <h2>{ab.roadmapH2}</h2>
        </div>
        <div className="roadmap-track">
          {t.roadmap.map((r, i) => (
            <article key={r.period} className="roadmap-card">
              <div className="roadmap-index">{String(i + 1).padStart(2, "0")}</div>
              <span className="roadmap-period">{r.period}</span>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
            </article>
          ))}
        </div>
      </FadeSection>
    </>
  );
}
