import { FadeSection, PageHero, SectionLabel } from "../../components/ui";
import PricingSection from "../../components/PricingSection";

const carProcess = [
  {
    step: "01",
    title: "Registrasi Driver",
    description: "Driver mengirim data awal, dokumen identitas, dan kebutuhan area operasional.",
  },
  {
    step: "02",
    title: "Matching Unit Mobil",
    description: "Tim Transgo mencocokkan driver dengan model mobil yang sesuai target pendapatan dan rute harian.",
  },
  {
    step: "03",
    title: "Serah Terima Kendaraan",
    description: "Mobil dicek, dokumen sewa diselesaikan, lalu unit diserahkan dalam kondisi siap jalan.",
  },
  {
    step: "04",
    title: "Monitoring & Servis",
    description: "Kondisi mobil dipantau melalui checkpoint rutin, servis berkala, dan dukungan operasional.",
  },
];

export default function FleetPage() {
  return (
    <>
      <PageHero
        kicker="4W Fleet Operator"
        title="Operator armada mobil untuk driver online."
        copy="Transgo mengelola 337 mobil ICE aktif untuk kebutuhan ride-hailing 4W. Fokusnya sederhana: unit mobil siap jalan, biaya sewa transparan, perawatan terjaga, dan uptime tinggi untuk driver aktif."
      />

      {/* ── Fleet visual ──────────────────────────────────────────────────── */}
      <FadeSection className="section fleet-overview-section">
        <div className="fleet-board">
          <div className="fleet-photo">
            <div className="fleet-visual-grid" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="fleet-route-line fleet-route-line--one" />
            <div className="fleet-route-line fleet-route-line--two" />
            <div className="fleet-signal-card">
              <span>Utilization</span>
              <strong>4W Active</strong>
            </div>
            <div className="fleet-photo-panel">
              <span>4W Fleet</span>
              <strong>337</strong>
              <p>Mobil aktif untuk driver online</p>
            </div>
          </div>
          <div className="fleet-copy">
            <SectionLabel>4W Fleet Operator</SectionLabel>
            <h3>Mobil siap kerja untuk driver online.</h3>
            <ul className="feature-list">
              <li>Skema rental mobil yang mudah dipahami driver</li>
              <li>Pengelolaan aset berbasis penggunaan dan kondisi unit</li>
              <li>Unit city car, MPV, hingga SUV untuk kebutuhan harian</li>
              <li>Servis berkala untuk menjaga mobil tetap siap jalan</li>
              <li>Checkpoint rutin dan monitoring kondisi kendaraan</li>
            </ul>
            <div className="fleet-stats-row">
              {[
                { v: "337", l: "Mobil ICE"  },
                { v: "10+", l: "Kota Operasi" },
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
      <FadeSection className="section section--alt fleet-pricing-section">
        <PricingSection showEvBand={false} />
      </FadeSection>

      {/* ── Fleet contact channel ─────────────────────────────────────────── */}
      <FadeSection className="section fleet-contact-section">
        <div className="fleet-contact-card">
          <div className="fleet-contact-copy">
            <SectionLabel>Kanal Kontak Sewa Kendaraan</SectionLabel>
            <h2>Butuh unit untuk jalan hari ini?</h2>
            <p>
              Hubungi tim fleet partner untuk cek ketersediaan mobil, proses dokumen, dan jadwal serah terima kendaraan.
            </p>
          </div>
          <div className="fleet-contact-actions">
            <a href="https://www.instagram.com/transgo.fleetpartner" target="_blank" rel="noreferrer" className="fleet-contact-link">
              <span>Instagram</span>
              <strong>@transgo.fleetpartner</strong>
            </a>
            <a href="https://wa.me/628211549384" target="_blank" rel="noreferrer" className="fleet-contact-link fleet-contact-link--wa">
              <span>WhatsApp</span>
              <strong>+62 821-1549-384</strong>
            </a>
          </div>
        </div>
      </FadeSection>

      {/* ── Fleet coverage ────────────────────────────────────────────────── */}
      <FadeSection className="section fleet-coverage-section">
        <div className="section-head">
          <SectionLabel>Cakupan Operasional</SectionLabel>
          <h2>Hadir di 10+ kota besar seluruh Jawa.</h2>
          <p className="section-sub">Jaringan operasi Transgo mengikuti demand driver aktif, pusat servis, dan potensi utilisasi armada harian.</p>
        </div>
        <div className="cities-grid">
          {["Jakarta", "Depok", "Tangerang", "Bekasi", "Bandung", "Semarang", "Yogyakarta", "Surabaya", "Malang", "Solo"].map((c) => (
            <div key={c} className="city-chip">{c}</div>
          ))}
        </div>
      </FadeSection>

      {/* ── Terms highlight ───────────────────────────────────────────────── */}
      <FadeSection className="section section--alt fleet-terms-section">
        <div className="section-head">
          <SectionLabel>Syarat & Ketentuan</SectionLabel>
          <h2>Transparansi dari awal.</h2>
          <p className="section-sub">Kami menjaga proses sewa tetap jelas agar driver memahami hak, kewajiban, dan standar operasional sejak hari pertama.</p>
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
        <div className="process-wrap">
          <div className="section-head">
            <SectionLabel>4W Driver Journey</SectionLabel>
            <h2>Dari registrasi sampai mobil aktif menghasilkan.</h2>
          </div>
          <div className="process-grid">
            {carProcess.map((s) => (
              <article key={s.step} className="process-card">
                <span className="process-step">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </FadeSection>

    </>
  );
}
