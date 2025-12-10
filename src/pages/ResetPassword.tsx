// src/pages/ResetPassword.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { supabase } from "../supabase/supabaseClient";

type ViewState = "checking" | "invalid" | "ready" | "saving" | "done";

export default function ResetPassword() {
  const [view, setView] = useState<ViewState>("checking");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token_hash");
    const type = params.get("type");

    if (!token || type !== "recovery") {
      setErrorMsg("Der Passwort-Link ist ungültig oder unvollständig.");
      setView("invalid");
      return;
    }

    const verify = async () => {
      setView("checking");
      setErrorMsg("");

      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token_hash: token,
      });

      if (error) {
        console.error("verifyOtp error", error);
        setErrorMsg("Der Passwort-Link ist abgelaufen oder ungültig.");
        setView("invalid");
        return;
      }

      // Jetzt ist der User temporär eingeloggt
      setView("ready");
    };

    verify();
  }, []);

  const handleSave = async () => {
    if (view !== "ready") return;

    if (!password || password.length < 6) {
      setErrorMsg("Das Passwort muss mindestens 6 Zeichen haben.");
      return;
    }

    if (password !== password2) {
      setErrorMsg("Die beiden Passwörter stimmen nicht überein.");
      return;
    }

    setView("saving");
    setErrorMsg("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("updateUser error", error);
      setErrorMsg("Fehler beim Speichern des Passworts. Bitte versuche es erneut.");
      setView("ready");
      return;
    }

    setView("done");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* HEADER SECTION */}
      <section className="pt-40 pb-24 text-center bg-black text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-semibold mb-4 text-white"
        >
          Neues Passwort setzen
        </motion.h1>

        <p className="text-white/70 max-w-xl mx-auto text-lg">
          Wähle ein neues, sicheres Passwort und bestätige es unten.
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
          
          {/* Checking */}
          {view === "checking" && (
            <p className="text-center text-gray-600">Link wird geprüft …</p>
          )}

          {/* Invalid */}
          {view === "invalid" && (
            <div className="text-center">
              <p className="text-red-500 font-medium mb-2">
                {errorMsg}
              </p>
            </div>
          )}

          {/* Ready / Saving */}
          {(view === "ready" || view === "saving") && (
            <>
              {/* Passwort */}
              <label className="block text-left mb-6">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <Lock size={20} className="text-[#7eb6b8]" />
                  Neues Passwort
                </span>

                <input
                  type="password"
                  className="mt-3 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-[#7eb6b8] focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Neues Passwort eingeben"
                />
              </label>

              {/* Passwort wiederholen */}
              <label className="block text-left mb-6">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <Lock size={20} className="text-[#7eb6b8]" />
                  Passwort wiederholen
                </span>

                <input
                  type="password"
                  className="mt-3 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-[#7eb6b8] focus:outline-none"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Passwort erneut eingeben"
                />
              </label>

              {errorMsg && (
                <p className="text-red-500 text-center mb-4 font-medium">
                  {errorMsg}
                </p>
              )}

              <button
                onClick={handleSave}
                disabled={view === "saving"}
                className={`w-full bg-[#7eb6b8] py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-white transition ${
                  view === "saving" ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {view === "saving"
                  ? "Passwort wird gespeichert …"
                  : "Passwort speichern →"}
              </button>
            </>
          )}

          {/* DONE */}
          {view === "done" && (
            <div className="text-center">
              <Lock size={48} className="mx-auto mb-4 text-[#7eb6b8]" />
              <h2 className="text-2xl font-semibold mb-2">Passwort geändert!</h2>
              <p className="text-gray-600 mb-6">
                Dein Passwort wurde erfolgreich aktualisiert.
              </p>

              <button
                onClick={() => (window.location.href = "/login")}
                className="w-full bg-[#7eb6b8] text-black py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-white transition"
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
