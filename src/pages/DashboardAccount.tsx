// src/pages/DashboardAccount.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Globe, Building2, User, Mail, Link2, Palette } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";

export default function DashboardAccount() {
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogoUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(url);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl mx-auto w-full">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Mein Account
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-10">
            Passe deine persönlichen und unternehmerischen Daten an.  
            Diese Informationen werden teilweise auch in deinen Reports verwendet.
          </p>
        </motion.div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white border border-gray-200 rounded-2xl shadow p-8 md:p-10"
        >

          {/* LOGO UPLOAD */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative w-32 h-32 rounded-full bg-gray-100 border border-gray-300 overflow-hidden shadow-inner flex items-center justify-center">
              {logo ? (
                <img src={logo} alt="Logo" className="object-cover w-full h-full" />
              ) : (
                <Upload size={32} className="text-gray-500" />
              )}
            </div>

            <label className="mt-4 cursor-pointer text-violet-600 hover:text-violet-800 font-medium">
              Logo hochladen
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>

            <p className="text-gray-500 text-sm mt-2">
              Empfohlen: quadratisch, PNG oder JPEG
            </p>
          </div>

          {/* FORM */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Vorname */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <User size={16} /> Vorname
              </label>
              <input
                type="text"
                placeholder="Vorname"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                  focus:ring-2 focus:ring-violet-400 outline-none"
              />
            </div>

            {/* Nachname */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <User size={16} /> Nachname
              </label>
              <input
                type="text"
                placeholder="Nachname"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                  focus:ring-2 focus:ring-violet-400 outline-none"
              />
            </div>

            {/* E-Mail */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Mail size={16} /> E-Mail-Adresse
              </label>
              <input
                type="email"
                placeholder="E-Mail"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                  focus:ring-2 focus:ring-violet-400 outline-none"
              />
            </div>

            {/* Firmenname */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Building2 size={16} /> Firma
              </label>
              <input
                type="text"
                placeholder="Firmenname"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                  focus:ring-2 focus:ring-violet-400 outline-none"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Globe size={16} /> Firmen-Webseite
              </label>
              <input
                type="text"
                placeholder="https://deinefirma.ch"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                  focus:ring-2 focus:ring-violet-400 outline-none"
              />
            </div>

            {/* Branche */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Palette size={16} /> Branche
              </label>
              <input
                type="text"
                placeholder="z.B. Verkauf, Beratung, SaaS, Produktion…"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                  focus:ring-2 focus:ring-violet-400 outline-none"
              />
            </div>

            {/* OPTIONAL – Subdomain */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Link2 size={16} /> Inside.mii Subdomain (optional)
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="deinefirma"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 
                    focus:ring-2 focus:ring-violet-400 outline-none"
                />
                <span className="text-gray-600">
                  .inside.reportmii.com
                </span>
              </div>

              <p className="text-gray-500 text-sm mt-1">
                Damit können deine Mitarbeitenden anonym direkt an deiner Team-Analyse teilnehmen.
              </p>
            </div>

          </form>

          {/* SAVE BUTTON */}
          <div className="mt-10 text-center">
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-10 py-3 rounded-xl font-semibold transition shadow-md">
              Änderungen speichern
            </button>
          </div>

        </motion.div>
      </div>
    </DashboardLayout>
  );
}
