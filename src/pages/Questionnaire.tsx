import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import {
  businessBlocks,
  insideBlocks,
  type BlockTemplate,
  type Question,
} from "../data/blockTemplates";

/**
 * Questionnaire (Step 3 Content)
 * - Accordion pro Themenblock
 * - Antworten erfassen
 * - "Weiter" erst aktiv, wenn ALLE Fragen in ALLEN Blöcken beantwortet sind
 */
export default function Questionnaire() {
  const navigate = useNavigate();
  const { analysisId } = useParams<{ analysisId: string }>();

  // ---------- Helpers: selected blocks laden (robust) ----------
  const getSelectedBlockTitles = (): string[] => {
    if (!analysisId) return [];

    const keysToTry = [
      `analysis:${analysisId}:selectedBlocks`,
      `analysis_${analysisId}_selectedBlocks`,
      `selectedBlocks_${analysisId}`,
      `selectedBlocks`,
    ];

    for (const k of keysToTry) {
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        // erlaubt: ["Titel", "Titel"] oder [{title:"..."}]
        if (Array.isArray(parsed)) {
          if (parsed.length === 0) continue;
          if (typeof parsed[0] === "string") return parsed as string[];
          if (typeof parsed[0] === "object" && parsed[0]?.title)
            return (parsed as any[]).map((x) => String(x.title));
        }
      } catch {
        // ignore
      }
    }

    return [];
  };

  // ---------- Welche Templates nehmen wir? (Business als Default) ----------
  // Falls du später zwischen Business/Inside unterscheiden willst, kannst du hier
  // z.B. anhand einer gespeicherten "analysisType" entscheiden.
  const baseTemplates = useMemo<BlockTemplate[]>(() => {
    // Default: Business
    return businessBlocks;
  }, []);

  const selectedTemplates = useMemo<BlockTemplate[]>(() => {
    const selectedTitles = getSelectedBlockTitles();

    // Wenn nichts gewählt wurde (z.B. direkt /TEST/step/3), fallback: MIN 6 Blöcke
    if (!selectedTitles || selectedTitles.length === 0) {
      return baseTemplates.slice(0, 6);
    }

    const map = new Map(baseTemplates.map((b) => [b.title, b]));
    const picked = selectedTitles
      .map((t) => map.get(t))
      .filter(Boolean) as BlockTemplate[];

    // Safety: mindestens 6 anzeigen
    if (picked.length < 6) {
      const missing = baseTemplates.filter((b) => !selectedTitles.includes(b.title));
      return [...picked, ...missing].slice(0, 6);
    }

    return picked;
  }, [baseTemplates]);

  // ---------- State: Accordion + Answers ----------
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  type AnswerValue = string | number; // text oder scale / choice
  type Answers = Record<string, AnswerValue>;
  const [answers, setAnswers] = useState<Answers>({});

  const answerKey = (blockTitle: string, qIndex: number) =>
    `${blockTitle}__q${qIndex}`;

  const setAnswer = (blockTitle: string, qIndex: number, value: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [answerKey(blockTitle, qIndex)]: value,
    }));
  };

  const isQuestionAnswered = (q: Question, value: AnswerValue | undefined) => {
    if (q.type === "scale") return typeof value === "number" && value >= 1 && value <= 5;
    if (q.type === "multiple_choice") return typeof value === "string" && value.trim().length > 0;
    // text
    return typeof value === "string" && value.trim().length > 0;
  };

  const isBlockComplete = (block: BlockTemplate) => {
    return block.questions.every((q, idx) =>
      isQuestionAnswered(q, answers[answerKey(block.title, idx)])
    );
  };

  const allComplete = useMemo(() => {
    return selectedTemplates.every((b) => isBlockComplete(b));
  }, [selectedTemplates, answers]);

  const goNext = () => {
    if (!analysisId) return;
    if (!allComplete) return;
    navigate(`/analysis/${analysisId}/step/4`);
  };

  // ---------- UI Components ----------
  const ScaleRow = ({
    blockTitle,
    qIndex,
    value,
  }: {
    blockTitle: string;
    qIndex: number;
    value: number | undefined;
  }) => {
    return (
      <div className="mt-2 flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => setAnswer(blockTitle, qIndex, n)}
              className={[
                "h-9 w-9 rounded-xl border text-sm transition",
                active
                  ? "border-[#7eb6b8] bg-[#dff7f5] text-[#1b1f23]"
                  : "border-gray-200 bg-white text-[#1b1f23]/70 hover:bg-[#f6f9f9]",
              ].join(" ")}
              aria-label={`Skala ${n}`}
            >
              {n}
            </button>
          );
        })}
      </div>
    );
  };

  // ---------- Render ----------
  if (!analysisId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-[28px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(27,31,35,0.10)] p-10"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#1b1f23]">
            Fragen beantworten
          </h2>
          <p className="mt-2 text-sm text-[#1b1f23]/70 max-w-2xl">
            Beantworte alle Fragen in deinen gewählten Themenblöcken. Erst wenn
            alle Blöcke vollständig ausgefüllt sind, kannst du fortfahren.
          </p>

          {/* ✅ WICHTIGER HINWEIS (dein Punkt #1) */}
          <div className="mt-5 rounded-2xl border border-gray-100 bg-[#f6f9f9] p-5">
            <div className="text-sm text-[#1b1f23]/80 leading-relaxed">
              <span className="font-semibold text-[#1b1f23]">So beantwortest du die Skalen-Fragen:</span>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                <span><b>1</b> = trifft gar nicht zu</span>
                <span><b>2</b> = trifft eher nicht zu</span>
                <span><b>3</b> = teils / teils</span>
                <span><b>4</b> = trifft eher zu</span>
                <span><b>5</b> = trifft voll zu</span>
              </div>
              <div className="mt-2 text-[#1b1f23]/70">
                Textfragen beantwortest du kurz und konkret – so bekommst du später den stärksten Report.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blocks (Accordion) */}
      <div className="mt-8 space-y-4">
        {selectedTemplates.map((block) => {
          const open = openTitle === block.title;
          const done = isBlockComplete(block);

          return (
            <div
              key={block.title}
              className={[
                "rounded-2xl border transition overflow-hidden",
                done
                  ? "border-[#7eb6b8] bg-[#e8fbf8]"
                  : "border-gray-100 bg-white",
              ].join(" ")}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setOpenTitle((prev) => (prev === block.title ? null : block.title))}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-[#1b1f23]">
                      {block.title}
                    </h3>
                    {done && (
                      <span className="text-xs px-3 py-1 rounded-full bg-[#7eb6b8]/20 text-[#1b1f23]/80">
                        abgeschlossen
                      </span>
                    )}
                  </div>
                  {block.description ? (
                    <p className="mt-1 text-sm text-[#1b1f23]/60">
                      {block.description}
                    </p>
                  ) : null}
                </div>

                <ChevronDown
                  className={[
                    "h-5 w-5 text-[#1b1f23]/60 transition-transform",
                    open ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              {/* Accordion Content */}
              {open && (
                <div className="px-6 pb-6">
                  <div className="rounded-2xl bg-white border border-gray-100 p-5">
                    <div className="space-y-5">
                      {block.questions.map((q, idx) => {
                        const v = answers[answerKey(block.title, idx)];
                        const answered = isQuestionAnswered(q, v);

                        return (
                          <div key={idx} className="pb-5 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="flex items-start gap-3">
                              <div
                                className={[
                                  "mt-0.5 h-6 w-6 flex items-center justify-center rounded-lg text-xs font-semibold",
                                  answered
                                    ? "bg-[#7eb6b8] text-white"
                                    : "bg-gray-100 text-[#1b1f23]/60",
                                ].join(" ")}
                              >
                                {idx + 1}
                              </div>

                              <div className="flex-1">
                                <p className="text-sm text-[#1b1f23]">
                                  {q.text}
                                  {q.main ? <span className="text-[#7eb6b8]"> *</span> : null}
                                </p>

                                {q.type === "scale" && (
                                  <ScaleRow
                                    blockTitle={block.title}
                                    qIndex={idx}
                                    value={typeof v === "number" ? (v as number) : undefined}
                                  />
                                )}

                                {q.type === "text" && (
                                  <textarea
                                    value={typeof v === "string" ? (v as string) : ""}
                                    onChange={(e) => setAnswer(block.title, idx, e.target.value)}
                                    rows={3}
                                    className="mt-3 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#7eb6b8]"
                                    placeholder="Deine Antwort…"
                                  />
                                )}

                                {q.type === "multiple_choice" && (
                                  <div className="mt-3 grid gap-2">
                                    {(q.options ?? []).map((opt) => {
                                      const checked = v === opt;
                                      return (
                                        <label
                                          key={opt}
                                          className={[
                                            "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm cursor-pointer transition",
                                            checked
                                              ? "border-[#7eb6b8] bg-[#dff7f5]"
                                              : "border-gray-200 bg-white hover:bg-[#f6f9f9]",
                                          ].join(" ")}
                                        >
                                          <input
                                            type="radio"
                                            name={`${block.title}__mc${idx}`}
                                            checked={checked}
                                            onChange={() => setAnswer(block.title, idx, opt)}
                                          />
                                          <span className="text-[#1b1f23]">{opt}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-8 flex justify-end">
        {/* ✅ Button disabled/grey until all answered (dein Punkt #2) */}
        <button
          type="button"
          disabled={!allComplete}
          onClick={goNext}
          className={[
            "h-12 px-8 rounded-2xl text-sm font-semibold transition",
            allComplete
              ? "bg-[#7eb6b8] text-white hover:brightness-[0.98] shadow-[0_12px_30px_rgba(126,182,184,0.25)]"
              : "bg-gray-200 text-[#1b1f23]/40 cursor-not-allowed",
          ].join(" ")}
          title={
            allComplete
              ? "Weiter zu Schritt 4"
              : "Beantworte zuerst alle Fragen, dann kannst du weiter."
          }
        >
          Weiter →
        </button>
      </div>
    </motion.div>
  );
}
