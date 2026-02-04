import AnalysisLayout from "../../layouts/AnalysisLayout";
import AnalysisBlocks from "./AnalysisBlocks";

/**
 * STEP 2 – Themenblöcke auswählen
 * --------------------------------
 * Verwendet das neue Block-System:
 * - 6 fixe Blöcke inklusive
 * - Zusatzblöcke kostenpflichtig
 * - Preis- & UX-Logik in AnalysisBlocks
 */
export default function AnalysisStep2() {
  return (
    <AnalysisLayout step={2}>
      <AnalysisBlocks />
    </AnalysisLayout>
  );
}
