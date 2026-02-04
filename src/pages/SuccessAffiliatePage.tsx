import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Mail, LogIn, BarChart3 } from "lucide-react";
import { Header } from "../components/Header";
import { supabase } from "../supabase/supabaseClient";

export default function SuccessAffiliatePage() {
  useEffect(() => {
    const activateAffiliatePlan = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      await supabase
        .from("profiles")
        .update({ plan_affiliate_active: true })
        .eq("id", session.user.id);
    };

    activateAffiliatePlan();
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
            Anmeldung erfolgreich 🎉
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Willkommen im Reportmii Affiliate-Programm.  
            Dein Zugang ist jetzt freigeschaltet.
          </p>
        </motion.div>
      </section>

      {/* ⭐ NEXT STEPS */}
      <section className="py-28 bg-white px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
          Die nächsten Schritte
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 text-left">
            <Mail className="w-10 h-10 text-[#7eb6b8] mb-6" />
            <h3 className="text-xl font-semibold mb-2">1. E-Mail prüfen</h3>
            <p className="text-gray-700 leading-relaxed">
              Bestätige deine E-Mail, um deinen Affiliate-Zugang zu aktivieren.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 text-left">
            <LogIn className="w-10 h-10 text-[#7eb6b8] mb-6" />
            <h3 className="text-xl font-semibold mb-2">2. Einloggen</h3>
            <p className="text-gray-700 leading-relaxed">
              Logge dich ein und öffne dein Affiliate-Dashboard.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 text-left">
            <BarChart3 className="w-10 h-10 text-[#7eb6b8] mb-6" />
            <h3 className="text-xl font-semibold mb-2">3. Links & Statistiken</h3>
            <p className="text-gray-700 leading-relaxed">
              Erhalte deinen persönlichen Affiliate-Link und verfolge deine Einnahmen.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
