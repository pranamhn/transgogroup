import { processSteps } from "../data";
import { SectionLabel } from "./ui";

export default function DriverProcess() {
  return (
    <div className="process-wrap">
      <div className="section-head">
        <SectionLabel>Driver Journey</SectionLabel>
        <h2>Dari registrasi sampai kendaraan aktif menghasilkan.</h2>
      </div>
      <div className="process-grid">
        {processSteps.map((s) => (
          <article key={s.step} className="process-card">
            <span className="process-step">{s.step}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
