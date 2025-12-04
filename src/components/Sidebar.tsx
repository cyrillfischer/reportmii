// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  ListChecks,
  FileText,
  Users,
  UserPlus,
  BarChart3,
  Settings,
  Link2,
  Wallet,
  LogOut,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Sidebar() {
  const { user, signOut } = useAuth();
  const role = user?.role; // "business" | "inside" | "partner" | "affiliate"

  // -------------------------
  // 🟣 Business User Menü
  // -------------------------
  const businessMenu = [
    { to: "/business/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/analysis/new", label: "Neue Analyse", icon: <PlusCircle size={20} /> },
    { to: "/business/analyses", label: "Analysen", icon: <ListChecks size={20} /> },
    { to: "/analyses", label: "Report", icon: <FileText size={20} /> },     // ← hinzugefügt!
    { to: "/business/account", label: "Einstellungen", icon: <Settings size={20} /> },
  ];

  // -------------------------
  // 💚 Inside User Menü
  // -------------------------
  const insideMenu = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/inside/team", label: "Team einladen", icon: <UserPlus size={20} /> },
    { to: "/inside/progress", label: "Fortschritt", icon: <BarChart3 size={20} /> },
    { to: "/inside/reports", label: "Reports", icon: <FileText size={20} /> },
    { to: "/settings", label: "Einstellungen", icon: <Settings size={20} /> },
  ];

  // -------------------------
  // 🟠 Partner User Menü
  // -------------------------
  const partnerMenu = [
    { to: "/partner-dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/partner/clients", label: "Kunden verwalten", icon: <Users size={20} /> },
    { to: "/partner/analyses", label: "Analysen erstellen", icon: <PlusCircle size={20} /> },
    { to: "/partner/templates", label: "Templates", icon: <FileText size={20} /> },
    { to: "/partner/addons", label: "Add-ons", icon: <Layers size={20} /> },
    { to: "/settings", label: "Einstellungen", icon: <Settings size={20} /> },
  ];

  // -------------------------
  // 🟩 Affiliate User Menü
  // -------------------------
  const affiliateMenu = [
    { to: "/affiliate-dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/affiliate/link", label: "Affiliate-Link", icon: <Link2 size={20} /> },
    { to: "/affiliate/stats", label: "Statistiken", icon: <BarChart3 size={20} /> },
    { to: "/affiliate/payouts", label: "Auszahlungen", icon: <Wallet size={20} /> },
    { to: "/settings", label: "Einstellungen", icon: <Settings size={20} /> },
  ];

  // -------------------------
  // 🧠 Welches Menü?
  // -------------------------
  const menu =
    role === "business"
      ? businessMenu
      : role === "inside"
      ? insideMenu
      : role === "partner"
      ? partnerMenu
      : role === "affiliate"
      ? affiliateMenu
      : [];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 pt-32 px-6 z-40">
      <nav className="flex flex-col gap-2">
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? "bg-violet-100 text-violet-700 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        {/* Logout */}
        <button
          onClick={signOut}
          className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
