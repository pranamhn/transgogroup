import { useState, useRef } from "react";
import { CheckSquare, Square, Upload, X, ChevronDown, MapPin, Send, Loader2, ArrowLeft } from "lucide-react";
import { go } from "../../hooks";

const UNITS = [
  { id: "maka-cavalry",   label: "Maka Cavalry",                price: "Rp 70.000 / hari",  tag: "Motor EV" },
  { id: "calya-2022",     label: "Toyota Calya 2022",           price: "Rp 185.000 / hari", tag: "Mobil" },
  { id: "calya-2025",     label: "Toyota Calya 2025",           price: "Rp 200.000 / hari", tag: "Mobil" },
  { id: "calya-2026",     label: "Toyota Calya 2026",           price: "Rp 210.000 / hari", tag: "Mobil" },
  { id: "avanza",         label: "Toyota Avanza",               price: "Rp 200.000 / hari", tag: "Mobil" },
  { id: "xl7",            label: "Suzuki XL 7",                 price: "Rp 240.000 / hari", tag: "Mobil" },
  { id: "fox350-milik",   label: "Polytron Fox 350 Sewa Milik", price: "Rp 70.000 / hari",  tag: "Motor EV" },
  { id: "sigra-2022",     label: "Daihatsu Sigra 2022",         price: "Rp 185.000 / hari", tag: "Mobil" },
  { id: "sigra-d",        label: "Daihatsu Sigra D",            price: "Rp 170.000 / hari", tag: "Mobil" },
  { id: "ertiga",         label: "Suzuki Ertiga",               price: "Rp 240.000 / hari", tag: "Mobil" },
  { id: "fox-r",          label: "Polytron Fox R Sewa Reguler", price: "Rp 50.000 / hari",  tag: "Motor EV" },
];

const APPS = [
  { id: "gojek-gocar",  label: "Gojek — Gocar" },
  { id: "gojek-goride", label: "Gojek — GoRide" },
  { id: "grab-car",     label: "Grab — GrabCar" },
  { id: "grab-ride",    label: "Grab — GrabRide" },
  { id: "others-motor", label: "Lainnya — Motor" },
  { id: "others-mobil", label: "Lainnya — Mobil" },
];

const KOTA = [
  "Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat",
  "Jakarta Utara", "Jakarta Timur", "Bogor", "Depok",
  "Tangerang", "Bekasi", "Bandung", "Surabaya", "Yogyakarta", "Lainnya",
];

const HUBUNGAN = ["Suami / Istri", "Orang Tua", "Saudara Kandung", "Teman", "Lainnya"];

type UploadField = { key: string; label: string; required: boolean; hint?: string };

const UPLOAD_FIELDS: UploadField[] = [
  { key: "selfie",      label: "Foto Selfie Pemohon",                                     required: true },
  { key: "kk",          label: "Foto KK Pemohon",                                         required: true },
  { key: "skck",        label: "Foto SKCK atau NPWP Pemohon",                             required: true },
  { key: "token",       label: "Bukti Kepemilikan Rumah / Token Listrik",                 required: true },
  { key: "ktp-penjamin",label: "Foto KTP Penjamin",                                       required: false },
  { key: "penghasilan", label: "Bukti Penghasilan Ride-hailing Terbaru",                  required: true },
  { key: "domisili",    label: "Surat Domisili (jika tempat tinggal tidak sesuai KTP)",   required: false },
];

type FormState = {
  nik: string; namaDepan: string; namaBelakang: string;
  telepon: string; whatsapp: string; email: string;
  alamat: string; kota: string; units: string[];
  namaPenjamin: string; hubunganPenjamin: string; teleponPenjamin: string;
  kodeRefferal: string; apps: string[];
};

function FileUploadBox({ label, required, hint, file, onChange }: {
  label: string; required: boolean; hint?: string;
  file: File | null; onChange: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="reg-upload-field">
      <span className="reg-field-label">
        {label}{required && <em>*</em>}
      </span>
      {hint && <small className="reg-field-hint">{hint}</small>}
      {file ? (
        <div className="reg-upload-preview">
          <span>{file.name}</span>
          <button type="button" onClick={() => onChange(null)}><X size={14} /></button>
        </div>
      ) : (
        <div className="reg-upload-box" onClick={() => ref.current?.click()}>
          <Upload size={20} />
          <strong>Tap untuk Upload</strong>
          <small>JPG, PNG, PDF · maks 3 MB</small>
        </div>
      )}
      <input
        ref={ref} type="file" accept="image/*,application/pdf" className="reg-hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f && f.size > 3 * 1024 * 1024) { alert("File terlalu besar, maks. 3MB"); return; }
          onChange(f ?? null);
        }}
      />
    </div>
  );
}

function CheckItem({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className={`reg-check-item${checked ? " reg-check-item--on" : ""}`}>
      <span className="reg-check-box">
        {checked ? <CheckSquare size={17} /> : <Square size={17} />}
      </span>
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="reg-hidden" />
    </label>
  );
}

function SectionHeader({ num, title, desc }: { num: string; title: React.ReactNode; desc?: string }) {
  return (
    <div className="reg-section-head">
      <div className="reg-section-num">{num}</div>
      <div>
        <h2 className="reg-section-title">{title}</h2>
        {desc && <p className="reg-section-desc">{desc}</p>}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    nik: "", namaDepan: "", namaBelakang: "",
    telepon: "62", whatsapp: "62", email: "",
    alamat: "", kota: "", units: [],
    namaPenjamin: "", hubunganPenjamin: "", teleponPenjamin: "62",
    kodeRefferal: "", apps: [],
  });
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
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
      <div className="reg-standalone">
        <div className="reg-topbar">
          <button className="reg-back-btn" onClick={() => go("/")}>
            <ArrowLeft size={16} /> Kembali
          </button>
          <span className="reg-brand">TRANSGO GROUP</span>
        </div>
        <section className="reg-success">
          <div className="reg-success-card">
            <div className="reg-success-icon">✓</div>
            <h2>Pendaftaran Terkirim!</h2>
            <p>Terima kasih, <strong>{form.namaDepan} {form.namaBelakang}</strong>. Tim kami akan menghubungi Anda melalui nomor <strong>{form.telepon}</strong> dalam 1×24 jam.</p>
            <button className="reg-btn-back" onClick={() => setStatus("idle")}>Isi ulang form</button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="reg-standalone">

      {/* ── Minimal topbar ── */}
      <div className="reg-topbar">
        <button className="reg-back-btn" onClick={() => go("/")}>
          <ArrowLeft size={16} /> Beranda
        </button>
        <span className="reg-brand">TRANSGO GROUP</span>
      </div>

      {/* ── Hero ── */}
      <div className="reg-hero">
        <div className="reg-hero-inner">
          <span className="reg-kicker">Driver Registration</span>
          <h1>Pendaftaran Transgo Fleet</h1>
          <p>Mohon isi data Anda dengan benar untuk keperluan verifikasi. Tim kami akan segera menghubungi Anda melalui kontak yang tertera.</p>
          <div className="reg-hero-address">
            <MapPin size={14} />
            <span>Hotel Kartika Chandra, Jl. Gatot Subroto No.18–20, Karet Semanggi, Setiabudi, Jakarta Selatan</span>
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <form className="reg-form" onSubmit={handleSubmit} noValidate>

        {/* 01 Data Pribadi */}
        <div className="reg-section">
          <SectionHeader num="01" title="Data Pribadi" />
          <div className="reg-fields">
            <div className="reg-field reg-field--full">
              <label className="reg-field-label">Nomor NIK<em>*</em></label>
              <input className="reg-input" type="text" inputMode="numeric" placeholder="16 digit nomor NIK" value={form.nik} onChange={set("nik")} required />
            </div>
            <div className="reg-field">
              <label className="reg-field-label">Nama Depan<em>*</em></label>
              <input className="reg-input" type="text" placeholder="Nama depan" value={form.namaDepan} onChange={set("namaDepan")} required />
            </div>
            <div className="reg-field">
              <label className="reg-field-label">Nama Belakang</label>
              <input className="reg-input" type="text" placeholder="Nama belakang" value={form.namaBelakang} onChange={set("namaBelakang")} />
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
              <input className="reg-input" type="email" placeholder="Alamat email aktif" value={form.email} onChange={set("email")} required />
            </div>
            <div className="reg-field reg-field--full">
              <label className="reg-field-label">Alamat Domisili<em>*</em></label>
              <input className="reg-input" type="text" placeholder="Alamat domisili lengkap" value={form.alamat} onChange={set("alamat")} required />
            </div>
            <div className="reg-field reg-field--full">
              <label className="reg-field-label">Kota / Cabang<em>*</em></label>
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

        {/* 02 Unit */}
        <div className="reg-section">
          <SectionHeader num="02" title={<>Unit yang akan Disewa<em>*</em></>} desc="Pilih satu atau lebih unit kendaraan yang ingin Anda sewa." />
          {(["Motor EV", "Mobil"] as const).map((group) => (
            <div key={group} className="reg-unit-group">
              <div className="reg-unit-group-label">{group}</div>
              <div className="reg-unit-list">
                {UNITS.filter((u) => u.tag === group).map((u) => {
                  const checked = form.units.includes(u.id);
                  return (
                    <label key={u.id} className={`reg-unit-row${checked ? " reg-unit-row--on" : ""}`}>
                      <span className="reg-unit-row-check">
                        {checked ? <CheckSquare size={17} /> : <Square size={17} />}
                      </span>
                      <span className="reg-unit-name">{u.label}</span>
                      <span className="reg-unit-price">{u.price}</span>
                      <input type="checkbox" checked={checked} onChange={() => toggleList("units", u.id)} className="reg-hidden" />
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 03 Penjamin */}
        <div className="reg-section">
          <SectionHeader num="03" title="Data Penjamin" />
          <div className="reg-fields">
            <div className="reg-field reg-field--full">
              <label className="reg-field-label">Nama Penjamin<em>*</em></label>
              <input className="reg-input" type="text" placeholder="Nama lengkap penjamin" value={form.namaPenjamin} onChange={set("namaPenjamin")} required />
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

        {/* 04 Ride-hailing */}
        <div className="reg-section">
          <SectionHeader num="04" title={<>Aplikasi Ride-hailing<em>*</em></>} desc="Pilih aplikasi ride-hailing yang Anda gunakan saat ini." />
          <div className="reg-check-list">
            {APPS.map((a) => (
              <CheckItem key={a.id} label={a.label}
                checked={form.apps.includes(a.id)}
                onChange={() => toggleList("apps", a.id)} />
            ))}
          </div>
        </div>

        {/* 05 Referral */}
        <div className="reg-section">
          <SectionHeader num="05" title="Kode Referral" />
          <div className="reg-fields">
            <div className="reg-field reg-field--full">
              <label className="reg-field-label">Kode Referral</label>
              <input className="reg-input" type="text" placeholder="Masukkan kode referral" value={form.kodeRefferal} onChange={set("kodeRefferal")} />
              <p className="reg-field-note">Jika tidak ada referral, tulis <strong>TRANSGO</strong></p>
            </div>
          </div>
        </div>

        {/* 06 Dokumen */}
        <div className="reg-section">
          <SectionHeader num="06" title="Dokumen Pendukung" desc="Upload dokumen dalam format JPG, PNG, atau PDF. Maksimal 3 MB per file." />
          <div className="reg-upload-grid">
            {UPLOAD_FIELDS.map((f) => (
              <FileUploadBox
                key={f.key} label={f.label} required={f.required} hint={f.hint}
                file={files[f.key] ?? null} onChange={setFile(f.key)}
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="reg-submit-row">
          <p className="reg-submit-note">Dengan mengirimkan form ini, Anda menyetujui syarat dan ketentuan sewa kendaraan Transgo Fleet.</p>
          <button type="submit" className="reg-submit-btn" disabled={status === "submitting"}>
            {status === "submitting"
              ? <><Loader2 size={18} className="reg-spin" /> Mengirim...</>
              : <><Send size={18} /> Submit Pendaftaran</>
            }
          </button>
        </div>

      </form>
    </div>
  );
}
