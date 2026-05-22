import { BatteryCharging, Bike, ChartNoAxesCombined, MapPinned, ShieldCheck, Wrench } from "lucide-react";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";
import DriverProcess from "../../components/DriverProcess";

const operatorStats = [
  { v: "524", l: "2W EV Aktif" },
  { v: "60K+", l: "Biaya Harian Mulai" },
  { v: "Ojol", l: "Ride-hailing Focus" },
];

const operatingPillars = [
  {
    icon: <Bike size={24} />,
    title: "Ride-Hailing Ready Unit",
    copy: "Motor listrik disiapkan untuk ritme kerja driver ojol: jarak harian tinggi, waktu aktif panjang, dan kebutuhan unit yang mudah dipakai.",
  },
  {
    icon: <BatteryCharging size={24} />,
    title: "Lower Energy Cost",
    copy: "EV membantu menekan biaya energi harian, sehingga driver punya ruang margin lebih baik dibanding operasional motor berbahan bakar.",
  },
  {
    icon: <Wrench size={24} />,
    title: "Fleet Uptime Support",
    copy: "Transgo menjaga unit tetap siap jalan melalui basic check-up, perawatan berkala, dan support teknis untuk armada aktif.",
  },
  {
    icon: <ChartNoAxesCombined size={24} />,
    title: "Driver & Utilization Data",
    copy: "Status driver, penggunaan unit, dan kebutuhan maintenance dipantau untuk menjaga produktivitas fleet secara berkelanjutan.",
  },
];

const packages = [
  {
    name: "Ojol EV Starter",
    tag: "Driver Ride-Hailing",
    price: "Rp60.000",
    desc: "Skema sewa motor listrik untuk driver ojol yang membutuhkan unit siap kerja dengan biaya harian transparan.",
    items: ["Unit EV siap jalan", "Onboarding penggunaan EV", "Support driver", "Servis berkala"],
  },
  {
    name: "Driver Community Fleet",
    tag: "Komunitas Ojol",
    price: "Custom",
    desc: "Alokasi unit untuk komunitas driver, koperasi, atau koordinator lapangan dengan kebutuhan beberapa motor EV.",
    items: ["Alokasi multi-unit", "Koordinasi driver", "Harga volume", "Reporting armada"],
  },
  {
    name: "Platform & Last-Mile Partner",
    tag: "B2B Partner",
    price: "Custom",
    desc: "Dukungan armada EV untuk platform ride-hailing, delivery, dan kebutuhan last-mile dengan kontrol operasional.",
    items: ["SLA operasional", "Reporting berkala", "Maintenance support", "Account handling"],
  },
];

export default function TwoWFleetOperatorPage() {
  return (
    <>
      <PageHero
        kicker="2W Fleet Operator"
        title="Armada motor listrik untuk mendukung ride-hailing Indonesia."
        copy="Transgo fokus membangun 2W EV fleet yang membantu driver ojek online bekerja lebih efisien: biaya energi lebih rendah, unit siap jalan, support operasional, dan perawatan yang terstruktur."
      />

      <FadeSection className="section two-w-overview-section">
        <div className="two-w-hero-card">
          <div className="two-w-copy">
            <SectionLabel>EV Two-Wheeler Fleet</SectionLabel>
            <h2>Transgo mendukung driver ride-hailing berpindah ke EV.</h2>
            <p>
              2W Fleet Operator adalah lini Transgo yang berfokus pada motor listrik untuk ekonomi
              ride-hailing Indonesia. Kami menghubungkan unit EV, driver aktif, komunitas ojol,
              maintenance support, dan data utilisasi dalam satu model operasi.
            </p>
            <div className="two-w-stats">
              {operatorStats.map((s) => (
                <div key={s.l}>
                  <strong>{s.v}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="two-w-visual">
            <div className="two-w-visual-panel">
              <span>Operating Model</span>
              <strong>Ride-hailing EV support</strong>
              <p>Motor listrik, driver aktif, biaya energi lebih efisien.</p>
            </div>
          </div>
        </div>
      </FadeSection>

      <FadeSection className="section section--alt two-w-pillars-section">
        <div className="section-head">
          <SectionLabel>2W EV Operating Layer</SectionLabel>
          <h2>Lapisan operasi untuk mendukung driver ojol Indonesia.</h2>
        </div>
        <div className="two-w-pillars-grid">
          {operatingPillars.map((p) => (
            <article key={p.title} className="two-w-pillar-card">
              <span className="two-w-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      <FadeSection className="section two-w-packages-section">
        <div className="section-head">
          <SectionLabel>Skema Dukungan</SectionLabel>
          <h2>Model kerja sama untuk driver, komunitas, dan platform.</h2>
        </div>
        <div className="two-w-package-grid">
          {packages.map((p) => (
            <article key={p.name} className="two-w-package-card">
              <span className="two-w-package-tag">{p.tag}</span>
              <h3>{p.name}</h3>
              <strong>{p.price}</strong>
              <p>{p.desc}</p>
              <ul className="feature-list">
                {p.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </FadeSection>

      <FadeSection className="section section--alt two-w-coverage-section">
        <div className="two-w-coverage-card">
          <div>
            <SectionLabel>Ride-Hailing Coverage</SectionLabel>
            <h2>Disiapkan untuk area dengan demand driver aktif.</h2>
            <p>
              Fokus Transgo adalah wilayah dengan aktivitas ojek online tinggi, kebutuhan unit terjangkau,
              akses maintenance, dan potensi utilisasi harian yang kuat.
            </p>
          </div>
          <div className="two-w-coverage-list">
            {[
              { icon: <MapPinned size={22} />, label: "Area ride-hailing prioritas seluruh Jawa" },
              { icon: <ShieldCheck size={22} />, label: "Onboarding driver dan komunitas terstruktur" },
              { icon: <BatteryCharging size={22} />, label: "Motor EV siap pakai untuk operasional harian" },
            ].map((item) => (
              <div key={item.label}>
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      <FadeSection className="section fleet-contact-section">
        <div className="fleet-contact-card">
          <div className="fleet-contact-copy">
            <SectionLabel>Kanal Kontak Sewa Kendaraan</SectionLabel>
            <h2>Butuh motor EV untuk jalan hari ini?</h2>
            <p>
              Hubungi tim fleet partner untuk cek ketersediaan motor listrik, proses dokumen,
              dan jadwal serah terima kendaraan.
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

      <FadeSection className="section">
        <DriverProcess />
      </FadeSection>
    </>
  );
}
