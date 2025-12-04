// src/pages/business/DashboardOverview.tsx
import { motion } from "framer-motion";
import { FileText, CheckCircle, Activity, TrendingUp } from "lucide-react";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export function DashboardOverview() {
  return (
    <DashboardLayout>
      <div className="p-10 w-full max-w-7xl mx-auto">

        {/* ---------------------------------------- */}
        {/* 🟣 Begrüßung */}
        {/* ---------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-white mb-3">
            Willkommen zurück 👋
          </h2>
          <p className="text-white/80 mb-10 text-lg">
            Hier findest du alle wichtigen Informationen und Aktivitäten auf einen Blick.
          </p>
        </motion.div>

        {/* ---------------------------------------- */}
        {/* 📊 KPI Cards */}
        {/* ---------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Aktive Analysen */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 rounded-2xl p-6 shadow-xl text-center"
          >
            <CheckCircle className="w-10 h-10 mx-auto text-green-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Aktive Analysen</h3>
            <p className="text-3xl font-bold text-violet-600 mt-2">1</p>
          </motion.div>

          {/* Fertige Reports */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 rounded-2xl p-6 shadow-xl text-center"
          >
            <FileText className="w-10 h-10 mx-auto text-blue-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Fertige Reports</h3>
            <p className="text-3xl font-bold text-violet-600 mt-2">3</p>
          </motion.div>

          {/* Letzte Aktivität */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 rounded-2xl p-6 shadow-xl text-center"
          >
            <Activity className="w-10 h-10 mx-auto text-teal-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Letzte Aktivität</h3>
            <p className="text-md font-medium text-gray-600 mt-2">
              vor 3 Tagen (Business Analyse)
            </p>
          </motion.div>

        </div>

        {/* ---------------------------------------- */}
        {/* 📝 Letzte Reports */}
        {/* ---------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 mb-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Letzte Reports 📄
          </h3>

          <div className="space-y-4">

            {[
              { title: "Business Analyse – 2025", date: "08. November 2025" },
              { title: "Inside Analyse (25 TN)", date: "28. Oktober 2025" },
              { title: "Leadership Block-Auswertung", date: "09. September 2025" },
            ].map((r, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gradient-to-r from-violet-50 to-teal-50 p-5 rounded-2xl border border-violet-100 hover:shadow-md transition"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">{r.title}</h4>
                  <p className="text-sm text-gray-500">{r.date}</p>
                </div>

                <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition">
                  Öffnen
                </button>
              </div>
            ))}

          </div>
        </motion.div>

        {/* ---------------------------------------- */}
        {/* 🚀 Upsell / Erweiterte Analysen */}
        {/* ---------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-violet-600 to-teal-500 text-white p-10 rounded-3xl shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-4">Erweiterte Analysen verfügbar</h3>
          <p className="text-white/90 max-w-2xl mb-6">
            Basierend auf deinen Ergebnissen empfehlen wir dir vertiefte Analysen,
            um einzelne Bereiche deines Unternehmens noch genauer zu verstehen.
          </p>

          <button className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl shadow hover:shadow-lg transition">
            Erweiterte Analyse ansehen →
          </button>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
