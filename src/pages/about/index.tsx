import { BarChart3, Building2, Car, CircuitBoard, Eye, Gem, ShieldCheck, Target, TrendingUp, Wrench, Zap } from "lucide-react";
import { subBrands, roadmap } from "../../data";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";

const investorProof = [
  { icon: <Car size={22} />, value: "861", label: "Operating Vehicles", copy: "524 motor EV dan 337 mobil ICE aktif untuk ekonomi ride-hailing." },
  { icon: <BarChart3 size={22} />, value: "Rp129B", label: "Assets Under Managed", copy: "Nilai aset armada yang dikelola dalam ekosistem operasional Transgo." },
  { icon: <Building2 size={22} />, value: "10+", label: "Operational Cities", copy: "Cakupan kota besar di Jawa dengan demand driver aktif." },
  { icon: <CircuitBoard size={22} />, value: "SEVA + Flowqu", label: "Digital Stack", copy: "Platform internal untuk fleet management, CRM, billing, dan workflow driver." },
];

const sellableStrengths = [
  {
    icon: <TrendingUp size={24} />,
    title: "Recurring Revenue Model",
    copy: "Pendapatan datang dari sewa harian/mingguan kendaraan aktif. Semakin tinggi utilisasi, semakin kuat cashflow armada.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Asset-Backed Business",
    copy: "Bisnis ditopang aset fisik yang jelas: mobil, motor EV, bengkel, dan jaringan driver. Ini membuat model lebih konkret untuk investor.",
  },
  {
    icon: <Wrench size={24} />,
    title: "Workshop-Backed Margin Control",
    copy: "Perawatan internal membantu menekan downtime, menjaga kualitas unit, dan memperpanjang umur ekonomis kendaraan.",
  },
  {
    icon: <Zap size={24} />,
    title: "EV Expansion Upside",
    copy: "524 motor EV aktif memberi posisi awal yang kuat di segmen mobilitas listrik untuk ojol, kurir, dan last-mile.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Tentang Transgo"
        title="Operating platform untuk aset transportasi produktif."
        copy="Transgo Group bukan sekadar bisnis rental. Kami membangun ekosistem fleet yang menghubungkan kendaraan, driver, workshop, data operasional, dan capital partner untuk menangkap pertumbuhan ride-hailing Indonesia."
      />

      {/* ── Company story ─────────────────────────────────────────────────── */}
      <FadeSection className="section about-thesis-section">
        <div className="editorial-grid">
          <div className="editorial-heading">
            <SectionLabel>Investment Narrative</SectionLabel>
            <h2>Fleet yang menghasilkan, sistem yang mengontrol, data yang mempercepat ekspansi.</h2>
            <div className="about-signal-card">
              <span className="about-signal-kicker">Assets Under Managed</span>
              <strong>Rp129B</strong>
              <p>861 kendaraan aktif yang dikelola untuk ekonomi ride-hailing Indonesia.</p>
              <div className="about-signal-split">
                <span>524 EV Motor</span>
                <span>337 ICE Car</span>
              </div>
            </div>
          </div>
          <div className="editorial-card">
            <p>
              Transgo melihat kendaraan sebagai aset produktif. Mobil dan motor listrik tidak hanya
              disewakan, tetapi dikelola agar menghasilkan pendapatan berulang, memiliki uptime tinggi,
              umur ekonomis panjang, dan dapat dibaca performanya melalui data operasional.
            </p>
            <p>
              Yang membuat Transgo menarik adalah kombinasi antara aset fisik dan operating system:
              861 kendaraan aktif, 524 motor EV, 337 mobil ICE, Rp129B assets under managed,
              workshop internal, serta platform SEVA dan Flowqu untuk menjaga proses tetap efisien.
            </p>
            <div className="about-investor-note">
              <span>Why it matters</span>
              <p>
                Bagi investor, Transgo adalah fleet-backed mobility platform: bisnis yang punya aset nyata,
                demand driver aktif, recurring revenue, dan peluang scale-up melalui EV serta digital operations.
              </p>
            </div>
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

      <FadeSection className="section section--alt about-proof-section">
        <div className="section-head">
          <SectionLabel>Proof of Scale</SectionLabel>
          <h2>Angka utama yang menunjukkan bisnis ini sudah berjalan.</h2>
          <p className="section-sub">
            Transgo memiliki kombinasi yang jarang dimiliki operator rental kecil: aset aktif,
            demand harian, bengkel internal, platform digital, dan jalur ekspansi EV.
          </p>
        </div>
        <div className="about-proof-grid">
          {investorProof.map((item) => (
            <article key={item.label} className="about-proof-card">
              <span className="about-proof-icon">{item.icon}</span>
              <strong>{item.value}</strong>
              <h3>{item.label}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      <FadeSection className="section about-strength-section">
        <div className="about-strength-wrap">
          <div className="about-strength-copy">
            <SectionLabel>What We Sell</SectionLabel>
            <h2>Kelebihan yang bisa dijual ke driver, partner, dan investor.</h2>
            <p>
              Nilai Transgo tidak hanya ada pada jumlah kendaraan. Nilainya ada pada kemampuan
              mengubah kendaraan menjadi aset produktif yang aktif, terawat, terdokumentasi,
              dan siap diperbesar dengan modal eksternal.
            </p>
          </div>
          <div className="about-strength-grid">
            {sellableStrengths.map((item) => (
              <article key={item.title} className="about-strength-card">
                <span>{item.icon}</span>
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
            <h3>Visi</h3>
            <p>
              Menjadi platform aset mobilitas produktif yang menghubungkan driver, kendaraan,
              workshop, data operasional, dan investor dalam ekosistem yang transparan.
            </p>
          </article>
          <article className="vm-card">
            <div className="vm-icon"><Target size={30} /></div>
            <h3>Misi</h3>
            <ul>
              <li>Menyediakan armada kendaraan siap kerja untuk driver online</li>
              <li>Memastikan uptime kendaraan melalui bengkel internal</li>
              <li>Mendorong adopsi EV di segmen ride-hailing</li>
              <li>Membangun jalur investasi berbasis aset fisik dan data operasional</li>
            </ul>
          </article>
          <article className="vm-card">
            <div className="vm-icon"><Gem size={30} /></div>
            <h3>Nilai</h3>
            <ul>
              <li>Transparansi dalam operasional dan pelaporan</li>
              <li>Keandalan armada untuk produktivitas driver</li>
              <li>Efisiensi melalui teknologi, data, dan workshop internal</li>
              <li>Kemitraan jangka panjang yang saling menguntungkan</li>
            </ul>
          </article>
        </div>
      </FadeSection>

      {/* ── Ecosystem ─────────────────────────────────────────────────────── */}
      <FadeSection className="section about-ecosystem-section">
        <div className="section-head">
          <SectionLabel>Ecosystem</SectionLabel>
          <h2>16+ unit bisnis yang memperluas monetisasi ekosistem.</h2>
          <p className="section-sub">
            Ekosistem Transgo memberi ruang ekspansi ke rental mobil, motor EV, bengkel,
            travel, logistics, luxury mobility, dan layanan pendukung lain yang memperkuat brand.
          </p>
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
          <SectionLabel>Growth Plan</SectionLabel>
          <h2>Roadmap menuju operator fleet yang scalable dan investor-ready.</h2>
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

    </>
  );
}
