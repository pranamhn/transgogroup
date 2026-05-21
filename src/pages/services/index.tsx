import { serviceLines, cashbackItems, driverBenefits } from "../../data";
import { FadeSection, PageHero, SectionLabel, CtaBand } from "../../components/ui";
import DriverProcess from "../../components/DriverProcess";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Layanan"
        title="Sewa mobil, motor listrik, kepemilikan, dan bengkel — satu ekosistem."
        copy="Transgo menggabungkan rental tanpa DP, harga mulai Rp40.000/hari untuk motor dan Rp170.000/hari untuk mobil, pembayaran digital, dan bengkel full-service."
      />

      {/* ── Service grid ──────────────────────────────────────────────────── */}
      <FadeSection className="section">
        <div className="section-head">
          <SectionLabel>Semua Layanan</SectionLabel>
          <h2>Solusi mobilitas lengkap untuk driver dan mitra.</h2>
        </div>
        <div className="service-grid">
          {serviceLines.map((s) => (
            <article key={s.title} className="service-card">
              <span className="service-audience">{s.audience}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ul className="feature-list">
                {s.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </FadeSection>

      {/* ── Cashback & benefits ───────────────────────────────────────────── */}
      <FadeSection className="section section--alt">
        <div className="cashback-grid">
          <div className="cashback-left">
            <SectionLabel>Program Cashback</SectionLabel>
            <h2>Hemat lebih banyak setiap bulan.</h2>
            <div className="cashback-cards">
              {cashbackItems.map((c) => (
                <div key={c.title} className="cashback-card">
                  <strong>{c.title}</strong>
                  <p>{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="benefits-panel">
            <SectionLabel>Keuntungan Partner</SectionLabel>
            <h3>Kenapa mitra memilih Transgo?</h3>
            <ul className="benefits-list">
              {driverBenefits.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <div className="hours-chip">
              <span>Jam Operasional</span>
              <strong>08.00 – 21.00 WIB</strong>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── Rental packages comparison ────────────────────────────────────── */}
      <FadeSection className="section">
        <div className="section-head">
          <SectionLabel>Paket Rental</SectionLabel>
          <h2>Pilih paket yang sesuai dengan kebutuhan Anda.</h2>
        </div>
        <div className="pkg-grid">
          {[
            {
              name: "EV Daily", vehicle: "Motor Listrik",
              tag: null,
              items: ["Mulai Rp40.000/hari", "Unit siap pakai", "Panduan penggunaan EV", "Basic check-up", "Pusat bantuan 24 jam"],
            },
            {
              name: "Online Driver Car", vehicle: "Mobil",
              tag: "Paling Populer",
              items: ["Mulai Rp170.000/hari", "Lepas kunci fleksibel", "Pilihan unit beragam", "Gratis servis & oli", "Servis terjadwal"],
            },
            {
              name: "Fleet Partner", vehicle: "Fleet Campuran",
              tag: null,
              items: ["Alokasi beberapa unit", "Reporting utilisasi", "Fleet coordination", "B2B account handling", "Harga khusus volume"],
            },
          ].map((p) => (
            <article key={p.name} className={`pkg-card${p.tag ? " pkg-card--highlight" : ""}`}>
              {p.tag && <div className="pkg-badge">{p.tag}</div>}
              <span className="pkg-vehicle">{p.vehicle}</span>
              <h3>{p.name}</h3>
              <ul className="feature-list">
                {p.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
              <a href="/contact" className={`pkg-cta ${p.tag ? "btn-primary" : "btn-outline"}`}>
                Daftar Sekarang
              </a>
            </article>
          ))}
        </div>
      </FadeSection>

      {/* ── Driver process ────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt">
        <DriverProcess />
      </FadeSection>

      <FadeSection className="section section-cta">
        <CtaBand
          title="Siap bergabung sebagai mitra driver Transgo?"
          sub="Proses pendaftaran mudah, kendaraan siap dalam 1–2 hari kerja."
        />
      </FadeSection>
    </>
  );
}
