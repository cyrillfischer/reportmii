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
import { supabase } from "../supabase/supabaseClient";

export default function DashboardAccount() {
  const [logo, setLogo] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [subdomain, setSubdomain] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
    });
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-[#f7faf9]">
      <div className="w-full max-w-6xl mx-auto px-6 py-14">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Mein Account
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Verwalte hier deine persönlichen Angaben und Unternehmensdaten.
            Diese Informationen bilden die Grundlage für deine Analysen und Reports.
          </p>
        </motion.div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12"
        >
          {/* LOGO */}
          <div className="flex flex-col items-center mb-14">
            <div className="w-32 h-32 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
              {logo ? (
                <img src={logo} className="w-full h-full object-cover" />
              ) : (
                <Upload size={28} className="text-gray-400" />
              )}
            </div>

            <label className="mt-4 text-sm font-medium text-[#7eb6b8] cursor-pointer hover:underline">
              Profilbild oder Firmenlogo hochladen
              <input type="file" className="hidden" onChange={handleLogoUpload} />
            </label>

            <p className="text-xs text-gray-500 mt-1">
              PNG oder JPEG · idealerweise quadratisch
            </p>
          </div>

          {/* FORM */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <Input
              icon={<User size={16} />}
              label="Vorname"
              value={firstName}
              onChange={setFirstName}
              required
            />

            <Input
              icon={<User size={16} />}
              label="Nachname"
              value={lastName}
              onChange={setLastName}
              required
            />

            <div>
              <Label icon={<Mail size={16} />} text="E-Mail-Adresse" />
              <input
                disabled
                value={email}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            <Input
              icon={<Building2 size={16} />}
              label="Unternehmen"
              value={company}
              onChange={setCompany}
              required
            />

            <Input
              icon={<Globe size={16} />}
              label="Website"
              value={website}
              onChange={setWebsite}
              required
              placeholder="https://www.deinefirma.ch"
            />

            <Input
              icon={<Palette size={16} />}
              label="Branche"
              value={industry}
              onChange={setIndustry}
              required
            />

            {/* Subdomain */}
            <div className="md:col-span-2">
              <Label
                icon={<Link2 size={16} />}
                text="Inside.mii Subdomain (optional)"
              />
              <div className="flex gap-3">
                <input
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
                  placeholder="deinefirma"
                />
                <span className="text-sm text-gray-500 self-center">
                  .inside.reportmii.com
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Mitarbeitende können über diese Adresse anonym an deiner Team-Analyse teilnehmen.
              </p>
            </div>
          </form>

          {/* SAVE */}
          <div className="mt-14 text-center">
            <button
              type="submit"
              className="px-12 py-3 rounded-xl font-semibold
                bg-[#7eb6b8] text-black shadow-md
                hover:bg-[#6aa6a8] transition"
            >
              Änderungen speichern
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Label({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-800">
      {icon}
      {text}
    </label>
  );
}

function Input({
  icon,
  label,
  value,
  onChange,
  required,
  placeholder,
}: any) {
  return (
    <div>
      <Label icon={icon} text={label + (required ? " *" : "")} />
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-300
          focus:ring-2 focus:ring-[#7eb6b8] outline-none"
      />
    </div>
  );
}
