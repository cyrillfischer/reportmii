import { motion } from "framer-motion";
import {
  Users,
  Link2,
  Mail,
  CheckCircle2,
  Clock,
  XCircle,
  Copy,
} from "lucide-react";

/* ------------------------------------------------ */
/* FAKE DATA – später Supabase                      */
/* ------------------------------------------------ */

const ANALYSIS = {
  title: "Inside.mii Team Analyse",
  seats: 25,
  completed: 17,
  invited: 20,
  status: "active", // active | completed
  createdAt: "12.01.2026",
  inviteLink: "https://inside.reportmii.com/i/abc123",
};

const PARTICIPANTS = [
  { email: "max@firma.ch", status: "completed", date: "14.01.2026" },
  { email: "anna@firma.ch", status: "completed", date: "14.01.2026" },
  { email: "luca@firma.ch", status: "invited", date: null },
  { email: "sara@firma.ch", status: "invited", date: null },
  { email: "anonym", status: "aborted", date: null },
];

/* ------------------------------------------------ */
/* COMPONENT                                       */
/* ------------------------------------------------ */

export default function DashboardTeam() {
  const progress = Math.round(
    (ANALYSIS.completed / ANALYSIS.seats) * 100
  );

  const usedSeats = ANALYSIS.completed; // später: completed + active
  const seatsLeft = Math.max(0, ANALYSIS.seats - usedSeats);
  const limitReached = seatsLeft <= 0;

  const limitText = limitReached
    ? `Teilnehmerlimit erreicht (${usedSeats}/${ANALYSIS.seats})`
    : `Noch ${seatsLeft} Plätze frei (${usedSeats}/${ANALYSIS.seats})`;

  /* ------------------------------------------------ */
  /* 📧 MAIL EINLADUNG                                */
  /* ------------------------------------------------ */
  const handleSendInviteMail = () => {
    const subject = encodeURIComponent(
      "Einladung zur anonymen Reportmii Team-Analyse"
    );

    const body = encodeURIComponent(
      `Hallo\n\n` +
        `du wurdest eingeladen, an einer anonymen Team-Analyse deines Unternehmens teilzunehmen.\n\n` +
        `Die Analyse wird über Reportmii durchgeführt und hilft dabei, Stärken, Herausforderungen und Potenziale im Unternehmen besser zu verstehen.\n\n` +
        `👉 Teilnahme-Link:\n${ANALYSIS.inviteLink}\n\n` +
        `Die Teilnahme ist anonym und dauert nur wenige Minuten.\n\n` +
        `Vielen Dank für deine Unterstützung!\n\n` +
        `Liebe Grüsse\n` +
        `Reportmii`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-14">

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="inline-flex text-sm bg-[#dff7f5] px-3 py-1 rounded-full mb-3">
          Team & Einladungen
        </span>

        <h1 className="text-4xl font-semibold text-[#1b1f23] mb-2">
          Inside.mii Team Analyse
        </h1>

        <p className="text-gray-600 max-w-2xl">
          Verwalte Einladungen, behalte den Überblick über Teilnahmen
          und teile den Analyse-Link mit deinem Team.
        </p>
      </motion.div>

      {/* ================= ANALYSIS OVERVIEW ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-between items-center">
        <div className="flex items-start gap-4">
          <Users className="text-[#7eb6b8]" />
          <div>
            <h3 className="font-medium">
              {ANALYSIS.title}
            </h3>
            <p className="text-sm text-gray-600">
              Paket: {ANALYSIS.seats} Mitarbeitende ·
              gestartet am {ANALYSIS.createdAt}
            </p>
            <p className="text-sm mt-1">
              Status:{" "}
              <span className="font-medium text-[#7eb6b8]">
                {ANALYSIS.status === "active"
                  ? "Aktiv"
                  : "Abgeschlossen"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ================= PROGRESS ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-medium">
            Teilnahme-Fortschritt
          </p>
          <p className="text-sm text-gray-600">
            {ANALYSIS.completed} von {ANALYSIS.seats} abgeschlossen
          </p>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 bg-[#7eb6b8]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500">
          {progress}% der Teilnahmen abgeschlossen
        </p>
      </div>

      {/* ================= INVITE LINK ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <p className="font-medium">
          Einladungs-Link
        </p>

        {/* ✅ MOBILE FIX: nur Klassen ergänzt, Logik unverändert */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <input
            value={ANALYSIS.inviteLink}
            readOnly
            className="w-full sm:flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-sm"
          />

          {/* Buttons auf Mobile untereinander/sauber, Desktop wie vorher */}
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              className="w-11 h-11 rounded-xl border flex items-center justify-center hover:bg-gray-100 transition shrink-0"
              title="Link kopieren"
              onClick={() => navigator.clipboard.writeText(ANALYSIS.inviteLink)}
            >
              <Copy size={16} />
            </button>

            <button
              onClick={handleSendInviteMail}
              disabled={limitReached}
              className={`
                flex-1 sm:flex-none px-5 py-3 rounded-xl transition flex items-center justify-center gap-2
                ${limitReached
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#7eb6b8] text-black hover:bg-[#1b1f23] hover:text-white"}
              `}
            >
              <Mail size={16} />
              Einladung senden
            </button>
          </div>
        </div>

        {/* ✅ HIER – NICHT IM BUTTON */}
        <p className={`text-sm ${limitReached ? "text-red-500" : "text-gray-500"}`}>
          {limitText}
        </p>

        <p className="text-sm text-gray-500">
          Die Einladung öffnet automatisch dein E-Mail-Programm mit einem
          vorformulierten Text und dem Teilnahme-Link.
        </p>
      </div>

      {/* ================= PARTICIPANTS ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="font-medium mb-4">
          Teilnehmer
        </p>

        <div className="space-y-3">
          {PARTICIPANTS.map((p, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-4 py-3 rounded-xl border"
            >
              <div>
                <p className="text-sm font-medium">
                  {p.email}
                </p>
                {p.date && (
                  <p className="text-xs text-gray-500">
                    Abgeschlossen am {p.date}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                {p.status === "completed" && (
                  <>
                    <CheckCircle2 className="text-green-500" size={16} />
                    Abgeschlossen
                  </>
                )}

                {p.status === "invited" && (
                  <>
                    <Clock className="text-orange-400" size={16} />
                    Eingeladen
                  </>
                )}

                {p.status === "aborted" && (
                  <>
                    <XCircle className="text-red-400" size={16} />
                    Abgebrochen
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FOOT NOTE ================= */}
      <div className="text-sm text-gray-500">
        Sobald alle Teilnahmen abgeschlossen sind, wird der
        Inside.mii Report automatisch erstellt.
      </div>

    </div>
  );
}
