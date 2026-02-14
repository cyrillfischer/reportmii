import { ReactNode, useMemo } from "react";
import { Sparkles, ClipboardList, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  step: number;
  children: ReactNode;
};

type StepItem = {
  label: string;        // Desktop / Browser
  mobileLabel: string; // Mobile Kurztext
  imgSrc: string;
};

export default function AnalysisLayout({ step, children }: Props) {
  const navigate = useNavigate();

  const params = useParams();
  const analysisId = params.analysisId || params.id || params.analysis || "";
  const stepFromUrl = Number(params.step);

  const progressSteps = useMemo<StepItem[]>(
    () => [
      {
        label: "Angaben zur Analyse",
        mobileLabel: "Angaben",
        imgSrc: "/illustrations/businessmii_analyse/1_Businessmii_Analyse_Angaben.png",
      },
      {
        label: "Blöcke auswählen",
        mobileLabel: "Blöcke",
        imgSrc: "/illustrations/businessmii_analyse/2_Businessmii_Analyse_Bloecke.png",
      },
      {
        label: "Fragen beantworten",
        mobileLabel: "Fragen",
        imgSrc: "/illustrations/businessmii_analyse/3_Businessmii_Analyse_Fragen.png",
      },
      {
        label: "Report-Design",
        mobileLabel: "Design",
        imgSrc: "/illustrations/businessmii_analyse/4_Businessmii_Analyse_Reportdesign.png",
      },
      {
        label: "Abschließen",
        mobileLabel: "Check",
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

  const handleBack = () => {
    const current =
      Number.isFinite(stepFromUrl) && stepFromUrl > 0 ? stepFromUrl : step;

    if (current <= 1) {
      navigate("/dashboard/business");
      return;
    }

    const prev = current - 1;

    if (analysisId) {
      navigate(`/analysis/${analysisId}/step/${prev}`);
    } else {
      navigate("/dashboard/business");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
      {/* HEADER */}
      <div className="rounded-[28px] bg-[#b7dedc] p-5 sm:p-6 md:p-8 shadow-[0_18px_40px_rgba(27,31,35,0.12)] border border-white/40">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1b1f23]">
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
        <div className="mt-6 sm:mt-8 grid grid-cols-5 gap-2 sm:gap-4">
          {progressSteps.map((s, idx) => {
            const isActive = idx === currentStepIndex;

            return (
              <div
                key={s.label}
                className={[
                  "rounded-[20px] px-2 sm:px-4 py-4 sm:py-5 border transition shadow-sm flex flex-col items-center text-center",
                  isActive ? "bg-white border-white" : "bg-white/35 border-white/50",
                ].join(" ")}
              >
                <div
                  className={[
                    "h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center mb-2 sm:mb-3 border",
                    isActive
                      ? "bg-[#dff7f5] border-white"
                      : "bg-white/50 border-white/60",
                  ].join(" ")}
                >
                  <img
                    src={s.imgSrc}
                    alt={s.label}
                    className="h-[36px] w-[36px] sm:h-[46px] sm:w-[46px] object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <ClipboardList className="hidden text-[#1b1f23]" size={18} />
                </div>

                <div className="text-[10px] text-[#1b1f23]/60 mb-0.5">
                  Schritt {idx + 1}
                </div>

                {/* =========================
                    LABELS
                    - Mobile: kurzer Text
                    - Desktop: voller Text
                   ========================= */}
                <div className="text-[#1b1f23] font-medium leading-tight text-center">
                  {/* Mobile */}
                  <span className="block sm:hidden text-[11px]">
                    {s.mobileLabel}
                  </span>

                  {/* Desktop */}
                  <span className="hidden sm:block text-sm">
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-5 sm:mt-6">
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
      <div className="mt-8 sm:mt-10 max-w-3xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
}
