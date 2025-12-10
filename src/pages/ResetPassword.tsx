// src/pages/ResetPassword.tsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "../supabase/supabaseClient";

type ViewState = "checking" | "invalid" | "form" | "saving" | "success";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [view, setView] = useState<ViewState>("checking");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  // ---------------------------------------------------------------------------
  // 1) Token aus URL prüfen & bei Supabase verifizieren
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const token_hash = params.get("token_hash");
    const type = params.get("type"); // sollte "recovery" sein

    if (!token_hash || type !== "recovery") {
      setErrorMsg("Der Passwort-Link ist ungültig oder unvollständig.");
      setView("invalid");
      return;
    }

    const run = async () => {
      try {
        setView("checking");
        setErrorMsg("");

        console.log("ResetPassword gestartet. token_hash:", token_hash);

        const { data, error } = await supabase.auth.verifyOtp({
          type: "recovery",
          token_hash,
        });

        console.log("verifyOtp Ergebnis:", { data, error });

        if (error) {
          console.error("verifyOtp error:", error);
          setErrorMsg("Token ungültig oder abgelaufen.");
          setView("invalid");
          return;
        }

        // Falls Supabase keinen Fehler meldet, können wir das Formular anzeigen
        setView("form");
      } catch (err) {
        console.error("verifyOtp try/catch Fehler:", err);
        setErrorMsg("Es ist ein unerwarteter Fehler aufgetreten.");
        setView("invalid");
      }
    };

    run();
  }, [params]);

  // ---------------------------------------------------------------------------
  // 2) Neues Passwort speichern
  // ---------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (view !== "form") return;

    // Basis-Validierung
    if (!password || password.length < 8) {
      setErrorMsg("Bitte wähle ein Passwort mit mindestens 8 Zeichen.");
      return;
    }

    if (password !== password2) {
      setErrorMsg("Die beiden Passwörter stimmen nicht überein.");
      return;
    }

    if (!confirmed) {
      setErrorMsg("Bitte bestätige, dass du der Inhaber dieses Kontos bist.");
      return;
    }

    try {
      setView("saving");
      setErrorMsg("");

      console.log("updateUser gestartet…");

      const { data, error } = await supabase.auth.updateUser({ password });

      console.log("updateUser Ergebnis:", { data, error });

      if (error) {
        console.error("updateUser error:", error);
        setErrorMsg(
          error.message ||
            "Fehler beim Speichern des Passworts. Bitte versuche es erneut."
        );
        setView("form");
        return;
      }

      // Passwort erfolgreich gesetzt
      setView("success");

      // nach kurzer Zeit automatisch zum Login
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      console.error("updateUser try/catch Fehler:", err);
      setErrorMsg(
        "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuche es erneut."
      );
      setView("form");
    }
  };

  // ---------------------------------------------------------------------------
  // 3) Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* HERO */}
      <section className="pt-32 pb-24 text-center bg-black text-white">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold mb-4"
        >
          Neues Passwort setzen
        </motion.h1>

        <p className="text-white/70 max-w-xl mx-auto text-lg">
          Wähle ein neues, sicheres Passwort und bestätige es unten.
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-lg mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200">
          {/* STATUS: Link wird geprüft */}
          {view === "checking" && (
            <p className="text-center text-gray-600">Link wird geprüft …</p>
          )}

          {/* STATUS: ungültig */}
          {view === "invalid" && (
            <div className="text-center space-y-4">
              <p className="text-red-500 font-medium">
                {errorMsg || "Der Passwort-Link ist ungültig oder abgelaufen."}
              </p>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-black text-white hover:bg-gray-900 transition"
              >
                Zurück zum Login
              </button>
            </div>
          )}

          {/* FORMULAR */}
          {(view === "form" || view === "saving") && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Passwort 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Lock size={18} className="text-[#7eb6b8]" />
                    Neues Passwort
                  </span>
                </label>

                <div className="relative">
                  <input
                    type={showPw1 ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-[#7eb6b8] focus:border-[#7eb6b8] focus:outline-none"
                    placeholder="Neues Passwort eingeben"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw1((v) => !v)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPw1 ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Passwort 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Lock size={18} className="text-[#7eb6b8]" />
                    Passwort wiederholen
                  </span>
                </label>

                <div className="relative">
                  <input
                    type={showPw2 ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-[#7eb6b8] focus:border-[#7eb6b8] focus:outline-none"
                    placeholder="Passwort erneut eingeben"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw2((v) => !v)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPw2 ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#7eb6b8] focus:ring-[#7eb6b8]"
                />
                <span>
                  Ich bestätige, dass ich der Inhaber dieses Kontos bin und
                  dieses Passwort selbst gesetzt habe.
                </span>
              </label>

              {/* Fehlermeldung */}
              {errorMsg && (
                <p className="text-red-500 text-sm text-center font-medium">
                  {errorMsg}
                </p>
              )}

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={view === "saving"}
                  className={`w-full py-3 rounded-full text-sm md:text-base font-semibold transition flex items-center justify-center ${
                    view === "saving"
                      ? "bg-gray-900 text-white opacity-80 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-900"
                  }`}
                >
                  {view === "saving"
                    ? "Passwort wird gespeichert …"
                    : "Passwort speichern →"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-800"
                >
                  Zurück zum Login
                </button>
              </div>
            </form>
          )}

          {/* ERFOLG */}
          {view === "success" && (
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold">Passwort gespeichert!</h2>
              <p className="text-gray-600">
                Dein Passwort wurde erfolgreich geändert. Du wirst gleich zum
                Login weitergeleitet.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-[#7eb6b8] text-black hover:bg-black hover:text-white transition"
              >
                Direkt zum Login →
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
