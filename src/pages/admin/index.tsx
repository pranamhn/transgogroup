import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BarChart3, Car, Cloud, Download, FileText, Gauge, Home, Info, Loader2, Save, Target, Trash2, Upload, Wallet } from "lucide-react";
import { defaultSiteMetrics, type SiteMetrics, useSiteMetrics } from "../../siteMetrics";
import { type VehicleCatalogItem, useVehicleCatalog } from "../../vehicleCatalog";
import { useCompro } from "../../comproPdf";
import { supabase } from "../../supabase";

type AdminSection = "home" | "about" | "fleet" | "investor" | "vision" | "api";

type MetricField = {
  key: keyof SiteMetrics;
  label: string;
  hint: string;
  readOnly?: boolean;
};

const adminSections: { id: AdminSection; label: string; icon: ReactNode }[] = [
  { id: "home", label: "Home", icon: <Home size={16} /> },
  { id: "about", label: "About", icon: <Info size={16} /> },
  { id: "fleet", label: "Fleet & Vehicles", icon: <Car size={16} /> },
  { id: "investor", label: "Investor", icon: <Wallet size={16} /> },
  { id: "vision", label: "Vision 2030", icon: <Target size={16} /> },
  { id: "api", label: "API Data", icon: <Cloud size={16} /> },
];

const metricGroups: { section: AdminSection; title: string; desc: string; fields: MetricField[] }[] = [
  {
    section: "home",
    title: "Core Website Numbers",
    desc: "Angka utama yang muncul di hero, about, investor, dan platform.",
    fields: [
      { key: "totalFleet", label: "Total Armada", hint: "Contoh: 861" },
      { key: "evMotor", label: "Motor EV", hint: "Contoh: 524" },
      { key: "iceCar", label: "Mobil ICE", hint: "Contoh: 337" },
      { key: "aum", label: "Assets Under Managed", hint: "Contoh: Rp129B" },
      { key: "activeDrivers", label: "Active Driver Partners", hint: "Contoh: 1000+" },
      { key: "appDownloads", label: "App Downloads", hint: "Contoh: 10K+" },
      { key: "marketingChannels", label: "Kanal Pemasaran", hint: "Contoh: 120" },
    ],
  },
  {
    section: "about",
    title: "Operational Proof",
    desc: "Angka pendukung untuk section fleet, proof, dan kredibilitas brand.",
    fields: [
      { key: "operatingCities", label: "Kota Operasi", hint: "Contoh: 10+" },
      { key: "googleRating", label: "Google Rating", hint: "Contoh: 4.8★" },
      { key: "foundedYear", label: "Tahun Berdiri", hint: "Contoh: 2022" },
      { key: "fleetModels", label: "Model Armada 4W", hint: "Contoh: 7" },
      { key: "dailyEvPrice", label: "Harga Harian EV", hint: "Contoh: 60K+" },
      { key: "workshopOps", label: "Workshop / Uptime", hint: "Contoh: 24/7" },
    ],
  },
  {
    section: "vision",
    title: "Vision 2030 · 01 Armada Aktif",
    desc: "Urutan pertama di card website: target jumlah armada dari kondisi saat ini menuju 2030.",
    fields: [
      { key: "targetFleet", label: "Target Armada 2030", hint: "Contoh: 10.000" },
      { key: "targetFleetGrowth", label: "Growth Armada", hint: "Contoh: ~12× pertumbuhan fleet" },
    ],
  },
  {
    section: "vision",
    title: "Vision 2030 · 02 Assets Under Managed",
    desc: "Urutan kedua di card website: AUM dihitung dari target unit motor dan mobil dikali harga aset per unit.",
    fields: [
      { key: "targetEvFleet", label: "Target EV 2030", hint: "Contoh: 6.000" },
      { key: "targetIceFleet", label: "Target Mobil 2030", hint: "Contoh: 4.000" },
      { key: "evAssetPrice", label: "Harga Aset Motor EV / Unit", hint: "Contoh: Rp 25M" },
      { key: "iceAssetPrice", label: "Harga Aset Mobil / Unit", hint: "Contoh: Rp 337,5M" },
      { key: "aumPerUnit", label: "Total AUM Motor", hint: "Auto: target EV × harga aset motor", readOnly: true },
      { key: "targetAum", label: "Total AUM Mobil", hint: "Auto: target mobil × harga aset mobil", readOnly: true },
      { key: "targetAumGrowth", label: "Growth AUM", hint: "Contoh: ~12× nilai aset kelolaan" },
      { key: "targetAumTotal", label: "Total AUM", hint: "Auto: AUM Motor + AUM Mobil", readOnly: true },
    ],
  },
  {
    section: "vision",
    title: "Vision 2030 · 03 Revenue",
    desc: "Urutan ketiga di card website: omzet dihitung otomatis dari target unit dan omzet bulanan per unit.",
    fields: [
      { key: "targetEvFleet", label: "Target EV 2030", hint: "Contoh: 6.000" },
      { key: "targetIceFleet", label: "Target Mobil 2030", hint: "Contoh: 4.000" },
      { key: "utilizationDays", label: "Hari Aktif / Bulan", hint: "Contoh: 25" },
      { key: "evDailyRent", label: "Omzet EV / Unit / Hari", hint: "Contoh: Rp 60K" },
      { key: "iceDailyRent", label: "Omzet Mobil / Unit / Hari", hint: "Contoh: Rp 240K" },
      { key: "evMonthlyRent", label: "Omzet EV / Unit / Bulan", hint: "Auto: harian × hari aktif", readOnly: true },
      { key: "iceMonthlyRent", label: "Omzet Mobil / Unit / Bulan", hint: "Auto: harian × hari aktif", readOnly: true },
      { key: "targetMonthlyRevenue", label: "Omzet Bulanan Total", hint: "Auto: EV + Mobil", readOnly: true },
      { key: "targetRevenue", label: "Target Revenue / Tahun", hint: "Auto: omzet bulanan × 12", readOnly: true },
      { key: "currentRevenue", label: "Revenue Saat Ini", hint: "Contoh: ~Rp 34M est. saat ini" },
      { key: "targetRevenueGrowth", label: "Growth Revenue", hint: "Contoh: Berbasis utilisasi aktual" },
    ],
  },
  {
    section: "api",
    title: "API Data Source",
    desc: "Setting endpoint untuk menarik data kendaraan, revenue, dan active driver.",
    fields: [
      { key: "apiEnabled", label: "API Mode", hint: "off / on" },
      { key: "apiBaseUrl", label: "API Base URL", hint: "Contoh: https://api.domain.com/api/v1" },
      { key: "apiAuthToken", label: "Bearer Token", hint: "Token API, kosongkan jika public" },
      { key: "apiAccountType", label: "X-Account-Type", hint: "Contoh: fms_internal" },
      { key: "apiCompanyId", label: "Company ID", hint: "Dipakai untuk {companyId}" },
      { key: "vehicleTotalEndpoint", label: "Vehicle Total Endpoint", hint: "/service_vehicle/vehicles/total?company_id={companyId}" },
      { key: "vehicleDistributionEndpoint", label: "Vehicle Distribution Endpoint", hint: "/service_vehicle/vehicles/distribution?company_id={companyId}" },
      { key: "revenueEndpoint", label: "Revenue Endpoint", hint: "/service_revenue/summary?company_id={companyId}" },
      { key: "activeDriverEndpoint", label: "Active Driver Endpoint", hint: "/service_driver/drivers/distribution?company_id={companyId}" },
      { key: "apiTotalFleetPath", label: "Path Total Armada", hint: "Contoh: data.total" },
      { key: "apiEvMotorPath", label: "Path Motor EV", hint: "Contoh: data.ev_motor" },
      { key: "apiIceCarPath", label: "Path Mobil ICE", hint: "Contoh: data.ice_car" },
      { key: "apiRevenuePath", label: "Path Revenue", hint: "Contoh: data.revenue" },
      { key: "apiActiveDriversPath", label: "Path Active Driver", hint: "Contoh: data.active_drivers" },
    ],
  },
];

export default function AdminPage() {
  const { metrics, setMetrics } = useSiteMetrics();
  const { vehicles, setVehicles } = useVehicleCatalog();
  const { pdfData, setPdf, clearPdf } = useCompro();
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState<AdminSection>("home");
  const [draft, setDraft] = useState(metrics);
  const [vehicleDraft, setVehicleDraft] = useState(vehicles);
  const [message, setMessage] = useState("Edit angka lalu klik Save Changes untuk menerapkan ke website.");
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(metrics);
  }, [metrics]);

  useEffect(() => {
    setVehicleDraft(vehicles);
  }, [vehicles]);

  const isDirty = JSON.stringify(draft) !== JSON.stringify(metrics) || JSON.stringify(vehicleDraft) !== JSON.stringify(vehicles);
  const visibleGroups = metricGroups.filter((group) => group.section === activeSection);

  const filledCount = useMemo(
    () => Object.values(draft).filter((value) => value.trim().length > 0).length,
    [draft],
  );

  const handleExport = async () => {
    const payload = JSON.stringify({ metrics: draft, vehicles: vehicleDraft }, null, 2);
    await navigator.clipboard.writeText(payload);
    setMessage("JSON metrics sudah disalin ke clipboard.");
  };

  const [pdfUploading, setPdfUploading] = useState(false);

  const handlePdfUpload = async (file?: File) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setMessage("PDF terlalu besar (maks. 10MB). Gunakan file yang lebih kecil.");
      return;
    }
    setPdfUploading(true);
    setMessage("Mengupload PDF ke cloud...");
    const { error } = await supabase.storage
      .from("transgo-compro")
      .upload("latest.pdf", file, { upsert: true, contentType: "application/pdf" });
    if (error) {
      console.error("Supabase upload error:", error);
      setMessage(`Upload gagal: ${error.message} (cek console F12 untuk detail)`);
      setPdfUploading(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from("transgo-compro").getPublicUrl("latest.pdf");
    const url = `${publicUrl}?t=${Date.now()}`;
    setPdf({ url, filename: file.name });
    setMessage(`Company Profile "${file.name}" berhasil diupload dan tersimpan di cloud.`);
    setPdfUploading(false);
  };

  const handleClearPdf = async () => {
    await supabase.storage.from("transgo-compro").remove(["latest.pdf"]);
    clearPdf();
    setMessage("Company Profile dihapus.");
  };

  const handleSave = () => {
    setMetrics(withCalculatedVision(draft));
    setVehicles(vehicleDraft);
    setMessage("Changes saved. Website sudah memakai angka terbaru.");
  };

  const handleImportFile = async (file?: File) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as Partial<SiteMetrics> | { metrics?: Partial<SiteMetrics>; vehicles?: VehicleCatalogItem[] };
      const nextMetrics = "metrics" in parsed ? parsed.metrics : parsed;
      setDraft(withCalculatedVision({ ...defaultSiteMetrics, ...nextMetrics }));
      if ("vehicles" in parsed && Array.isArray(parsed.vehicles)) setVehicleDraft(parsed.vehicles);
      setMessage("Metrics berhasil di-import ke draft. Klik Save Changes untuk menerapkan.");
    } catch {
      setMessage("Import gagal. Pastikan format JSON valid.");
    }
  };

  const handleSyncApi = async () => {
    try {
      if (!draft.apiBaseUrl.trim()) {
        setMessage("API Base URL belum diisi.");
        return;
      }

      const [vehicleTotal, vehicleDistribution, revenue, activeDriver] = await Promise.all([
        fetchApiJson(draft, draft.vehicleTotalEndpoint),
        fetchApiJson(draft, draft.vehicleDistributionEndpoint),
        fetchApiJson(draft, draft.revenueEndpoint),
        fetchApiJson(draft, draft.activeDriverEndpoint),
      ]);

      const next = { ...draft };
      applyApiValue(next, "totalFleet", vehicleTotal, draft.apiTotalFleetPath);
      applyApiValue(next, "evMotor", vehicleDistribution, draft.apiEvMotorPath);
      applyApiValue(next, "iceCar", vehicleDistribution, draft.apiIceCarPath);
      applyApiValue(next, "currentRevenue", revenue, draft.apiRevenuePath);
      applyApiValue(next, "activeDrivers", activeDriver, draft.apiActiveDriversPath);
      setDraft(withCalculatedVision(next));
      setMessage("API data berhasil ditarik ke draft. Klik Save Changes untuk menerapkan.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Sync API gagal.");
    }
  };

  return (
    <main className="admin-shell">
      <section className="admin-hero">
        <div>
          <span className="admin-kicker">Transgo Admin</span>
          <h1>Website Numbers Dashboard</h1>
          <p>Atur angka utama website dari satu tempat. Simpan perubahan untuk memperbarui halaman terkait.</p>
        </div>
        <div className="admin-hero-card">
          <BarChart3 size={24} />
          <strong>{filledCount}/{Object.keys(defaultSiteMetrics).length}</strong>
          <span>Fields terisi</span>
        </div>
      </section>

      <section className="admin-actions">
        <div>
          <strong>Status</strong>
          <span>{message}</span>
        </div>
        <div className="admin-action-buttons">
          <button type="button" onClick={handleSave} className="admin-save-btn" disabled={!isDirty}>
            <Save size={16} /> Save Changes
          </button>
          <button type="button" onClick={handleSyncApi} className="admin-sync-btn">
            <Cloud size={16} /> Sync API Data
          </button>
          <button type="button" onClick={handleExport}>
            <Download size={16} /> Export
          </button>
          <button type="button" onClick={() => importInputRef.current?.click()}>
            <Upload size={16} /> Import
          </button>
          <input
            ref={importInputRef}
            className="admin-hidden-file"
            type="file"
            accept="application/json,.json"
            onChange={(e) => handleImportFile(e.target.files?.[0])}
          />
        </div>
      </section>

      <section className="admin-grid">
        <nav className="admin-sidebar" aria-label="Admin menu">
          {adminSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={activeSection === section.id ? "admin-sidebar-btn admin-sidebar-btn--active" : "admin-sidebar-btn"}
              onClick={() => setActiveSection(section.id)}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-form-stack">
          {visibleGroups.map((group) => (
            <article key={group.title} className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <h2>{group.title}</h2>
                  <p>{group.desc}</p>
                </div>
                <Save size={18} />
              </div>
              <div className="admin-fields">
                {group.fields.map((field) => (
                  <label key={field.key} className="admin-field">
                    <span>{field.label}</span>
                    <input
                      type={field.key === "apiAuthToken" ? "password" : "text"}
                      value={draft[field.key]}
                      placeholder={field.hint}
                      readOnly={field.readOnly}
                      onChange={(e) => {
                        if (field.readOnly) return;
                        setDraft((current) => updateDraftField(current, field.key, e.target.value));
                      }}
                    />
                    <small>{field.hint}</small>
                  </label>
                ))}
              </div>
            </article>
          ))}
          {activeSection === "home" && (
            <article className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <h2>Company Profile PDF</h2>
                  <p>PDF yang diupload akan muncul sebagai popup fullscreen saat tombol "View Compro" diklik di halaman utama.</p>
                </div>
                <FileText size={18} />
              </div>
              <div className="compro-upload-area">
                {pdfUploading ? (
                  <div className="compro-upload-empty">
                    <Loader2 size={28} className="compro-spinner" />
                    <strong>Mengupload ke cloud…</strong>
                    <span>Mohon tunggu sebentar</span>
                  </div>
                ) : pdfData ? (
                  <div className="compro-upload-active">
                    <div className="compro-upload-info">
                      <FileText size={20} />
                      <div>
                        <strong>{pdfData.filename}</strong>
                        <span>PDF aktif — tombol "View Compro" akan membuka file ini</span>
                      </div>
                    </div>
                    <div className="compro-upload-btns">
                      <button type="button" className="compro-replace-btn" onClick={() => pdfInputRef.current?.click()}>
                        <Upload size={14} /> Ganti PDF
                      </button>
                      <button type="button" className="compro-delete-btn" onClick={handleClearPdf}>
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="compro-upload-empty" onClick={() => pdfInputRef.current?.click()}>
                    <Upload size={28} />
                    <strong>Upload Company Profile PDF</strong>
                    <span>Klik untuk pilih file · Maks. 10MB</span>
                  </div>
                )}
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept="application/pdf"
                  className="admin-hidden-file"
                  onChange={(e) => handlePdfUpload(e.target.files?.[0])}
                />
              </div>
            </article>
          )}
          {activeSection === "fleet" && (
            <VehicleEditor vehicles={vehicleDraft} onChange={setVehicleDraft} />
          )}
          {activeSection === "investor" && (
            <article className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <h2>Investor Metrics</h2>
                  <p>Angka investor memakai Core Website Numbers: AUM, total fleet, app downloads, active drivers, dan kanal pemasaran.</p>
                </div>
                <Gauge size={18} />
              </div>
              <div className="admin-fields">
                {(["aum", "totalFleet", "appDownloads", "activeDrivers", "marketingChannels"] as Array<keyof SiteMetrics>).map((key) => (
                  <label key={key} className="admin-field">
                    <span>{key}</span>
                    <input value={draft[key]} onChange={(e) => setDraft((current) => updateDraftField(current, key, e.target.value))} />
                    <small>Terhubung ke card investor dan copy website.</small>
                  </label>
                ))}
              </div>
            </article>
          )}
        </div>

      </section>
    </main>
  );
}

function VehicleEditor({ vehicles, onChange }: { vehicles: VehicleCatalogItem[]; onChange: (vehicles: VehicleCatalogItem[]) => void }) {
  const updateVehicle = (index: number, patch: Partial<VehicleCatalogItem>) => {
    onChange(vehicles.map((vehicle, i) => (i === index ? { ...vehicle, ...patch } : vehicle)));
  };

  const addVehicle = () => {
    onChange([
      ...vehicles,
      { name: "Unit Baru", type: "MT", originalPrice: 0, offerPrice: 0, imageUrl: "" },
    ]);
  };

  const removeVehicle = (index: number) => {
    onChange(vehicles.filter((_, i) => i !== index));
  };

  return (
    <article className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <h2>Vehicle Pricing & Photos</h2>
          <p>Atur harga kendaraan dan URL foto yang muncul di pricing section Home dan 4W Fleet.</p>
        </div>
        <Car size={18} />
      </div>
      <div className="admin-vehicle-list">
        {vehicles.map((vehicle, index) => (
          <div key={`${vehicle.name}-${index}`} className="admin-vehicle-card">
            <div className="admin-vehicle-preview">
              {vehicle.imageUrl ? <img src={vehicle.imageUrl} alt={vehicle.name} /> : <span>No Photo</span>}
            </div>
            <div className="admin-fields admin-fields--vehicle">
              <label className="admin-field">
                <span>Nama Kendaraan</span>
                <input value={vehicle.name} onChange={(e) => updateVehicle(index, { name: e.target.value })} />
              </label>
              <label className="admin-field">
                <span>Tipe</span>
                <input value={vehicle.type} onChange={(e) => updateVehicle(index, { type: e.target.value })} />
              </label>
              <label className="admin-field">
                <span>Harga Coret</span>
                <input
                  type="number"
                  value={vehicle.originalPrice}
                  onChange={(e) => updateVehicle(index, { originalPrice: Number(e.target.value) })}
                />
              </label>
              <label className="admin-field">
                <span>Harga Offer</span>
                <input
                  type="number"
                  value={vehicle.offerPrice}
                  onChange={(e) => updateVehicle(index, { offerPrice: Number(e.target.value) })}
                />
              </label>
              <label className="admin-field admin-field--wide">
                <span>Foto Kendaraan URL</span>
                <input value={vehicle.imageUrl} placeholder="https://..." onChange={(e) => updateVehicle(index, { imageUrl: e.target.value })} />
                <small>Gunakan URL gambar publik agar muncul di website.</small>
              </label>
            </div>
            <button type="button" className="admin-remove-vehicle" onClick={() => removeVehicle(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="admin-add-vehicle" onClick={addVehicle}>
        + Add Vehicle
      </button>
    </article>
  );
}

async function fetchApiJson(metrics: SiteMetrics, endpoint: string) {
  if (!endpoint.trim()) return null;
  const url = joinUrl(metrics.apiBaseUrl, endpoint.split("{companyId}").join(encodeURIComponent(metrics.apiCompanyId)));
  const headers: Record<string, string> = { Accept: "application/json" };
  if (metrics.apiAuthToken.trim()) headers.Authorization = `Bearer ${metrics.apiAuthToken.trim()}`;
  if (metrics.apiAccountType.trim()) headers["X-Account-Type"] = metrics.apiAccountType.trim();

  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`API gagal: ${response.status} ${url}`);
  return response.json();
}

function joinUrl(baseUrl: string, endpoint: string) {
  const base = baseUrl.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function applyApiValue(metrics: SiteMetrics, key: keyof SiteMetrics, payload: unknown, path: string) {
  const value = getByPath(payload, path);
  if (value === undefined || value === null || value === "") return;
  metrics[key] = String(value);
}

function getByPath(payload: unknown, path: string) {
  if (!payload || !path.trim()) return undefined;
  return path.split(".").reduce<unknown>((current, segment) => {
    if (current === undefined || current === null) return undefined;
    if (/^\d+$/.test(segment) && Array.isArray(current)) return current[Number(segment)];
    if (typeof current === "object" && segment in current) return (current as Record<string, unknown>)[segment];
    return undefined;
  }, payload);
}

function updateDraftField(current: SiteMetrics, key: keyof SiteMetrics, value: string) {
  const next = { ...current, [key]: value };
  if (["targetEvFleet", "targetIceFleet", "evDailyRent", "iceDailyRent", "utilizationDays"].includes(key)) {
    return withCalculatedVision(next);
  }
  if (["evAssetPrice", "iceAssetPrice"].includes(key)) {
    return withCalculatedVision(next);
  }
  return next;
}

function withCalculatedVision(metrics: SiteMetrics): SiteMetrics {
  return withCalculatedRevenue(withCalculatedAum(metrics));
}

function withCalculatedAum(metrics: SiteMetrics): SiteMetrics {
  const evFleet = parseMetricNumber(metrics.targetEvFleet);
  const iceFleet = parseMetricNumber(metrics.targetIceFleet);
  const evAssetPriceIdr = parseMoney(metrics.evAssetPrice);
  const iceAssetPriceIdr = parseMoney(metrics.iceAssetPrice);
  const totalFleet = evFleet + iceFleet;
  const totalAum = evFleet * evAssetPriceIdr + iceFleet * iceAssetPriceIdr;

  const aumEv = evFleet * evAssetPriceIdr;
  const aumIce = iceFleet * iceAssetPriceIdr;

  if (!Number.isFinite(totalAum) || totalAum <= 0) return metrics;

  return {
    ...metrics,
    evAssetPriceMill: String(evAssetPriceIdr / 1_000_000),
    iceAssetPriceMill: String(iceAssetPriceIdr / 1_000_000),
    aumPerUnit: formatRupiahCompact(aumEv),
    targetAum: formatRupiahCompact(aumIce),
    targetAumTotal: formatRupiahCompact(totalAum),
  };
}

function withCalculatedRevenue(metrics: SiteMetrics): SiteMetrics {
  const evFleet = parseMetricNumber(metrics.targetEvFleet);
  const iceFleet = parseMetricNumber(metrics.targetIceFleet);
  const activeDays = parseMetricNumber(metrics.utilizationDays);
  const evDaily = parseMoney(metrics.evDailyRent);
  const iceDaily = parseMoney(metrics.iceDailyRent);
  const evMonthly = evDaily * activeDays;
  const iceMonthly = iceDaily * activeDays;

  const monthlyRevenue = evFleet * evMonthly + iceFleet * iceMonthly;
  if (!Number.isFinite(monthlyRevenue) || monthlyRevenue <= 0) return metrics;

  return {
    ...metrics,
    evMonthlyRent: formatRupiahCompact(evMonthly),
    iceMonthlyRent: formatRupiahCompact(iceMonthly),
    targetMonthlyRevenue: formatRupiahCompact(monthlyRevenue),
    targetRevenue: formatRupiahCompact(monthlyRevenue * 12),
  };
}

function parseMetricNumber(value: string) {
  const normalized = value
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseMoney(value: string) {
  const upper = value.toUpperCase();
  const base = parseMetricNumber(upper);
  if (upper.includes("T")) return base * 1_000_000_000_000;
  if (upper.includes("B")) return base * 1_000_000_000;
  if (upper.includes("M")) return base * 1_000_000;
  if (upper.includes("K")) return base * 1_000;
  return base;
}

function formatRupiahCompact(value: number) {
  const units = [
    { suffix: "T", divider: 1_000_000_000_000 },
    { suffix: "B", divider: 1_000_000_000 },
    { suffix: "M", divider: 1_000_000 },
    { suffix: "K", divider: 1_000 },
  ];
  const unit = units.find((item) => Math.abs(value) >= item.divider);
  if (!unit) return `Rp ${Math.round(value).toLocaleString("id-ID")}`;
  const compact = value / unit.divider;
  const formatted = Number.isInteger(compact)
    ? compact.toLocaleString("id-ID", { maximumFractionDigits: 0 })
    : compact.toLocaleString("id-ID", { maximumFractionDigits: 1 });
  return `Rp ${formatted}${unit.suffix}`;
}
