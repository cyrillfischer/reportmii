// src/pages/Questionnaire.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, Play } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout"; // 🟣 neuer Pfad für das korrekte Layout
import { useLanguage } from "../contexts/LanguageContext";
import { dashboardTranslations } from "../i18n/dashboard";
import { supabase } from "../supabase/supabaseClient";
import { Button } from "../components/Button";

interface Question {
  id: string;
  text: string;
  type: string;
  order_index: number;
}

interface Block {
  id: string;
  title: string;
  questions: Question[];
}

export function Questionnaire() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = dashboardTranslations[language];

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [currentStep, setCurrentStep] = useState(0); // 👈 ersetzt currentBlockIndex
  const [answers, setAnswers] = useState<Record<string, { value: string; numeric?: number }>>({});
  const [loading, setLoading] = useState(true);

  // Zusatzfelder
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [analysisTitle, setAnalysisTitle] = useState("");

  useEffect(() => {
    loadQuestionnaire();
  }, [id]);

  const loadQuestionnaire = async () => {
    if (!id) return;

    const { data: analysisData } = await supabase
      .from("analyses")
      .select("*")
      .eq("id", id)
      .single();

    if (analysisData) {
      setCompanyName(analysisData.company_name || "");
      setIndustry(analysisData.industry || "");
      setCountry(analysisData.country || "");
      setAnalysisTitle(analysisData.type === "business" ? "Business.mii Analyse" : "Inside.mii Analyse");
    }

    const { data: blocksData } = await supabase
      .from("blocks")
      .select("*, questions(*)")
      .eq("analysis_id", id)
      .eq("is_active", true)
      .order("order_index");

    if (blocksData) {
      const formattedBlocks = blocksData.map((block) => ({
        id: block.id,
        title: block.title,
        questions: (block.questions || []).sort((a: any, b: any) => a.order_index - b.order_index),
      }));
      setBlocks(formattedBlocks);
    }

    setLoading(false);
  };

  const handleAnswer = (questionId: string, value: string, numericValue?: number) => {
    setAnswers({
      ...answers,
      [questionId]: { value, numeric: numericValue },
    });
  };

  const handleFinish = async () => {
    if (!id) return;

    for (const [questionId, answer] of Object.entries(answers)) {
      await supabase.from("answers").insert({
        question_id: questionId,
        analysis_id: id,
        value: answer.value,
        numeric_value: answer.numeric,
      });
    }

    await supabase.from("analyses").update({ status: "completed" }).eq("id", id);

    navigate(`/report/${id}`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (blocks.length === 0) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Keine Fragen gefunden</p>
        </div>
      </DashboardLayout>
    );
  }

  // Aktueller Block für Frage-Flow
  const currentBlockIndex = currentStep - 3;
  const currentBlock = blocks[currentBlockIndex];
  const progress =
    currentStep >= 3 ? ((currentBlockIndex + 1) / blocks.length) * 100 : 0;
  const currentAnswers =
    currentBlock?.questions.filter((q) => answers[q.id])?.length || 0;
  const isBlockComplete =
    currentAnswers === currentBlock?.questions.length;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* 🟣 STEP 0 – Startseite */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-32"
          >
            <h1 className="text-4xl font-bold text-white mb-4">{analysisTitle}</h1>
            <p className="text-lg text-white/90 mb-8">
              Willkommen zur Analyse deines Unternehmens.  
              Diese Analyse besteht aus mehreren Bereichen und dauert etwa 10–15 Minuten.
            </p>
            <Button variant="primary" onClick={() => setCurrentStep(1)} className="text-lg px-8 py-4">
              <Play size={20} className="mr-2" /> Jetzt starten
            </Button>
          </motion.div>
        )}

        {/* 🟣 STEP 1 – Firmendaten */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-3xl p-8 shadow-2xl mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Firmendaten</h2>
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Firmenname"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Branche"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Land"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>

              <div className="flex justify-between mt-10">
                <Button variant="secondary" onClick={() => setCurrentStep(0)}>
                  <ChevronLeft size={18} className="mr-2" /> Zurück
                </Button>
                <Button variant="primary" onClick={() => setCurrentStep(2)}>
                  Weiter <ChevronRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 🟣 STEP 2 – Themenblöcke Übersicht */}
        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-3xl p-8 shadow-2xl mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Themenübersicht
              </h2>
              <p className="text-gray-600 mb-6">
                Diese Analyse umfasst folgende Themenblöcke:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {blocks.map((b, i) => (
                  <div
                    key={b.id}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-left"
                  >
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {i + 1}. {b.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {b.questions.length} Fragen
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-10">
                <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                  <ChevronLeft size={18} className="mr-2" /> Zurück
                </Button>
                <Button variant="primary" onClick={() => setCurrentStep(3)}>
                  Analyse starten <ChevronRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 🟣 STEP 3+ – Fragen-Ablauf (wie zuvor) */}
        {currentStep >= 3 && currentBlock && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 mt-12"
            >
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-white drop-shadow">
                  {currentBlock.title}
                </h1>
                <span className="text-lg text-white/80">
                  Block {currentBlockIndex + 1} von {blocks.length}
                </span>
              </div>

              <div className="w-full bg-white/30 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="bg-gradient-to-r from-violet-500 to-teal-400 h-3 rounded-full"
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>

            <motion.div
              key={currentBlock.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-3xl p-8 shadow-lg mb-8"
            >
              <div className="space-y-8">
                {currentBlock.questions.map((question, index) => (
                  <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <p className="text-lg font-medium text-gray-900 mb-4">
                      {index + 1}. {question.text}
                    </p>

                    {question.type === "scale" && (
                      <div className="flex items-center space-x-4">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            onClick={() =>
                              handleAnswer(question.id, value.toString(), value)
                            }
                            className={`w-12 h-12 rounded-xl font-bold transition-all ${
                              answers[question.id]?.numeric === value
                                ? "bg-gradient-to-r from-violet-500 to-teal-400 text-white shadow-lg scale-110"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    )}

                    {question.type === "text" && (
                      <textarea
                        value={answers[question.id]?.value || ""}
                        onChange={(e) =>
                          handleAnswer(question.id, e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none"
                        placeholder="Ihre Antwort..."
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex justify-between items-center mb-12">
              <Button
                variant="secondary"
                onClick={() =>
                  currentBlockIndex === 0
                    ? setCurrentStep(2)
                    : setCurrentStep(currentStep - 1)
                }
              >
                <ChevronLeft size={18} className="mr-2" /> Zurück
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {currentAnswers} von {currentBlock.questions.length} Fragen beantwortet
                </p>
                {isBlockComplete && (
                  <p className="text-sm text-green-600 font-medium flex items-center justify-center mt-1">
                    <Check size={16} className="mr-1" />
                    Block abgeschlossen
                  </p>
                )}
              </div>

              {currentBlockIndex < blocks.length - 1 ? (
                <Button variant="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                  Weiter <ChevronRight size={18} className="ml-2" />
                </Button>
              ) : (
                <Button variant="primary" onClick={handleFinish}>
                  Analyse beenden
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
