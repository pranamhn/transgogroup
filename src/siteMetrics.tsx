import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type SiteMetrics = {
  totalFleet: string;
  evMotor: string;
  iceCar: string;
  aum: string;
  activeDrivers: string;
  appDownloads: string;
  marketingChannels: string;
  operatingCities: string;
  googleRating: string;
  foundedYear: string;
  fleetModels: string;
  dailyEvPrice: string;
  workshopOps: string;
  targetFleet: string;
  targetAum: string;
  targetAumTotal: string;
  targetRevenue: string;
  targetMonthlyRevenue: string;
  targetFleetGrowth: string;
  targetAumGrowth: string;
  targetRevenueGrowth: string;
  currentRevenue: string;
  utilizationDays: string;
  aumPerUnit: string;
  evAssetPrice: string;
  iceAssetPrice: string;
  evAssetPriceMill: string;
  iceAssetPriceMill: string;
  targetEvFleet: string;
  targetIceFleet: string;
  evDailyRent: string;
  iceDailyRent: string;
  evMonthlyRent: string;
  iceMonthlyRent: string;
  apiEnabled: string;
  apiBaseUrl: string;
  apiAuthToken: string;
  apiAccountType: string;
  apiCompanyId: string;
  vehicleTotalEndpoint: string;
  vehicleDistributionEndpoint: string;
  revenueEndpoint: string;
  activeDriverEndpoint: string;
  apiTotalFleetPath: string;
  apiEvMotorPath: string;
  apiIceCarPath: string;
  apiRevenuePath: string;
  apiActiveDriversPath: string;
};

export const defaultSiteMetrics: SiteMetrics = {
  totalFleet: "861",
  evMotor: "524",
  iceCar: "337",
  aum: "Rp129B",
  activeDrivers: "1000+",
  appDownloads: "10K+",
  marketingChannels: "120",
  operatingCities: "10+",
  googleRating: "4.8★",
  foundedYear: "2022",
  fleetModels: "7",
  dailyEvPrice: "60K+",
  workshopOps: "24/7",
  targetFleet: "10.000",
  targetAum: "Rp 1,5T",
  targetAumTotal: "Rp 1,5T",
  targetRevenue: "Rp 396B",
  targetMonthlyRevenue: "Rp 33B",
  targetFleetGrowth: "~12× pertumbuhan fleet",
  targetAumGrowth: "~12× nilai aset kelolaan",
  targetRevenueGrowth: "Berbasis utilisasi aktual",
  currentRevenue: "~Rp 34M est. saat ini",
  utilizationDays: "25",
  aumPerUnit: "Rp 150M",
  evAssetPrice: "Rp 25M",
  iceAssetPrice: "Rp 337,5M",
  evAssetPriceMill: "25",
  iceAssetPriceMill: "337.5",
  targetEvFleet: "6.000",
  targetIceFleet: "4.000",
  evDailyRent: "Rp 60K",
  iceDailyRent: "Rp 240K",
  evMonthlyRent: "Rp 1,5M",
  iceMonthlyRent: "Rp 6M",
  apiEnabled: "off",
  apiBaseUrl: "",
  apiAuthToken: "",
  apiAccountType: "fms_internal",
  apiCompanyId: "",
  vehicleTotalEndpoint: "/service_vehicle/vehicles/total?company_id={companyId}",
  vehicleDistributionEndpoint: "/service_vehicle/vehicles/distribution?company_id={companyId}",
  revenueEndpoint: "",
  activeDriverEndpoint: "/service_driver/drivers/distribution?company_id={companyId}",
  apiTotalFleetPath: "data.total",
  apiEvMotorPath: "data.ev_motor",
  apiIceCarPath: "data.ice_car",
  apiRevenuePath: "data.revenue",
  apiActiveDriversPath: "data.active_drivers",
};

const STORAGE_KEY = "transgo.siteMetrics.v1";

type SiteMetricsContextValue = {
  metrics: SiteMetrics;
  setMetric: (key: keyof SiteMetrics, value: string) => void;
  setMetrics: (metrics: SiteMetrics) => void;
  resetMetrics: () => void;
};

const SiteMetricsContext = createContext<SiteMetricsContextValue | null>(null);

function readStoredMetrics(): SiteMetrics {
  if (typeof window === "undefined") return defaultSiteMetrics;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSiteMetrics;
    return { ...defaultSiteMetrics, ...JSON.parse(raw) };
  } catch {
    return defaultSiteMetrics;
  }
}

function persistMetrics(next: SiteMetrics) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("site-metrics-change", { detail: next }));
}

export function SiteMetricsProvider({ children }: { children: ReactNode }) {
  const [metrics, updateMetrics] = useState<SiteMetrics>(readStoredMetrics);

  const value = useMemo<SiteMetricsContextValue>(() => ({
    metrics,
    setMetric: (key, fieldValue) => {
      updateMetrics((current) => {
        const next = { ...current, [key]: fieldValue };
        persistMetrics(next);
        return next;
      });
    },
    setMetrics: (nextMetrics) => {
      const next = { ...defaultSiteMetrics, ...nextMetrics };
      persistMetrics(next);
      updateMetrics(next);
    },
    resetMetrics: () => {
      persistMetrics(defaultSiteMetrics);
      updateMetrics(defaultSiteMetrics);
    },
  }), [metrics]);

  return (
    <SiteMetricsContext.Provider value={value}>
      {children}
    </SiteMetricsContext.Provider>
  );
}

export function useSiteMetrics() {
  const context = useContext(SiteMetricsContext);
  if (!context) throw new Error("useSiteMetrics must be used inside SiteMetricsProvider");
  return context;
}

function parseCount(s: string): number {
  return parseInt(s.replace(/\./g, ""), 10) || 0;
}

function parseMill(s: string): number {
  return parseFloat(s.replace(",", ".")) || 0;
}

function formatMillIdr(mill: number): string {
  if (mill >= 1_000_000) {
    const t = mill / 1_000_000;
    const formatted = t % 1 === 0 ? t.toFixed(0) : t.toFixed(1).replace(".", ",");
    return `Rp ${formatted}T`;
  }
  if (mill >= 1_000) {
    const b = mill / 1_000;
    const formatted = b % 1 === 0 ? b.toFixed(0) : b.toFixed(1).replace(".", ",");
    return `Rp ${formatted}B`;
  }
  return `Rp ${mill.toFixed(0)}M`;
}

export function buildMetricSnapshot(metrics: SiteMetrics) {
  const evCount = parseCount(metrics.evMotor);
  const iceCount = parseCount(metrics.iceCar);
  const evPriceMill = parseMill(metrics.evAssetPriceMill);
  const icePriceMill = parseMill(metrics.iceAssetPriceMill);

  const currentAumMill = evCount * evPriceMill + iceCount * icePriceMill;
  const currentAumDisplay = formatMillIdr(currentAumMill);

  const targetEvCount = parseCount(metrics.targetEvFleet);
  const targetIceCount = parseCount(metrics.targetIceFleet);
  const targetAumMill = targetEvCount * evPriceMill + targetIceCount * icePriceMill;
  const targetAumDisplay = formatMillIdr(targetAumMill);

  return {
    heroStats: [
      { value: metrics.totalFleet, label: "Total Kendaraan", description: "Fleet Aktif" },
      { value: metrics.evMotor, label: "Motor EV", description: "Electric Fleet" },
      { value: metrics.iceCar, label: "Mobil ICE", description: "Car Fleet" },
      { value: metrics.aum, label: "AUM", description: "Assets Managed" },
    ],
    businessModels: [
      { stat: metrics.iceCar, meta: `${metrics.iceCar} Mobil ICE`, unit: "Mobil ICE Aktif" },
      { stat: metrics.evMotor, meta: `${metrics.evMotor} Motor EV`, unit: "Motor EV Aktif" },
      { stat: metrics.workshopOps, meta: "Fleet Uptime", unit: "Fleet Operations" },
    ],
    aboutStats: [
      { v: metrics.foundedYear, l: "Tahun Berdiri" },
      { v: metrics.totalFleet, l: "Total Armada" },
      { v: metrics.operatingCities, l: "Kota Operasi" },
      { v: metrics.googleRating, l: "Google Rating" },
    ],
    proofItems: [
      { value: metrics.totalFleet, label: "Operating Vehicles" },
      { value: metrics.aum, label: "Assets Under Managed" },
      { value: metrics.operatingCities, label: "Operational Cities" },
      { value: "SEVA + Flowqu", label: "Digital Stack" },
    ],
    investorMetrics: [
      { value: metrics.aum, label: "Assets Under Managed" },
      { value: metrics.totalFleet, label: "Operating Vehicles" },
      { value: metrics.appDownloads, label: "App Downloads" },
      { value: metrics.marketingChannels, label: "Kanal Pemasaran" },
    ],
    targetItems: [
      { value: metrics.targetFleet, current: `${metrics.totalFleet} unit saat ini`, growth: metrics.targetFleetGrowth },
      { value: targetAumDisplay, current: `${currentAumDisplay} saat ini`, growth: metrics.targetAumGrowth },
      { value: metrics.targetRevenue, current: metrics.currentRevenue, growth: metrics.targetRevenueGrowth },
    ],
  };
}
