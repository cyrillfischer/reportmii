import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, Sparkles } from "lucide-react";
import { supabase } from "../supabase/supabaseClient";

type ProfileRow = {
  company?: string | null;
  logo_url?: string | null;
  avatar_url?: string | null;
};

export default function AnalysisStep1() {
  const navigate = useNavigate();

  const [loadingProfile, setLoadingProfile] = useState(true);

  const [company, setCompany] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const [existingLogoUrl, setExistingLogoUrl] = useState<string | null>(null);

  const [selectedFileName, setSelectedFileName] = useState(
    "Keine Datei ausgewählt"
  );
  const [selectedLogoPreview, setSelectedLogoPreview] =
    useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("company, logo_url, avatar_url")
        .eq("id", user.id)
        .single();

      if (profile) {
        if (profile.company) setCompany(profile.company);
        const logo = profile.logo_url || profile.avatar_url || null;
        if (logo) setExistingLogoUrl(logo);
      }

      setLoadingProfile(false);
    };

    run();
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setSelectedFileName("Keine Datei ausgewählt");
      setSelectedLogoPreview(null);
      return;
    }

    setSelectedFileName(file.name);
    setSelectedLogoPreview(URL.createObjectURL(file));
  };

  const shownLogo = selectedLogoPreview || existingLogoUrl;

  return (
    <div className="min-h-screen bg-[#f5f7f7] px-4 py-8 flex justify-center">
      <div className="w-full max-w-xl sm:max-w-2xl bg-white rounded-2xl shadow-[0_20px_40px_rgba(27,31,35,0.12)] px-5 py-6 sm:px-10 sm:py-10">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center text-center gap-4"
        >
          {/* Premium Setup */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#dff7f5] border border-[#a8d6d4] px-5 py-2 text-sm font-medium text-[#1b1f23]">
            <Sparkles size={16} />
            Premium Setup
          </div>

          {/* Titel */}
          <h2 className="text-2xl sm:text-3xl font-semibold leading-snug">
            Angaben zur Analyse
          </h2>

          {/* Beschreibung */}
          <p className="text-gray-600 text-sm sm:text-base max-w-prose">
            Kurzer Check, bevor du loslegst. Wir übernehmen so viel wie möglich
            aus deinem Profil – du kannst alles noch anpassen.
          </p>
        </motion.div>

        {/* ================= CONTENT ================= */}
        <div className="mt-10 flex flex-col gap-8">

          {/* LOGO UPLOAD */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <Upload size={18} className="text-gray-600" />
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  Firmenlogo (optional)
                </p>
                <p className="text-sm text-gray-500">
                  Wird später im Report verwendet.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl border bg-gray-50 overflow-hidden flex items-center justify-center">
                {shownLogo ? (
                  <img
                    src={shownLogo}
                    alt="Logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Upload size={18} className="text-gray-400" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-2">
                  <label className="inline-flex justify-center px-5 py-3 rounded-xl bg-[#1b1f23] text-white text-sm font-medium cursor-pointer hover:bg-black transition w-full sm:w-fit">
                    Datei auswählen
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>

                  <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 break-words">
                    {selectedFileName}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BASIC FIELDS */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Unternehmen *
                </label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={loadingProfile}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 disabled:bg-gray-100"
                  placeholder="z. B. Musterfirma AG"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Analyse erstellt von
                </label>
                <input
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="z. B. Cyrill"
                />
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            Nächste Felder (Datum etc.) kommen danach.
          </div>
        </div>
      </div>
    </div>
  );
}
