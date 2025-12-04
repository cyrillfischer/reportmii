// src/contexts/UserContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";


type UserProfile = {
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
  created_at?: string;
};

type UserContextType = {
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------------------------------
  // 🔥 Profile aus Supabase holen
  // ---------------------------------------------------------------------------
  const loadProfile = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setProfile(data as UserProfile);
    }

    setLoading(false);
  };

  // ---------------------------------------------------------------------------
  // 🔁 Auto-Reload bei Login / Logout / Token Refresh
  // ---------------------------------------------------------------------------
  useEffect(() => {
    loadProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      loadProfile();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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

// ---------------------------------------------------------------------------
// 🔧 Custom Hook
// ---------------------------------------------------------------------------
export const useUser = () => useContext(UserContext);
