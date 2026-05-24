import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "./supabase";

export type ComproPdfData = { url: string; filename: string } | null;

type ComproCtx = {
  pdfData: ComproPdfData;
  setPdf: (d: ComproPdfData) => void;
  clearPdf: () => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

async function fetchFromSupabase(): Promise<ComproPdfData> {
  const { data } = await supabase
    .from("site_config")
    .select("pdf_url, pdf_filename")
    .eq("id", 1)
    .single();
  if (data?.pdf_url) return { url: data.pdf_url as string, filename: (data.pdf_filename as string) ?? "compro.pdf" };
  return null;
}

async function saveToSupabase(d: ComproPdfData) {
  await supabase
    .from("site_config")
    .update({ pdf_url: d?.url ?? null, pdf_filename: d?.filename ?? null, updated_at: new Date().toISOString() })
    .eq("id", 1);
}

const ComproContext = createContext<ComproCtx | null>(null);

export function ComproProvider({ children }: { children: ReactNode }) {
  const [pdfData, setPdfData] = useState<ComproPdfData>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchFromSupabase().then(setPdfData);
  }, []);

  const setPdf = (d: ComproPdfData) => {
    setPdfData(d);
    saveToSupabase(d);
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
