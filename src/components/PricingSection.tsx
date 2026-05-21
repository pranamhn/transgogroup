import { carPrices, electricBikes } from "../data";
import { go } from "../hooks";
import { SectionLabel } from "./ui";

export default function PricingSection({ preview = false }: { preview?: boolean }) {
  const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");
  const list = preview ? carPrices.slice(0, 4) : carPrices;

  return (
    <div className="pricing-wrap">
      <div className="section-head">
        <SectionLabel>Best Offering</SectionLabel>
        <h2>Harga partner — khusus mitra driver kami.</h2>
        {preview && (
          <a href="/fleet" onClick={(e) => { e.preventDefault(); go("/fleet"); }} className="see-all-link">
            Lihat semua armada →
          </a>
        )}
      </div>

      <div className="pricing-grid">
        {list.map((car) => (
          <article key={`${car.name}-${car.type}`} className="pricing-card">
            <span className="pricing-type">{car.type}</span>
            <h3>{car.name}</h3>
            <div className="pricing-nums">
              <s>{fmt(car.originalPrice)}</s>
              <strong>{fmt(car.offerPrice)}<em>/hari</em></strong>
            </div>
          </article>
        ))}
      </div>

      {/* EV band */}
      <div className="ev-band">
        <div className="ev-band-text">
          <SectionLabel>Motor Listrik EV</SectionLabel>
          <h3>Hanya <span className="ev-price">Rp40.000</span> / Hari</h3>
          <p>{electricBikes.join(" · ")}</p>
        </div>
        <div className="ev-band-badge">
          <span className="ev-badge">EV Ready</span>
          <p>Ramah lingkungan.<br />Biaya energi lebih rendah.</p>
        </div>
      </div>
    </div>
  );
}
