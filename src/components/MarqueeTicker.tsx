import { subBrands } from "../data";

export default function MarqueeTicker() {
  const items = [...subBrands, ...subBrands];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((b, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-sep">·</span>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
