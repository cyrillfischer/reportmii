// src/pages/SuccessRegisterPage.tsx
import { motion } from "framer-motion";
import { Mail, UserCheck } from "lucide-react";
import { Header } from "../components/Header";

export default function SuccessRegisterPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* 🖤 HERO */}
      <section className="pt-40 pb-24 text-center bg-black text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-6"
        >
          <UserCheck
            size={90}
            className="mx-auto mb-6 text-[#7eb6b8]"
          />

          <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-white">
            Registrierung erfolgreich 🎉
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Vielen Dank für deine Registrierung!  
            Wir haben dir eine E-Mail zur Bestätigung gesendet.  
            Nach der Aktivierung kannst du dich direkt einloggen.
          </p>
        </motion.div>
      </section>

      {/* ⭐ NEXT STEPS */}
      <section className="py-28 text-center bg-white px-6">
        <div className="max-w-4xl mx-auto">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-semibold mb-14"
          >
            Deine nächsten Schritte
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10 text-left">

            {/* Schritt 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex gap-4 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition"
            >
              <Mail className="w-10 h-10 text-[#7eb6b8]" />
              <p className="text-gray-700 leading-relaxed">
                Öffne dein Postfach und bestätige deine E-Mail-Adresse über den Link.
              </p>
            </motion.div>

            {/* Schritt 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex gap-4 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition"
            >
              <UserCheck className="w-10 h-10 text-[#7eb6b8]" />
              <p className="text-gray-700 leading-relaxed">
                Nach der Bestätigung kannst du dich einloggen und dein Dashboard nutzen.
              </p>
            </motion.div>

          </div>

          {/* BACK TO LOGIN */}
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-16 text-black font-semibold hover:opacity-70 transition"
          >
            → Weiter zum Login
          </button>
        </div>
      </section>
    </div>
  );
}
