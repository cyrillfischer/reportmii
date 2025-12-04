// src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "../supabase/supabaseClient";

interface UserData {
  id: string;
  email: string;
  role: string | null;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserData | null>;
  signUp: (email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // -------------------------------------------------------------
  // LOAD EXISTING SESSION + USER METADATA (z. B. role)
  // -------------------------------------------------------------
  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (session?.user) {
        const { data: userDetails } = await supabase.auth.getUser();

        setUser({
          id: userDetails.user?.id!,
          email: userDetails.user?.email!,
          role: userDetails.user?.user_metadata.role ?? null,
        });
      }

      setLoading(false);
    };

    loadSession();

    // -------------------------------------------------------------
    // AUTH STATE LISTENER
    // -------------------------------------------------------------
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { data: userDetails } = await supabase.auth.getUser();

          setUser({
            id: userDetails.user?.id!,
            email: userDetails.user?.email!,
            role: userDetails.user?.user_metadata.role ?? null,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // -------------------------------------------------------------
  // SIGN IN
  // -------------------------------------------------------------
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    // Benutzer nochmal abrufen, damit auch Metadaten (role) korrekt geladen werden
    const { data: userDetails } = await supabase.auth.getUser();

    if (userDetails?.user) {
      const userData = {
        id: userDetails.user.id,
        email: userDetails.user.email!,
        role: userDetails.user.user_metadata.role ?? null,
      };

      setUser(userData);
      return userData;
    }

    return null;
  };

  // -------------------------------------------------------------
  // SIGN UP  (WICHTIG: KEIN DEFAULT BUSINESS MEHR!)
  // -------------------------------------------------------------
  const signUp = async (email: string, password: string, role: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }, // Rolle in user_metadata speichern
      },
    });

    if (error) throw new Error(error.message);

    alert("Bitte bestätige deine E-Mail.");
  };

  // -------------------------------------------------------------
  // SIGN OUT
  // -------------------------------------------------------------
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth muss innerhalb von AuthProvider verwendet werden");
  return context;
}
