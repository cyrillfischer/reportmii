// src/pages/UpdatePassword.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Header } from "../components/Header";
import { supabase } from "../supabase/supabaseClient";

console.log("main.tsx wird ausgeführt!");


export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpdate = async () => {
    setErrorMsg("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMsg("Passwort konnte nicht geändert werden.");
      return;
    }

    setDone(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* ========================== */}
      {/* 🖤 HERO-BEREICH */}
      {/* ========================== */}
      <section className="pt-40 pb-24 text-center bg-black text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-semibold text-white"
        >
          Passwort aktualisieren
        </motion.h1>
      </section>

      {/* ========================== */}
      {/* 🔐 INHALT */}
      {/* ========================== */}
      <section className="py-20 px-6">
        <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">

          {/* ========================== */}
          {/* 🎉 Erfolgsmeldung */}
          {/* ========================== */}
          {done ? (
            <div className="text-center">
              <Lock size={48} className="mx-auto mb-4 text-[#7eb6b8]" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Passwort erfolgreich geändert!
              </h2>
              <p className="text-gray-600">
                Du kannst dich jetzt mit deinem neuen Passwort einloggen.
              </p>
            </div>
          ) : (
            <>
              {/* ========================== */}
              {/* ✏ Passwortfeld */}
              {/* ========================== */}
              <label className="block text-left mb-8">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <Lock size={20} className="text-[#7eb6b8]" />
                  Neues Passwort
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    mt-3 w-full px-4 py-3 rounded-xl border border-gray-300 
                    focus:ring-2 focus:ring-[#7eb6b8] outline-none transition
                  "
                  placeholder="••••••••"
                />
              </label>

              {/* ========================== */}
              {/* ⚠ Fehlermeldung */}
              {/* ========================== */}
              {errorMsg && (
                <p className="text-red-500 text-center mb-4 font-medium">
                  {errorMsg}
                </p>
              )}

              {/* ========================== */}
              {/* 🚀 Button */}
              {/* ========================== */}
              <button
                onClick={handleUpdate}
                className="
                  w-full bg-[#7eb6b8] text-black font-semibold py-4 rounded-full text-lg
                  hover:bg-black hover:text-white transition-all
                "
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
