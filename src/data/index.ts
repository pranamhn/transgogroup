export type Route = "/" | "/about" | "/2w-fleet-operator" | "/4w-fleet-operator" | "/workshop" | "/gps-service" | "/platform" | "/investor-partners" | "/visi-2030" | "/contact" | "/admin/dashboard" | "/register";
export type NavItem       = { label: string; href: Route };
export type VehiclePrice  = { name: string; type: string; originalPrice: number; offerPrice: number };
export type CashbackItem  = { title: string; detail: string };
export type ServiceLine   = { title: string; audience: string; description: string; features: string[] };
export type ProcessStep   = { step: string; title: string; description: string };
export type RoadmapItem   = { period: string; title: string; description: string };
export type FaqItem       = { question: string; answer: string };
export type MetricCard    = { value: string; label: string; description: string };
export type Milestone     = { date: string; title: string; desc: string; fleet?: string; partner?: string; };
export type EvPackage     = {
  name: string; units: number; pricePerUnit: string; totalInvest: string;
  revenueShare: string; estMonthly: string; tenor: string; highlight: boolean;
};

// ─── Brand ────────────────────────────────────────────────────────────────────
export const BRAND = {
  blue:    "#2B44CC",
  blueLt:  "#5B7FFF",
  blueNv:  "#0F1D6E",
  gold:    "#F5C53F",
  ink:     "#0D1030",
  muted:   "#5A6489",
  surface: "#F5F7FF",
  line:    "rgba(43,68,204,0.12)",
  lineB:   "rgba(43,68,204,0.28)",
} as const;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const navigation: NavItem[] = [
  { label: "Home",     href: "/"         },
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/2w-fleet-operator" },
  { label: "Investor & Partners", href: "/investor-partners" },
  { label: "Platform", href: "/platform" },
  { label: "Visi 2030", href: "/visi-2030" },
];

// ─── Sub-brands marquee ───────────────────────────────────────────────────────
export const subBrands = [
  "TMR", "EMR", "Transgo Garage", "Toprentcar.id", "Transgo EV",
  "Transgo Travel", "Transgo Motor", "Transgo Luxury", "Transgo Supercar",
  "Transgo Logistics", "Transgo Connect", "Transgo Peduli", "Transgo Kamera",
  "Fotografer Dadakan", "Torrent Vespa", "Torrent Motosports",
];

// ─── Stats ────────────────────────────────────────────────────────────────────
export const heroStats: MetricCard[] = [
  { value: "861",   label: "Total Kendaraan", description: "Fleet Aktif"   },
  { value: "524",   label: "Motor EV",        description: "Electric Fleet" },
  { value: "337",   label: "Mobil ICE",       description: "Car Fleet"      },
  { value: "Rp129B", label: "AUM",            description: "Assets Managed" },
];

// ─── Business models ──────────────────────────────────────────────────────────
export const businessModels = [
  {
    code: "TMR",
    full: "Transgo Mobility Rental",
    desc: "Unit mobil siap jalan untuk driver ride-hailing dan mitra fleet — kontrak transparan, perawatan terjamin, dukungan dari hari pertama.",
    meta: "337 Mobil ICE",
    stat: "337",
    unit: "Mobil ICE Aktif",
    color: BRAND.blue,
  },
  {
    code: "EMR",
    full: "Evride Mobility Rental",
    desc: "Motor listrik untuk driver ojek online dan kurir — biaya operasional lebih rendah, armada EV masa depan yang sudah berjalan hari ini.",
    meta: "524 Motor EV",
    stat: "524",
    unit: "Motor EV Aktif",
    color: "#4A9EFF",
  },
  {
    code: "TGS",
    full: "Transgo Garage Service",
    desc: "Workshop internal untuk armada aktif — servis berkala, perbaikan cepat, dan data kondisi unit yang menjaga utilisasi tidak pernah berhenti.",
    meta: "Fleet Uptime",
    stat: "24/7",
    unit: "Fleet Operations",
    color: "#F59E0B",
  },
];

// ─── Car prices ───────────────────────────────────────────────────────────────
export const carPrices: VehiclePrice[] = [
  { name: "Daihatsu Sigra D 2025",  type: "MT",     originalPrice: 300000, offerPrice: 175000 },
  { name: "Calya / Sigra 2022",     type: "MT",     originalPrice: 325000, offerPrice: 185000 },
  { name: "Calya / Sigra 2025",     type: "MT",     originalPrice: 325000, offerPrice: 195000 },
  { name: "Calya / Sigra 2025",     type: "AT",     originalPrice: 325000, offerPrice: 205000 },
  { name: "Toyota Avanza E 2025",   type: "AT",     originalPrice: 325000, offerPrice: 215000 },
  { name: "Suzuki XL7 Hybrid 2024", type: "Hybrid", originalPrice: 300000, offerPrice: 240000 },
  { name: "Toyota Avanza G 2024",   type: "Manual", originalPrice: 330000, offerPrice: 225000 },
];

export const electricBikes = ["Polytron Fox R", "Alva N3", "Maka Motors"];

// ─── Cashback ─────────────────────────────────────────────────────────────────
export const cashbackItems: CashbackItem[] = [
  { title: "1 hari sewa / bulan",  detail: "Berlaku untuk seluruh pelanggan aktif yang membayar tepat waktu." },
  { title: "2 hari sewa / bulan",  detail: "Berlaku jika kendaraan menggunakan stiker branding Transgo." },
  { title: "Akumulasi bulanan",    detail: "Dapat dipakai untuk potongan biaya sewa bulan berikutnya." },
];

export const driverBenefits = [
  "Gratis biaya servis", "Gratis ganti oli", "Bebas perawatan berkala",
  "Layanan pusat bantuan 24 jam", "Tarif sewa kompetitif",
  "Pilihan unit beragam", "Proses sewa mudah",
];

// ─── Terms (document requirements) ───────────────────────────────────────────
export const documentRequirements = [
  "KTP suami dan istri (bagi yang sudah menikah)",
  "Kartu Keluarga (KK)",
  "Bukti token listrik terbaru",
  "NPWP atau SKCK (Surat Keterangan Catatan Kepolisian)",
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const serviceLines: ServiceLine[] = [
  {
    title: "Sewa Mobil Driver Online",
    audience: "Driver car-hailing & mitra fleet",
    description: "Rental mobil untuk driver transportasi online dengan sistem pemesanan yang efisien dan mudah diakses 24 jam.",
    features: ["Mulai Rp175.000/hari", "Tanpa DP & survey", "Pilihan city car hingga SUV", "Pembayaran digital"],
  },
  {
    title: "Sewa Motor Listrik EV",
    audience: "Driver ojol, kurir & mobilitas",
    description: "Motor listrik ramah lingkungan dengan harga spesial untuk driver yang mengejar biaya operasional lebih rendah.",
    features: ["Mulai Rp60.000/hari", "EV onboarding support", "Servis berkala gratis", "Driver support 24 jam"],
  },
  {
    title: "Program Kepemilikan Motor",
    audience: "Komunitas driver & partner B2B",
    description: "Skema sewa motor dengan jalur kepemilikan bertahap untuk membantu driver membangun aset produktif sendiri.",
    features: ["Skema bertahap transparan", "Cocok untuk driver aktif", "Proses administrasi mudah", "Pendampingan operasional"],
  },
  {
    title: "Bengkel Mobil & Motor",
    audience: "Armada internal & mitra fleet",
    description: "Layanan bengkel full-service untuk perawatan rutin hingga perbaikan ringan, tersedia workshop & home service.",
    features: ["Gratis servis unit sewa", "Gratis ganti oli berkala", "Home service tersedia", "Mekanik berpengalaman"],
  },
];

// ─── Driver process ───────────────────────────────────────────────────────────
export const processSteps: ProcessStep[] = [
  { step: "01", title: "Driver Screening",       description: "Validasi identitas, area operasi, kebutuhan kendaraan, dan pola penggunaan harian driver." },
  { step: "02", title: "Unit Matching",          description: "Driver dipasangkan dengan mobil atau motor listrik sesuai target pendapatan dan rute harian." },
  { step: "03", title: "Handover & Onboarding",  description: "Serah terima unit, edukasi perawatan dasar, dan penjelasan syarat & ketentuan penggunaan." },
  { step: "04", title: "Fleet Care",             description: "Servis berkala, monitoring kondisi kendaraan, dan penanganan downtime melalui bengkel Transgo." },
];

// ─── Roadmap ──────────────────────────────────────────────────────────────────
export const roadmap: RoadmapItem[] = [
  { period: "2026 H1", title: "Fleet Operating Base",     description: "Standarisasi paket rental, administrasi aset, onboarding driver, dan SOP bengkel." },
  { period: "2026 H2", title: "EV Fleet Scale-Up",        description: "Perluasan motor listrik untuk driver aktif dan komunitas ride-hailing di area prioritas." },
  { period: "2027",    title: "Data-Led Expansion",       description: "Keputusan pembelian unit berbasis utilisasi, downtime, biaya servis, dan retensi driver." },
  { period: "2028",    title: "Partner Capital Platform",  description: "Kerja sama pembiayaan aset dan investor untuk memperbesar kapasitas fleet lintas kota." },
];

// ─── Investor metrics ─────────────────────────────────────────────────────────
export const investorMetrics: MetricCard[] = [
  { value: "Rp129B", label: "Assets Under Managed", description: "Nilai aset armada yang dikelola dalam ekosistem Transgo." },
  { value: "861",    label: "Operating Vehicles",   description: "524 motor EV dan 337 mobil ICE aktif untuk ekonomi ride-hailing." },
  { value: "10K+",   label: "App Downloads",        description: "Distribusi digital melalui aplikasi Transgo Rental." },
  { value: "120",    label: "Kanal Pemasaran",      description: "Saluran pemasaran digital aktif yang dikelola." },
];

// ─── EV Investment packages ───────────────────────────────────────────────────
export const evPackages: EvPackage[] = [
  {
    name: "Starter",
    units: 5,
    pricePerUnit: "Rp 16.000.000",
    totalInvest: "Rp 80.000.000",
    revenueShare: "Rp 900.000 / motor",
    estMonthly: "Rp 4.500.000",
    tenor: "24 bulan",
    highlight: false,
  },
  {
    name: "Growth",
    units: 10,
    pricePerUnit: "Rp 16.000.000",
    totalInvest: "Rp 160.000.000",
    revenueShare: "Rp 950.000 / motor",
    estMonthly: "Rp 9.500.000",
    tenor: "24 bulan",
    highlight: true,
  },
  {
    name: "Enterprise",
    units: 20,
    pricePerUnit: "Rp 16.000.000",
    totalInvest: "Rp 320.000.000",
    revenueShare: "Rp 1.000.000 / motor",
    estMonthly: "Rp 20.000.000",
    tenor: "24 bulan",
    highlight: false,
  },
];

export const evInvestSteps = [
  { step: "01", title: "Pilih Paket",       desc: "Pilih jumlah unit motor EV sesuai kapasitas investasi Anda." },
  { step: "02", title: "Perjanjian",        desc: "Tanda tangani perjanjian kerja sama investasi & pengelolaan armada." },
  { step: "03", title: "Armada Beroperasi", desc: "Transgo mengelola unit, driver, perawatan, dan pengisian daya EV." },
  { step: "04", title: "Terima Hasil",      desc: "Revenue sharing dikirim rutin setiap bulan ke rekening Anda." },
];

// ─── Workshop ─────────────────────────────────────────────────────────────────
export const workshopCaps = [
  { code: "01", title: "Preventive",  desc: "Jadwal servis berkala untuk mengurangi risiko kerusakan besar dan downtime." },
  { code: "02", title: "Corrective",  desc: "Perbaikan cepat untuk unit aktif agar driver tidak kehilangan hari kerja." },
  { code: "03", title: "Inspection",  desc: "Quality control sebelum unit diserahkan atau kembali beroperasi ke driver." },
  { code: "04", title: "Data Log",    desc: "Catatan servis dan kondisi unit untuk keputusan pembelian aset berikutnya." },
];

// ─── Milestones ───────────────────────────────────────────────────────────────
export const milestones: Milestone[] = [
  { date: "Mei 2025",       title: "Transgo Didirikan",        desc: "Partnership dengan GoTo dan awal operasi fleet ride-hailing.",       fleet: "10",    partner: "GoCar"    },
  { date: "Juli 2025",      title: "Scaling Fleet Awal",       desc: "Penambahan +65 unit mobil untuk operasi ride-hailing aktif.",        fleet: "75"                         },
  { date: "Agustus 2025",   title: "SEVA Fleet System",        desc: "Rilis SEVA Fleet Management System & Aplikasi SEVA.",                               partner: "SEVA"     },
  { date: "September 2025", title: "Partnership Maka Motors",  desc: "Integrasi +100 unit motor EV Maka Motors ke armada Transgo.",       fleet: "175",   partner: "Maka"     },
  { date: "November 2025",  title: "EV Scale-Up",              desc: "Scaling armada Maka Motors +150 unit motor EV.",                    fleet: "400"                         },
  { date: "Desember 2025",  title: "Ekspansi Armada",          desc: "Penambahan +50 unit mobil, total armada terus tumbuh.",             fleet: "450"                         },
  { date: "Desember 2025",  title: "Partnership Grab",         desc: "Kemitraan resmi dengan Grab untuk driver armada Transgo.",                          partner: "Grab"     },
  { date: "Januari 2026",   title: "Polytron EV",              desc: "Partnership Polytron +150 unit motor EV masuk armada.",             fleet: "600",   partner: "Polytron" },
  { date: "Januari 2026",   title: "CRM FlowQu",               desc: "Rilis sistem CRM FlowQu untuk manajemen mitra driver.",                            partner: "FlowQu"   },
  { date: "2026",           title: "Target 1.500 Armada",      desc: "Ekspansi +700 unit mobil dan motor EV seluruh Jawa.",               fleet: "1.500"                       },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────
export const faqs: FaqItem[] = [
  { question: "Apakah Transgo hanya menyewakan kendaraan?",       answer: "Tidak. Transgo menggabungkan rental kendaraan, pengelolaan driver, workshop, dan reporting operasional agar aset tetap produktif dan menghasilkan." },
  { question: "Apa keuntungan program cashback?",                  answer: "Driver mendapatkan cashback 1–2 hari sewa per bulan. Akumulasi dan dapat digunakan untuk potongan biaya sewa bulan berikutnya asalkan pembayaran tepat waktu." },
  { question: "Berapa deposit yang dibutuhkan untuk menyewa?",     answer: "Penyewa wajib membayar deposit senilai 2 hari sewa sebelum kendaraan diserahkan. Deposit dikembalikan setelah masa sewa berakhir dalam kondisi baik." },
  { question: "Dokumen apa yang diperlukan untuk menyewa?",        answer: "KTP suami dan istri (jika sudah menikah), Kartu Keluarga, bukti token listrik terbaru, dan NPWP atau SKCK." },
  { question: "Siapa target utama Transgo?",                       answer: "Driver ride-hailing, ojek online, kurir, komunitas driver, koperasi, dan partner fleet yang membutuhkan kendaraan siap kerja dengan biaya transparan." },
  { question: "Bagaimana mekanisme investasi motor EV?",           answer: "Investor membeli unit motor EV melalui paket investasi Transgo. Unit dikelola sepenuhnya oleh Transgo (driver, perawatan, charging), dan investor menerima revenue sharing bulanan sesuai paket yang dipilih." },
  { question: "Apakah bengkel hanya untuk kendaraan internal?",    answer: "Prioritasnya mendukung armada Transgo, namun dapat dikembangkan sebagai layanan B2B untuk mitra fleet eksternal dengan tarif khusus." },
];
