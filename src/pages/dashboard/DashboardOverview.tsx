// src/pages/dashboard/DashboardOverview.tsx
import { motion } from "framer-motion";
import { FileText, CheckCircle, Activity } from "lucide-react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { UserProfileHeader } from "../../components/dashboard/UserProfileHeader";

export function DashboardOverview() {
  return (
    <DashboardLayout>
      <div className="p-10">

        {/* 🔥 Automatisches Profil */}
        <UserProfileHeader />

        {/* 📊 KACHELN */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-10">
            Deine Übersicht
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            {/* Aktive Analysen */}
            <div className="bg-white/90 rounded-2xl p-6 shadow-xl text-center">
              <CheckCircle className="w-10 h-10 mx-auto text-green-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">
                Aktive Analysen
              </h3>
              <p className="text-3xl font-bold text-violet-600 mt-2">
                2
              </p>
            </div>

            {/* Fertige Reports */}
            <div className="bg-white/90 rounded-2xl p-6 shadow-xl text-center">
              <FileText className="w-10 h-10 mx-auto text-blue-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">
                Fertige Reports
              </h3>
              <p className="text-3xl font-bold text-violet-600 mt-2">
                5
              </p>
            </div>

            {/* Letzte Aktivität */}
            <div className="bg-white/90 rounded-2xl p-6 shadow-xl text-center">
              <Activity className="w-10 h-10 mx-auto text-teal-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">
                Letzte Aktivität
              </h3>
              <p className="text-md font-medium text-gray-600 mt-2">
                vor 2 Tagen (Leadership-Analyse)
              </p>
            </div>
          </div>

          {/* 📄 LETZTE REPORTS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 rounded-3xl shadow-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Letzte Reports 📊
            </h3>

            <div className="space-y-4">
              {[
                { title: "Business Analyse – Q3 2025", date: "09. Oktober 2025" },
                { title: "Team Analyse (50 TN)", date: "01. September 2025" },
                { title: "Kundenfeedback-Report", date: "15. Juli 2025" },
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
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
