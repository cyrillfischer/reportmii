import { useUser } from "../../contexts/UserContext";
import { motion } from "framer-motion";

export function UserProfileHeader() {
  const { profile, loading } = useUser();

  if (loading) {
    return (
      <div className="text-white/60 text-lg">
        Profil wird geladen…
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-red-400 text-lg">
        Kein Profil gefunden.
      </div>
    );
  }

  const name = `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-6 mb-10"
    >
      {/* PROFILBILD / INITIALEN */}
      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden backdrop-blur-xl border border-white/30">
        {profile.logo_url ? (
          <img
            src={profile.logo_url}
            alt="Profilbild"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-2xl font-bold">
            {profile.first_name?.[0]}
            {profile.last_name?.[0]}
          </span>
        )}
      </div>

      {/* USER INFO */}
      <div className="text-white">
        <h2 className="text-3xl font-bold">
          {name || "Willkommen"}
        </h2>

        <p className="text-white/80 flex items-center gap-2">
          <span>{profile.company || "Keine Firma angegeben"}</span>
          <span>·</span>
          <span>{profile.country || "Land fehlt"}</span>
        </p>

        {/* PLÄNE / BADGES */}
        <div className="mt-3 flex gap-2 flex-wrap">
          {profile.plan_business_active && (
            <span className="px-3 py-1 bg-violet-600 rounded-xl text-sm">
              Business.mii
            </span>
          )}

          {profile.plan_inside_active && (
            <span className="px-3 py-1 bg-teal-600 rounded-xl text-sm">
              Inside.mii
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
