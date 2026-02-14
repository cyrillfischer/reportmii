import { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { Button } from "../../components/Button";
import { businessBlocks } from "../../data/blockTemplates";

/* -------------------------------------------------- */
/* Helpers */
/* -------------------------------------------------- */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getBarColor(percent: number) {
  if (percent <= 20) return "#1b1f23";
  if (percent <= 40) return "#6b7280";
  if (percent <= 60) return "#d1d5db";
  if (percent <= 80) return "#a8d6d4";
  return "#7eb6b8";
}

function getEmojiSrc(percent: number) {
  if (percent <= 10) return "/illustrations/emojis/1. Sehr schlecht.png";
  if (percent <= 25) return "/illustrations/emojis/2. Schlecht.png";
  if (percent <= 40) return "/illustrations/emojis/3. Unwohl.png";
  if (percent <= 60) return "/illustrations/emojis/4. Okay.png";
  if (percent <= 80) return "/illustrations/emojis/5. Gut.png";
  return "/illustrations/emojis/6. Sehr gut.png";
}

function isAnswered(val: any) {
  if (typeof val === "number") return true;
  if (typeof val === "string") return val.trim().length > 0;
  return false;
}

/* -------------------------------------------------- */
/* Slider */
/* -------------------------------------------------- */

type SliderProps = {
  value?: number;
  onChange: (v: number) => void;
};

function EmojiSlider({ value, onChange }: SliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const displayValue = typeof value === "number" ? value : 50;
  const barColor = getBarColor(displayValue);

  const setFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    onChange(Math.round(clamp(raw, 0, 100)));
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging]);

  return (
    <div className="flex items-center gap-4">
      <div
        ref={trackRef}
        className="relative w-full h-4 rounded-full bg-[#eef2f7] border border-gray-200 cursor-pointer"
        onPointerDown={(e) => {
          setFromClientX(e.clientX);
          setDragging(true);
        }}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ width: `${displayValue}%`, backgroundColor: barColor }}
        />

        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `calc(${displayValue}% - 14px)` }}
        >
          <div className="w-7 h-7 rounded-full bg-white border shadow flex items-center justify-center">
            <img src={getEmojiSrc(displayValue)} className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div
        className="min-w-[52px] text-center rounded-lg text-xs font-semibold py-1"
        style={{ backgroundColor: barColor, color: "#fff" }}
      >
        {displayValue}%
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* Main */
/* -------------------------------------------------- */

export default function AnalysisStep3() {
  const navigate = useNavigate();
  const { analysisId } = useParams<{ analysisId: string }>();
  if (!analysisId) return null;

  const activeBlocks = useMemo(() => businessBlocks.slice(0, 6), []);
  const STORAGE_KEY = `analysis-answers-${analysisId}`;

  const [answers, setAnswers] = useState<Record<number, Record<number, any>>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [openBlock, setOpenBlock] = useState<number | null>(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const updateAnswer = (b: number, q: number, v: any) => {
    setAnswers((p) => ({
      ...p,
      [b]: { ...p[b], [q]: v },
    }));
  };

  const totalQuestions = activeBlocks.reduce(
    (sum, b) => sum + b.questions.length,
    0
  );

  const answeredQuestions = activeBlocks.reduce((sum, b, bIndex) => {
    return (
      sum +
      b.questions.filter((_, qIndex) =>
        isAnswered(answers[bIndex]?.[qIndex])
      ).length
    );
  }, 0);

  const progressPercent = Math.round(
    (answeredQuestions / totalQuestions) * 100
  );

  const allCompleted = progressPercent === 100;

  const goToNextBlock = (current: number) => {
    const next = current + 1 < activeBlocks.length ? current + 1 : null;
    setOpenBlock(next);

    if (next !== null) {
      setTimeout(() => {
        blockRefs.current[next]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  };

  return (
    <motion.div className="rounded-[28px] bg-white border shadow p-6 sm:p-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold">Fragen beantworten</h2>

      <div className="mt-8 space-y-6">
        {activeBlocks.map((block, bIndex) => {
          const completed =
            block.questions.every((_, i) =>
              isAnswered(answers[bIndex]?.[i])
            );
          const isOpen = openBlock === bIndex;

          return (
            <div
              key={bIndex}
              ref={(el) => (blockRefs.current[bIndex] = el)}
              className={`rounded-2xl border ${
                isOpen ? "bg-white" : "bg-[#f0fbfa]"
              }`}
            >
              <button
                onClick={() => setOpenBlock(isOpen ? null : bIndex)}
                className="w-full px-6 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center text-left gap-4"
              >
                <div>
                  <h3 className="font-semibold">{block.title}</h3>
                  <p className="text-sm text-gray-500">{block.description}</p>
                </div>

                <div className="flex items-center gap-3 sm:justify-end">
                  {completed && (
                    <span className="px-3 py-1 text-xs rounded-full bg-[#7eb6b8] text-white">
                      abgeschlossen
                    </span>
                  )}
                  <div className="w-8 h-8 rounded-lg bg-[#7eb6b8] text-white flex items-center justify-center">
                    <ChevronDown
                      className={`h-4 w-4 transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 space-y-4">
                  {block.questions.map((q, qIndex) => (
                    <div
                      key={qIndex}
                      className="rounded-2xl border bg-[#fbfcfc] p-5"
                    >
                      <p className="text-sm font-medium mb-3">
                        {qIndex + 1}. {q.text}
                      </p>

                      {q.type === "scale" && (
                        <EmojiSlider
                          value={answers[bIndex]?.[qIndex]}
                          onChange={(v) =>
                            updateAnswer(bIndex, qIndex, v)
                          }
                        />
                      )}

                      {q.type === "text" && (
                        <textarea
                          className="w-full rounded-xl border p-3 text-sm"
                          rows={3}
                          placeholder="Pflichtfeld – bitte Text eingeben"
                          value={answers[bIndex]?.[qIndex] || ""}
                          onChange={(e) =>
                            updateAnswer(
                              bIndex,
                              qIndex,
                              e.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  ))}

                  {completed && (
                    <div className="flex justify-end pt-4">
                      <Button
                        variant="primary"
                        className="rounded-xl px-6"
                        onClick={() => goToNextBlock(bIndex)}
                      >
                        Weiter machen →
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Global Footer */}
      <div className="mt-12 border-t pt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600 max-w-xl">
          Du hast aktuell <strong>{progressPercent}%</strong> der Fragen beantwortet.
          Sobald du 100% erreicht hast, geht es weiter.
        </p>

        <Button
          variant="primary"
          disabled={!allCompleted}
          className={`${
            !allCompleted ? "cursor-not-allowed opacity-60" : ""
          } w-full sm:w-auto h-12 px-8 rounded-2xl inline-flex items-center justify-center gap-2 whitespace-nowrap`}
          onClick={() => navigate(`/analysis/${analysisId}/step/4`)}
        >
          <span>Gesamt weiter</span>
          <span aria-hidden>→</span>
        </Button>
      </div>
    </motion.div>
  );
}
