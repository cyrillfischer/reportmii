import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/Button";

/**
 * STEP 5 – Abschließen
 * --------------------
 * - Fortschritt: 100 %
 * - Analyse finalisieren
 * - Mail "Report kommt in 24h" auslösen
 * - Weiterleitung auf Success-Seite
 */
export default function AnalysisStep5() {
  const navigate = useNavigate();
  const { analysisId } = useParams<{ analysisId: string }>();

  if (!analysisId) {
    return null;
  }

  const finishAnalysis = async () => {
    // 🔔 MAIL TRIGGER (non-blocking)
    try {
      await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analysis-started-mail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            analysis_id: analysisId,
          }),
        }
      );
    } catch (err) {
      console.warn("Analysis completed mail failed (ignored)", err);
    }

    // ✅ UX: Immer weiterleiten
    navigate("/analysis/success");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[28px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(27,31,35,0.10)] p-10"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-[#1b1f23]">
          Analyse abschliessen
        </h2>
        <p className="mt-2 text-sm text-[#1b1f23]/70 max-w-xl">
          Du hast alle Schritte abgeschlossen. Mit dem Abschliessen startest du
          die Erstellung deines persönlichen Analyse-Reports.
        </p>
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-[#f6f9f9] p-6">
        <div className="text-sm font-medium text-[#1b1f23]">
          Zusammenfassung
        </div>

        <ul className="mt-4 space-y-3 text-sm text-[#1b1f23]/80">
          <li>✔ Angaben zur Analyse erfasst</li>
          <li>✔ Themenblöcke ausgewählt</li>
          <li>✔ Fragen beantwortet</li>
          <li>✔ Report-Design festgelegt</li>
        </ul>
      </div>

      {/* Hinweis */}
      <div className="mt-6 text-sm text-[#1b1f23]/60 max-w-xl space-y-2">
        <p>
          Nach dem Abschliessen wird deine Analyse automatisch verarbeitet.
          In der Regel erhältst du deinen ausführlichen Report innerhalb der
          nächsten <strong>24 Stunden</strong>.
        </p>
        <p>
          💡 <strong>Hinweis:</strong> Oft geht es schneller als erwartet – du
          wirst per E-Mail informiert, sobald dein Report fertig ist.
        </p>
      </div>

      {/* Footer */}
     <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <Button
    variant="secondary"
    className="h-12 w-full sm:w-auto px-6 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap"
    onClick={() => navigate(`/analysis/${analysisId}/step/4`)}
  >
    <span>←</span>
    <span>Zurück</span>
  </Button>

  <Button
    variant="primary"
    className="h-12 w-full sm:w-auto px-8 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap"
    onClick={finishAnalysis}
  >
    <span>Analyse abschliessen</span>
    <span>✓</span>
  </Button>
</div>

    </motion.div>
  );
}
