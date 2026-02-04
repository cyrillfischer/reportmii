import { useEffect } from "react";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { CheckCircle, Mail, LogIn, FileText } from "lucide-react";
import { supabase } from "../supabase/supabaseClient";

export default function SuccessBusinessPage() {
  useEffect(() => {
    const activateBusinessPlan = async () => {
      // 1) Aktive Session holen
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      // 2) Business-Flag setzen (idempotent → true bleibt true)
      await supabase
        .from("profiles")
        .update({ plan_business_active: true })
        .eq("id", session.user.id);
    };

    activateBusinessPlan();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <section className="bg-black text-white pt-40 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <CheckCircle className="w-20 h-20 text-[#7eb6b8] mb-6" />

          <h1 className="text-5xl md:text-6xl font-semibold mb-4 text-white">
            Zahlung erfolgreich 🎉
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Danke für dein Vertrauen! Deine Business.mii Analyse ist jetzt für dich bereit.
          </p>
        </motion.div>
      </section>

      {/* NEXT STEPS */}
      <section className="py-28">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
          Deine nächsten Schritte
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">

          {/* STEP 1 */}
          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg text-center">
            <Mail className="w-10 h-10 text-[#7eb6b8] mx-auto mb-6" />
            <h3 className="font-semibold text-xl mb-2">1. E-Mail prüfen</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Du erhältst gleich eine Bestätigung mit allen Details.
            </p>
          </div>

          {/* STEP 2 */}
          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg text-center">
            <LogIn className="w-10 h-10 text-[#7eb6b8] mx-auto mb-6" />
            <h3 className="font-semibold text-xl mb-2">2. Zugang aktivieren</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Danach wirst du automatisch zu deinem Dashboard weitergeleitet.
            </p>
          </div>

          {/* STEP 3 */}
          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg text-center">
            <FileText className="w-10 h-10 text-[#7eb6b8] mx-auto mb-6" />
            <h3 className="font-semibold text-xl mb-2">3. Analyse starten</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Beginne sofort mit deiner Business.mii Auswertung.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
