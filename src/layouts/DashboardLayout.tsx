import { useUser } from "../contexts/UserContext";
import { Sidebar } from "../components/Sidebar"; // falls vorhanden
import { Header } from "../components/Header";  // optional

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useUser();

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Lädt dein Dashboard...
      </div>
    );

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Fehler: Kein Benutzer
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1">
        {/* Optional: Dashboard Header */}
        <Header />

        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}
