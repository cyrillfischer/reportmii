import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "../../components/Button";

/**
 * STEP 4 – Report-Design auswählen
 * --------------------------------
 * - Fortschritt: 80 %
 * - Auswahl eines Report-Designs
 * - Weiter zu Step 5
 */
export default function AnalysisStep4() {
  const navigate = useNavigate();
  const { analysisId } = useParams<{ analysisId: string }>();

  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  if (!analysisId) {
    return null;
  }

  const designs = [
    {
      id: "classic",
      title: "Classic",
      description: "Klar, strukturiert und zeitlos",
    },
    {
      id: "modern",
      title: "Modern",
      description: "Modernes Layout mit visuellen Akzenten",
    },
    {
      id: "premium",
      title: "Premium",
      description: "Hochwertiges Design für Executive Reports",
    },
  ];

  const goNext = () => {
    if (!selectedDesign) return;
    navigate(`/analysis/${analysisId}/step/5`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[28px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(27,31,35,0.10)] p-10"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-[#1b1f23]">
          Report-Design auswählen
        </h2>
        <p className="mt-2 text-sm text-[#1b1f23]/70 max-w-xl">
          Wähle das Design für deinen Analyse-Report. Du kannst das Design
          später jederzeit ändern.
        </p>
      </div>

      {/* Designs */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {designs.map((design) => {
          const active = selectedDesign === design.id;

          return (
            <button
              key={design.id}
              type="button"
              onClick={() => setSelectedDesign(design.id)}
              className={[
                "rounded-2xl border p-6 text-left transition shadow-sm",
                active
                  ? "border-[#1b1f23] bg-[#f6f9f9]"
                  : "border-gray-200 hover:border-gray-300",
              ].join(" ")}
            >
              <div className="text-lg font-semibold text-[#1b1f23]">
                {design.title}
              </div>
              <div className="mt-2 text-sm text-[#1b1f23]/70">
                {design.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <Button
    variant="secondary"
    className="h-12 w-full sm:w-auto px-6 rounded-2xl"
    onClick={() => navigate(`/analysis/${analysisId}/step/3`)}
  >
    ← Zurück
  </Button>

  <Button
  variant="primary"
  className="h-12 w-full sm:w-auto px-8 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap"
  disabled={!selectedDesign}
  onClick={goNext}
>
  <span>Weiter zum Abschliessen</span>
  <span>→</span>
</Button>
</div>
    </motion.div>
  );
}
