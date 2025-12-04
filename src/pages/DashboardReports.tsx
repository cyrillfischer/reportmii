// src/pages/DashboardReports.tsx
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";

// TODO später echte Daten aus Supabase laden
const REPORTS = [
  {
    id: "rep-1001",
    title: "Business.mii Analyse – Q2 2025",
    date: "12. Juni 2025",
    type: "business",
  },
  {
    id: "rep-1002",
    title: "Inside.mii Team Analyse (25 TN)",
    date: "03. Mai 2025",
    type: "inside",
  },
  {
    id: "rep-1003",
    title: "Business.mii Analyse – Q1 2025",
    date: "15. Februar 2025",
    type: "business",
  },
];

export default function DashboardReports() {
  const navigate = useNavigate();

  const openReport = (id: string) => {
    navigate(`/report/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl mx-auto w-full">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Reports
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-10">
            Deine abgeschlossenen Analysen übersichtlich an einem Ort.
          </p>
        </motion.div>

        {/* KEINE REPORTS */}
        {REPORTS.length === 0 && (
          <div className="bg-white p-10 rounded-2xl shadow text-center border border-gray-200">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Noch keine fertigen Reports
            </h3>
            <p className="text-gray-600">
              Starte eine Analyse, um deinen ersten Report zu erhalten.
            </p>
          </div>
        )}

        {/* REPORT-LISTE */}
        <div className="space-y-6">
          {REPORTS.map((r, index) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition"
            >
              {/* LEFT */}
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-violet-600 mt-1" />

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {r.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{r.date}</p>
                </div>
              </div>

              {/* OPEN BUTTON */}
              <button
                onClick={() => openReport(r.id)}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
              >
                Öffnen
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
