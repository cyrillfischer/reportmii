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
          Vervollständige deine persönlichen Angaben und Unternehmensdaten.
          Diese Informationen bilden die Basis für deine Analysen und Reports.
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
            PNG oder JPEG, idealerweise quadratisch
          </p>
        </div>

        {/* FORM */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input icon={<User size={16} />} label="Vorname *" value={firstName} onChange={setFirstName} />
          <Input icon={<User size={16} />} label="Nachname *" value={lastName} onChange={setLastName} />

          <div>
            <Label icon={<Mail size={16} />} text="E-Mail-Adresse" />
            <input
              disabled
              value={email}
              className="w-full px-4 py-3 rounded-xl border bg-gray-100 text-gray-600"
            />
          </div>

          <Input icon={<Building2 size={16} />} label="Unternehmen *" value={company} onChange={setCompany} />
          <Input icon={<Globe size={16} />} label="Website *" value={website} onChange={setWebsite} />
          <Input icon={<Palette size={16} />} label="Branche *" value={industry} onChange={setIndustry} />

          <div className="md:col-span-2">
            <Label icon={<Link2 size={16} />} text="Inside.mii Subdomain (optional)" />
            <div className="flex gap-2">
              <input
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7eb6b8]"
              />
              <span className="text-sm text-gray-600 self-center">
                .inside.reportmii.com
              </span>
            </div>
          </div>
        </form>

        <div className="mt-10 text-center">
          <button className="px-10 py-3 rounded-xl font-semibold bg-[#7eb6b8] hover:bg-[#6aa6a8] shadow">
            Änderungen speichern
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Label({ icon, text }: any) {
  return <label className="flex items-center gap-2 text-sm font-medium mb-2">{icon} {text}</label>;
}

function Input({ icon, label, value, onChange }: any) {
  return (
    <div>
      <Label icon={icon} text={label} />
      <input
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7eb6b8]"
      />
    </div>
  );
}
