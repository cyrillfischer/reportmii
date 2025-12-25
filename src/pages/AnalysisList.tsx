import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  FileText,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { dashboardTranslations } from "../i18n/dashboard";

/* =========================================================
   TEMP – später Supabase
   ========================================================= */

/**
 * Alle verfügbaren Analysen
 * (Produkt-Katalog)
 */
const ALL_ANALYSES = [
  {
    id: "business-mii",
    title: "Business.mii Analyse",
    description: "Ganzheitliche Unternehmensanalyse über 6 Kernbereiche.",
    checkout: "/business-checkout",
  },
  {
    id: "inside-25",
    title: "Inside.mii – 25 Mitarbeitende",
    description: "Anonyme Team-Analyse für kleinere Teams.",
    checkout: "/inside-checkout",
  },
  {
    id: "inside-50",
    title: "Inside.mii – 50 Mitarbeitende",
    description: "Detaillierte Team-Analyse für mittlere Organisationen.",
    checkout: "/inside-checkout",
  },
  {
    id: "inside-100",
    title: "Inside.mii – 100 Mitarbeitende",
    description: "Umfassende Team-Analyse für größere Unternehmen.",
    checkout: "/inside-checkout",
  },
];

/**
 * TEMP: Gekaufte Analysen inkl. Status
 *
 * Status-Logik (Variante A – fachlich korrekt):
 * - not_started   → Starten
 * - in_progress   → Weiter
 * - completed     → Analyse anschauen
 */
const PURCHASED_ANALYSES = [
  {
    id: "business-mii",
    status: "completed", // "not_started" | "in_progress" | "completed"
  },
];

/* =========================================================
   COMPONENT
   ========================================================= */

export default function AnalysisList() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = dashboardTranslations[language];

  /* -------------------------------------------------------
     Helper: Status einer Analyse ermitteln
     ------------------------------------------------------- */
  const getPurchasedAnalysis = (analysisId: string) => {
    return PURCHASED_ANALYSES.find((a) => a.id === analysisId);
  };

  /* -------------------------------------------------------
     Render
     ------------------------------------------------------- */
  return (
    <div className="space-y-14 max-w-7xl mx-auto">

      {/* =====================================================
         HEADER
         ===================================================== */}
      <div className="space-y-4">
        <span
          className="
            inline-flex text-sm
            bg-[#dff7f5] text-[#1b1f23]
            px-3 py-1 rounded-full
            border border-gray-200
            shadow-sm
          "
        >
          Analysen
        </span>

        <h1 className="text-3xl font-semibold text-[#1b1f23]">
          Deine Analysen
        </h1>

        <p className="text-gray-600 max-w-2xl">
          Prüfe abgeschlossene Analysen oder starte weitere Analysen mit Treuerabatt.
        </p>
      </div>

      {/* =====================================================
         LISTE DER ANALYSEN
         ===================================================== */}
      <div className="space-y-4">
        {ALL_ANALYSES.map((item, index) => {
          const purchasedAnalysis = getPurchasedAnalysis(item.id);
          const isPurchased = Boolean(purchasedAnalysis);
          const status = purchasedAnalysis?.status;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                rounded-2xl p-6
                flex justify-between items-center
                border shadow-sm transition
                ${
                  isPurchased
                    ? "bg-[#f0f7f7] border-[#a8d6d4]"
                    : "bg-white border-gray-200"
                }
              `}
            >
              {/* =================================================
                 LEFT
                 ================================================= */}
              <div className="flex gap-4 max-w-xl">
                {isPurchased ? (
                  <CheckCircle2 className="text-[#1b1f23] mt-1" />
                ) : (
                  <Lock className="text-gray-400 mt-1" />
                )}

                <div>
                  <h3 className="text-lg font-medium text-[#1b1f23]">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>

                  {/* STATUS-TEXT */}
                  {status === "not_started" && (
                    <p className="text-sm text-[#1b1f23]/60 mt-1">
                      Bereit zur Durchführung
                    </p>
                  )}

                  {status === "in_progress" && (
                    <p className="text-sm text-orange-600 mt-1">
                      Analyse in Bearbeitung
                    </p>
                  )}

                  {status === "completed" && (
                    <p className="text-sm text-green-700 mt-1">
                      Abgeschlossen
                    </p>
                  )}
                </div>
              </div>

              {/* =================================================
                 RIGHT – ACTIONS
                 ================================================= */}

              {/* FALL 1: NICHT GEKAUFT */}
              {!isPurchased && (
                <button
                  onClick={() => navigate(item.checkout)}
                  className="
                    inline-flex items-center gap-2
                    bg-gray-100 text-gray-800
                    px-5 py-2.5 rounded-xl
                    font-medium
                    hover:bg-gray-200
                  "
                >
                  <FileText size={18} />
                  Aktivieren
                </button>
              )}

              {/* FALL 2: GEKAUFT – NOCH NICHT GESTARTET */}
              {status === "not_started" && (
                <button
                  onClick={() =>
                    navigate(
                      `/analysis/configure?type=business&id=${item.id}`
                    )
                  }
                  className="
                    inline-flex items-center gap-2
                    bg-[#1b1f23] text-white
                    px-5 py-2.5 rounded-xl
                    font-medium
                    hover:opacity-90
                  "
                >
                  <PlayCircle size={18} />
                  Starten
                </button>
              )}

              {/* FALL 3: GEKAUFT – IN BEARBEITUNG */}
              {status === "in_progress" && (
                <button
                  onClick={() =>
                    navigate(
                      `/analysis/configure?type=business&id=${item.id}`
                    )
                  }
                  className="
                    inline-flex items-center gap-2
                    bg-orange-500 text-white
                    px-5 py-2.5 rounded-xl
                    font-medium
                    hover:opacity-90
                  "
                >
                  <PlayCircle size={18} />
                  Weiter
                </button>
              )}

              {/* FALL 4: GEKAUFT – ABGESCHLOSSEN */}
              {status === "completed" && (
                <button
                  onClick={() =>
                    navigate(`/dashboard/reports?analysis=${item.id}`)
                  }
                  className="
                    inline-flex items-center gap-2
                    bg-[#7eb6b8] text-[#1b1f23]
                    px-5 py-2.5 rounded-xl
                    font-medium
                    hover:opacity-90
                  "
                >
                  Analyse anschauen
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
