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

/* TEMP – später Supabase */
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

export default function AnalysisList() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = dashboardTranslations[language];

  /* TEMP */
  const purchased = ["business-mii"];

  return (
    <div className="space-y-14 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="space-y-4">
        <span className="inline-flex text-sm bg-[#dff7f5] text-[#1b1f23]
                         px-3 py-1 rounded-full border border-gray-200 shadow-sm">
          Analysen
        </span>

        <h1 className="text-3xl font-semibold text-[#1b1f23]">
          Verfügbare Analysen
        </h1>

        <p className="text-gray-600 max-w-2xl">
          Alle Analysen auf einen Blick – aktive, verfügbare und gesperrte.
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {ALL_ANALYSES.map((item, index) => {
          const isActive = purchased.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                rounded-2xl p-6 flex justify-between items-center
                border shadow-sm transition
                ${
                  isActive
                    ? "bg-[#f0f7f7] border-[#a8d6d4]"
                    : "bg-white border-gray-200"
                }
              `}
            >
              {/* LEFT */}
              <div className="flex gap-4 max-w-xl">
                {isActive ? (
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

                  {isActive && (
                    <p className="text-sm text-[#1b1f23]/60 mt-1">
                      Bereit zur Durchführung
                    </p>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              {isActive ? (
                <button
                  onClick={() =>
                    navigate(`/analysis/new?analysis=${item.id}`)
                  }
                  className="
                    inline-flex items-center gap-2
                    bg-[#1b1f23] text-white
                    px-5 py-2.5 rounded-xl
                    font-medium hover:opacity-90
                  "
                >
                  <PlayCircle size={18} />
                  Starten
                </button>
              ) : (
                <button
                  onClick={() => navigate(item.checkout)}
                  className="
                    inline-flex items-center gap-2
                    bg-gray-100 text-gray-800
                    px-5 py-2.5 rounded-xl
                    font-medium hover:bg-gray-200
                  "
                >
                  <FileText size={18} />
                  Aktivieren
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
