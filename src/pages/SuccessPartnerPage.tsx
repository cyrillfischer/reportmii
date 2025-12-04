// src/pages/SuccessPartnerPage.tsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Briefcase, Palette, CheckCircle } from "lucide-react";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SuccessPartnerPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Direkt weiterleiten, falls der User bereits Partner-Status hat
  useEffect(() => {
    if (loading) return;
    if (user?.role === "partner") navigate("/partner-dashboard");
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
            Dein Partnerzugang ist aktiv! 🎉
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Willkommen im Reportmii Partnernetzwerk.  
            Dein System wird jetzt vorbereitet – du kannst gleich loslegen.
          </p>
        </motion.div>
      </section>

      {/* ⭐ NEXT STEPS */}
      <section className="py-28 px-6 bg-white text-center">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-semibold mb-16">
            Deine nächsten Schritte
          </h2>

          <div className="grid md:grid-cols-2 gap-10 text-left">

            {/* Schritt 1 */}
            <div className="p-10 rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition">
              <Mail className="w-10 h-10 text-[#7eb6b8] mb-6" />
              <h3 className="text-xl font-semibold mb-2">1. E-Mail bestätigen</h3>
              <p className="text-gray-700 leading-relaxed">
                Prüfe dein Postfach und bestätige deine E-Mail, um den Zugang freizuschalten.
              </p>
            </div>

            {/* Schritt 2 */}
            <div className="p-10 rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition">
              <Briefcase className="w-10 h-10 text-[#7eb6b8] mb-6" />
              <h3 className="text-xl font-semibold mb-2">2. Zugang erhalten</h3>
              <p className="text-gray-700 leading-relaxed">
                Nach der Bestätigung kannst du dich direkt einloggen und dein Dashboard öffnen.
              </p>
            </div>

            {/* Schritt 3 */}
            <div className="p-10 rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition">
              <Palette className="w-10 h-10 text-[#7eb6b8] mb-6" />
              <h3 className="text-xl font-semibold mb-2">3. Branding einrichten</h3>
              <p className="text-gray-700 leading-relaxed">
                Lade dein Logo hoch und konfiguriere die Farben für deinen personalisierten Partner-Auftritt.
              </p>
            </div>

            {/* Schritt 4 */}
            <div className="p-10 rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition">
              <CheckCircle className="w-10 h-10 text-[#7eb6b8] mb-6" />
              <h3 className="text-xl font-semibold mb-2">4. Kundenzugänge erstellen</h3>
              <p className="text-gray-700 leading-relaxed">
                Erstelle Kunden und starte deine ersten Business-Analysen unter deinem Branding.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
