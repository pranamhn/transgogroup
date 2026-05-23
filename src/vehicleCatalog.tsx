import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { carPrices } from "./data";

export type VehicleCatalogItem = {
  name: string;
  type: string;
  originalPrice: number;
  offerPrice: number;
  imageUrl: string;
};

export const defaultVehicleCatalog: VehicleCatalogItem[] = carPrices.map((car) => ({
  ...car,
  imageUrl: "",
}));

const STORAGE_KEY = "transgo.vehicleCatalog.v1";

type VehicleCatalogContextValue = {
  vehicles: VehicleCatalogItem[];
  setVehicles: (vehicles: VehicleCatalogItem[]) => void;
  resetVehicles: () => void;
};

const VehicleCatalogContext = createContext<VehicleCatalogContextValue | null>(null);

function readStoredVehicles() {
  if (typeof window === "undefined") return defaultVehicleCatalog;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultVehicleCatalog;
    return JSON.parse(raw) as VehicleCatalogItem[];
  } catch {
    return defaultVehicleCatalog;
  }
}

function persistVehicles(vehicles: VehicleCatalogItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
}

export function VehicleCatalogProvider({ children }: { children: ReactNode }) {
  const [vehicles, updateVehicles] = useState<VehicleCatalogItem[]>(readStoredVehicles);

  const value = useMemo<VehicleCatalogContextValue>(() => ({
    vehicles,
    setVehicles: (nextVehicles) => {
      persistVehicles(nextVehicles);
      updateVehicles(nextVehicles);
    },
    resetVehicles: () => {
      persistVehicles(defaultVehicleCatalog);
      updateVehicles(defaultVehicleCatalog);
    },
  }), [vehicles]);

  return (
    <VehicleCatalogContext.Provider value={value}>
      {children}
    </VehicleCatalogContext.Provider>
  );
}

export function useVehicleCatalog() {
  const context = useContext(VehicleCatalogContext);
  if (!context) throw new Error("useVehicleCatalog must be used inside VehicleCatalogProvider");
  return context;
}
