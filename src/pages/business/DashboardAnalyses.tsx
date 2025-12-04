// src/pages/business/DashboardAnalyses.tsx
import { motion } from "framer-motion";
import { CheckCircle, FileText, Lock, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export function DashboardAnalyses() {
  const navigate = useNavigate();

  // ---------------------------------------------------
  // 🧠 Später dynamisch aus Supabase
  // ---------------------------------------------------
  const analyses = [
    {
      id: "business",
      title: "Business.mii Analyse",
      category: "Business",
      purchased: true,
      status: "active",
    },
    {
      id: "inside_25",
      title: "Inside.mii – 25 Mitarbeitende",
      category: "Inside",
      purchased: false,
      status: "locked",
    },
    {
      id: "inside_50",
      title: "Inside.mii – 50 Mitarbeitende",
      category: "Inside",
      purchased: true,
      status: "active",
    },
    {
      id: "inside_100",
      title: "Inside.mii – 100 Mitarbeitende",
      category: "Inside",
      purchased: false,
      status: "locked",
    },
    {
      id: "leadership",
      title: "Leadership Block Analyse",
      category: "Advanced",
      purchased: true,
      status: "completed",
    },
  ];

  // ---------------------------------------------------
  // 🎯 Handlers
  // ---------------------------------------------------
  const startAnalysis = (id: string) => {
    navigate(`/analysis/new?analysis=${id}`);
  };

  const goToCheckout = (id: string) => {
    if (id.startsWith("inside")) navigate("/inside-checkout");
    if (id === "business") navigate("/business-checkout");
  };

  const openReport = (id: string) => {
    navigate(`/report/${id}`);
  };

  // ---------------------------------------------------
  // UI
  // ---------------------------------------------------
  return (
    <DashboardLayout>
      <div className="p-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold text-white mb-3"
        >
          Analysen
        </motion.h2>

        <p className="text-white/80 text-lg mb-10">
          Alle verfügbaren Analysen – aktiv, abgeschlossen oder als Upgrade.
        </p>

        {/* Analyse Liste */}
        <div className="space-y-6">

          {analyses.map((a, i) => {
            const isLocked = a.status === "locked";
            const isCompleted = a.status === "completed";
            const isActive = a.status === "active";

            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{
                  scale: isLocked || isCompleted ? 1.0 : 1.01,
                }}
                className={`
                  w-full px-6 py-6 rounded-2xl flex items-center justify-between border shadow-xl
                  transition-all
                  ${isActive ? "bg-white text-gray-900 border-violet-500" : ""}
                  ${isLocked ? "bg-white/60 text-gray-700 border-gray-300 backdrop-blur-sm" : ""}
                  ${isCompleted ? "bg-gray-900 text-white border-gray-700" : ""}
                `}
              >
                {/* Linke Seite: Icon + Titel */}
                <div className="flex items-center gap-4">
                  
                  {/* Icon Zustand */}
                  {isCompleted ? (
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  ) : isLocked ? (
                    <Lock className="w-10 h-10 text-gray-400" />
                  ) : (
                    <FileText className="w-10 h-10 text-violet-600" />
                  )}

                  <div>
                    <h3 className="text-xl font-semibold">{a.title}</h3>
                    <p className="text-sm opacity-80">
                      {isActive && "Bereit zur Durchführung"}
                      {isLocked && "Noch nicht freigeschaltet"}
                      {isCompleted && "Abgeschlossen – Report verfügbar"}
                    </p>
                  </div>
                </div>

                {/* Rechte Seite: Buttons */}
                <div className="flex gap-3">

                  {isActive && (
                    <button
                      onClick={() => startAnalysis(a.id)}
                      className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 
                                 text-white py-2.5 px-5 rounded-xl shadow transition"
                    >
                      <PlayCircle size={18} />
                      Starten
                    </button>
                  )}

                  {isLocked && (
                    <button
                      onClick={() => goToCheckout(a.id)}
                      className="bg-gray-300 hover:bg-gray-400 
                                 text-gray-800 py-2.5 px-5 rounded-xl shadow transition"
                    >
                      Aktivieren
                    </button>
                  )}

                  {isCompleted && (
                    <button
                      onClick={() => openReport(a.id)}
                      className="bg-white text-black py-2.5 px-5 rounded-xl shadow 
                                 hover:bg-gray-100 transition"
                    >
                      Report öffnen
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
