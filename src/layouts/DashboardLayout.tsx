import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#f6f8f7] text-[#1b1f23]">

      {/* ================= SIDEBAR ================= */}
      <aside
        className="
          w-64 bg-[#1b1f23] text-white
          flex flex-col px-5 py-6
          h-screen sticky top-0
        "
      >
        {/* Logo */}
        <div className="text-xl font-semibold tracking-tight mb-10">
          reportmii
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-sm">

          {/* ÜBERSICHT */}
          <NavLink
            to="/dashboard/business"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
               ${
                 isActive
                   ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                   : "text-gray-300 hover:bg-white/10"
               }`
            }
          >
            <LayoutDashboard size={18} />
            Übersicht
          </NavLink>

          {/* ANALYSEN */}
          <NavLink
            to="/dashboard/analyses"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
               ${
                 isActive
                   ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                   : "text-gray-300 hover:bg-white/10"
               }`
            }
          >
            <BarChart3 size={18} />
            Analysen
          </NavLink>

          {/* REPORTS */}
          <NavLink
            to="/dashboard/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
               ${
                 isActive
                   ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                   : "text-gray-300 hover:bg-white/10"
               }`
            }
          >
            <FileText size={18} />
            Reports
          </NavLink>

          {/* TEAM & EINLADUNGEN */}
          <NavLink
            to="/dashboard/team"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
               ${
                 isActive
                   ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                   : "text-gray-300 hover:bg-white/10"
               }`
            }
          >
            <Users size={18} />
            Team & Einladungen
          </NavLink>

          {/* ABRECHNUNG */}
          <NavLink
            to="/dashboard/billing"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
               ${
                 isActive
                   ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                   : "text-gray-300 hover:bg-white/10"
               }`
            }
          >
            <CreditCard size={18} />
            Abrechnung
          </NavLink>

          {/* ACCOUNT */}
          <NavLink
            to="/dashboard/account"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
               ${
                 isActive
                   ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                   : "text-gray-300 hover:bg-white/10"
               }`
            }
          >
            <User size={18} />
            Mein Account
          </NavLink>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Logout */}
        <button
          className="
            flex items-center gap-3 px-4 py-3 rounded-xl
            text-sm text-gray-300
            hover:bg-white/10 transition
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 overflow-y-auto px-10 py-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
