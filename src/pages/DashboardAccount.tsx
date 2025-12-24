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
import { useNavigate } from "react-router-dom";

export default function DashboardAccount() {
  const navigate = useNavigate();

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
      if (data.user?.email) {
        setEmail(data.user.email);
      }
    });
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    await supabase.from("profiles").upsert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      company,
      website,
      industry,
      subdomain,
    });

    navigate("/dashboard/business", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f7faf9]">
      <div className="w-full max-w-6xl mx-auto px-6 py-14">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Mein Account
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Verwalte hier deine persönlichen Angaben und Unternehmensdaten.
            Diese Informationen bilden die Grundlage für deine Analysen und Reports.
          </p>
        </motion.div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12"
        >
          {/* LOGO */}
          <div className="flex flex-col items-center mb-12">
            <div className="
              w-32 h-32 rounded-full bg-gray-50 border border-gray-200
              flex items-center justify-center overflow-hidden
              transition
              hover:ring-4 hover:ring-[#7eb6b8]/30
            ">
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
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <Input label="Vorname *" icon={<User size={16} />} value={firstName} onChange={setFirstName} />
            <Input label="Nachname *" icon={<User size={16} />} value={lastName} onChange={setLastName} />

            <div>
              <Label icon={<Mail size={16} />} text="E-Mail-Adresse *" />
              <input
                disabled
                value={email}
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            <Input label="Unternehmen *" icon={<Building2 size={16} />} value={company} onChange={setCompany} />
            <Input label="Website (optional)" icon={<Globe size={16} />} value={website} onChange={setWebsite} />
            <Input label="Branche (optional)" icon={<Palette size={16} />} value={industry} onChange={setIndustry} />

            <div className="md:col-span-2">
              <Label icon={<Link2 size={16} />} text="Inside.mii Subdomain (optional)" />
              <div className="flex gap-3">
                <input
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="
                    flex-1 px-4 py-3 rounded-xl border border-gray-300
                    transition
                    hover:border-[#7eb6b8]
                    focus:ring-2 focus:ring-[#7eb6b8]
                  "
                  placeholder="deinefirma"
                />
                <span className="text-sm text-gray-500 self-center">
                  .inside.reportmii.com
                </span>
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="md:col-span-2 mt-12 text-center">
              <button
                type="submit"
                className="
                  px-12 py-3 rounded-xl font-semibold
                  bg-[#7eb6b8] text-black
                  shadow
                  transition-all
                  hover:bg-[#6aa6a8]
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  focus:outline-none
                  focus:ring-4 focus:ring-[#7eb6b8]/40
                "
              >
                Änderungen speichern
              </button>
            </div>

          </form>
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
  label,
  icon,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label icon={icon} text={label} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full px-4 py-3 rounded-xl border border-gray-300
          transition
          hover:border-[#7eb6b8]
          focus:ring-2 focus:ring-[#7eb6b8]
        "
      />
    </div>
  );
}
