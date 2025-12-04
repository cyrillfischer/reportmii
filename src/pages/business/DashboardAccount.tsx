// src/pages/business/DashboardAccount.tsx
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export function DashboardAccount() {
  return (
    <DashboardLayout>
      <div className="p-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Mein Account</h2>

          {/* Bild / Logo Upload */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center shadow-inner mb-4">
                <Upload size={28} className="text-gray-500" />
              </div>
              <p className="text-gray-600 text-sm">
                Lade dein Profilbild oder Firmenlogo hoch
              </p>
            </div>
          </div>

          {/* Formular */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vorname
              </label>
              <input
                type="text"
                defaultValue="Max"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nachname
              </label>
              <input
                type="text"
                defaultValue="Muster"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="max@musterfirma.ch"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Land
              </label>
              <input
                type="text"
                defaultValue="Schweiz"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Firma
              </label>
              <input
                type="text"
                defaultValue="Muster GmbH"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
          </form>

          {/* Button */}
          <div className="mt-10 text-center">
            <button className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-8 py-3 rounded-xl shadow-md transition">
              Änderungen speichern
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
