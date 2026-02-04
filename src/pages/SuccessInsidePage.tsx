import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Mail, UserPlus, BarChart3, FileText } from "lucide-react";
import { Header } from "../components/Header";
import { supabase } from "../supabase/supabaseClient";

export default function SuccessInsidePage() {
  useEffect(() => {
    const activateInsidePlan = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      await supabase
        .from("profiles")
        .update({ plan_inside_active: true })
        .eq("id", session.user.id);
    };

    activateInsidePlan();
  }, []);

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
          <Users className="w-20 h-20 text-[#7eb6b8] mb-6" />

          <h1 className="text-5xl md:text-6xl font-semibold mb-4 text-white">
            Inside.mii erfolgreich aktiviert 🎉
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Deine Team-Analyse ist gestartet und bereit für die ersten Teilnehmer.
          </p>
        </motion.div>
      </section>

      {/* ⭐ NEXT STEPS */}
      <section className="py-28 bg-white px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
          Deine nächsten Schritte
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 text-left">
            <Mail className="w-10 h-10 text-[#7eb6b8] mb-6" />
            <h3 className="text-xl font-semibold mb-2">1. E-Mail prüfen</h3>
            <p className="text-gray-700 leading-relaxed">
              Du erhältst eine Bestätigung mit allen relevanten Informationen.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 text-left">
            <UserPlus className="w-10 h-10 text-[#7eb6b8] mb-6" />
            <h3 className="text-xl font-semibold mb-2">2. Team einladen</h3>
            <p className="text-gray-700 leading-relaxed">
              Lade Mitarbeitende zur anonymen Teilnahme ein.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 text-left">
            <BarChart3 className="w-10 h-10 text-[#7eb6b8] mb-6" />
            <h3 className="text-xl font-semibold mb-2">3. Fortschritt verfolgen</h3>
            <p className="text-gray-700 leading-relaxed">
              Behalte den aktuellen Stand der Teilnahme im Blick.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 text-left">
            <FileText className="w-10 h-10 text-[#7eb6b8] mb-6" />
            <h3 className="text-xl font-semibold mb-2">4. Report abrufen</h3>
            <p className="text-gray-700 leading-relaxed">
              Sobald genügend Daten vorhanden sind, kannst du den Report öffnen.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
