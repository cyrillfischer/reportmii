import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      storage: localStorage,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        "x-application-name": "Reportmii",
      },
    },
  }
);

export { supabase };
