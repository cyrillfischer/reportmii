// src/components/dashboard/UserProfileHeader.tsx
import { useUser } from "../../contexts/UserContext";
import { motion } from "framer-motion";

export function UserProfileHeader() {
  const { userProfile, loading } = useUser();

  if (loading) {
    return (
      <div className="text-white/60 text-lg">
        Profil wird geladen…
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="text-red-400 text-lg">
        Kein Profil gefunden.
      </div>
    );
  }

  const name = `${userProfile.first_name} ${userProfile.last_name}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-6 mb-10"
    >
      {/* PROFILBILD */}
      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden backdrop-blur-xl border border-white/30">
        {userProfile.profile_image_url ? (
          <img
            src={userProfile.profile_image_url}
            alt="Profilbild"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-2xl font-bold">
            {userProfile.first_name?.[0]}
            {userProfile.last_name?.[0]}
          </span>
        )}
      </div>

      {/* USER INFO */}
      <div className="text-white">
        <h2 className="text-3xl font-bold">{name}</h2>

        <p className="text-white/80 flex items-center gap-2">
          <span>{userProfile.company || "Ohne Firma"}</span>
          <span>·</span>
          <span>{userProfile.country || "Land fehlt"}</span>
        </p>

        {/* Rollen */}
        <div className="mt-3 flex gap-2 flex-wrap">
          {userProfile.roles.isBusiness && (
            <span className="px-3 py-1 bg-violet-600 rounded-xl text-sm">
              Business.mii Kunde
            </span>
          )}
          {userProfile.roles.isInside && (
            <span className="px-3 py-1 bg-teal-600 rounded-xl text-sm">
              Inside.mii Kunde
            </span>
          )}
          {userProfile.roles.isPartner && (
            <span className="px-3 py-1 bg-orange-600 rounded-xl text-sm">
              Partner.mii
            </span>
          )}
          {userProfile.roles.isAffiliate && (
            <span className="px-3 py-1 bg-emerald-600 rounded-xl text-sm">
              Affiliate
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
