import { go } from "../hooks";
import { SectionLabel } from "./ui";
import { useLang } from "../i18n";
import { useVehicleCatalog } from "../vehicleCatalog";

export default function PricingSection({ preview = false, showEvBand = true }: { preview?: boolean; showEvBand?: boolean }) {
  const { t } = useLang();
  const { vehicles } = useVehicleCatalog();
  const pr = t.pricing;
  const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");
  const list = preview ? vehicles.slice(0, 4) : vehicles;

  return (
    <div className="pricing-wrap">
      <div className="section-head">
        <SectionLabel>{pr.label}</SectionLabel>
        <h2>{pr.h2}</h2>
        {preview && (
          <a href="/4w-fleet-operator" onClick={(e) => { e.preventDefault(); go("/4w-fleet-operator"); }} className="see-all-link">
            {pr.seeAll}
          </a>
        )}
      </div>

      <div className="pricing-grid">
        {list.map((car) => (
          <article key={`${car.name}-${car.type}`} className="pricing-card">
            {car.imageUrl && (
              <div className="pricing-photo">
                <img src={car.imageUrl} alt={car.name} />
              </div>
            )}
            <span className="pricing-type">{car.type}</span>
            <h3>{car.name}</h3>
            <div className="pricing-nums">
              <s>{fmt(car.originalPrice)}</s>
              <strong>{fmt(car.offerPrice)}<em>{pr.perDay}</em></strong>
            </div>
          </article>
        ))}
      </div>

      {showEvBand && (
        <div className="ev-band">
          <div className="ev-band-text">
            <SectionLabel>{pr.evLabel}</SectionLabel>
            <h3>{pr.evFrom} <span className="ev-price">{pr.evPrice}</span> {pr.evPerDay}</h3>
            <p>Polytron Fox R · Alva N3 · Maka Motors</p>
          </div>
          <div className="ev-band-badge">
            <span className="ev-badge">EV Ready</span>
            <p>{pr.evTagline}<br />{pr.evTaglineSub}</p>
          </div>
        </div>
      )}
    </div>
  );
}
