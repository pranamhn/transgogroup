import { FadeSection, PageHero, SectionLabel } from "../../components/ui";

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Hubungi Kami"
        title="Mari bangun kemitraan armada mobilitas produktif."
        copy="Rental fleet, driver onboarding, investor discussion, atau partnership bengkel — kami siap diskusi dan berikan solusi terbaik."
        compact
      />

      <FadeSection className="section contact-layout">
        {/* Info */}
        <div className="contact-info-panel">
          <SectionLabel>PT Transgo Group Mobility</SectionLabel>
          <h2>Kami siap membantu.</h2>
          <div className="contact-info-items">
            {[
              { label: "Alamat",          value: "Jl. Gatot Subroto No.18-20, Setiabudi, Jakarta Selatan 12930" },
              { label: "Jam Operasional", value: "08.00 – 21.00 WIB (Setiap Hari)" },
              { label: "Instagram",       value: "@transgogroup" },
              { label: "LinkedIn",        value: "Transgo Group" },
            ].map((c) => (
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
            <SectionLabel>Topik Umum</SectionLabel>
            <div className="contact-topic-chips">
              {["Rental Mobil Driver", "Rental Motor Listrik", "Fleet Partnership", "Investor Discussion", "Workshop Service", "Komunitas Driver"].map((t) => (
                <span key={t} className="topic-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-field-group">
            <h3>Kirim pesan</h3>
            <p>Isi form di bawah — tim kami akan menghubungi Anda dalam 1×24 jam.</p>
          </div>
          <div className="form-row">
            <label className="form-label">
              Nama Lengkap
              <input className="form-input" placeholder="Nama lengkap Anda" />
            </label>
            <label className="form-label">
              WhatsApp / Email
              <input className="form-input" placeholder="+62 8xx-xxxx-xxxx" />
            </label>
          </div>
          <label className="form-label">
            Kebutuhan
            <select className="form-input" defaultValue="">
              <option value="" disabled>Pilih topik</option>
              <option>Rental mobil untuk driver online</option>
              <option>Rental motor listrik</option>
              <option>Investasi armada EV</option>
              <option>Fleet partnership / B2B</option>
              <option>Workshop service</option>
              <option>Lainnya</option>
            </select>
          </label>
          <label className="form-label">
            Pesan
            <textarea className="form-input form-textarea" placeholder="Ceritakan kebutuhan Anda secara singkat…" rows={5} />
          </label>
          <button className="btn-primary btn-lg form-submit" type="submit">
            Kirim Inquiry
          </button>
        </form>
      </FadeSection>

      {/* Map / location callout */}
      <FadeSection className="section section--alt">
        <div className="location-band">
          <div>
            <SectionLabel>Lokasi Kantor</SectionLabel>
            <h2>Kunjungi workshop & kantor kami.</h2>
            <p>
              Jl. Gatot Subroto No.18-20, RT.8/RW.2, Setiabudi,<br />
              Jakarta Selatan 12930, DKI Jakarta
            </p>
            <p className="location-note">
              Tersedia parkir. Checkpoint rutin driver setiap 2 minggu di lokasi ini.
            </p>
          </div>
          <div className="location-hours">
            <div className="hours-block">
              <span>Jam Operasional</span>
              <strong>08.00 – 21.00 WIB</strong>
              <small>Setiap hari termasuk akhir pekan</small>
            </div>
          </div>
        </div>
      </FadeSection>
    </>
  );
}
