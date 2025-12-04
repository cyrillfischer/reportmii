// src/pages/dashboard/DashboardAnalyses.tsx
import { motion } from "framer-motion";
import { CheckCircle2, Lock, PlayCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../layouts/DashboardLayout";

// TEMPORÄRE DATEN – später durch Supabase ersetzen
const ALL_ANALYSES = [
  {
    id: "business-mii",
    title: "Business.mii Analyse",
    description: "Die vollständige Unternehmensanalyse über 6 Kernbereiche.",
    type: "business",
    checkout: "/business-checkout",
  },
  {
    id: "inside-25",
    title: "Inside.mii Team Analyse (bis 25 TN)",
    description: "Anonyme Team-Analyse für kleinere Teams.",
    type: "inside",
    checkout: "/inside-checkout",
  },
  {
    id: "inside-50",
    title: "Inside.mii Team Analyse (bis 50 TN)",
    description: "Detaillierte Team-Analyse für mittlere Teams.",
    type: "inside",
    checkout: "/inside-checkout",
  },
  {
    id: "inside-100",
    title: "Inside.mii Team Analyse (bis 100 TN)",
    description: "Umfassende Team-Analyse für große Teams.",
    type: "inside",
    checkout: "/inside-checkout",
  },
];

export default function DashboardAnalyses() {
  const navigate = useNavigate();

  // TODO: später echte Daten aus Supabase
  const purchased = ["business-mii"]; // Beispiel: User hat Business.mii gekauft

  const startAnalysis = (analysisId: string) => {
    navigate(`/analysis/new?analysis=${analysisId}`);
  };

  const goToCheckout = (url: string) => {
    navigate(url);
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
            Analysen
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-10">
            Hier siehst du alle verfügbaren Analysen – aktive und noch nicht
            freigeschaltete.
          </p>
        </motion.div>

        {/* ANALYSEN LISTE */}
        <div className="space-y-6">
          {ALL_ANALYSES.map((item, index) => {
            const isActive = purchased.includes(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between"
              >
                {/* LEFT */}
                <div className="flex items-start gap-4">
                  {isActive ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mt-1" />
                  ) : (
                    <Lock className="w-8 h-8 text-gray-400 mt-1" />
                  )}

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* RIGHT BUTTONS */}
                <div>
                  {isActive ? (
                    <button
                      onClick={() => startAnalysis(item.id)}
                      className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
                    >
                      <PlayCircle size={18} /> Analyse starten
                    </button>
                  ) : (
                    <button
                      onClick={() => goToCheckout(item.checkout)}
                      className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-xl font-medium transition"
                    >
                      <FileText size={18} /> Jetzt freischalten
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
