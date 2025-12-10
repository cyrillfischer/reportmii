// src/pages/ResetPassword.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Check } from "lucide-react";
import { supabase } from "../supabase/supabaseClient";

type ViewState = "checking" | "invalid" | "ready" | "saving" | "done";

export default function ResetPassword() {
  const [view, setView] = useState<ViewState>("checking");

  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get("token_hash");
    const type = params.get("type");

    if (!token_hash || type !== "recovery") {
      setErrorMsg("Der Passwort-Link ist ungültig.");
      setView("invalid");
      return;
    }

    const verify = async () => {
      setView("checking");

      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: "recovery",
      });

      if (error) {
        console.error(error);
        setErrorMsg("Der Link ist abgelaufen oder ungültig.");
        setView("invalid");
        return;
      }

      setView("ready");
    };

    verify();
  }, []);

  const handleSave = async () => {
    if (view !== "ready") return;

    if (!pw1 || pw1.length < 6) {
      setErrorMsg("Das Passwort muss mindestens 6 Zeichen haben.");
      return;
    }

    if (pw1 !== pw2) {
      setErrorMsg("Die Passwörter stimmen nicht überein.");
      return;
    }

    if (!confirm) {
      setErrorMsg("Bitte bestätige, dass du der Inhaber des Kontos bist.");
      return;
    }

    setView("saving");
    setErrorMsg("");

    const { error } = await supabase.auth.updateUser({ password: pw1 });

    if (error) {
      console.error("updateUser error", error);
      setErrorMsg("Fehler beim Speichern. Bitte erneut versuchen.");
      setView("ready");
      return;
    }

    setView("done");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* HEADER-BLOCK */}
      <section className="pt-40 pb-24 text-center bg-black">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-semibold text-white mb-4"
        >
          Neues Passwort setzen
        </motion.h1>

        <p className="text-white/70 max-w-xl mx-auto text-lg">
          Wähle ein neues, sicheres Passwort.
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">

          {view === "checking" && (
            <p className="text-center text-gray-600">Link wird geprüft…</p>
          )}

          {view === "invalid" && (
            <div className="text-center">
              <p className="text-red-500 text-lg font-medium">
                {errorMsg}
              </p>
            </div>
          )}

          {(view === "ready" || view === "saving") && (
            <>
              {/* Passwort 1 */}
              <label className="block text-left mb-6">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <Lock size={20} className="text-[#7eb6b8]" />
                  Neues Passwort
                </span>

                <div className="relative mt-3">
                  <input
                    type={showPw1 ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-[#7eb6b8]"
                    value={pw1}
                    onChange={(e) => setPw1(e.target.value)}
                    placeholder="Neues Passwort eingeben"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPw1(!showPw1)}
                  >
                    {showPw1 ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>

              {/* Passwort 2 */}
              <label className="block text-left mb-6">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <Lock size={20} className="text-[#7eb6b8]" />
                  Passwort wiederholen
                </span>

                <div className="relative mt-3">
                  <input
                    type={showPw2 ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-[#7eb6b8]"
                    value={pw2}
                    onChange={(e) => setPw2(e.target.value)}
                    placeholder="Passwort erneut eingeben"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPw2(!showPw2)}
                  >
                    {showPw2 ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>

              {/* Checkbox */}
              <label className="flex items-center gap-3 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirm}
                  onChange={(e) => setConfirm(e.target.checked)}
                  className="w-5 h-5 accent-[#7eb6b8]"
                />
                Ich bestätige, dass ich der Inhaber dieses Kontos bin.
              </label>

              {/* Error */}
              {errorMsg && (
                <p className="text-red-500 text-center font-medium mb-4">
                  {errorMsg}
                </p>
              )}

              {/* Save button */}
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
              <Check size={48} className="mx-auto mb-4 text-[#7eb6b8]" />
              <h2 className="text-2xl font-semibold mb-2">
                Passwort erfolgreich geändert!
              </h2>
              <p className="text-gray-600 mb-6">
                Du kannst dich jetzt mit deinem neuen Passwort einloggen.
              </p>

              <button
                onClick={() => (window.location.href = "/login")}
                className="w-full bg-[#7eb6b8] py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-white transition"
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
