import { useState, useRef } from "react";
import { CheckSquare, Square, Upload, X, ChevronDown, MapPin, Send, Loader2 } from "lucide-react";

const UNITS = [
  { id: "maka-cavalry",   label: "Maka Cavalry",               price: "Rp 70.000 / hari",  tag: "Motor EV" },
  { id: "calya-2022",     label: "Toyota Calya 2022",          price: "Rp 185.000 / hari", tag: "Mobil" },
  { id: "calya-2025",     label: "Toyota Calya 2025",          price: "Rp 200.000 / hari", tag: "Mobil" },
  { id: "calya-2026",     label: "Toyota Calya 2026",          price: "Rp 210.000 / hari", tag: "Mobil" },
  { id: "avanza",         label: "Toyota Avanza",              price: "Rp 200.000 / hari", tag: "Mobil" },
  { id: "xl7",            label: "Suzuki XL 7",                price: "Rp 240.000 / hari", tag: "Mobil" },
  { id: "fox350-milik",   label: "Polytron Fox 350 Sewa Milik",price: "Rp 70.000 / hari",  tag: "Motor EV" },
  { id: "sigra-2022",     label: "Daihatsu Sigra 2022",        price: "Rp 185.000 / hari", tag: "Mobil" },
  { id: "sigra-d",        label: "Daihatsu Sigra D",           price: "Rp 170.000 / hari", tag: "Mobil" },
  { id: "ertiga",         label: "Suzuki Ertiga",              price: "Rp 240.000 / hari", tag: "Mobil" },
  { id: "fox-r",          label: "Polytron Fox R Sewa Reguler",price: "Rp 50.000 / hari",  tag: "Motor EV" },
];

const APPS = [
  { id: "gojek-gocar",   label: "Gojek | Gocar" },
  { id: "gojek-goride",  label: "Gojek | GoRide" },
  { id: "grab-car",      label: "Grab | Grab Car" },
  { id: "grab-ride",     label: "Grab | Grab Ride" },
  { id: "others-motor",  label: "Others | Motor" },
  { id: "others-mobil",  label: "Others | Mobil" },
];

const KOTA = [
  "Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat", "Jakarta Utara", "Jakarta Timur",
  "Bogor", "Depok", "Tangerang", "Bekasi", "Bandung", "Surabaya", "Yogyakarta", "Lainnya",
];

const HUBUNGAN = ["Suami / Istri", "Orang Tua", "Saudara Kandung", "Teman", "Lainnya"];

type UploadField = {
  key: string;
  label: string;
  required: boolean;
  hint?: string;
};

const UPLOAD_FIELDS: UploadField[] = [
  { key: "selfie",     label: "Foto Selfie Pemohon",                                      required: true },
  { key: "kk",         label: "Foto KK Pemohon",                                          required: true },
  { key: "skck",       label: "Foto SKCK atau NPWP Pemohon",                              required: true },
  { key: "token",      label: "Bukti Kepemilikan Rumah / Token Listrik",                  required: true },
  { key: "ktp-penjamin", label: "Foto KTP Penjamin",                                     required: false },
  { key: "penghasilan",  label: "Bukti Penghasilan Ride-hailing Terbaru",                 required: true },
  { key: "domisili",     label: "Surat Domisili (Jika tempat tinggal tidak sesuai KTP)",  required: true },
];

type FormState = {
  nik: string;
  namaDepan: string;
  namaBelakang: string;
  telepon: string;
  whatsapp: string;
  email: string;
  alamat: string;
  kota: string;
  units: string[];
  namaPenjamin: string;
  hubunganPenjamin: string;
  teleponPenjamin: string;
  kodeRefferal: string;
  apps: string[];
};

function FileUploadBox({ label, required, hint, file, onChange }: {
  label: string; required: boolean; hint?: string;
  file: File | null; onChange: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="reg-upload-field">
      <span className="reg-field-label">{label}{required && <em>*</em>}</span>
      {hint && <small className="reg-field-hint">{hint}</small>}
      {file ? (
        <div className="reg-upload-preview">
          <span>{file.name}</span>
          <button type="button" onClick={() => onChange(null)}><X size={14} /></button>
        </div>
      ) : (
        <div className="reg-upload-box" onClick={() => ref.current?.click()}>
          <Upload size={22} />
          <strong>Tap untuk Upload Foto</strong>
          <small>Maksimal 3MB · JPG, PNG, PDF</small>
        </div>
      )}
      <input
        ref={ref}
        type="file"
        accept="image/*,application/pdf"
        className="reg-hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f && f.size > 3 * 1024 * 1024) { alert("File terlalu besar, maks. 3MB"); return; }
          onChange(f ?? null);
        }}
      />
    </div>
  );
}

function CheckItem({ id, label, checked, onChange }: {
  id: string; label: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className={`reg-check-item ${checked ? "reg-check-item--on" : ""}`}>
      <span className="reg-check-box">
        {checked ? <CheckSquare size={18} /> : <Square size={18} />}
      </span>
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="reg-hidden" />
    </label>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    nik: "", namaDepan: "", namaBelakang: "",
    telepon: "62", whatsapp: "62", email: "",
    alamat: "", kota: "",
    units: [], namaPenjamin: "", hubunganPenjamin: "",
    teleponPenjamin: "62", kodeRefferal: "", apps: [],
  });
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleList = (key: "units" | "apps", id: string) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(id) ? f[key].filter((x) => x !== id) : [...f[key], id],
    }));

  const setFile = (key: string) => (file: File | null) =>
    setFiles((prev) => ({ ...prev, [key]: file }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1800);
  };

  if (status === "success") {
    return (
      <section className="reg-success">
        <div className="reg-success-card">
          <div className="reg-success-icon">✓</div>
          <h2>Pendaftaran Terkirim!</h2>
          <p>Terima kasih, <strong>{form.namaDepan} {form.namaBelakang}</strong>. Tim kami akan menghubungi Anda melalui nomor <strong>{form.telepon}</strong> dalam 1×24 jam.</p>
          <button className="reg-btn-back" onClick={() => setStatus("idle")}>Kembali ke Form</button>
        </div>
      </section>
    );
  }

  return (
    <section className="reg-page">
      {/* ── Hero ── */}
      <div className="reg-hero">
        <div className="reg-hero-inner">
          <span className="reg-kicker">Driver Registration</span>
          <h1>Pendaftaran Transgo Fleet</h1>
          <p>Mohon isi data Anda dengan benar untuk keperluan verifikasi. Tim kami akan segera menghubungi Anda melalui kontak yang tertera.</p>
          <div className="reg-hero-address">
            <MapPin size={14} />
            <span>Hotel Kartika Chandra, Jl. Gatot Subroto No.18–20, Karet Semanggi, Setiabudi, Jakarta Selatan, DKI Jakarta</span>
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <form className="reg-form" onSubmit={handleSubmit} noValidate>

        {/* ── Data Pribadi ── */}
        <div className="reg-section">
          <h2 className="reg-section-title">Data Pribadi</h2>
          <div className="reg-fields">
            <div className="reg-field reg-field--full">
              <label className="reg-field-label">Nomor NIK<em>*</em></label>
              <input className="reg-input" type="text" inputMode="numeric" placeholder="Nomor NIK" value={form.nik} onChange={set("nik")} required />
            </div>
            <div className="reg-field">
              <label className="reg-field-label">Nama Depan<em>*</em></label>
              <input className="reg-input" type="text" placeholder="Nama depan pemohon" value={form.namaDepan} onChange={set("namaDepan")} required />
            </div>
            <div className="reg-field">
              <label className="reg-field-label">Nama Belakang</label>
              <input className="reg-input" type="text" placeholder="Nama belakang pemohon" value={form.namaBelakang} onChange={set("namaBelakang")} />
            </div>
            <div className="reg-field">
              <label className="reg-field-label">Nomor Telepon<em>*</em></label>
              <input className="reg-input" type="tel" placeholder="628xxxxxxxxx" value={form.telepon} onChange={set("telepon")} required />
            </div>
            <div className="reg-field">
              <label className="reg-field-label">Nomor WhatsApp<em>*</em></label>
              <input className="reg-input" type="tel" placeholder="628xxxxxxxxx" value={form.whatsapp} onChange={set("whatsapp")} required />
            </div>
            <div className="reg-field reg-field--full">
              <label className="reg-field-label">Alamat Email<em>*</em></label>
              <input className="reg-input" type="email" placeholder="Alamat email pemohon" value={form.email} onChange={set("email")} required />
            </div>
            <div className="reg-field reg-field--full">
              <label className="reg-field-label">Alamat Domisili<em>*</em></label>
              <input className="reg-input" type="text" placeholder="Alamat domisili lengkap" value={form.alamat} onChange={set("alamat")} required />
            </div>
            <div className="reg-field reg-field--full">
              <label className="reg-field-label">Pilih Kota / Cabang<em>*</em></label>
              <div className="reg-select-wrap">
                <select className="reg-select" value={form.kota} onChange={set("kota")} required>
                  <option value="">Pilih kota / cabang</option>
                  {KOTA.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
                <ChevronDown size={16} className="reg-select-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Unit yang akan Disewa ── */}
        <div className="reg-section">
          <h2 className="reg-section-title">Unit yang akan Disewa<em>*</em></h2>
          <p className="reg-section-desc">Pilih satu atau lebih unit kendaraan yang ingin Anda sewa.</p>
          <div className="reg-unit-grid">
            {UNITS.map((u) => {
              const checked = form.units.includes(u.id);
              return (
                <label key={u.id} className={`reg-unit-card ${checked ? "reg-unit-card--on" : ""}`}>
                  <span className="reg-unit-tag">{u.tag}</span>
                  <span className="reg-unit-name">{u.label}</span>
                  <span className="reg-unit-price">{u.price}</span>
                  <span className="reg-unit-check">
                    {checked ? <CheckSquare size={20} /> : <Square size={20} />}
                  </span>
                  <input type="checkbox" checked={checked} onChange={() => toggleList("units", u.id)} className="reg-hidden" />
                </label>
              );
            })}
          </div>
        </div>

        {/* ── Data Penjamin ── */}
        <div className="reg-section">
          <h2 className="reg-section-title">Data Penjamin</h2>
          <div className="reg-fields">
            <div className="reg-field reg-field--full">
              <label className="reg-field-label">Nama Penjamin<em>*</em></label>
              <input className="reg-input" type="text" placeholder="Nama penjamin" value={form.namaPenjamin} onChange={set("namaPenjamin")} required />
            </div>
            <div className="reg-field">
              <label className="reg-field-label">Hubungan dengan Penjamin<em>*</em></label>
              <div className="reg-select-wrap">
                <select className="reg-select" value={form.hubunganPenjamin} onChange={set("hubunganPenjamin")} required>
                  <option value="">Pilih hubungan</option>
                  {HUBUNGAN.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
                <ChevronDown size={16} className="reg-select-icon" />
              </div>
            </div>
            <div className="reg-field">
              <label className="reg-field-label">Nomor Telepon Penjamin<em>*</em></label>
              <input className="reg-input" type="tel" placeholder="628xxxxxxxxx" value={form.teleponPenjamin} onChange={set("teleponPenjamin")} required />
            </div>
          </div>
        </div>

        {/* ── Ride-hailing ── */}
        <div className="reg-section">
          <h2 className="reg-section-title">Aplikasi Ride-hailing<em>*</em></h2>
          <p className="reg-section-desc">Pilih aplikasi ride-hailing yang Anda gunakan saat ini.</p>
          <div className="reg-check-list">
            {APPS.map((a) => (
              <CheckItem key={a.id} id={a.id} label={a.label}
                checked={form.apps.includes(a.id)}
                onChange={() => toggleList("apps", a.id)} />
            ))}
          </div>
        </div>

        {/* ── Kode Refferal ── */}
        <div className="reg-section">
          <h2 className="reg-section-title">Kode Referral<em>*</em></h2>
          <div className="reg-fields">
            <div className="reg-field reg-field--full">
              <label className="reg-field-label">Kode Referral</label>
              <input className="reg-input" type="text" placeholder="Masukkan kode referral (jika ada)" value={form.kodeRefferal} onChange={set("kodeRefferal")} />
            </div>
          </div>
        </div>

        {/* ── Dokumen Pendukung ── */}
        <div className="reg-section">
          <h2 className="reg-section-title">Dokumen Pendukung</h2>
          <p className="reg-section-desc">Upload dokumen dalam format JPG, PNG, atau PDF. Maksimal 3MB per file.</p>
          <div className="reg-upload-grid">
            {UPLOAD_FIELDS.map((f) => (
              <FileUploadBox
                key={f.key}
                label={f.label}
                required={f.required}
                hint={f.hint}
                file={files[f.key] ?? null}
                onChange={setFile(f.key)}
              />
            ))}
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="reg-submit-row">
          <p className="reg-submit-note">Dengan mengirimkan form ini, Anda menyetujui syarat dan ketentuan sewa kendaraan Transgo Fleet.</p>
          <button type="submit" className="reg-submit-btn" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <><Loader2 size={18} className="reg-spin" /> Mengirim...</>
            ) : (
              <><Send size={18} /> Submit Registrasi</>
            )}
          </button>
        </div>

      </form>
    </section>
  );
}
