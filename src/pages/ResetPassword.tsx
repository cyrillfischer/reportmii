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
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
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

      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token_hash: token,
      });

      if (error) {
        setErrorMsg("Der Passwort-Link ist abgelaufen oder ungültig.");
        setView("invalid");
        return;
      }

      setView("ready");
    };

    verify();
  }, []);

  const handleSave = async () => {
    if (password.length < 6) {
      setErrorMsg("Das Passwort muss mindestens 6 Zeichen haben.");
      return;
    }

    if (password !== password2) {
      setErrorMsg("Die beiden Passwörter stimmen nicht überein.");
      return;
    }

    if (!confirmed) {
      setErrorMsg("Bitte bestätige, dass du der Kontoinhaber bist.");
      return;
    }

    setView("saving");
    setErrorMsg("");

    const { data, error } = await supabase.auth.updateUser({ password });

    if (error || !data?.user) {
      setErrorMsg("Fehler beim Speichern. Bitte erneut versuchen.");
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
            <p className="text-center text-red-500">{errorMsg}</p>
          )}

          {(view === "ready" || view === "saving") && (
            <>
              {/* Passwort */}
              <label className="block mb-6">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <Lock size={20} className="text-[#7eb6b8]" />
                  Neues Passwort
                </span>

                <div className="relative mt-3">
                  <input
                    type={show1 ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-[#7eb6b8]"
                  />

                  <button
                    type="button"
                    className="absolute right-4 top-3 text-gray-500"
                    onClick={() => setShow1(!show1)}
                  >
                    {show1 ? "👁️‍🗨️" : "👁️"}
                  </button>
                </div>
              </label>

              {/* Passwort wiederholen */}
              <label className="block mb-6">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <Lock size={20} className="text-[#7eb6b8]" />
                  Passwort wiederholen
                </span>

                <div className="relative mt-3">
                  <input
                    type={show2 ? "text" : "password"}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-[#7eb6b8]"
                  />

                  <button
                    type="button"
                    className="absolute right-4 top-3 text-gray-500"
                    onClick={() => setShow2(!show2)}
                  >
                    {show2 ? "👁️‍🗨️" : "👁️"}
                  </button>
                </div>
              </label>

              {/* Checkbox */}
              <label className="flex items-start gap-3 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#7eb6b8]"
                />
                <span className="text-sm text-gray-700">
                  Ich bestätige, dass ich der Inhaber dieses Kontos bin.
                </span>
              </label>

              {errorMsg && (
                <p className="text-center text-red-500 mb-4">{errorMsg}</p>
              )}

              <button
                onClick={handleSave}
                disabled={view === "saving"}
                className="w-full bg-[#7eb6b8] py-4 rounded-full text-lg font-semibold"
              >
                {view === "saving"
                  ? "Passwort wird gespeichert …"
                  : "Passwort speichern →"}
              </button>
            </>
          )}

          {view === "done" && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">
                Passwort erfolgreich geändert!
              </h2>
              <button
                onClick={() => (window.location.href = "/login")}
                className="w-full bg-[#7eb6b8] py-4 rounded-full text-lg font-semibold mt-6"
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
