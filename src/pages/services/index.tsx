import { BatteryCharging, Bike, ChartNoAxesCombined, MapPinned, ShieldCheck, Wrench } from "lucide-react";
import { FadeSection, PageHero, SectionLabel } from "../../components/ui";
import DriverProcess from "../../components/DriverProcess";
import { useLang } from "../../i18n";
import { useSiteMetrics } from "../../siteMetrics";

export default function TwoWFleetOperatorPage() {
  const { t } = useLang();
  const { metrics } = useSiteMetrics();
  const sv = t.services;
  const overviewStats = [
    { v: metrics.evMotor, l: sv.overviewStats[0]?.l ?? "2W EV Aktif" },
    { v: metrics.dailyEvPrice, l: sv.overviewStats[1]?.l ?? "Biaya Harian Mulai" },
    sv.overviewStats[2] ?? { v: "Ojol", l: "Ride-hailing Focus" },
  ];

  const pillarIcons = [<Bike size={24} />, <BatteryCharging size={24} />, <Wrench size={24} />, <ChartNoAxesCombined size={24} />];
  const coverageIcons = [<MapPinned size={22} />, <ShieldCheck size={22} />, <BatteryCharging size={22} />];

  return (
    <>
      <PageHero kicker={sv.heroKicker} title={sv.heroTitle} copy={sv.heroCopy} />

      <FadeSection className="section two-w-overview-section">
        <div className="two-w-hero-card">
          <div className="two-w-copy">
            <SectionLabel>{sv.overviewLabel}</SectionLabel>
            <h2>{sv.overviewH2}</h2>
            <p>{sv.overviewP}</p>
            <div className="two-w-stats">
              {overviewStats.map((s) => (
                <div key={s.l}>
                  <strong>{s.v}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="two-w-visual">
            <div className="two-w-visual-panel">
              <span>{sv.panelLabel}</span>
              <strong>{sv.panelTitle}</strong>
              <p>{sv.panelDesc}</p>
            </div>
          </div>
        </div>
      </FadeSection>

      <FadeSection className="section section--alt two-w-pillars-section">
        <div className="section-head">
          <SectionLabel>{sv.pillarsLabel}</SectionLabel>
          <h2>{sv.pillarsH2}</h2>
        </div>
        <div className="two-w-pillars-grid">
          {sv.pillarItems.map((p, i) => (
            <article key={p.title} className="two-w-pillar-card">
              <span className="two-w-icon">{pillarIcons[i]}</span>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      <FadeSection className="section two-w-packages-section">
        <div className="section-head">
          <SectionLabel>{sv.packagesLabel}</SectionLabel>
          <h2>{sv.packagesH2}</h2>
        </div>
        <div className="two-w-package-grid">
          {sv.packages.map((p) => (
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
            <SectionLabel>{sv.coverageLabel}</SectionLabel>
            <h2>{sv.coverageH2}</h2>
            <p>{sv.coverageP}</p>
          </div>
          <div className="two-w-coverage-list">
            {sv.coverageItems.map((item, i) => (
              <div key={item}>
                {coverageIcons[i]}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      <FadeSection className="section fleet-contact-section">
        <div className="fleet-contact-card">
          <div className="fleet-contact-copy">
            <SectionLabel>{sv.contactLabel}</SectionLabel>
            <h2>{sv.contactH2}</h2>
            <p>{sv.contactP}</p>
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
