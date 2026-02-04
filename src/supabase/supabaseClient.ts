// src/supabase/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase ENV Variablen fehlen");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
  global: {
    headers: {
      "x-application-name": "Reportmii",
    },
  },
});

// 🔧 DEV ONLY – Supabase global verfügbar (Debug / Stabilität)
if (import.meta.env.DEV) {
  (window as any).supabase = supabase;
}