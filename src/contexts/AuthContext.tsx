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
  // INIT SESSION + AUTH LISTENER
  // -------------------------------------------------------------
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;

      const session = data.session;

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: session.user.user_metadata?.role ?? null,
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: session.user.user_metadata?.role ?? null,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // -------------------------------------------------------------
  // SIGN IN
  // -------------------------------------------------------------
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.session?.user) {
      const u = data.session.user;

      const userData: UserData = {
        id: u.id,
        email: u.email!,
        role: u.user_metadata?.role ?? null,
      };

      setUser(userData);
      return userData;
    }

    return null;
  };

  // -------------------------------------------------------------
  // SIGN UP
  // -------------------------------------------------------------
  const signUp = async (email: string, password: string, role: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    });

    if (error) throw error;
  };

  // -------------------------------------------------------------
  // SIGN OUT
  // -------------------------------------------------------------
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
   <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
  {!loading && children}
</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth muss innerhalb von AuthProvider verwendet werden"
    );
  }
  return context;
}
