import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, X, ZoomIn, ZoomOut } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import { useCompro } from "../comproPdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

type PdfDoc = Awaited<ReturnType<typeof pdfjs.getDocument>["promise"]>;

const SCALE_NORMAL     = 1.0;
const SCALE_FULLSCREEN = 1.1;

export default function ComproModal() {
  const { pdfData, isOpen, closeModal } = useCompro();
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PdfDoc | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(SCALE_NORMAL);
  const [rendering, setRendering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  /* ── Fetch PDF, create blob URL for download, load into pdfjs via ArrayBuffer ── */
  useEffect(() => {
    if (!pdfData?.url) { setBlobUrl(null); setPdfDoc(null); return; }
    let cancelled = false;
    let objectUrl: string;

    fetch(pdfData.url)
      .then((r) => r.arrayBuffer())
      .then((buffer) => {
        if (cancelled) return;
        const blob = new Blob([buffer], { type: "application/pdf" });
        objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);
        setPage(1);
        setScale(SCALE_NORMAL);
        return pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
      })
      .then((doc) => {
        if (cancelled || !doc) return;
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [pdfData?.url]);

  /* ── Render page ── */
  const renderPage = useCallback(async (doc: PdfDoc, pageNum: number, sc: number) => {
    if (!canvasRef.current) return;
    setRendering(true);
    try {
      const pg = await doc.getPage(pageNum);
      const viewport = pg.getViewport({ scale: sc });
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { console.error("Canvas 2d context null"); return; }
      console.log("Rendering page", pageNum, "size", viewport.width, "x", viewport.height);
      await pg.render({ canvasContext: ctx, viewport, canvas }).promise;
      console.log("Render done");
    } catch (err) {
      console.error("pdfjs render error:", err);
    } finally {
      setRendering(false);
    }
  }, []);

  useEffect(() => {
    if (pdfDoc && isOpen) renderPage(pdfDoc, page, scale);
  }, [pdfDoc, page, scale, isOpen, renderPage]);

  /* ── Track fullscreen and set scale accordingly ── */
  useEffect(() => {
    const handler = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      setScale(fs ? SCALE_FULLSCREEN : SCALE_NORMAL);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  /* ── Exit fullscreen when modal closes ── */
  useEffect(() => {
    if (!isOpen && document.fullscreenElement) document.exitFullscreen();
  }, [isOpen]);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));
  const zoomIn  = () => setScale((s) => Math.min(3, +(s + 0.1).toFixed(1)));
  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.1).toFixed(1)));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  if (!isOpen || !pdfData) return null;

  return (
    <div className="compro-overlay" onClick={closeModal} role="dialog" aria-modal="true">
      <div ref={modalRef} className="compro-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Top bar ── */}
        <div className="compro-modal-bar">
          <span className="compro-modal-title">Company Profile — Transgo Group</span>
          <div className="compro-modal-actions">
            {/* Zoom */}
            <button className="compro-bar-btn" onClick={zoomOut} title="Zoom out"><ZoomOut size={16} /></button>
            <span className="compro-bar-zoom">{Math.round(scale * 100)}%</span>
            <button className="compro-bar-btn" onClick={zoomIn} title="Zoom in"><ZoomIn size={16} /></button>
            <span className="compro-bar-sep" />
            {/* Page nav */}
            <button className="compro-bar-btn" onClick={prev} disabled={page <= 1}><ChevronLeft size={16} /></button>
            <span className="compro-bar-page">{page} / {totalPages}</span>
            <button className="compro-bar-btn" onClick={next} disabled={page >= totalPages}><ChevronRight size={16} /></button>
            <span className="compro-bar-sep" />
            {/* Download */}
            {blobUrl && (
              <a href={blobUrl} download={pdfData.filename} className="compro-dl-btn">
                <Download size={15} /> Download
              </a>
            )}
            {/* Fullscreen */}
            <button className="compro-bar-btn" onClick={toggleFullscreen} title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button className="compro-close-btn" onClick={closeModal} aria-label="Tutup"><X size={20} /></button>
          </div>
        </div>

        {/* ── Canvas viewport ── */}
        <div className="compro-canvas-wrap">
          {rendering && <div className="compro-loading">Memuat halaman…</div>}
          <canvas ref={canvasRef} className="compro-canvas" />
        </div>

      </div>
    </div>
  );
}
