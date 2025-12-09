// src/pages/ResetPassword.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { supabase } from "../supabase/supabaseClient";

type ViewState = "checking" | "invalid" | "ready" | "saving" | "done";

export default function ResetPassword() {
  const [view, setView] = useState<ViewState>("checking");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const type = params.get("type");
    const email = params.get("email"); // 🔥 wichtig

    if (!token || type !== "recovery" || !email) {
      setView("invalid");
      setErrorMsg("Der Passwort-Link ist ungültig oder unvollständig.");
      return;
    }

    const verify = async () => {
      setView("checking");

      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token,
        email, // 🔥 muss mitgegeben werden
      });

      if (error) {
        console.error("verifyOtp error:", error);
        setErrorMsg("Der Passwort-Link ist abgelaufen oder ungültig.");
        setView("invalid");
        return;
      }

      setView("ready");
    };

    verify();
  }, []);

  const handleSave = async () => {
    if (!password || password.length < 6) {
      setErrorMsg("Bitte gib ein Passwort mit mindestens 6 Zeichen ein.");
      return;
    }

    setView("saving");
    setErrorMsg("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("updateUser error:", error);
      setErrorMsg("Fehler beim Speichern des Passworts. Bitte versuche es erneut.");
      setView("ready");
      return;
    }

    setView("done");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <section className="pt-40 pb-24 text-center bg-black text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-semibold mb-4"
        >
          Neues Passwort setzen
        </motion.h1>
        <p className="text-white/70 max-w-xl mx-auto text-lg">
          Wähle ein neues, sicheres Passwort.
        </p>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
          {view === "checking" && (
            <p className="text-center text-gray-600">Link wird geprüft …</p>
          )}

          {view === "invalid" && (
            <p className="text-center text-red-500 font-medium">
              {errorMsg}
            </p>
          )}

          {(view === "ready" || view === "saving") && (
            <>
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

          {view === "done" && (
            <div className="text-center">
              <Lock size={48} className="mx-auto mb-4 text-[#7eb6b8]" />
              <h2 className="text-2xl font-semibold mb-2">
                Passwort geändert!
              </h2>
              <p className="text-gray-600 mb-6">
                Du kannst dich jetzt mit deinem neuen Passwort einloggen.
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
