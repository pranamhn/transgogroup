import { FadeSection, PageHero, SectionLabel, CtaBand } from "../../components/ui";
import PricingSection from "../../components/PricingSection";
import DriverProcess from "../../components/DriverProcess";

export default function FleetPage() {
  return (
    <>
      <PageHero
        kicker="Fleet Operations"
        title="861 kendaraan aktif untuk driver online dan partner fleet."
        copy="Dengan 524 motor EV dan 337 mobil ICE beroperasi di seluruh Jawa, Transgo menempatkan kendaraan pada segmen driver aktif yang membutuhkan uptime tinggi dan biaya transparan."
      />

      {/* ── Fleet visual ──────────────────────────────────────────────────── */}
      <FadeSection className="section">
        <div className="fleet-board">
          <div className="fleet-photo" />
          <div className="fleet-copy">
            <SectionLabel>Driver-First Fleet</SectionLabel>
            <h3>Kendaraan siap kerja untuk driver yang membutuhkan.</h3>
            <ul className="feature-list">
              <li>Skema rental yang mudah dipahami semua driver</li>
              <li>Pengelolaan aset berbasis penggunaan dan kondisi unit</li>
              <li>EV fleet dengan biaya energi jauh lebih rendah</li>
              <li>Servis berkala gratis untuk menjaga unit tetap jalan</li>
              <li>Checkpoint rutin dan monitoring kondisi armada</li>
            </ul>
            <div className="fleet-stats-row">
              {[
                { v: "337", l: "Mobil ICE"  },
                { v: "524", l: "Motor EV" },
                { v: "7",    l: "Model Armada"  },
              ].map((s) => (
                <div key={s.l} className="fleet-mini-stat">
                  <span>{s.v}</span>
                  <p>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── Full pricing ──────────────────────────────────────────────────── */}
      <FadeSection className="section section--alt">
        <PricingSection />
      </FadeSection>

      {/* ── Fleet coverage ────────────────────────────────────────────────── */}
      <FadeSection className="section">
        <div className="section-head">
          <SectionLabel>Cakupan Operasional</SectionLabel>
          <h2>Hadir di 10+ kota besar seluruh Jawa.</h2>
        </div>
        <div className="cities-grid">
          {["Jakarta", "Depok", "Tangerang", "Bekasi", "Bandung", "Semarang", "Yogyakarta", "Surabaya", "Malang", "Solo"].map((c) => (
            <div key={c} className="city-chip">{c}</div>
          ))}
        </div>
      </FadeSection>

      {/* ── Terms highlight ───────────────────────────────────────────────── */}
      <FadeSection className="section section--alt">
        <div className="section-head">
          <SectionLabel>Syarat & Ketentuan</SectionLabel>
          <h2>Transparansi dari awal.</h2>
        </div>
        <div className="terms-grid">
          {[
            { t: "Dokumen Lengkap",    d: "KTP, KK, token listrik, NPWP/SKCK wajib dilampirkan saat pendaftaran." },
            { t: "Deposit 2 Hari",     d: "Dibayar sebelum kendaraan diserahkan, dikembalikan setelah masa sewa selesai." },
            { t: "Checkpoint Rutin",   d: "Kunjungan ke kantor Gatot Subroto setiap 2 minggu sekali." },
            { t: "Tanggung Jawab",     d: "Segala kerusakan akibat kelalaian menjadi tanggung jawab penyewa." },
            { t: "Larangan Subkontrak", d: "Kendaraan tidak boleh disewakan kembali tanpa izin tertulis dari Transgo." },
            { t: "Kecelakaan",         d: "Wajib melapor ke Transgo dan pihak berwenang jika terjadi kecelakaan." },
          ].map((t) => (
            <article key={t.t} className="term-card">
              <h4>{t.t}</h4>
              <p>{t.d}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      {/* ── Driver process ────────────────────────────────────────────────── */}
      <FadeSection className="section">
        <DriverProcess />
      </FadeSection>

      <FadeSection className="section section-cta">
        <CtaBand
          title="Siap mulai menyewa kendaraan Transgo?"
          sub="Hubungi kami via WhatsApp — proses cepat, unit siap dalam 1–2 hari kerja."
        />
      </FadeSection>
    </>
  );
}
