import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "transgo.comproPdf.v1";

export type ComproPdfData = { dataUrl: string; filename: string } | null;

type ComproCtx = {
  pdfData: ComproPdfData;
  setPdf: (d: ComproPdfData) => void;
  clearPdf: () => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

function readStored(): ComproPdfData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

const ComproContext = createContext<ComproCtx | null>(null);

export function ComproProvider({ children }: { children: ReactNode }) {
  const [pdfData, setPdfData] = useState<ComproPdfData>(readStored);
  const [isOpen, setIsOpen] = useState(false);

  const setPdf = (d: ComproPdfData) => {
    setPdfData(d);
    if (d) localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    else localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ComproContext.Provider value={{
      pdfData,
      setPdf,
      clearPdf: () => setPdf(null),
      isOpen,
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }}>
      {children}
    </ComproContext.Provider>
  );
}

export function useCompro() {
  const ctx = useContext(ComproContext);
  if (!ctx) throw new Error("useCompro must be inside ComproProvider");
  return ctx;
}
