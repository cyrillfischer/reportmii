// src/pages/ResetPassword.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [verifying, setVerifying] = useState(true);

  // -----------------------------------------------------
  // 1) Token + Email prüfen
  // -----------------------------------------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // ❗ WICHTIG: Supabase sendet "token=", NICHT "token_hash"
    const token = params.get("token");
    const type = params.get("type");
    const email = params.get("email");

    console.log("URL-Parameter:", { token, type, email });

    if (!token || type !== "recovery" || !email) {
      setErrorMsg("Der Passwort-Link ist ungültig oder unvollständig.");
      setVerifying(false);
      return;
    }

    const verify = async () => {
      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token, // ❗ KEIN token_hash – dein Projekt liefert token!
        email,
      });

      if (error) {
        console.error("verifyOtp error", error);
        setErrorMsg("Der Passwort-Link ist abgelaufen oder ungültig.");
        setVerifying(false);
        return;
      }

      setVerifying(false);
    };

    verify();
  }, []);

  // -----------------------------------------------------
  // 2) Neues Passwort setzen
  // -----------------------------------------------------
  const handleReset = async () => {
    if (verifying) return;
    setErrorMsg("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("updateUser error", error);
      setErrorMsg("Fehler beim Ändern des Passworts.");
      return;
    }

    setDone(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">

      {/* Kein Header hier */}

      {/* HERO */}
      <section className="pt-40 pb-24 text-center bg-black text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-semibold mb-4"
        >
          Neues Passwort setzen
        </motion.h1>

        <p className="text-white/70 max-w-xl mx-auto leading-relaxed text-lg">
          Wähle ein neues, sicheres Passwort für deinen Zugang.
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">

          {done ? (
            <div className="text-center">
              <Lock size={48} className="mx-auto mb-4 text-[#7eb6b8]" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Passwort geändert!
              </h2>

              <button
                onClick={() => (window.location.href = "/login")}
                className="mt-8 w-full bg-[#7eb6b8] text-black font-semibold py-4 rounded-full text-lg hover:bg-black hover:text-white transition-all"
              >
                Weiter zum Login →
              </button>
            </div>
          ) : (
            <>
              <label className="block text-left mb-8">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <Lock size={20} className="text-[#7eb6b8]" />
                  Neues Passwort
                </span>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
                    mt-3 w-full px-4 py-3 rounded-xl border border-gray-300
                    focus:ring-2 focus:ring-[#7eb6b8] outline-none transition
                  "
                  disabled={verifying}
                />
              </label>

              {verifying && (
                <p className="text-center text-gray-500 mb-4 text-sm">
                  Link wird geprüft …
                </p>
              )}

              {errorMsg && (
                <p className="text-red-500 text-center mb-4 font-medium">
                  {errorMsg}
                </p>
              )}

              <button
                onClick={handleReset}
                disabled={verifying}
                className={`
                  w-full bg-[#7eb6b8] text-black font-semibold py-4 rounded-full text-lg
                  hover:bg-black hover:text-white transition-all
                  ${verifying ? "opacity-60 cursor-not-allowed" : ""}
                `}
              >
                Passwort speichern →
              </button>
            </>
          )}
        </div>
      </section>

      {/* Kein Footer */}

    </div>
  );
}
