export const ANALYSIS_STEP_MIN = 1;
export const ANALYSIS_STEP_MAX = 5;

const key = (analysisId: string) => `reportmii:analysis:${analysisId}:maxStep`;

export function getMaxAllowedStep(analysisId: string): number {
  const raw = localStorage.getItem(key(analysisId));
  const n = Number(raw);
  if (!Number.isFinite(n) || n < ANALYSIS_STEP_MIN) return ANALYSIS_STEP_MIN;
  return Math.min(ANALYSIS_STEP_MAX, Math.max(ANALYSIS_STEP_MIN, n));
}

export function setMaxAllowedStep(analysisId: string, step: number) {
  const safe = Math.min(ANALYSIS_STEP_MAX, Math.max(ANALYSIS_STEP_MIN, step));
  localStorage.setItem(key(analysisId), String(safe));
}

// Helper: nach erfolgreichem Schritt freischalten
export function unlockNextStep(analysisId: string, currentStep: number) {
  const next = Math.min(ANALYSIS_STEP_MAX, currentStep + 1);
  const currentMax = getMaxAllowedStep(analysisId);
  if (next > currentMax) setMaxAllowedStep(analysisId, next);
}
