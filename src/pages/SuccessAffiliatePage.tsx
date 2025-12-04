// src/pages/SuccessAffiliatePage.tsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Mail, LogIn, BarChart3 } from "lucide-react";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SuccessAffiliatePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Weiterleitung falls bereits eingeloggt
  useEffect(() => {
    if (loading) return;
    if (user?.role === "affiliate") navigate("/affiliate-dashboard");
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* 🖤 HERO */}
      <section className="pt-40 pb-24 text-center bg-black text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <CheckCircle className="w-20 h-20 text-[#7eb6b8] mb-6" />

          <h1 className="text-5xl md:text-6xl font-semibold mb-4 text-white">
            Anmeldung erfolgreich 🎉
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Willkommen im Reportmii Affiliate-Programm!  
            Dein Zugang wird jetzt vorbereitet.
          </p>
        </motion.div>
      </section>

      {/* ⭐ NEXT STEPS */}
      <section className="py-28 bg-white px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
          Die nächsten Schritte
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          {/* Schritt 1 */}
          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 text-left">
            <Mail className="w-10 h-10 text-[#7eb6b8] mb-6" />
            <h3 className="text-xl font-semibold mb-2">1. E-Mail prüfen</h3>
            <p className="text-gray-700 leading-relaxed">
              Bestätige deine E-Mail, um deinen Affiliate-Zugang zu aktivieren.
            </p>
          </div>

          {/* Schritt 2 */}
          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 text-left">
            <LogIn className="w-10 h-10 text-[#7eb6b8] mb-6" />
            <h3 className="text-xl font-semibold mb-2">2. Automatischer Login</h3>
            <p className="text-gray-700 leading-relaxed">
              Nach der Bestätigung wirst du automatisch eingeloggt.
            </p>
          </div>

          {/* Schritt 3 */}
          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 text-left">
            <BarChart3 className="w-10 h-10 text-[#7eb6b8] mb-6" />
            <h3 className="text-xl font-semibold mb-2">3. Dashboard freigeschaltet</h3>
            <p className="text-gray-700 leading-relaxed">
              Dort findest du deinen persönlichen Affiliate-Link und Statistiken.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
