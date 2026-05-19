import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ScrapbookPreviewProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export default function ScrapbookPreview({ pdfUrl, title, onClose }: ScrapbookPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);

  // Load PDF.js dari CDN
  useEffect(() => {
    const loadPdf = async () => {
      if (!(window as any).pdfjsLib) {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.onload = () => {
          (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          initPdf();
        };
        document.head.appendChild(script);
      } else {
        initPdf();
      }
    };

    const initPdf = async () => {
      const pdfjsLib = (window as any).pdfjsLib;
      const doc = await pdfjsLib.getDocument(pdfUrl).promise;
      setPdfDoc(doc);
      setTotalPages(doc.numPages);
      setLoading(false);
    };

    loadPdf();
  }, [pdfUrl]);

  // Render halaman saat ini
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    const renderPage = async () => {
      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: canvas.getContext("2d")!, viewport }).promise;
    };
    renderPage();
  }, [pdfDoc, currentPage, scale]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-surface-container-highest">
            <div>
              <h3 className="font-display font-bold text-on-surface">{title}</h3>
              <p className="text-xs text-on-surface-variant">
                Halaman {currentPage} dari {totalPages}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setScale((s) => Math.max(0.7, s - 0.2))} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <ZoomOut size={18} className="text-on-surface-variant" />
              </button>
              <button onClick={() => setScale((s) => Math.min(2, s + 0.2))} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <ZoomIn size={18} className="text-on-surface-variant" />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-red-50 rounded-full transition-colors ml-1">
                <X size={18} className="text-on-surface-variant hover:text-red-400" />
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-auto bg-surface-container flex items-center justify-center p-6">
            {loading ? (
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-on-surface-variant italic font-serif">Loading preview...</p>
              </div>
            ) : (
              <canvas ref={canvasRef} className="rounded-xl shadow-lg max-w-full" />
            )}
          </div>

          {/* Nav */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-surface-container-highest">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold disabled:opacity-30 hover:bg-surface-container transition-colors"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            {/* Page dots */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 12) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-2 h-2 rounded-full transition-all ${currentPage === i + 1 ? "bg-primary w-4" : "bg-surface-container-highest"}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold disabled:opacity-30 hover:bg-surface-container transition-colors"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}