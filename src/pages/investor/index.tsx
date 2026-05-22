import { useState } from "react";
import { investorMetrics, evPackages, evInvestSteps, roadmap, faqs } from "../../data";
import { go } from "../../hooks";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";

export default function InvestorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHero
        kicker="Investor & Partners"
        title="Rp 129M mobility rental ecosystem dengan digital app dan EV expansion upside."
        copy="Transgo diposisikan sebagai holding rental modern: 861 kendaraan aktif, 524 motor EV, 337 mobil ICE, Rp129B assets under managed, aplikasi 10K+ downloads, dan workshop-backed margin control."
      />

      {/* ── Metric wall ───────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt investor-metrics-section">
        <div className="metric-wall">
          {investorMetrics.map((m) => (
            <article key={m.label} className="metric-card metric-card--blue">
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
              <p>{m.description}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      {/* ── Investor thesis ───────────────────────────────────────────────── */}
      <FadeSection className="section investor-thesis-section">
        <div className="section-head">
          <SectionLabel>Investor Thesis</SectionLabel>
          <h2>Bisnis mobilitas yang bisa dibiayai, diukur, dan diskalakan.</h2>
          <p className="section-sub">
            Untuk investor, Transgo perlu dibaca sebagai platform pengelolaan aset: kendaraan masuk,
            driver aktif, unit menghasilkan, bengkel menjaga uptime, aplikasi digital memudahkan
            pemesanan, dan data operasional memandu ekspansi.
          </p>
        </div>
        <div className="thesis-grid">
          {[
            { t: "861 Operating Vehicles",       d: "524 motor EV dan 337 mobil ICE beroperasi aktif di seluruh Jawa — basis aset fisik yang terukur." },
            { t: "Rp129B Assets Under Managed",  d: "Nilai aset armada yang dikelola sebagai fondasi asset-backed transport platform." },
            { t: "1000+ Active Driver Partners", d: "Basis driver aktif memperkuat recurring demand dan pipeline utilisasi armada secara konsisten." },
            { t: "Ride-Hailing Ecosystem",       d: "Kemitraan dengan Gojek, Grab, Maxim, inDrive, dan Maka Motors memperkuat posisi pasar Transgo." },
          ].map((th) => (
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
          <SectionLabel>Program Investasi EV</SectionLabel>
          <h2>Investasi Armada Motor Listrik — Pasif, Terkelola, Berhasil.</h2>
          <p className="section-sub">
            Beli unit motor EV, Transgo kelola seluruh operasionalnya — dari driver, perawatan,
            hingga pengisian daya. Anda terima revenue sharing setiap bulan.
          </p>
        </div>

        {/* How it works */}
        <div className="ev-how-grid">
          {evInvestSteps.map((s) => (
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
              {p.highlight && <div className="ev-pkg-badge">Paling Populer</div>}
              <div className="ev-pkg-header">
                <h3>{p.name}</h3>
                <span className="ev-pkg-units">{p.units} Unit Motor EV</span>
              </div>
              <div className="ev-pkg-price">
                <div>
                  <p>Per Unit</p>
                  <strong>{p.pricePerUnit}</strong>
                </div>
                <div>
                  <p>Total Investasi</p>
                  <strong>{p.totalInvest}</strong>
                </div>
              </div>
              <div className="ev-pkg-details">
                <div className="ev-detail">
                  <span>Revenue Share</span>
                  <strong className="ev-detail-val">{p.revenueShare}</strong>
                </div>
                <div className="ev-detail">
                  <span>Est. Bulanan</span>
                  <strong className="ev-detail-val">{p.estMonthly}</strong>
                </div>
                <div className="ev-detail">
                  <span>Tenor Kontrak</span>
                  <strong className="ev-detail-val">{p.tenor}</strong>
                </div>
              </div>
              <a href="/contact"
                onClick={(e) => { e.preventDefault(); go("/contact"); }}
                className={`ev-pkg-cta ${p.highlight ? "btn-primary" : "btn-outline"}`}>
                Diskusi Paket {p.name}
              </a>
            </article>
          ))}
        </div>

        <div className="ev-disclaimer">
          * Angka estimasi berdasarkan utilisasi 25 hari aktif/bulan. Angka aktual dapat berbeda
          tergantung kondisi pasar dan utilisasi driver. Hubungi tim kami untuk proyeksi terperinci.
        </div>

        {/* EV bikes offered */}
        <div className="ev-models">
          <p className="section-label">Unit Motor EV yang Tersedia</p>
          <div className="ev-models-grid">
            {[
              { name: "Polytron Fox R", desc: "Motor listrik sporty, jangkauan 60–80 km/charge, cocok untuk ojol dan kurir." },
              { name: "Alva N3",        desc: "Desain modern, jangkauan hingga 120 km, performa stabil untuk penggunaan harian." },
              { name: "Maka Motors",    desc: "EV lokal Indonesia, efisien dan mudah perawatan, jaringan servis tersebar luas." },
            ].map((m) => (
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
          <SectionLabel>Growth Roadmap</SectionLabel>
          <h2>Rencana ekspansi yang terstruktur.</h2>
        </div>
        <div className="roadmap-track">
          {roadmap.map((r, i) => (
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
            <SectionLabel>Mulai Investasi</SectionLabel>
            <h2>Siap mendiskusikan peluang investasi bersama Transgo?</h2>
            <p>Tim kami siap menjelaskan detail paket, proyeksi return, dan perjanjian kerja sama.</p>
          </div>
          <div className="investor-cta-actions">
            <a href="/contact" onClick={(e) => { e.preventDefault(); go("/contact"); }} className="btn-primary btn-lg">
              Jadwalkan Diskusi
            </a>
            <a href="#ev-investment" className="btn-outline btn-lg">
              Lihat Paket EV →
            </a>
          </div>
        </div>
      </FadeSection>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt investor-faq-section">
        <div className="section-head">
          <SectionLabel>FAQ</SectionLabel>
          <h2>Pertanyaan umum dari investor dan mitra.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
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
