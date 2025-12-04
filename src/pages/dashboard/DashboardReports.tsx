// src/pages/dashboard/DashboardReports.tsx
import { motion } from "framer-motion";
import { FileText, ArrowRight, Download } from "lucide-react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function DashboardReports() {
  const navigate = useNavigate();

  const reports = [
    {
      id: 1,
      title: "Business.mii Analyse – Q4 2025",
      date: "14. November 2025",
      type: "business",
    },
    {
      id: 2,
      title: "Inside.mii Team Analyse – 25 TN",
      date: "03. Oktober 2025",
      type: "inside",
    },
    {
      id: 3,
      title: "Business.mii Folgeanalyse – Q2 2025",
      date: "21. Juni 2025",
      type: "business",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl mx-auto w-full">

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
            Alle abgeschlossenen Analysen – jederzeit öffnen oder exportieren.
          </p>
        </motion.div>

        {/* REPORT ITEMS */}
        <div className="space-y-6">

          {reports.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-7
                         flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <FileText size={40} className="text-violet-600" />

                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {r.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{r.date}</p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/report/${r.id}`)}
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 
                             text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
                >
                  Öffnen <ArrowRight size={16} />
                </button>

                <button
                  className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50
                             text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium transition"
                  onClick={() => alert("PDF Download (später)")}
                >
                  <Download size={16} /> PDF
                </button>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}
