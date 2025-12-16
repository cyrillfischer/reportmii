// src/pages/DashboardAccount.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Globe,
  Building2,
  User,
  Mail,
  Link2,
  Palette,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { supabase } from "../supabase/supabaseClient";

export default function DashboardAccount() {
  const [logo, setLogo] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  // Pflichtfelder (initial leer)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");

  // Optional
  const [subdomain, setSubdomain] = useState("");

  // 🔑 E-Mail aus aktiver Supabase-Session laden
  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setEmail(user.email);
      }
    };

    loadUser();
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(url);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-6xl mx-auto px-6 py-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Mein Account
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Vervollständige hier deine persönlichen Angaben und die wichtigsten
            Informationen zu deinem Unternehmen.  
            Diese Daten bilden die Grundlage für deine Analysen und Reports.
          </p>
        </motion.div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 md:p-10"
        >
          {/* LOGO */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative w-32 h-32 rounded-full bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center">
              {logo ? (
                <img
                  src={logo}
                  alt="Profilbild oder Firmenlogo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload size={28} className="text-gray-400" />
              )}
            </div>

            <label className="mt-4 text-sm font-medium text-[#7eb6b8] cursor-pointer hover:underline">
              Profilbild oder Firmenlogo hochladen
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>

            <p className="text-xs text-gray-500 mt-1">
              Empfohlen: quadratisch, PNG oder JPEG
            </p>
          </div>

          {/* FORM */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vorname */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <User size={16} /> Vorname *
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Dein Vorname"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:ring-2 focus:ring-[#7eb6b8] outline-none"
              />
            </div>

            {/* Nachname */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <User size={16} /> Nachname *
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Dein Nachname"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:ring-2 focus:ring-[#7eb6b8] outline-none"
              />
            </div>

            {/* E-Mail (readonly) */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Mail size={16} /> E-Mail-Adresse
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-gray-200
                  bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Unternehmen */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Building2 size={16} /> Unternehmen *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Name deines Unternehmens"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:ring-2 focus:ring-[#7eb6b8] outline-none"
              />
            </div>

            {/* Website */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Globe size={16} /> Unternehmens-Website *
              </label>
              <input
                type="text"
                required
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://www.deinefirma.ch"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:ring-2 focus:ring-[#7eb6b8] outline-none"
              />
            </div>

            {/* Branche */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Palette size={16} /> Branche *
              </label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="z. B. Beratung, SaaS, Produktion"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:ring-2 focus:ring-[#7eb6b8] outline-none"
              />
            </div>

            {/* Subdomain */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Link2 size={16} /> Inside.mii Subdomain (optional)
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  placeholder="deinefirma"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300
                    focus:ring-2 focus:ring-[#7eb6b8] outline-none"
                />
                <span className="text-sm text-gray-600">
                  .inside.reportmii.com
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Mitarbeitende können über diese Adresse anonym an deiner
                Team-Analyse teilnehmen.
              </p>
            </div>
          </form>

          {/* SAVE */}
          <div className="mt-10 text-center">
            <button
              type="submit"
              className="px-10 py-3 rounded-xl font-semibold
                bg-[#7eb6b8] text-black shadow-md
                hover:bg-[#6aa6a8] transition"
            >
              Änderungen speichern
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
