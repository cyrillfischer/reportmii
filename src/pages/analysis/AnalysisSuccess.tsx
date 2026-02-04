import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/Button";

export default function AnalysisSuccess() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-3xl mx-auto rounded-[28px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(27,31,35,0.10)] p-10 text-center"
    >
      <h2 className="text-3xl font-semibold text-[#1b1f23]">
        🎉 Analyse erfolgreich abgeschlossen
      </h2>

      <p className="mt-4 text-[#1b1f23]/70 max-w-xl mx-auto">
        Vielen Dank! Deine Analyse wurde erfolgreich übermittelt und wird jetzt
        von uns verarbeitet.
      </p>

      <div className="mt-8 rounded-2xl bg-[#f6f9f9] border border-gray-200 p-6 text-left">
        <ul className="space-y-3 text-sm text-[#1b1f23]/80">
          <li>✔ Deine Antworten wurden gespeichert</li>
          <li>✔ Dein individueller Report wird jetzt erstellt</li>
          <li>
            ✔ Du erhältst deinen ausführlichen Analyse-Report innerhalb von
            <strong> 24 Stunden</strong> per E-Mail
          </li>
        </ul>
      </div>

      <p className="mt-6 text-sm text-[#1b1f23]/60">
        💡 Tipp: Manchmal sind wir schneller – es kann gut sein, dass dein Report
        bereits früher bei dir eintrifft 😉
      </p>

      <div className="mt-10 flex justify-center">
        <Button
          variant="primary"
          className="h-12 px-10 rounded-2xl"
          onClick={() => navigate("/dashboard/analyses")}
        >
          Zum Dashboard →
        </Button>
      </div>
    </motion.div>
  );
}
