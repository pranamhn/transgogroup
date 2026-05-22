import { BatteryCharging, Building2, ChartNoAxesCombined, Network, ShieldCheck, Wrench } from "lucide-react";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";

const pillars = [
  {
    icon: <Network size={24} />,
    title: "Fleet Network",
    copy: "Membangun jaringan armada lintas kota dengan standar operasional, pricing, dan monitoring yang seragam.",
  },
  {
    icon: <BatteryCharging size={24} />,
    title: "EV Expansion",
    copy: "Memperbesar komposisi motor listrik untuk driver aktif, kurir, dan partner mobilitas berbiaya rendah.",
  },
  {
    icon: <Wrench size={24} />,
    title: "Workshop Backbone",
    copy: "Menjadikan Transgo Garage sebagai tulang punggung uptime, perawatan, dan kontrol biaya armada.",
  },
  {
    icon: <ChartNoAxesCombined size={24} />,
    title: "Data-Led Growth",
    copy: "Keputusan pembelian unit, ekspansi kota, dan perawatan berbasis data utilisasi serta kondisi kendaraan.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Asset Discipline",
    copy: "Menjaga kendaraan sebagai aset produktif dengan disiplin administrasi, kontrak, dan lifecycle management.",
  },
  {
    icon: <Building2 size={24} />,
    title: "Partner Capital",
    copy: "Membuka jalur kemitraan pembiayaan dan investasi untuk memperbesar kapasitas armada secara sehat.",
  },
];

const milestones2030 = [
  { year: "2026", title: "Standardisasi Operasi", copy: "SOP fleet, pricing, bengkel, onboarding driver, dan dashboard operasional." },
  { year: "2027", title: "Ekspansi Kota Prioritas", copy: "Perluasan armada di kota-kota dengan demand driver dan uptime bengkel yang kuat." },
  { year: "2028", title: "Partner Capital Platform", copy: "Struktur kemitraan investor dan pembiayaan aset untuk mempercepat pertumbuhan unit." },
  { year: "2030", title: "Mobility Asset Platform", copy: "Transgo menjadi operator aset mobilitas yang terukur, transparan, dan scalable." },
];

export default function Vision2030Page() {
  return (
    <>
      <PageHero
        kicker="Visi 2030"
        title="Menjadi platform aset mobilitas produktif untuk ekonomi transport Indonesia."
        copy="Visi 2030 Transgo adalah membangun operating platform yang menghubungkan armada, driver, bengkel, data operasional, dan partner capital dalam satu ekosistem yang scalable."
      />

      <FadeSection className="section vision-hero-section">
        <div className="vision-signal-card">
          <div>
            <SectionLabel>North Star</SectionLabel>
            <h2>Armada aktif, driver produktif, aset terawat, ekspansi terukur.</h2>
            <p>
              Transgo tidak hanya mengejar jumlah unit. Fokus utama kami adalah utilisasi, uptime,
              kualitas driver, kontrol biaya, dan kemampuan memperbesar armada dengan disiplin aset.
            </p>
          </div>
          <div className="vision-signal-metrics">
            <div><strong>861</strong><span>Current Fleet</span></div>
            <div><strong>Rp129B</strong><span>Assets Managed</span></div>
            <div><strong>2030</strong><span>Platform Target</span></div>
          </div>
        </div>
      </FadeSection>

      <FadeSection className="section section--alt vision-pillars-section">
        <div className="section-head">
          <SectionLabel>Strategic Pillars</SectionLabel>
          <h2>Enam pilar menuju 2030.</h2>
          <p className="section-sub">
            Setiap pilar dirancang untuk memperkuat sisi operasional, finansial, dan teknologi dari bisnis fleet operator Transgo.
          </p>
        </div>
        <div className="vision-pillars-grid">
          {pillars.map((p) => (
            <article key={p.title} className="vision-pillar-card">
              <span className="vision-pillar-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      <FadeSection className="section vision-roadmap-section">
        <div className="section-head">
          <SectionLabel>Roadmap</SectionLabel>
          <h2>Tahapan yang dibangun bertahap.</h2>
        </div>
        <div className="vision-roadmap">
          {milestones2030.map((m) => (
            <article key={m.year} className="vision-roadmap-card">
              <span>{m.year}</span>
              <h3>{m.title}</h3>
              <p>{m.copy}</p>
            </article>
          ))}
        </div>
      </FadeSection>
    </>
  );
}
