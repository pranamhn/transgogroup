import { useState } from "react";
import { evPackages } from "../../data";
import { go } from "../../hooks";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";
import { useLang } from "../../i18n";
import { buildMetricSnapshot, useSiteMetrics } from "../../siteMetrics";

export default function InvestorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useLang();
  const { metrics } = useSiteMetrics();
  const iv = t.investor;
  const metricSnapshot = buildMetricSnapshot(metrics);

  return (
    <>
      <PageHero kicker={iv.heroKicker} title={iv.heroTitle} copy={iv.heroCopy} />

      {/* ── Metric wall ───────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt investor-metrics-section">
        <div className="metric-wall">
          {metricSnapshot.investorMetrics.map((m, i) => (
            <article key={m.label} className="metric-card metric-card--blue">
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{i === 3 ? iv.metricsMarketingLabel : m.label}</span>
              <p>{iv.metricsDescs[i]}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      {/* ── Investor thesis ───────────────────────────────────────────────── */}
      <FadeSection className="section investor-thesis-section">
        <div className="section-head">
          <SectionLabel>{iv.thesisLabel}</SectionLabel>
          <h2>{iv.thesisH2}</h2>
          <p className="section-sub">{iv.thesisSub}</p>
        </div>
        <div className="thesis-grid">
          {iv.thesisItems.map((th) => (
            <article key={th.t} className="thesis-card">
              <h3>{th.t}</h3>
              <p>{th.d}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      {/* ── EV Investment Program ─────────────────────────────────────────── */}
      <FadeSection className="section section--blue-tint investor-ev-section" id="ev-investment">
        <div className="section-head">
          <SectionLabel>{iv.evLabel}</SectionLabel>
          <h2>{iv.evH2}</h2>
          <p className="section-sub">{iv.evSub}</p>
        </div>

        {/* How it works */}
        <div className="ev-how-grid">
          {iv.evSteps.map((s) => (
            <div key={s.step} className="ev-how-card">
              <span className="ev-how-step">{s.step}</span>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Packages */}
        <div className="ev-pkg-grid">
          {evPackages.map((p) => (
            <article key={p.name} className={`ev-pkg-card${p.highlight ? " ev-pkg-card--highlight" : ""}`}>
              {p.highlight && <div className="ev-pkg-badge">{iv.evPkgBadge}</div>}
              <div className="ev-pkg-header">
                <h3>{p.name}</h3>
                <span className="ev-pkg-units">{p.units} {iv.evPkgUnits}</span>
              </div>
              <div className="ev-pkg-price">
                <div>
                  <p>{iv.evPerUnit}</p>
                  <strong>{p.pricePerUnit}</strong>
                </div>
                <div>
                  <p>{iv.evTotalInvest}</p>
                  <strong>{p.totalInvest}</strong>
                </div>
              </div>
              <div className="ev-pkg-details">
                <div className="ev-detail">
                  <span>{iv.evRevenueShare}</span>
                  <strong className="ev-detail-val">{p.revenueShare}</strong>
                </div>
                <div className="ev-detail">
                  <span>{iv.evEstMonthly}</span>
                  <strong className="ev-detail-val">{p.estMonthly}</strong>
                </div>
                <div className="ev-detail">
                  <span>{iv.evTenor}</span>
                  <strong className="ev-detail-val">{p.tenor}</strong>
                </div>
              </div>
              <a href="/contact"
                onClick={(e) => { e.preventDefault(); go("/contact"); }}
                className={`ev-pkg-cta ${p.highlight ? "btn-primary" : "btn-outline"}`}>
                {iv.evPkgCta} {p.name}
              </a>
            </article>
          ))}
        </div>

        <div className="ev-disclaimer">{iv.evDisclaimer}</div>

        {/* EV bikes offered */}
        <div className="ev-models">
          <p className="section-label">{iv.evModelsLabel}</p>
          <div className="ev-models-grid">
            {iv.evModels.map((m) => (
              <article key={m.name} className="ev-model-card">
                <h4>{m.name}</h4>
                <p>{m.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Roadmap ───────────────────────────────────────────────────────── */}
      <FadeSection className="section investor-roadmap-section">
        <div className="section-head">
          <SectionLabel>{iv.roadmapLabel}</SectionLabel>
          <h2>{iv.roadmapH2}</h2>
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

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <FadeSection className="section section-cta">
        <div className="investor-cta-band">
          <div>
            <SectionLabel>{iv.ctaLabel}</SectionLabel>
            <h2>{iv.ctaH2}</h2>
            <p>{iv.ctaP}</p>
          </div>
          <div className="investor-cta-actions">
            <a href="/contact" onClick={(e) => { e.preventDefault(); go("/contact"); }} className="btn-primary btn-lg">
              {iv.ctaBtn1}
            </a>
            <a href="#ev-investment" className="btn-outline btn-lg">
              {iv.ctaBtn2}
            </a>
          </div>
        </div>
      </FadeSection>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt investor-faq-section">
        <div className="section-head">
          <SectionLabel>{iv.faqLabel}</SectionLabel>
          <h2>{iv.faqH2}</h2>
        </div>
        <div className="faq-list">
          {iv.faqItems.map((f, i) => (
            <div key={f.question} className={`faq-item${openFaq === i ? " faq-item--open" : ""}`}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.question}
                <span className="faq-icon">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p className="faq-a">{f.answer}</p>}
            </div>
          ))}
        </div>
      </FadeSection>
    </>
  );
}
