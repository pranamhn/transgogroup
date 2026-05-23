import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { translations, type Lang, type Translations } from "./translations";
import { type SiteMetrics, useSiteMetrics } from "../siteMetrics";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: Translations };

const LangContext = createContext<LangCtx>({
  lang: "id",
  setLang: () => {},
  t: translations.id,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");
  const { metrics } = useSiteMetrics();
  const t = useMemo(() => applyMetricText(translations[lang], metrics), [lang, metrics]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

function applyMetricText<T>(value: T, metrics: SiteMetrics): T {
  if (typeof value === "string") return replaceMetricTokens(value, metrics) as T;
  if (Array.isArray(value)) return value.map((item) => applyMetricText(item, metrics)) as T;
  if (value && typeof value === "object") {
    const next = Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, applyMetricText(entry, metrics)]),
    );
    return next as T;
  }
  return value;
}

function replaceMetricTokens(text: string, metrics: SiteMetrics) {
  const aumPlain = metrics.aum.replace(/^Rp\s*/i, "");
  const replacements: Array<[RegExp, string]> = [
    [/10K\+/g, metrics.appDownloads],
    [/Rp129B/g, metrics.aum],
    [/Rp 129 billion/g, metrics.aum],
    [/Rp 129 miliar/g, metrics.aum],
    [/Rp 129M/g, metrics.aum],
    [/IDR 129B/g, metrics.aum],
    [/129 Miliar/g, aumPlain],
    [/10\.000/g, metrics.targetFleet],
    [/10,000/g, metrics.targetFleet],
    [/Rp 1,5T/g, metrics.targetAum],
    [/Rp 1\.5T/g, metrics.targetAum],
    [/Rp 400M/g, metrics.targetRevenue],
    [/Rp 396B/g, metrics.targetRevenue],
    [/~Rp 34M est\. saat ini/g, metrics.currentRevenue],
    [/~Rp 34M est\. today/g, metrics.currentRevenue],
    [/Rp 150M/g, metrics.aumPerUnit],
    [/25 hari/g, `${metrics.utilizationDays} hari`],
    [/25 active days/g, `${metrics.utilizationDays} active days`],
    [/6\.000 EV/g, `${metrics.targetEvFleet} EV`],
    [/6,000 EV/g, `${metrics.targetEvFleet} EV`],
    [/4\.000 mobil/g, `${metrics.targetIceFleet} mobil`],
    [/4,000 cars/g, `${metrics.targetIceFleet} cars`],
    [/Rp 1,5M\/bln/g, `${metrics.evMonthlyRent}/bln`],
    [/Rp 1\.5M\/mo/g, `${metrics.evMonthlyRent}/mo`],
    [/Rp 6M\/bln/g, `${metrics.iceMonthlyRent}/bln`],
    [/Rp 6M\/mo/g, `${metrics.iceMonthlyRent}/mo`],
    [/1\.000\+/g, metrics.activeDrivers],
    [/1000\+/g, metrics.activeDrivers],
    [/861/g, metrics.totalFleet],
    [/524/g, metrics.evMotor],
    [/337/g, metrics.iceCar],
    [/60K\+/g, metrics.dailyEvPrice],
    [/4\.8★/g, metrics.googleRating],
    [/2022/g, metrics.foundedYear],
    [/10\+/g, metrics.operatingCities],
  ];

  return replacements.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), text);
}
