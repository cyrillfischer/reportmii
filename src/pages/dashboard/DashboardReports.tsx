import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Document, Page, pdfjs } from "react-pdf";
import type { ComponentProps } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { supabase } from "../../supabase/supabaseClient";

/* PDF WORKER */
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

/* react-pdf types */
type DocumentProps = ComponentProps<typeof Document>;
type OnLoadSuccess = NonNullable<DocumentProps["onLoadSuccess"]>;
type OnLoadSuccessArg = Parameters<OnLoadSuccess>[0];

type Analysis = {
  id: string;
  type: string;
  status: "active" | "completed";
  pdf_url: string | null;
  created_at: string;
};

export default function DashboardReports() {
  const navigate = useNavigate();
  const viewerRef = useRef<HTMLDivElement | null>(null);

  /* PDF VIEWER STATE */
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false); // ✅ NEU

  /* DATA */
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLatestAnalysis = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("analyses")
        .select("id, type, status, pdf_url, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
       .limit(1)
.maybeSingle()

      if (data) {
        setAnalysis(data);
      }

      setLoading(false);
    };

    loadLatestAnalysis();
  }, []);

  if (loading) return null;

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
      </motion.div>

      {/* KEINE ANALYSE */}
      {!analysis && (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <FileText className="mx-auto mb-4 text-gray-400" size={36} />
          <h3 className="text-lg font-medium">
            Noch keine Reports vorhanden
          </h3>
        </div>
      )}

      {/* REPORT WIRD ERSTELLT */}
      {analysis && analysis.status === "active" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-orange-200 bg-[#fff7ed] p-8"
        >
          <div className="flex items-center gap-4">
            <Clock className="text-orange-400" size={28} />
            <div>
              <h3 className="text-lg font-semibold">
                Dein Report wird erstellt
              </h3>
            </div>
          </div>
        </motion.div>
      )}

      {/* REPORT FERTIG */}
      {analysis && analysis.status === "completed" && analysis.pdf_url && (
        <motion.div
          ref={viewerRef}
          className="bg-[#f7fafa] border border-gray-200
                     rounded-2xl p-6 shadow-inner"
        >
          {/* LOADER */}
          {pdfLoading && (
            <div className="text-sm text-gray-500 mb-3 text-center">
              Report wird geladen …
            </div>
          )}

          {/* PDF */}
          <div className="flex justify-center">
            <Document
              file={analysis.pdf_url}
              onLoadSuccess={(pdf: OnLoadSuccessArg) => {
                setNumPages(pdf.numPages);
                setPdfLoading(false);
                setPdfError(null);
              }}
              onLoadError={() => {
                setPdfLoading(false);
                setPdfError("PDF konnte nicht geladen werden.");
              }}
              loading={() => {
                setPdfLoading(true);
                return null;
              }}
            >
              <Page pageNumber={pageNumber} width={500} renderTextLayer={false} />
            </Document>
          </div>

          {pdfError && (
            <div className="text-sm text-red-500 mt-4 text-center">
              {pdfError}
            </div>
          )}
        </motion.div>
      )}

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
