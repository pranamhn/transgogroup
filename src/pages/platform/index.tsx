import { Activity, BarChart3, DatabaseZap, Gauge, Network, Workflow } from "lucide-react";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";

const platformMetrics = [
  { value: "861", label: "Unit terkelola", desc: "Mobil ICE dan motor EV dalam ekosistem operasi." },
  { value: "2", label: "Core platform", desc: "SEVA untuk fleet operation dan Flowqu untuk CRM." },
  { value: "Real-time", label: "Operational visibility", desc: "Data driver, unit, billing, dan aktivitas lapangan." },
];

const platformLayers = [
  {
    icon: <DatabaseZap size={23} />,
    title: "SEVA Fleet Management",
    url: "sevaqu.com",
    copy: "SEVA menjadi sistem utama untuk memantau unit, driver, kontrak, billing, dan proses operasional harian armada Transgo.",
  },
  {
    icon: <Workflow size={23} />,
    title: "Flowqu CRM",
    url: "flowqu.com",
    copy: "Flowqu membantu tim mengelola pipeline calon driver, follow-up, onboarding, komunikasi, dan aktivitas sales secara lebih terstruktur.",
  },
  {
    icon: <Gauge size={23} />,
    title: "Operational Efficiency",
    url: "fleet productivity",
    copy: "Kombinasi data fleet dan CRM membuat keputusan lebih cepat: unit lebih mudah dialokasikan, driver lebih cepat diproses, dan downtime lebih terkendali.",
  },
];

const operatingFlow = [
  "Lead driver masuk dan dikualifikasi melalui Flowqu",
  "Onboarding, dokumen, dan follow-up driver dibuat lebih rapi",
  "Unit dialokasikan dan dimonitor melalui SEVA",
  "Billing, status unit, dan kebutuhan maintenance terlihat oleh tim operasi",
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        kicker="Digital Platform"
        title="Pertumbuhan Transgo dipercepat oleh sistem operasi digital."
        copy="Transgo tumbuh cepat bukan hanya karena jumlah armada, tetapi karena penggunaan platform digital SEVA dan Flowqu yang membuat operasional fleet lebih efisien, terukur, dan siap diskalakan."
        compact
      />

      <FadeSection className="section platform-overview-section">
        <div className="platform-hero-card">
          <div className="platform-hero-copy">
            <SectionLabel>SEVA + Flowqu</SectionLabel>
            <h2>Platform layer yang menghubungkan armada, driver, dan tim operasional.</h2>
            <p>
              Dalam bisnis fleet, kecepatan eksekusi ditentukan oleh akurasi data. SEVA
              membantu Transgo membaca kondisi armada dan aktivitas operasional, sementara
              Flowqu menjaga proses akuisisi dan pengelolaan driver tetap rapi dari awal.
            </p>
          </div>
          <div className="platform-metric-grid">
            {platformMetrics.map((m) => (
              <div key={m.label} className="platform-metric-card">
                <strong>{m.value}</strong>
                <span>{m.label}</span>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      <FadeSection className="section section--alt platform-layer-section">
        <div className="section-head section-head--left">
          <SectionLabel>Operating Stack</SectionLabel>
          <h2>Dua sistem utama untuk menjaga pertumbuhan tetap terkendali.</h2>
          <p className="section-sub">
            Platform digital membuat Transgo tidak bergantung pada proses manual. Setiap lead,
            driver, unit, dan pekerjaan lapangan bisa dipantau sebagai bagian dari satu operating system.
          </p>
        </div>
        <div className="platform-layer-grid">
          {platformLayers.map((layer) => (
            <article key={layer.title} className="platform-layer-card">
              <span className="platform-layer-icon">{layer.icon}</span>
              <span className="platform-layer-url">{layer.url}</span>
              <h3>{layer.title}</h3>
              <p>{layer.copy}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      <FadeSection className="section platform-flow-section">
        <div className="platform-flow-card">
          <div>
            <SectionLabel>Digital Operating Flow</SectionLabel>
            <h2>Dari lead driver sampai unit aktif di jalan.</h2>
            <p>
              SEVA dan Flowqu membantu Transgo memperpendek jarak antara demand driver,
              ketersediaan unit, pembayaran, dan maintenance. Hasilnya adalah operasi yang
              lebih cepat, lebih disiplin, dan lebih mudah dianalisis.
            </p>
          </div>
          <div className="platform-flow-list">
            {operatingFlow.map((item, index) => (
              <div key={item} className="platform-flow-item">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      <FadeSection className="section section--alt platform-impact-section">
        <div className="platform-impact-card">
          <span className="platform-impact-icon"><Network size={26} /></span>
          <div>
            <SectionLabel>Why It Matters</SectionLabel>
            <h2>Digital backbone untuk ekspansi fleet lintas kota.</h2>
            <p>
              Dengan operating data yang konsisten, Transgo dapat menilai performa kendaraan,
              produktivitas driver, kebutuhan bengkel, dan peluang ekspansi secara lebih objektif.
              Ini yang membuat pertumbuhan armada menjadi lebih investor-ready.
            </p>
          </div>
          <div className="platform-impact-points">
            <span><Activity size={16} /> Faster driver onboarding</span>
            <span><BarChart3 size={16} /> Better fleet analytics</span>
            <span><Gauge size={16} /> Higher operational control</span>
          </div>
        </div>
      </FadeSection>
    </>
  );
}
