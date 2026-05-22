import { useEffect, useRef } from "react";
import { heroStats, businessModels, milestones } from "../../data";
import { go } from "../../hooks";
import { FadeSection, Badge, SectionLabel } from "../../components/ui";
import MarqueeTicker from "../../components/MarqueeTicker";
import PricingSection from "../../components/PricingSection";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    const t = setTimeout(() => {
      if (!el) return;
      el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="hero-wrap">
        <div className="hero-bg-pattern" />
        <div className="hero-bg-radial" />
        <section ref={heroRef} className="hero-content">
          <Badge label="PT Transgo Group Mobility" />
          <h1 className="hero-h1">
            Platform Digital.<br />
            <span className="hero-accent">129 Miliar Aset.</span><br />
            Aktif Ekpansi.
          </h1>
          <p className="hero-sub">
            Ekosistem fleet operator untuk driver ride-hailing di Indonesia dengan 861 unit, bengkel terintegrasi, dan platform digital.
          </p>
          <div className="hero-actions">
            <a href="/4w-fleet-operator" onClick={(e) => { e.preventDefault(); go("/4w-fleet-operator"); }} className="btn-primary btn-lg">
              Lihat Armada &amp; Harga
            </a>
            <a href="/investor-partners" onClick={(e) => { e.preventDefault(); go("/investor-partners"); }} className="btn-outline btn-lg">
              Investor & Partners →
            </a>
          </div>
          <div className="hero-stats">
            {heroStats.map((s) => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-val">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
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
            <SectionLabel>Business Model</SectionLabel>
            <h2>Tiga pilar.<br />Satu ekosistem armada.</h2>
            <p className="section-sub">
              Bukan sekadar rental — Transgo operating platform yang fokus pada utilisasi dan aset terawat.
            </p>
          </div>
          <div className="biz-grid">
            {businessModels.map((m, i) => {
              return (
                <article
                  key={m.code}
                  className="biz-card"
                  style={{ "--biz-color": m.color } as React.CSSProperties}
                >
                  <div className="biz-card-top">
                    <span className="biz-code">{m.code}</span>
                  </div>
                  <div className="biz-stat">
                    <span className="biz-stat-num">{m.stat}</span>
                    <span className="biz-stat-unit">{m.unit}</span>
                  </div>
                  <div className="biz-card-body">
                    <h3 className="biz-title">{m.full}</h3>
                    <p className="biz-desc">{m.desc}</p>
                  </div>
                  <div className="biz-pillar-tag">Core Pillar · 0{i + 1}</div>
                </article>
              );
            })}
          </div>
        </div>
      </FadeSection>

      {/* ── Investor highlight ──────────────────────────────────────────── */}
      <FadeSection className="investor-blue-section">
        <div className="investor-blue-card">
          <div className="investor-blue-copy">
            <SectionLabel>Investor Outlook</SectionLabel>
            <h2>Operating platform aset transportasi masa depan.</h2>
            <p>
              Transgo menggabungkan armada aktif, workshop internal, dan data operasional untuk membangun bisnis transport yang scalable, terukur, dan siap ekspansi lintas kota.
            </p>
            <div className="investor-blue-actions">
              <a href="/investor-partners" onClick={(e) => { e.preventDefault(); go("/investor-partners"); }} className="btn-primary btn-lg">
                Lihat Investor & Partners
              </a>
              <span>Fleet-backed growth · EV expansion · Recurring revenue</span>
            </div>
          </div>
          <div className="investor-blue-metrics" aria-label="Investor metrics">
            <div>
              <span className="investor-blue-value">Rp129B</span>
              <span className="investor-blue-label">Assets Under Managed</span>
            </div>
            <div>
              <span className="investor-blue-value">861</span>
              <span className="investor-blue-label">Operating Vehicles</span>
            </div>
            <div>
              <span className="investor-blue-value">524</span>
              <span className="investor-blue-label">EV Motor Units</span>
            </div>
            <div>
              <span className="investor-blue-value">337</span>
              <span className="investor-blue-label">ICE Car Units</span>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── Milestones ───────────────────────────────────────────────────── */}
      <FadeSection className="section milestone-section">
        <div className="section-head">
          <SectionLabel>Milestones</SectionLabel>
          <h2>12 bulan. 861 unit. Rp 129 miliar.</h2>
          <p className="section-sub">Setiap titik adalah keputusan yang dieksekusi — mitra dipercaya, aset dikelola, armada terus tumbuh.</p>
        </div>
        <div className="milestone-scroll" aria-label="Transgo milestones">
          <div className="milestone-track">
            {milestones.map((m, i) => (
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
                    {m.fleet && <span className="milestone-fleet">{m.fleet} unit</span>}
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
          <SectionLabel>Ecosystem Partners</SectionLabel>
          <h2>Ekosistem kemitraan yang sudah berjalan.</h2>
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
