import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Lock,
  ChevronDown,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { businessBlocks } from "../../data/blockTemplates";

/* ------------------------------------------------------------------ */
/* TEMP DATA – später Supabase                                        */
/* ------------------------------------------------------------------ */

const ANALYSES = [
  {
    id: "business-mii",
    title: "Business.mii Analyse",
    description: "Ganzheitliche Unternehmensanalyse über 6 Kernbereiche.",
    status: "completed",
  },
  {
    id: "inside-25",
    title: "Inside.mii – 25 Mitarbeitende",
    description: "Anonyme Team-Analyse für kleinere Teams.",
    status: "locked",
    price: "1’297 €",
    discountedPrice: "648.50 €",
    teamSize: "25",
  },
  {
    id: "inside-50",
    title: "Inside.mii – 50 Mitarbeitende",
    description: "Detaillierte Team-Analyse für mittlere Organisationen.",
    status: "locked",
    price: "1’997 €",
    discountedPrice: "998.50 €",
    teamSize: "50",
  },
  {
    id: "inside-100",
    title: "Inside.mii – 100 Mitarbeitende",
    description: "Umfassende Team-Analyse für größere Unternehmen.",
    status: "locked",
    price: "2’997 €",
    discountedPrice: "1’498.50 €",
    teamSize: "100",
  },
];

/* ------------------------------------------------------------------ */
/* HELPERS                                                            */
/* ------------------------------------------------------------------ */

const getEmojiSrc = (score: number) => {
  if (score <= 10) return "/illustrations/emojis/1. Sehr schlecht.png";
  if (score <= 25) return "/illustrations/emojis/2. Schlecht.png";
  if (score <= 40) return "/illustrations/emojis/3. Unwohl.png";
  if (score <= 60) return "/illustrations/emojis/4. Okay.png";
  if (score <= 80) return "/illustrations/emojis/5. Gut.png";
  return "/illustrations/emojis/6. Sehr gut.png";
};

const buttonClass =
  "px-5 py-3 rounded-xl bg-[#7eb6b8] text-[#1b1f23] border border-[#7eb6b8] hover:bg-[#1b1f23] hover:text-white transition";

/* ------------------------------------------------------------------ */
/* COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardAnalyses() {
  const navigate = useNavigate();

  const [openAnalysis, setOpenAnalysis] = useState(false);
  const [openBlocks, setOpenBlocks] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, Record<number, number>>>({});

 useEffect(() => {
  try {
    const stored = localStorage.getItem("analysis-answers");

    if (stored) {
      setAnswers(JSON.parse(stored));
    }
  } catch (e) {
    console.warn("LocalStorage not accessible");
  }
}, []);


  const toggleBlock = (index: number) => {
    setOpenBlocks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const answeredBlockIndexes = Object.keys(answers)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="relative space-y-14 max-w-6xl mx-auto px-4 md:px-6 pb-32">

      {/* HEADER */}
      <div className="space-y-3">
        <span className="inline-flex text-sm bg-[#dff7f5] px-3 py-1 rounded-full">
          Analysen
        </span>

        <h1 className="text-3xl md:text-4xl font-semibold text-[#1b1f23]">
          Deine Analysen
        </h1>

        <p className="text-gray-600 max-w-2xl">
          Prüfe abgeschlossene Analysen oder starte weitere Analysen mit Treuerabatt.
        </p>
      </div>

      {/* BUSINESS ANALYSE */}
      <div className="bg-[#e6f7f6] rounded-2xl p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-5 border border-[#7eb6b8] shadow-sm">
        <div className="flex gap-4 items-start">
          <CheckCircle2 />
          <div>
            <h3 className="font-medium">Business.mii Analyse</h3>
            <p className="text-sm text-gray-600">
              Ganzheitliche Unternehmensanalyse über 6 Kernbereiche.
            </p>
            <p className="text-sm text-gray-500 mt-1">Abgeschlossen</p>
          </div>
        </div>

        <button
          className={`${buttonClass} w-full md:w-44`}
          onClick={() => setOpenAnalysis(!openAnalysis)}
        >
          Analyse anschauen
        </button>
      </div>

      {/* BUSINESS DETAILS */}
      <AnimatePresence>
        {openAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {answeredBlockIndexes.map((i) => {
              const block = businessBlocks[i];
              const blockAnswers = answers[i] || {};

              const values = Object.values(blockAnswers).filter(
                (v): v is number => typeof v === "number"
              );

              const avg =
                values.length > 0
                  ? Math.round(
                      values.reduce((sum, value) => sum + value, 0) /
                        values.length
                    )
                  : 0;

              return (
                <div key={i} className="rounded-xl bg-[#b7dedc] p-5">

                  {/* BLOCK HEADER */}
                  <button
                    onClick={() => toggleBlock(i)}
                    className="w-full text-left"
                  >
                    <div className="flex justify-between items-start">

                      {/* Titel */}
                      <div className="max-w-[70%]">
                        <h4 className="text-lg font-semibold leading-snug break-words">
                          {block.title}
                        </h4>
                      </div>

                      {/* Prozent + Chevron */}
                      <div className="flex flex-col items-end gap-2">

                        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#1b1f23] text-white text-sm font-medium min-w-[95px] justify-center">
                          <img
                            src={getEmojiSrc(avg)}
                            alt="Score"
                            className="w-4 h-4"
                          />
                          <span>{avg}%</span>
                        </div>

                        <ChevronDown
                          className={`transition ${
                            openBlocks[i] ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* DETAILBEREICH */}
                  <AnimatePresence>
                    {openBlocks[i] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 space-y-4"
                      >
                        {block.questions.map((question, qIndex) => {
                          const value = blockAnswers[qIndex];
                          if (typeof value !== "number") return null;

                          return (
                            <div
                              key={qIndex}
                              className="bg-white/60 rounded-xl p-4 flex justify-between items-center"
                            >
                              <div className="text-sm text-[#1b1f23]">
                                <span className="font-medium">
                                  {qIndex + 1}.
                                </span>{" "}
                                {question.text}
                              </div>

                              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1f23] text-white text-sm">
                                <img
                                  src={getEmojiSrc(value)}
                                  className="w-4 h-4"
                                />
                                <span>{value}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <hr />

      {/* TEAM ANALYSEN */}
      <p className="text-sm text-gray-500">
        Team-Analysen (–50 % Treuerabatt)
      </p>

      {ANALYSES.filter((a) => a.id !== "business-mii").map((analysis) => (
        <div
          key={analysis.id}
          className="rounded-2xl p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-5 border shadow-sm bg-white"
        >
          <div className="flex gap-4 items-start">
            <Lock />
            <div>
              <h3 className="font-medium">{analysis.title}</h3>
              <p className="text-sm text-gray-600">{analysis.description}</p>
              <p className="text-sm text-red-500 mt-1">
                <span className="line-through mr-2 opacity-70">
                  {analysis.price}
                </span>
                –50 %
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              navigate(`/inside-checkout?teamSize=${analysis.teamSize}`)
            }
            className="group w-full md:w-44 px-5 py-3 rounded-xl bg-[#7eb6b8] border border-[#7eb6b8] transition flex flex-col items-center justify-center hover:bg-[#1b1f23]"
          >
            <span className="text-xs text-gray-800 group-hover:text-white">
              Jetzt kaufen
            </span>
            <span className="text-lg font-bold group-hover:text-white">
              {analysis.discountedPrice}
            </span>
          </button>
        </div>
      ))}

      {/* MAIL BUTTON */}
      <a
        href="mailto:info@reportmii.com"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1b1f23] text-white flex items-center justify-center shadow-lg hover:-translate-y-0.5 transition"
      >
        <Mail size={22} />
      </a>

    </div>
  );
}
