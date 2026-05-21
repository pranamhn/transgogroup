import { Eye, Gem, Target, ClipboardList } from "lucide-react";
import { subBrands, roadmap, documentRequirements } from "../../data";
import { FadeSection, PageHero, SectionLabel, CtaBand } from "../../components/ui";

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Tentang Transgo"
        title="Dari rental kendaraan menjadi platform fleet bernilai tinggi."
        copy="Didirikan 2022, Transgo Group berkembang menjadi ekosistem rental modern yang mengelola mobil, motor EV, aplikasi digital, workshop, dan layanan fleet untuk ekonomi ride-hailing Indonesia."
      />

      {/* ── Company story ─────────────────────────────────────────────────── */}
      <FadeSection className="section">
        <div className="editorial-grid">
          <div>
            <SectionLabel>Company Thesis</SectionLabel>
            <h2>Kendaraan sebagai aset produktif, bukan sekadar alat transportasi.</h2>
          </div>
          <div className="editorial-card">
            <p>
              Kami melihat kendaraan sebagai aset produktif. Mobil dan motor listrik bukan hanya
              disewakan, tetapi dikelola agar menghasilkan pendapatan berulang, memiliki umur
              ekonomis panjang, dan menarik bagi modal institusional.
            </p>
            <p>
              Skala Transgo yang sudah kuat — 861 kendaraan aktif, 524 motor EV, 337 mobil ICE,
              Rp129B assets under managed, 10+ kota besar, aplikasi dengan 10K+ downloads — menjadi fondasi untuk ekspansi
              EV fleet dan pembiayaan aset berbasis data operasional.
            </p>
            <div className="editorial-stats">
              {[
                { v: "2022", l: "Tahun Berdiri"  },
                { v: "861", l: "Total Armada"   },
                { v: "10+",  l: "Kota Operasi"   },
                { v: "4.8★", l: "Google Rating"  },
              ].map((s) => (
                <div key={s.l} className="editorial-stat">
                  <span>{s.v}</span>
                  <p>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── Vision & Mission ──────────────────────────────────────────────── */}
      <FadeSection className="section section--alt">
        <div className="vm-grid">
          <article className="vm-card">
            <div className="vm-icon"><Eye size={30} /></div>
            <h3>Visi</h3>
            <p>
              Menjadi platform mobilitas terdepan di Indonesia yang menghubungkan driver,
              kendaraan, dan investor dalam ekosistem yang transparan, produktif, dan berkelanjutan.
            </p>
          </article>
          <article className="vm-card">
            <div className="vm-icon"><Target size={30} /></div>
            <h3>Misi</h3>
            <ul>
              <li>Menyediakan armada kendaraan siap kerja untuk driver online</li>
              <li>Memastikan uptime kendaraan melalui bengkel internal</li>
              <li>Mendorong adopsi EV di segmen ride-hailing</li>
              <li>Membangun jalur investasi transparan berbasis aset fisik</li>
            </ul>
          </article>
          <article className="vm-card">
            <div className="vm-icon"><Gem size={30} /></div>
            <h3>Nilai</h3>
            <ul>
              <li>Transparansi dalam operasional dan pelaporan</li>
              <li>Keandalan armada untuk produktivitas driver</li>
              <li>Inovasi berkelanjutan menuju mobilitas hijau</li>
              <li>Kemitraan jangka panjang yang saling menguntungkan</li>
            </ul>
          </article>
        </div>
      </FadeSection>

      {/* ── Ecosystem ─────────────────────────────────────────────────────── */}
      <FadeSection className="section">
        <div className="section-head">
          <SectionLabel>Ecosystem</SectionLabel>
          <h2>16+ unit bisnis dalam satu ekosistem mobilitas.</h2>
          <p className="section-sub">
            Transgo Group mengoperasikan berbagai unit bisnis yang saling mendukung,
            dari rental mobil dan motor hingga logistik, travel, dan fotografi.
          </p>
        </div>
        <div className="ecosystem-grid">
          {subBrands.map((b) => (
            <div key={b} className="ecosystem-chip">{b}</div>
          ))}
        </div>
      </FadeSection>

      {/* ── Document requirements ─────────────────────────────────────────── */}
      <FadeSection className="section section--alt">
        <div className="section-head">
          <SectionLabel>Persyaratan Mitra</SectionLabel>
          <h2>Dokumen yang diperlukan untuk bergabung.</h2>
        </div>
        <div className="docs-grid">
          {documentRequirements.map((d, i) => (
            <div key={i} className="doc-item">
              <span className="doc-num">{String(i + 1).padStart(2, "0")}</span>
              <p>{d}</p>
            </div>
          ))}
          <div className="doc-item doc-item--note">
            <span className="doc-num"><ClipboardList size={20} /></span>
            <p>Deposit 2 hari sewa wajib dibayar sebelum serah terima kendaraan. Checkpoint setiap 2 minggu ke kantor Gatot Subroto.</p>
          </div>
        </div>
      </FadeSection>

      {/* ── Roadmap ───────────────────────────────────────────────────────── */}
      <FadeSection className="section">
        <div className="section-head">
          <SectionLabel>Growth Plan</SectionLabel>
          <h2>Roadmap menuju operator fleet yang scalable.</h2>
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

      <FadeSection className="section section-cta">
        <CtaBand
          title="Tertarik bergabung sebagai mitra atau investor?"
          sub="Hubungi tim Transgo untuk diskusi lebih lanjut."
        />
      </FadeSection>
    </>
  );
}
