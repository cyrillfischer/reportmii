import { ReactNode, useMemo } from "react";
import { Sparkles, ClipboardList, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  step: number; // 1–5 (wird weiterhin benutzt für Fortschritt etc.)
  children: ReactNode;
};

type StepItem = {
  label: string;
  imgSrc: string;
};

export default function AnalysisLayout({ step, children }: Props) {
  const navigate = useNavigate();

  // ✅ analyseId und step aus der URL holen:
  // URL Beispiel: /analysis/1156.../step/12
  const params = useParams();
  const analysisId = params.analysisId || params.id || params.analysis || ""; // robust, falls Param-Name anders heisst
  const stepFromUrl = Number(params.step);

  const progressSteps = useMemo<StepItem[]>(
    () => [
      {
        label: "Angaben zur Analyse",
        imgSrc: "/illustrations/businessmii_analyse/1_Businessmii_Analyse_Angaben.png",
      },
      {
        label: "Blöcke auswählen",
        imgSrc: "/illustrations/businessmii_analyse/2_Businessmii_Analyse_Bloecke.png",
      },
      {
        label: "Fragen beantworten",
        imgSrc: "/illustrations/businessmii_analyse/3_Businessmii_Analyse_Fragen.png",
      },
      {
        label: "Report-Design",
        imgSrc: "/illustrations/businessmii_analyse/4_Businessmii_Analyse_Reportdesign.png",
      },
      {
        label: "Abschließen",
        imgSrc: "/illustrations/businessmii_analyse/5_Businessmii_Analyse_Abschluss.png",
      },
    ],
    []
  );

  const totalSteps = progressSteps.length;
  const currentStepIndex = Math.max(0, Math.min(totalSteps - 1, step - 1));

  const progressPctMap: Record<number, number> = {
    1: 20,
    2: 40,
    3: 60,
    4: 80,
    5: 100,
  };

  const progressPct = progressPctMap[step] ?? 20;

  /* =========================
     BACK LOGIC – EXPLIZIT & ID-BASIERT
     - immer einen Schritt zurück innerhalb derselben Analyse
     - step 1 → Dashboard Business.mii
  ========================= */
  const handleBack = () => {
    // falls step in der URL fehlt/kaputt ist, fallback auf step prop
    const current = Number.isFinite(stepFromUrl) && stepFromUrl > 0 ? stepFromUrl : step;

    if (current <= 1) {
      navigate("/dashboard/business");
      return;
    }

    const prev = current - 1;

    // ✅ Das ist die entscheidende Route für ALLE User:
    // /analysis/:analysisId/step/:prev
    if (analysisId) {
      navigate(`/analysis/${analysisId}/step/${prev}`);
    } else {
      // falls analysisId aus irgendeinem Grund nicht gefunden wird:
      navigate("/dashboard/business");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* HEADER */}
      <div className="rounded-[28px] bg-[#b7dedc] p-8 shadow-[0_18px_40px_rgba(27,31,35,0.12)] border border-white/40">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-[#1b1f23]">
              Business.mii Analyse starten
            </h1>
            <p className="text-sm text-[#1b1f23]/70 mt-1">
              Konfiguration & Themenblöcke (Unternehmen)
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-white px-4 py-2 text-sm text-[#1b1f23] shadow-sm">
            <Sparkles size={16} />
            <span className="font-medium">Fortschritt</span>
            <span className="text-[#1b1f23]/70">{progressPct}%</span>
          </div>
        </div>

        {/* STEP GRID */}
        <div className="mt-8 grid grid-cols-5 gap-4">
          {progressSteps.map((s, idx) => {
            const isActive = idx === currentStepIndex;

            return (
              <div
                key={s.label}
                className={[
                  "rounded-[22px] px-4 py-5 border transition shadow-sm flex flex-col items-center text-center",
                  isActive ? "bg-white border-white" : "bg-white/35 border-white/50",
                ].join(" ")}
              >
                <div
                  className={[
                    "h-14 w-14 rounded-2xl flex items-center justify-center mb-3 border",
                    isActive ? "bg-[#dff7f5] border-white" : "bg-white/50 border-white/60",
                  ].join(" ")}
                >
                  <img
                    src={s.imgSrc}
                    alt={s.label}
                    className="h-[46px] w-[46px] object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <ClipboardList className="hidden text-[#1b1f23]" size={18} />
                </div>

                <div className="text-[11px] text-[#1b1f23]/60 mb-1">
                  Schritt {idx + 1}
                </div>

                <div className="text-sm font-medium text-[#1b1f23] leading-snug">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-6">
          <div className="h-2.5 w-full rounded-full bg-white/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#1b1f23] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-[#1b1f23]/70">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-white px-3 py-1.5 text-[#1b1f23] shadow-sm hover:bg-white transition"
            >
              <ArrowLeft size={14} />
              Zurück
            </button>

            <span>{progressPct}%</span>

            <span>
              Schritt {currentStepIndex + 1} von {totalSteps}
            </span>
          </div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="mt-10">{children}</div>
    </div>
  );
}
