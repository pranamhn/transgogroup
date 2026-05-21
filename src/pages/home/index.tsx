import { useEffect, useRef } from "react";
import { Bike, CarFront, Wrench } from "lucide-react";
import { heroStats, businessModels, investorMetrics, milestones } from "../../data";
import { go } from "../../hooks";
import { FadeSection, Badge, SectionLabel, CtaBand } from "../../components/ui";
import MarqueeTicker from "../../components/MarqueeTicker";
import PricingSection from "../../components/PricingSection";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const modelIcons = [CarFront, Bike, Wrench];
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const t = setTimeout(() => {
      if (!el) return;
      el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="hero-wrap">
        <div className="hero-bg-pattern" />
        <section ref={heroRef} className="hero-content">
          <Badge label="PT Transgo Group Mobility" />
          <h1 className="hero-h1">
            Future Fleet.<br />
            <span className="hero-accent">EV Mobility.</span><br />
            Transport Platform.
          </h1>
          <p className="hero-sub">
            Fleet Operator untuk platform ride-hailing didukung dengan layanan 24/7 dan sistem bengkel,
            aplikasi digital, dan bisnis automation.
          </p>  
          <div className="hero-actions">
            <a href="/fleet" onClick={(e) => { e.preventDefault(); go("/fleet"); }} className="btn-primary btn-lg">
              Lihat Armada &amp; Harga
            </a>
            <a href="/investor" onClick={(e) => { e.preventDefault(); go("/investor"); }} className="btn-outline btn-lg">
              Investor Deck →
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
      <FadeSection className="section">
        <div className="section-head">
          <SectionLabel>Business Model</SectionLabel>
          <h2>Tiga pilar yang menopang ekosistem Transgo.</h2>
          <p className="section-sub">
            Struktur bisnis dibuat sebagai operating system armada: kendaraan masuk,
            driver aktif, aset dirawat, dan utilisasi terus dimaksimalkan.
          </p>
        </div>
        <div className="biz-grid grid md:grid-cols-3 gap-6 lg:gap-8">
          {businessModels.map((m, index) => {
            const Icon = modelIcons[index] ?? CarFront;
            return (
              <article key={m.code} className="biz-card group flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--model-color)]/10 hover:-translate-y-2 rounded-3xl" style={{ "--model-color": m.color } as React.CSSProperties}>
                <div className="biz-top flex items-start justify-between mb-8">
                  <div className="biz-icon group-hover:scale-110 transition-transform duration-500"><Icon size={28} strokeWidth={2} /></div>
                  <span className="biz-meta text-[10px] font-bold uppercase tracking-widest opacity-60">{m.meta}</span>
                </div>
                <div className="biz-code font-mono text-xs opacity-40 mb-2">{m.code}</div>
                <h3 className="text-xl font-bold tracking-tight mb-3 leading-tight">{m.full}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[13px] mb-8">{m.desc}</p>
                <div className="biz-footer mt-auto pt-5 flex items-center justify-between border-t border-black/5 dark:border-white/10">
                  <span className="opacity-50 text-[10px] uppercase font-bold tracking-widest">Core Pillar</span>
                  <strong className="opacity-20 text-3xl font-black italic">0{index + 1}</strong>
                </div>
              </article>
            );
          })}
        </div>
      </FadeSection>

      {/* ── Metric wall ──────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt">
        <div className="section-head">
          <SectionLabel>Transgo dalam angka</SectionLabel>
          <h2>Operating scale untuk masa depan transportasi produktif.</h2>
        </div>
        <div className="metric-wall">
          {investorMetrics.map((m) => (
            <article key={m.label} className="metric-card">
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
              <p>{m.description}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      {/* ── Milestones ───────────────────────────────────────────────────── */}
      <FadeSection className="section">
        <div className="section-head text-center">
          <SectionLabel>Our Journey</SectionLabel>
          <h2>Jejak langkah pertumbuhan Transgo.</h2>
        </div>
        <div className="relative mt-16 px-4 lg:px-0">
          {/* Timeline Line - Desktop */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
          
          {/* Timeline Line - Mobile */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-white/5" />

          <div className="milestone-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 relative z-10">
            {milestones.map((m, i) => (
              <FadeSection key={i}>
                <div className="relative pl-12 lg:pl-0 lg:pt-20 lg:text-center group">
                  {/* Timeline Node */}
                  <div className="absolute left-6 lg:left-1/2 top-0 lg:top-10 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 z-20 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500 animate-pulse" />
                  </div>

                  <article className="transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4">
                      {m.year}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">{m.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed max-w-xs lg:mx-auto">
                      {m.description}
                    </p>
                  </article>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Pricing preview ───────────────────────────────────────────────── */}
      <FadeSection className="section">
        <PricingSection preview />
      </FadeSection>

      {/* ── Partners ─────────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt">
        <div className="section-head">
          <SectionLabel>Ecosystem Partners</SectionLabel>
          <h2>Bermitra dengan platform ride-hailing terkemuka.</h2>
        </div>
        <div className="partner-chips">
          {["Gojek", "Grab", "Maxim", "inDrive", "Maka Motors", "Tunas Rent", "Sun Motor", "Cakrawala"].map((p) => (
            <span key={p} className="partner-chip">{p}</span>
          ))}
        </div>
      </FadeSection>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <FadeSection className="section section-cta">
        <CtaBand
          title="Ingin bergabung atau berinvestasi bersama Transgo?"
          sub="Driver, partner fleet, koperasi, atau investor — kami siap diskusi untuk solusi terbaik."
        />
      </FadeSection>
    </>
  );
}
