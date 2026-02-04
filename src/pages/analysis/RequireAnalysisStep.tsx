import { ReactNode, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ANALYSIS_STEP_MIN, ANALYSIS_STEP_MAX, getMaxAllowedStep } from "./stepGuard";

type Props = { children: ReactNode };

export function RequireAnalysisStep({ children }: Props) {
  const params = useParams();
  const analysisId = params.analysisId || "";
  const stepFromUrl = Number(params.step);

  const stepNum = useMemo(() => {
    const n = Number(stepFromUrl);
    if (!Number.isFinite(n)) return ANALYSIS_STEP_MIN;
    return Math.min(ANALYSIS_STEP_MAX, Math.max(ANALYSIS_STEP_MIN, n));
  }, [stepFromUrl]);

  if (!analysisId) {
    return <Navigate to="/dashboard/business" replace />;
  }

  const maxAllowed = getMaxAllowedStep(analysisId);

  // Vorwärts blockieren: man darf nur bis maxAllowed
  if (stepNum > maxAllowed) {
    return <Navigate to={`/analysis/${analysisId}/step/${maxAllowed}`} replace />;
  }

  return <>{children}</>;
}
