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

    if (!email) {
      setErrorMsg("Bitte gib deine E-Mail-Adresse ein.");
      return;
    }

    // ✅ WICHTIG:
    // KEIN redirectTo hier!
    // Der Reset-Link wird vollständig über {{ .ConfirmationURL }} im Template gesteuert.
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setErrorMsg(
        "Der Link konnte nicht gesendet werden. Bitte überprüfe deine E-Mail-Adresse."
      );
      return;
    }

    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* HERO */}
      <section className="pt-40 pb-24 text-center bg-black text-white">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
        >
          Passwort vergessen?
        </motion.h1>

        <p className="text-gray-300 max-w-xl mx-auto leading-relaxed text-base md:text-lg">
          Gib deine E-Mail-Adresse ein.  
          Wir senden dir einen sicheren Link, mit dem du dein Passwort
          zurücksetzen kannst.
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
          {sent ? (
            <div className="text-center">
              <Send size={48} className="mx-auto text-green-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                E-Mail wurde versendet
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Bitte überprüfe dein Postfach und folge dem Link in der E-Mail,
                um ein neues Passwort festzulegen.
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
                  required
                  placeholder="deine@emailadresse.ch"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300
                             focus:ring-2 focus:ring-[#8bbbbb] outline-none transition"
                />
              </label>

              {errorMsg && (
                <p className="text-red-600 text-center mb-4">
                  ❌ {errorMsg}
                </p>
              )}

              <button
                onClick={handleSend}
                className="w-full bg-black text-white font-semibold py-4
                           rounded-full text-lg transition disabled:opacity-50
                           hover:bg-gray-900"
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
