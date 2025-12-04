// src/pages/Register.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/Header";

export function Register() {
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const ok = await signUp(email, password, "user");
      if (!ok) {
        setErrorMsg("Registrierung fehlgeschlagen.");
        return;
      }

      window.location.href = "/success-register";
    } catch (err: any) {
      setErrorMsg(err.message || "Unbekannter Fehler.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* 🖤 BLACK HERO */}
      <section className="pt-40 pb-32 bg-black text-white text-center rounded-b-[80px] shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-6"
        >
          <UserPlus size={80} className="mx-auto text-white mb-6 opacity-90" />

          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Konto erstellen
          </h1>

          <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
            Registriere dich und bestätige deine E-Mail, um dein Dashboard zu starten.
          </p>
        </motion.div>
      </section>

      {/* 🧊 WHITE REGISTER CARD */}
      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto bg-white p-12 rounded-3xl shadow-xl border border-gray-200">

          {/* EMAIL */}
          <label className="block text-left mb-6">
            <span className="text-gray-800 font-medium flex items-center gap-2">
              <Mail size={18} /> E-Mail-Adresse
            </span>
            <input
              type="email"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-black outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* PASSWORD */}
          <label className="block text-left mb-6">
            <span className="text-gray-800 font-medium flex items-center gap-2">
              <Lock size={18} /> Passwort
            </span>
            <input
              type="password"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-black outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* ERROR */}
          {errorMsg && (
            <p className="text-red-500 text-center mb-4">{errorMsg}</p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-black text-white font-semibold py-4 rounded-full text-lg 
            transition-all hover:bg-neutral-800 disabled:opacity-60"
          >
            {loading ? "Wird verarbeitet…" : "Jetzt registrieren"}
          </button>

          {/* LINK LOGIN */}
          <p className="text-center mt-10 text-gray-600">
            Bereits ein Konto?{" "}
            <a
              href="/login"
              className="font-semibold text-black hover:opacity-70"
            >
              Jetzt einloggen →
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
