import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Document, Page, pdfjs } from "react-pdf";
import type { ComponentProps } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

/* PDF WORKER – Vite + pdfjs v5.4.296 */
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

/* Typen sauber aus react-pdf ableiten */
type DocumentProps = ComponentProps<typeof Document>;
type OnLoadSuccess = NonNullable<DocumentProps["onLoadSuccess"]>;
type OnLoadSuccessArg = Parameters<OnLoadSuccess>[0];

export default function DashboardReports() {
  const navigate = useNavigate();
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const [openReportId, setOpenReportId] = useState<number | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfError, setPdfError] = useState<string | null>(null);

  /* ALLE REPORTS – NICHTS ENTFERNT */
  const reports = [
    {
      id: 1,
      title: "Business.mii Analyse – Q4 2025",
      date: "14. November 2025",
      type: "business",
      pdf: "/report/smuk-gmbh_businessmii_2025-12-18_test.pdf",
    },
    {
      id: 2,
      title: "Inside.mii Team Analyse – 25 Mitarbeitende",
      date: "03. Oktober 2025",
      type: "inside",
      pdf: "/report/smuk-gmbh_businessmii_2025-12-18_test.pdf",
    },
    {
      id: 3,
      title: "Business.mii Folgeanalyse – Q2 2025",
      date: "21. Juni 2025",
      type: "business",
      pdf: "/report/smuk-gmbh_businessmii_2025-12-18_test.pdf",
    },
  ];

  return (
    <div className="relative space-y-14 max-w-6xl mx-auto px-6 pb-32">
      {/* USER ICON */}
      <button
        onClick={() => navigate("/dashboard/account")}
        className="fixed top-6 right-6 z-50
                   w-11 h-11 flex items-center justify-center
                   rounded-full bg-white text-black shadow
                   hover:bg-[#1b1f23] hover:text-white transition"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="6" r="3" />
          <path d="M3 16c0-3 12-3 12 0" />
        </svg>
      </button>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <span className="inline-flex items-center text-sm
                         bg-[#dff7f5] text-[#1b1f23]
                         px-3 py-1 rounded-full border shadow-sm mb-4">
          Reports
        </span>

        <h1 className="text-4xl font-semibold text-[#1b1f23]">
          Deine Reports
        </h1>

        <p className="text-gray-600 max-w-2xl mt-2">
          Öffne abgeschlossene Analysen als interaktiven Report oder lade sie als PDF herunter.
        </p>
      </motion.div>

      {/* REPORT LIST */}
      <div className="space-y-6">
        {reports.map((r, i) => (
          <div key={r.id} className="space-y-4">
            {/* REPORT CARD */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-gray-200
                         rounded-2xl p-6 shadow-sm
                         flex items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                {/* ICON */}
                <div className="w-20 h-20 rounded-xl bg-[#dff7f5]
                                shadow-inner
                                flex items-center justify-center">
                  <img
                    src="/illustrations/business/20_business.mii_analyse.png"
                    alt="Analyse"
                    className="w-16 h-16 object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#1b1f23]">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-500">{r.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setOpenReportId(openReportId === r.id ? null : r.id);
                    setPageNumber(1);
                    setNumPages(0);
                    setPdfError(null);
                  }}
                  className="w-44 px-5 py-3 rounded-xl
                             bg-[#7eb6b8] text-black
                             hover:bg-[#1b1f23] hover:text-white transition"
                >
                  Report öffnen
                </button>

                <a
                  href={r.pdf}
                  download
                  className="w-14 h-14 rounded-xl
                             flex items-center justify-center
                             bg-white border border-gray-300
                             hover:bg-[#1b1f23] hover:text-white transition"
                >
                  <Download size={18} />
                </a>
              </div>
            </motion.div>

            {/* INLINE REPORT VIEWER – BUCH */}
            {openReportId === r.id && (
              <motion.div
                ref={viewerRef}
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="bg-[#f7fafa] border border-gray-200
                           rounded-2xl p-6 shadow-inner"
              >
                {/* NAVIGATION */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    Seite {pageNumber}
                    {pageNumber > 1 && pageNumber + 1 <= numPages
                      ? `–${pageNumber + 1}`
                      : ""} von {numPages}
                  </span>

                  <div className="flex gap-2">
                    <button
                      disabled={pageNumber <= 1}
                      onClick={() =>
                        setPageNumber((p) => Math.max(1, p === 1 ? 1 : p - 2))
                      }
                      className="w-10 h-10 rounded-lg border
                                 flex items-center justify-center
                                 disabled:opacity-30"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <button
                      disabled={pageNumber >= numPages}
                      onClick={() =>
                        setPageNumber((p) =>
                          p === 1 ? 3 : Math.min(numPages, p + 2)
                        )
                      }
                      className="w-10 h-10 rounded-lg border
                                 flex items-center justify-center
                                 disabled:opacity-30"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* PDF */}
                <div className="flex justify-center">
                  <Document
                    file={r.pdf}
                    onLoadSuccess={(pdf: OnLoadSuccessArg) => {
                      setNumPages(pdf.numPages);
                      setPdfError(null);
                    }}
                    onLoadError={() =>
                      setPdfError(
                        "PDF konnte nicht geladen werden. Öffne es bitte über das Download-Icon."
                      )
                    }
                  >
                    {pageNumber === 1 ? (
                      <Page pageNumber={1} width={450} renderTextLayer={false} />
                    ) : (
                      <div className="flex gap-6">
                        <Page pageNumber={pageNumber} width={450} renderTextLayer={false} />
                        {pageNumber + 1 <= numPages && (
                          <Page pageNumber={pageNumber + 1} width={450} renderTextLayer={false} />
                        )}
                      </div>
                    )}
                  </Document>
                </div>

                {pdfError && (
                  <div className="text-sm text-red-500 mt-4 text-center">
                    {pdfError}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* MAIL ICON */}
      <a
        href="mailto:info@reportmii.com"
        className="fixed bottom-6 right-6 z-50
                   w-14 h-14 rounded-full bg-[#1b1f23]
                   text-white flex items-center justify-center
                   shadow-lg hover:-translate-y-0.5 transition"
      >
        <Mail size={22} />
      </a>
    </div>
  );
}
