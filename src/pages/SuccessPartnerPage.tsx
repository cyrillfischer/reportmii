import { useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Briefcase, Palette, CheckCircle } from "lucide-react";
import { Header } from "../components/Header";
import { supabase } from "../supabase/supabaseClient";

export default function SuccessPartnerPage() {
  useEffect(() => {
    const activatePartnerPlan = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      await supabase
        .from("profiles")
        .update({ plan_partner_active: true })
        .eq("id", session.user.id);
    };

    activatePartnerPlan();
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
          <CheckCircle className="w-20 h-20 text-[#7eb6b8] mb-6" />

          <h1 className="text-5xl md:text-6xl font-semibold mb-4 text-white">
            Dein Partnerzugang ist aktiv 🎉
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Willkommen im Reportmii Partnernetzwerk. Dein Zugang ist jetzt freigeschaltet.
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

            <div className="p-10 rounded-3xl bg-white border border-gray-200 shadow-lg">
              <Mail className="w-10 h-10 text-[#7eb6b8] mb-6" />
              <h3 className="text-xl font-semibold mb-2">1. E-Mail prüfen</h3>
              <p className="text-gray-700 leading-relaxed">
                Du erhältst eine Bestätigung mit allen wichtigen Informationen.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-white border border-gray-200 shadow-lg">
              <Briefcase className="w-10 h-10 text-[#7eb6b8] mb-6" />
              <h3 className="text-xl font-semibold mb-2">2. Dashboard öffnen</h3>
              <p className="text-gray-700 leading-relaxed">
                Logge dich ein und öffne dein Partner-Dashboard.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-white border border-gray-200 shadow-lg">
              <Palette className="w-10 h-10 text-[#7eb6b8] mb-6" />
              <h3 className="text-xl font-semibold mb-2">3. Branding einrichten</h3>
              <p className="text-gray-700 leading-relaxed">
                Lade dein Logo hoch und passe Farben und Auftritt an.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-white border border-gray-200 shadow-lg">
              <CheckCircle className="w-10 h-10 text-[#7eb6b8] mb-6" />
              <h3 className="text-xl font-semibold mb-2">4. Kunden anlegen</h3>
              <p className="text-gray-700 leading-relaxed">
                Erstelle Kunden und starte deine ersten Analysen.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
