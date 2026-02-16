import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "./AuthContext";

/* =========================
   TYPES
========================= */

export type UserProfile = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  website?: string;
  country?: string;
  logo_url?: string;

  plan_business_active?: boolean;
  plan_inside_active?: boolean;
  plan_partner_active?: boolean;
  plan_affiliate_active?: boolean;

  created_at?: string;
};

type UserContextType = {
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
};

/* =========================
   CONTEXT
========================= */

const UserContext = createContext<UserContextType>({
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

/* =========================
   PROVIDER
========================= */

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth(); // ✅ Zentrale Session-Quelle

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle(); // ✅ KEIN 406 mehr in Safari

    if (error) {
      console.error("Profile Load Error:", error);
      setProfile(null);
      setLoading(false);
      return;
    }

    if (!data) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setProfile({
      ...(data as UserProfile),
      email: data.email ?? user.email ?? "",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (!authLoading) {
      loadProfile();
    }
  }, [user, authLoading]);

  return (
    <UserContext.Provider
      value={{
        profile,
        loading,
        refreshProfile: loadProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/* =========================
   HOOK
========================= */

export const useUser = () => useContext(UserContext);
