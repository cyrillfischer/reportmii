// src/pages/Login.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/Header";

export function Login() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const ok = await signIn(email, password);

      if (!ok) {
        // falls signIn false oder undefined zurückgibt
        setErrorMsg("E-Mail oder Passwort ist falsch.");
        return;
      }
    } catch (err: any) {
      // falls signIn einen Fehler wirft
      setErrorMsg("E-Mail oder Passwort ist falsch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header forcedColor="white" />

      {/* 🖤 HERO */}
      <section className="pt-40 pb-32 bg-black text-white text-center rounded-b-[80px] shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-6"
        >
          <LogIn
            size={80}
            className="mx-auto mb-6 opacity-100 text-[#7eb6b8]"
          />

          <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-white">
            Willkommen zurück
          </h1>

          <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
            Melde dich an, um dein Dashboard zu öffnen.
          </p>
        </motion.div>
      </section>

      {/* 🧊 LOGIN CARD */}
      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto bg-white p-12 rounded-3xl shadow-xl border border-gray-200">

          {/* EMAIL */}
          <label className="block text-left mb-6">
            <span className="text-gray-800 font-medium flex items-center gap-2">
              <Mail size={18} className="text-[#7eb6b8]" /> E-Mail-Adresse
            </span>
            <input
              type="email"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-[#7eb6b8] outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* PASSWORD + AUGE */}
          <label className="block text-left mb-3">
            <span className="text-gray-800 font-medium flex items-center gap-2">
              <Lock size={18} className="text-[#7eb6b8]" /> Passwort
            </span>
            <div className="mt-2 w-full flex items-center rounded-xl border border-gray-300 px-4">
              <input
                type={showPassword ? "text" : "password"}
                className="flex-1 py-3 bg-transparent outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 text-gray-500 hover:text-gray-800"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </label>

          {/* 👉 PASSWORT VERGESSEN */}
          <div className="text-right mb-6">
            <a
              href="/reset-password"
              className="text-[#7eb6b8] font-medium hover:opacity-70 transition text-sm"
            >
              Passwort vergessen?
            </a>
          </div>

          {/* ERROR */}
          {errorMsg && (
            <p className="text-red-500 text-center mb-4">
              {errorMsg}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full bg-[#7eb6b8] text-black font-semibold py-4 rounded-full text-lg 
              transition-all hover:bg-black hover:text-white disabled:opacity-60
            "
          >
            {loading ? "Wird verarbeitet…" : "Einloggen"}
          </button>

          {/* REGISTER */}
          <p className="text-center mt-10 text-gray-600">
            Noch kein Konto?{" "}
            <a
              href="/register"
              className="font-semibold text-black hover:opacity-70"
            >
              Jetzt registrieren →
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
