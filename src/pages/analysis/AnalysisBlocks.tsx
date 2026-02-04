import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";

/* =========================
   TYPES
========================= */
type Block = {
  id: string;
  title: string;
  questions: number;
  included: boolean;
  placeholder?: boolean;
};

/* =========================
   BLOCKS
========================= */

const BASE_BLOCKS: Block[] = [
  { id: "strategy", title: "Strategie & Vision", questions: 10, included: true },
  { id: "leadership", title: "Führung & Kommunikation", questions: 10, included: true },
  { id: "process", title: "Prozesse & Effizienz", questions: 10, included: true },
  { id: "finance", title: "Finanzen & Steuerung", questions: 10, included: true },
  { id: "marketing", title: "Marketing & Vertrieb", questions: 10, included: true },
  { id: "customer", title: "Kundenerlebnis & Service", questions: 10, included: true },
];

const EXTRA_BLOCKS: Block[] = [
  { id: "innovation", title: "Innovation & Zukunftsfähigkeit", questions: 10, included: false },
  { id: "digital", title: "Digitalisierung & Technologie", questions: 10, included: false },
  { id: "culture", title: "Unternehmenskultur & Werte", questions: 10, included: false },
  { id: "employer", title: "Mitarbeiterentwicklung & Talentmanagement", questions: 10, included: false },
  { id: "sustainability", title: "Nachhaltigkeit & Verantwortung (ESG)", questions: 10, included: false },
  { id: "risk", title: "Risiken & Chancen", questions: 10, included: false },
  { id: "custom", title: "Eigener Themenblock", questions: 10, included: false },
];

const ALL_BLOCKS = [...BASE_BLOCKS, ...EXTRA_BLOCKS];

/* =========================
   COMPONENT
========================= */

export default function AnalysisBlocks() {
  const navigate = useNavigate();
  const { analysisId } = useParams<{ analysisId: string }>();

  const [activeIds, setActiveIds] = useState<string[]>(
    BASE_BLOCKS.map((b) => b.id)
  );

  if (!analysisId) return null;

  /* =========================
     DERIVED STATE
  ========================= */

  const activeRealBlocks = ALL_BLOCKS.filter((b) =>
    activeIds.includes(b.id)
  );

  const activeCount = activeRealBlocks.length;
  const paidCount = Math.max(0, activeCount - 6);
  const totalPrice = paidCount * 39;

  const activeBaseBlocks = activeRealBlocks.slice(0, Math.min(6, activeCount));

  const placeholders: Block[] = Array.from(
    { length: Math.max(0, 6 - activeBaseBlocks.length) },
    (_, i) => ({
      id: `placeholder-${i}`,
      title: "Freier Themenblock",
      questions: 0,
      included: true,
      placeholder: true,
    })
  );

  const activeExtraBlocks =
    activeCount > 6 ? activeRealBlocks.slice(6) : [];

  const activeBlocks: Block[] = [
    ...activeBaseBlocks,
    ...placeholders,
    ...activeExtraBlocks,
  ];

  const inactiveBlocks = ALL_BLOCKS.filter(
    (b) => !activeIds.includes(b.id)
  );

  const hasFreeSlot = activeCount < 6;

  /* =========================
     ACTIONS
  ========================= */

  const toggleBlock = (block: Block) => {
    if (block.placeholder) return;

    setActiveIds((prev) =>
      prev.includes(block.id)
        ? prev.filter((id) => id !== block.id)
        : [...prev, block.id]
    );
  };

  const handleContinue = () => {
    if (paidCount === 0) {
      // ✅ DIREKT ZU STEP 3
      navigate(`/analysis/${analysisId}/step/3`);
    } else {
      // 💳 CHECKOUT
      navigate(`/checkout/analysis?addons=${paidCount}`);
    }
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="max-w-5xl mx-auto space-y-12">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-[#1b1f23]">
          Themenblöcke auswählen
        </h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          6 Themenblöcke sind inklusive. Jeder weitere Block kostet 39 €.
        </p>
      </div>

      {/* AKTIVE BLÖCKE */}
      <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4">
        <h3 className="font-medium text-[#1b1f23]">
          Aktive Themenblöcke
        </h3>

        {activeBlocks.map((block, index) => {
          const isPaid = index >= 6 && !block.placeholder;

          return (
            <motion.div
              key={block.id}
              layout
              className={`flex justify-between items-center rounded-2xl px-6 py-4 ${
                block.placeholder
                  ? "bg-[#f1f5f9] border border-dashed"
                  : "bg-[#e6f4f3]"
              }`}
            >
              <div>
                <div className="font-medium">{block.title}</div>
                <div className="text-xs text-gray-600">
                  {block.placeholder
                    ? "Inklusive · Noch frei"
                    : `${block.questions} Fragen · ${
                        isPaid ? "Zusatzblock" : "Inklusive"
                      }`}
                </div>
              </div>

              {!block.placeholder && (
                <div className="flex items-center gap-3">
                  {isPaid && (
                    <span className="text-sm font-medium text-[#1b1f23]">
                      +39 €
                    </span>
                  )}

                  <div
                    onClick={() => toggleBlock(block)}
                    className="w-11 h-6 rounded-full bg-[#7eb6b8] relative cursor-pointer"
                  >
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* WEITERE BLÖCKE */}
      <div className="space-y-4">
        <h3 className="font-medium text-[#1b1f23]">
          Weitere Themenblöcke
        </h3>

        {inactiveBlocks.map((block) => (
          <motion.div
            key={block.id}
            layout
            className="flex justify-between items-center bg-white rounded-2xl px-6 py-4 border"
          >
            <div>
              <div className="font-medium">{block.title}</div>
              <div className="text-xs text-gray-500">
                {block.questions} Fragen
              </div>
            </div>

            {hasFreeSlot ? (
              <div
                onClick={() => toggleBlock(block)}
                className="w-11 h-6 rounded-full bg-[#7eb6b8] relative cursor-pointer"
              >
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            ) : (
              <Button variant="primary" onClick={() => toggleBlock(block)}>
                <Plus size={16} className="mr-1" /> 39 €
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center pt-6">
        <div className="text-sm text-gray-700">
          {paidCount > 0 && (
            <>
              {paidCount} Zusatzblock{paidCount > 1 ? "e" : ""} · {totalPrice} €
            </>
          )}
        </div>

        <Button variant="primary" onClick={handleContinue}>
          {paidCount > 0
            ? "Zusatzblöcke jetzt kaufen & Analyse starten →"
            : "Analyse starten →"}
        </Button>
      </div>

    </div>
  );
}
