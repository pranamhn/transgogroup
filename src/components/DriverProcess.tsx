import { SectionLabel } from "./ui";
import { useLang } from "../i18n";

export default function DriverProcess() {
  const { t } = useLang();
  const dp = t.driverProcess;

  return (
    <div className="process-wrap">
      <div className="section-head">
        <SectionLabel>{dp.label}</SectionLabel>
        <h2>{dp.h2}</h2>
      </div>
      <div className="process-grid">
        {dp.steps.map((s) => (
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
