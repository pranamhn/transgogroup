import { FadeSection, PageHero, SectionLabel } from "../../components/ui";
import { useLang } from "../../i18n";

export default function ContactPage() {
  const { t } = useLang();
  const ct = t.contact;

  return (
    <>
      <PageHero kicker={ct.heroKicker} title={ct.heroTitle} copy={ct.heroCopy} compact />

      <FadeSection className="section contact-layout">
        {/* Info */}
        <div className="contact-info-panel">
          <SectionLabel>{ct.infoLabel}</SectionLabel>
          <h2>{ct.infoH2}</h2>
          <div className="contact-info-items">
            {ct.infoItems.map((c) => (
              <div key={c.label} className="contact-info-row">
                <span>{c.label}</span>
                <strong>{c.value}</strong>
              </div>
            ))}
          </div>
          <div className="contact-action-btns">
            <a href="https://www.instagram.com/transgogroup" target="_blank" rel="noreferrer" className="btn-primary btn-lg">
              Instagram @transgogroup
            </a>
            <a href="https://www.linkedin.com/company/transgo-group" target="_blank" rel="noreferrer" className="btn-outline btn-lg">
              LinkedIn Transgo Group →
            </a>
          </div>

          {/* Quick topics */}
          <div className="contact-topics">
            <SectionLabel>{ct.topicsLabel}</SectionLabel>
            <div className="contact-topic-chips">
              {ct.topicsItems.map((topic) => (
                <span key={topic} className="topic-chip">{topic}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-field-group">
            <h3>{ct.formH3}</h3>
            <p>{ct.formDesc}</p>
          </div>
          <div className="form-row">
            <label className="form-label">
              {ct.formName}
              <input className="form-input" placeholder={ct.formNamePlaceholder} />
            </label>
            <label className="form-label">
              {ct.formContact}
              <input className="form-input" placeholder="+62 8xx-xxxx-xxxx" />
            </label>
          </div>
          <label className="form-label">
            {ct.formNeed}
            <select className="form-input" defaultValue="">
              <option value="" disabled>{ct.formNeedPlaceholder}</option>
              {ct.formOptions.map((opt) => <option key={opt}>{opt}</option>)}
            </select>
          </label>
          <label className="form-label">
            {ct.formMessage}
            <textarea className="form-input form-textarea" placeholder={ct.formMessagePlaceholder} rows={5} />
          </label>
          <button className="btn-primary btn-lg form-submit" type="submit">
            {ct.formSubmit}
          </button>
        </form>
      </FadeSection>

      {/* Map / location callout */}
      <FadeSection className="section section--alt">
        <div className="location-band">
          <div>
            <SectionLabel>{ct.locationLabel}</SectionLabel>
            <h2>{ct.locationH2}</h2>
            <p>
              {ct.locationAddress}<br />
              {ct.locationCity}
            </p>
            <p className="location-note">{ct.locationNote}</p>
          </div>
          <div className="location-hours">
            <div className="hours-block">
              <span>{ct.locationHoursLabel}</span>
              <strong>{ct.locationHoursValue}</strong>
              <small>{ct.locationHoursSub}</small>
            </div>
          </div>
        </div>
      </FadeSection>
    </>
  );
}
