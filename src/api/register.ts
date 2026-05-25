const GATEWAY = "https://api.sevaqu.com/api/v2";
const AUTH_API = "https://auth.sevaqu.com/api";

export const COMPANY_ID   = "79483b71-25c2-11f0-8c42-d28e58827589";
export const CHECKLIST_ID = "e959b837-ee3e-437f-bb91-1d41af5a4830";

/* ── Types ── */

export type CatalogUnit = {
  id: string;        // unique form ID (may be "catalogId_i" for multi-year variants)
  catalogId: string; // real API catalog ID used for submit
  label: string;
  price?: string;
  tag: "Motor EV" | "Mobil";
};

export type Pool = { id: string; name: string };

export type ChecklistField = {
  id: string;
  item_name: string;
  item_type: "attachment" | "attachment_free_text" | "free_text" | "option" | "all";
  checklist_id: string;
};

export type LeadPayload = {
  company_id: string;
  checklist_id: string;
  vehicle_id: null;
  vehicle_catalog_id: string | null;
  pool_id: string | null;
  identity_number: string;
  identity_file_url: string;
  licence_file_url: string;
  family_card_url: string;
  relatives_identity_url: string | null;
  skck_file_url: string;
  house_file_url: string;
  photo_selfie_url: string;
  relatives_phone: string;
  relatives_name: string;
  relatives_status: string;
  domicile_address: string;
  whatsapp_number: string;
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type CheckpointItem = {
  company_id: string;
  checklist_item_id: string;
  value: string;
  remarks: string;
};

/* ── Helpers ── */

export function sanitizePhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("0")) d = "62" + d.slice(1);
  else if (!d.startsWith("62")) d = "62" + d;
  return d;
}

/* Match a checklist item's name to our local upload-field key */
export function guessFieldKey(itemName: string): string | null {
  const n = itemName.toLowerCase();
  if ((n.includes("ktp") || n.includes("identity")) && !n.includes("penjamin") && !n.includes("penanggung")) return "ktp";
  if (n.includes("sim") || n.includes("driving") || n.includes("izin mengemudi")) return "sim";
  if (n.includes("selfie") || (n.includes("foto") && n.includes("diri"))) return "selfie";
  if (n.includes("kk") || n.includes("kartu keluarga")) return "kk";
  if (n.includes("skck") || n.includes("npwp")) return "skck";
  if (n.includes("token") || n.includes("listrik") || n.includes("kepemilikan") || n.includes("rumah") || n.includes("tampak")) return "token";
  if (n.includes("penjamin") || n.includes("penanggung")) return "ktp-penjamin";
  if (n.includes("penghasilan") || n.includes("income")) return "penghasilan";
  if (n.includes("domisili")) return "domisili";
  if (n.includes("ride") || n.includes("aplikasi") || n.includes("platform")) return "apps";
  if (n.includes("referral") || n.includes("refferal") || n.includes("referal") || n.includes("kode ref")) return "referral";
  return null;
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

/* ── API Functions ── */

/* Price pattern: "Rp X.XXX / hari" or plain "X.XXX / hari" */
const PRICE_RE    = /(?:Rp\s*)?([\d.,]+)\s*\/\s*hari/i;
const PRICE_FULL  = /Rp\s*[\d.,]+\s*\/\s*hari/i;

function extractPrice(s: string): string {
  const full = s.match(PRICE_FULL);
  if (full) return full[0].trim();
  const plain = s.match(PRICE_RE);
  return plain ? `Rp ${plain[1]} / hari` : "";
}

function extractName(s: string): string {
  /* Remove "Biaya Sewa [Rp] X.XXX / hari" — car price prefix */
  let name = s.replace(/\s*Biaya\s+Sewa\s+(?:Rp\s*)?[\d.,]+\s*\/\s*hari/gi, "");
  /* Remove trailing " Rp X.XXX / hari" — EV price suffix */
  name = name.replace(/\s+Rp\s*[\d.,]+\s*\/\s*hari/gi, "");
  return name.trim();
}

/* API uses "ll" (two lowercase L) as the year-variant separator */
const VARIANT_SEP = /\s*(?:\|\||ll)\s*/;

/* Forced year override when API doesn't return a year for a known vehicle.
   priceRe narrows matches when the same model has multiple year variants. */
const YEAR_OVERRIDE: Array<[nameRe: RegExp, priceRe: RegExp | null, year: string]> = [
  [/avanza/i,    /200/,  "2021"],
  [/avanza/i,    /225/,  "2024"],
  [/sigra\s*d/i, null,   "2025"],
  [/ertiga/i,    null,   "2023"],
  [/xl\s*7/i,    null,   "2024"],
];

function forceYear(label: string, price?: string): string {
  if (/\b\d{4}\b/.test(label)) return label;
  for (const [nameRe, priceRe, yr] of YEAR_OVERRIDE) {
    if (nameRe.test(label) && (!priceRe || priceRe.test(price ?? "")))
      return `${label} ${yr}`;
  }
  return label;
}

export async function fetchVehicleCatalogs(): Promise<CatalogUnit[]> {
  const res = await fetch(
    `${GATEWAY}/service_vehicle/vehicle-catalogs/?page=1&pageSize=100&company_id=${COMPANY_ID}`
  );
  const json = await res.json();
  if (json.status !== "success") return [];

  const result: CatalogUnit[] = [];

  for (const c of json.data ?? []) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const fuel = (c.vehicle_model?.fuel_type ?? "").toLowerCase();
    const type = (c.vehicle_model?.type ?? "").toLowerCase();
    const isMotor =
      ["listrik", "electric", "ev"].some((k) => fuel.includes(k)) ||
      ["motor", "motorcycle", "scooter"].some((k) => type.includes(k));
    const tag: "Motor EV" | "Mobil" = isMotor ? "Motor EV" : "Mobil";

    const rawModel = `${c.vehicle_model?.vehicle_brand?.name ?? ""} ${c.vehicle_model?.name ?? ""}`.trim();
    const desc     = (c.description ?? "").trim();
    /* If model name already embeds pricing, use it as-is.
       Otherwise append description (which may contain rental type + price). */
    const hasPricing = PRICE_RE.test(rawModel) || /biaya\s+sewa/i.test(rawModel);
    const fullName   = hasPricing ? rawModel : [rawModel, desc].filter(Boolean).join(" ");
    const variants   = fullName.split(VARIANT_SEP).filter(Boolean);

    const modelYear = String(
      c.vehicle_model?.year ??
      c.vehicle_model?.manufacture_year ??
      c.vehicle_model?.production_year ??
      c.vehicle_model?.tahun ??
      c.year ?? ""
    ).trim();

    if (variants.length === 1) {
      const base = extractName(variants[0]);
      const withApiYear = modelYear && !/\b\d{4}\b/.test(base) ? `${base} ${modelYear}` : base;
      const label = forceYear(withApiYear, extractPrice(variants[0]));
      result.push({ id: c.id, catalogId: c.id, label, price: extractPrice(variants[0]), tag });
    } else {
      /* e.g. "Toyota Calya 2022 Biaya Sewa Rp 185.000/hari ll 2025 Sewa Rp 200.000/hari" */
      const firstName = extractName(variants[0]);
      const baseName  = firstName.replace(/\s+\d{4}$/, "").trim();

      variants.forEach((v, i) => {
        let label: string;
        if (i === 0) {
          label = firstName;
        } else {
          const yearMatch = v.match(/^\s*(\d{4})/);
          label = yearMatch ? `${baseName} ${yearMatch[1]}` : extractName(v);
        }
        result.push({
          id: `${c.id}_${i}`,
          catalogId: c.id,
          label,
          price: extractPrice(v),
          tag,
        });
      });
    }
  }

  return result;
}

export async function fetchPools(): Promise<Pool[]> {
  const res = await fetch(`${GATEWAY}/service_company/pools?company_id=${COMPANY_ID}`);
  const json = await res.json();
  if (json.status !== "success") return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (json.data ?? []).map((p: any): Pool => ({ id: p.id, name: p.pool_name }));
}

export async function fetchChecklistFields(): Promise<ChecklistField[]> {
  const res = await fetch(
    `${GATEWAY}/service_vehicle/master-checklist-fields/checklist/${CHECKLIST_ID}?company_id=${COMPANY_ID}`
  );
  const json = await res.json();
  if (json.status !== "success") return [];
  return (json.data?.checklist_fields ?? [])
    .filter((f: any) => f?.checklist_item) // eslint-disable-line @typescript-eslint/no-explicit-any
    .map((f: any): ChecklistField => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      id: f.checklist_item.id,
      item_name: f.checklist_item.item_name,
      item_type: f.checklist_item.item_type,
      checklist_id: f.checklist_id,
    }));
}

export async function fetchFieldOptions(item_id: string): Promise<string[]> {
  const res = await fetch(
    `${GATEWAY}/service_vehicle/master-checklist-selects/${item_id}/selects`
  );
  const json = await res.json();
  if (json.status !== "success") return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (json.data ?? []).flatMap((d: any) =>
    (d.value ?? "").split(",").map((v: string) => v.trim()).filter(Boolean)
  );
}

export async function uploadFile(
  file: File,
  folder: "leads" | "checkpoints" = "leads"
): Promise<string> {
  const base64 = await fileToBase64(file);
  const res = await fetch(`${AUTH_API}/users/file_blob_uploader`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file: base64, folder }),
  });
  const json = await res.json();
  if (!json.file) throw new Error("Upload file gagal");
  return json.file as string;
}

export async function submitLead(payload: LeadPayload): Promise<string> {
  const res = await fetch(`${GATEWAY}/service_driver/leads/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  const id = json.data?.id ?? json.data?.lead_id;
  if (!id) throw new Error(json.message ?? "Gagal mendaftarkan profil");
  return id as string;
}

export async function submitChecklist(
  leads_id: string,
  checkpoints: CheckpointItem[]
): Promise<void> {
  const res = await fetch(`${GATEWAY}/service_vehicle/checklist-vehicles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      company_id: COMPANY_ID,
      vehicle_id: null,
      driver_id: null,
      checklist_id: CHECKLIST_ID,
      pool_id: null,
      inspector_name: "public lead registration",
      date_checklist: new Date().toISOString(),
      next_checkpoint_date: null,
      latlong_checklist: null,
      leads_id,
      inspection_type: "inspection",
      checkpoints,
    }),
  });
  const json = await res.json();
  if (!res.ok && json.status !== "success") throw new Error(json.message ?? "Gagal submit checklist");
}
