// src/pages/ResetPassword.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { supabase } from "../supabase/supabaseClient";

type ViewState = "checking" | "invalid" | "ready" | "saving" | "done";

export default function ResetPassword() {
  const [view, setView] = useState<ViewState>("checking");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [confirmOwner, setConfirmOwner] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  // =========================================
  // 1) Token aus URL prüfen + verifyOtp
  // =========================================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token_hash");
    const type = params.get("type");

    if (!token || type !== "recovery") {
      console.warn("ResetPassword: token oder type ungültig", {
        token,
        type,
      });
      setErrorMsg("Der Passwort-Link ist ungültig oder unvollständig.");
      setView("invalid");
      return;
    }

    const verify = async () => {
      try {
        console.log("ResetPassword: verifyOtp gestartet…", { token, type });

        setView("checking");
        setErrorMsg("");

        const { data, error } = await supabase.auth.verifyOtp({
          type: "recovery",
          token_hash: token,
        });

        console.log("ResetPassword: verifyOtp Ergebnis:", { data, error });

        if (error) {
          console.error("ResetPassword: verifyOtp error", error);
          setErrorMsg(
            error.message || "Der Passwort-Link ist abgelaufen oder ungültig."
          );
          setView("invalid");
          return;
        }

        // Token gültig → Formular anzeigen
        setView("ready");
      } catch (err) {
        console.error("ResetPassword: verifyOtp Exception", err);
        setErrorMsg("Beim Prüfen des Links ist ein Fehler aufgetreten.");
        setView("invalid");
      }
    };

    verify();
  }, []);

  // =========================================
  // 2) Passwort speichern
  // =========================================
  const handleSave = async () => {
    if (view !== "ready") return;

    // Basis-Validierungen
    if (!password || password.length < 6) {
      setErrorMsg("Bitte gib ein Passwort mit mindestens 6 Zeichen ein.");
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMsg("Die beiden Passwörter stimmen nicht überein.");
      return;
    }

    if (!confirmOwner) {
      setErrorMsg(
        "Bitte bestätige, dass du der Inhaber dieses Kontos bist."
      );
      return;
    }

    setView("saving");
    setErrorMsg("");

    try {
      console.log("ResetPassword: updateUser gestartet…");

      const { data, error } = await supabase.auth.updateUser({ password });

      console.log("ResetPassword: updateUser Ergebnis:", { data, error });

      if (error) {
        console.error("ResetPassword: updateUser error", error);
        setErrorMsg(
          error.message ||
            "Fehler beim Speichern des Passworts. Bitte versuche es erneut."
        );
        setView("ready");
        return;
      }

      // ✅ Erfolgreich
      setView("done");
    } catch (err) {
      console.error("ResetPassword: updateUser Exception", err);
      setErrorMsg(
        "Beim Speichern des Passworts ist ein technischer Fehler aufgetreten."
      );
      setView("ready");
    }
  };

  // =========================================
  // 3) UI
  // =========================================
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Schwarzer Hero-Bereich */}
      <section className="pt-32 pb-24 text-center bg-black text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold mb-4 text-white"
        >
          Neues Passwort setzen
        </motion.h1>

        <p className="text-white/70 max-w-xl mx-auto text-lg">
          Wähle ein neues, sicheres Passwort und bestätige es unten.
        </p>
      </section>

      {/* Inhalt */}
      <section className="py-20 px-6">
        <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
          {/*  Zustand: Link wird geprüft */}
          {view === "checking" && (
            <p className="text-center text-gray-600">Link wird geprüft …</p>
          )}

          {/*  Zustand: Link ungültig */}
          {view === "invalid" && (
            <div className="text-center">
              <p className="text-red-500 font-medium mb-3">
                {errorMsg || "Der Passwort-Link ist ungültig oder abgelaufen."}
              </p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-900 transition"
              >
                Zurück zum Login
              </button>
            </div>
          )}

          {/*  Zustand: Formular (ready / saving) */}
          {(view === "ready" || view === "saving") && (
            <>
              {/* Passwort */}
              <label className="block text-left mb-6">
                <span className="text-gray-800 font-medium flex items-center gap-2 mb-2">
                  <Lock size={18} className="text-[#7eb6b8]" />
                  Neues Passwort
                </span>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7eb6b8] focus:outline-none pr-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Neues Passwort eingeben"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </label>

              {/* Passwort wiederholen */}
              <label className="block text-left mb-6">
                <span className="text-gray-800 font-medium flex items-center gap-2 mb-2">
                  <Lock size={18} className="text-[#7eb6b8]" />
                  Passwort wiederholen
                </span>

                <div className="relative">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7eb6b8] focus:outline-none pr-11"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="Passwort erneut eingeben"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm((v) => !v)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPasswordConfirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </label>

              {/* Checkbox */}
              <label className="flex items-start gap-2 mb-5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#7eb6b8] focus:ring-[#7eb6b8]"
                  checked={confirmOwner}
                  onChange={(e) => setConfirmOwner(e.target.checked)}
                />
                <span className="text-sm text-gray-700">
                  Ich bestätige, dass ich der Inhaber dieses Kontos bin.
                </span>
              </label>

              {/* Fehlertext */}
              {errorMsg && (
                <p className="text-red-500 text-center mb-4 text-sm font-medium">
                  {errorMsg}
                </p>
              )}

              {/* Button */}
              <button
                onClick={handleSave}
                disabled={view === "saving"}
                className={`w-full bg-[#7eb6b8] text-white py-3.5 rounded-full text-base font-semibold hover:bg-black hover:text-white transition ${
                  view === "saving" ? "opacity-70 cursor-wait" : ""
                }`}
              >
                {view === "saving"
                  ? "Passwort wird gespeichert …"
                  : "Passwort speichern →"}
              </button>

              {/* Link zurück zum Login */}
              <button
                type="button"
                onClick={() => (window.location.href = "/login")}
                className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
              >
                Zurück zum Login
              </button>
            </>
          )}

          {/*  Zustand: Erfolgreich */}
          {view === "done" && (
            <div className="text-center">
              <CheckCircle2
                size={52}
                className="mx-auto mb-4 text-emerald-500"
              />
              <h2 className="text-2xl font-semibold mb-2">
                Passwort erfolgreich geändert!
              </h2>
              <p className="text-gray-600 mb-6">
                Du kannst dich jetzt mit deinem neuen Passwort einloggen.
              </p>

              <button
                onClick={() => (window.location.href = "/login")}
                className="w-full bg-black text-white py-3.5 rounded-full text-base font-semibold hover:bg-gray-900 transition"
              >
                Weiter zum Login →
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
