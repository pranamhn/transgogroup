import { BatteryCharging, ChartNoAxesCombined, CircleGauge, Fan, House, Wrench } from "lucide-react";
import { workshopCaps } from "../../data";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";

export default function WorkshopPage() {
  return (
    <>
      <PageHero
        kicker="Workshop Network"
        title="Transgo Garage Service — pengendali uptime armada."
        copy="Layanan bengkel full-service untuk perawatan rutin hingga perbaikan ringan mobil dan motor, tersedia di workshop Gatot Subroto maupun servis panggilan ke lokasi Anda."
      />

      {/* ── Workshop hero card ────────────────────────────────────────────── */}
      <FadeSection className="section workshop-overview-section">
        <div className="workshop-hero">
          <div className="workshop-hero-text">
            <SectionLabel>Maintenance Layer</SectionLabel>
            <h2>Kontrol servis yang membuat aset tetap bekerja.</h2>
            <p>
              Bengkel internal membantu Transgo mengukur biaya servis, mengurangi downtime,
              dan mengambil keputusan pembelian unit berdasarkan data kondisi kendaraan — bukan
              sekadar perkiraan.
            </p>
            <div className="workshop-stats">
              {[
                { v: "24/7", l: "Support Line"    },
                { v: "0 Rp", l: "Biaya Servis*"   },
                { v: "<4 Jam", l: "Rata-rata Selesai" },
              ].map((s) => (
                <div key={s.l} className="workshop-stat">
                  <span>{s.v}</span>
                  <p>{s.l}</p>
                </div>
              ))}
            </div>
            <p className="workshop-note">*Gratis untuk unit yang menyewa dari Transgo.</p>
          </div>
          <div className="workshop-hero-img" />
        </div>
      </FadeSection>

      {/* ── Capabilities ──────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt workshop-caps-section">
        <div className="section-head">
          <SectionLabel>Kemampuan Bengkel</SectionLabel>
          <h2>Dari perawatan rutin hingga data operasional.</h2>
        </div>
        <div className="workshop-caps-grid">
          {workshopCaps.map((w) => (
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
          <SectionLabel>Layanan Tersedia</SectionLabel>
          <h2>Bengkel lengkap untuk semua kebutuhan armada.</h2>
        </div>
        <div className="svc-grid">
          {[
            { icon: <Wrench size={30} />, t: "Servis Rutin",          d: "Ganti oli, filter, busi, dan pemeriksaan komponen berkala sesuai jadwal pabrikan." },
            { icon: <CircleGauge size={30} />, t: "Ganti Ban & Aki",        d: "Penggantian ban aus dan aki lemah agar unit tetap aman dan prima di jalan." },
            { icon: <Fan size={30} />, t: "AC & Kelistrikan",       d: "Perawatan dan perbaikan sistem AC, kelistrikan, dan komputer kendaraan." },
            { icon: <BatteryCharging size={30} />, t: "EV Maintenance",          d: "Perawatan khusus motor listrik: baterai, charger, controller, dan sistem kelistrikan EV." },
            { icon: <House size={30} />, t: "Home Service",            d: "Mekanik datang ke lokasi driver untuk servis ringan tanpa perlu ke bengkel." },
            { icon: <ChartNoAxesCombined size={30} />, t: "Fleet Reporting",         d: "Laporan kondisi unit, biaya servis, dan rekomendasi penggantian aset untuk investor." },
          ].map((s) => (
            <article key={s.t} className="svc-card">
              <span className="svc-icon">{s.icon}</span>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
      </FadeSection>

    </>
  );
}
