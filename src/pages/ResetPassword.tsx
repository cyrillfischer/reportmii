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

  useEffect(() => {
    // -----------------------------
    // 1) Token aus Query oder Hash lesen
    // -----------------------------
    const params = new URLSearchParams(window.location.search);

    let token = params.get("token");
    const type = params.get("type");
    const email = params.get("email");

    // 🔥 Supabase liefert Token oft im HASH, z.B. #access_token=xxxx
    if (!token) {
      const hashParams = new URLSearchParams(window.location.hash.replace("#", ""));
      token = hashParams.get("access_token") || hashParams.get("__token") || hashParams.get("token_hash");
    }

    console.log("Token gefunden:", token);

    if (!token || type !== "recovery" || !email) {
      setErrorMsg("Der Passwort-Link ist ungültig oder unvollständig.");
      setVerifying(false);
      return;
    }

    const verify = async () => {
      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token,
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

  const handleReset = async () => {
    if (verifying) return;

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMsg("Fehler beim Speichern des Passworts.");
      return;
    }

    setDone(true);
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

          {done ? (
            <div className="text-center">
              <Lock size={48} className="mx-auto mb-4 text-[#7eb6b8]" />
              <h2 className="text-2xl font-semibold mb-2">Passwort geändert!</h2>

              <button
                onClick={() => (window.location.href = "/login")}
                className="mt-8 w-full bg-[#7eb6b8] text-black py-4 rounded-full text-lg hover:bg-black hover:text-white"
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
                  className="mt-3 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-[#7eb6b8]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              {errorMsg && (
                <p className="text-red-500 text-center mb-4 font-medium">
                  {errorMsg}
                </p>
              )}

              {verifying && (
                <p className="text-gray-500 text-center mb-4">Link wird geprüft…</p>
              )}

              <button
                onClick={handleReset}
                disabled={verifying}
                className={`w-full bg-[#7eb6b8] py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-white ${
                  verifying ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                Passwort speichern →
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
