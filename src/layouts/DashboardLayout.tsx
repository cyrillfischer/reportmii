import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [hasUser, setHasUser] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!isMounted) return;

      setHasUser(!!data?.user && !error);
      setLoading(false);
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-white bg-[#0b0d10]">
        Loading your dashboard…
      </div>
    );
  }

  if (!hasUser) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-white bg-[#0b0d10]">
        No active session. Please log in again.
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-[#0b0d10]">
    <div className="flex min-h-screen text-white">
      <Sidebar />

      <div className="flex-1">
        <Header />
        <main className="p-10">{children}</main>
      </div>
    </div>
  </div>
);
}
