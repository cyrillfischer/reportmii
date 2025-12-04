// src/pages/ForgotPassword.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Header } from "../components/Header";
import { supabase } from "../supabase/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSend = async () => {
    setErrorMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setErrorMsg("Fehler beim Senden. Bitte prüfe deine E-Mail.");
      return;
    }

    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-40 pb-24 text-center bg-black text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4"
        >
          Passwort vergessen?
        </motion.h1>

        <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
          Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen.
        </p>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">

          {sent ? (
            <div className="text-center">
              <Send size={48} className="mx-auto text-green-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">E-Mail gesendet!</h2>
              <p className="text-gray-600">
                Prüfe dein Postfach und folge dem Link, um dein Passwort zurückzusetzen.
              </p>
            </div>
          ) : (
            <>
              <label className="block text-left mb-6">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <Mail size={18} /> E-Mail-Adresse
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none transition"
                />
              </label>

              {errorMsg && (
                <p className="text-red-500 text-center mb-4">{errorMsg}</p>
              )}

              <button
                onClick={handleSend}
                className="w-full bg-black text-white font-semibold py-4 rounded-full text-lg transition-all hover:bg-violet-700"
              >
                Link senden →
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
