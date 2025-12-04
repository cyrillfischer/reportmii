// src/layouts/DashboardLayout.tsx

import { Link, NavLink } from "react-router-dom";
import { Menu, X, LayoutDashboard, FileText, Settings, User } from "lucide-react";
import { useState } from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">

      {/* ------------------------------------------- */}
      {/* 🟣 SIDEBAR (Desktop) */}
      {/* ------------------------------------------- */}
      <aside className="
        hidden lg:flex
        flex-col
        w-72 
        bg-white 
        border-r border-gray-200 
        px-6 py-10 
        fixed top-0 left-0 bottom-0
      ">
        {/* Branding */}
        <Link
          to="/dashboard"
          className="text-2xl font-semibold tracking-[-0.05em] text-gray-900 mb-12"
          style={{ fontFamily: "Inter", letterSpacing: "-0.025em" }}
        >
          reportmii
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
               ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`
            }
          >
            <LayoutDashboard size={18} /> Übersicht
          </NavLink>

          <NavLink
            to="/business/analyses"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
               ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`
            }
          >
            <FileText size={18} /> Analysen
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
               ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`
            }
          >
            <Settings size={18} /> Einstellungen
          </NavLink>

          <NavLink
            to="/business/account"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
               ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`
            }
          >
            <User size={18} /> Account
          </NavLink>
        </nav>
      </aside>

      {/* ------------------------------------------- */}
      {/* 📱 MOBILE SIDEBAR */}
      {/* ------------------------------------------- */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="absolute top-5 left-5 z-50 p-2 bg-white/90 rounded-xl shadow-md"
        >
          <Menu size={22} />
        </button>

        {open && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setOpen(false)}>
            <aside
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl p-8 flex flex-col gap-8 animate-slide-in"
            >
              <button
                className="absolute top-4 right-4 text-gray-600"
                onClick={() => setOpen(false)}
              >
                <X size={24} />
              </button>

              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold tracking-[-0.05em] text-gray-900"
                style={{ fontFamily: "Inter", letterSpacing: "-0.025em" }}
              >
                reportmii
              </Link>

              <nav className="flex flex-col gap-3 mt-6">

                <NavLink
                  onClick={() => setOpen(false)}
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
                >
                  <LayoutDashboard size={18} /> Übersicht
                </NavLink>

                <NavLink
                  onClick={() => setOpen(false)}
                  to="/business/analyses"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
                >
                  <FileText size={18} /> Analysen
                </NavLink>

                <NavLink
                  onClick={() => setOpen(false)}
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
                >
                  <Settings size={18} /> Einstellungen
                </NavLink>

                <NavLink
                  onClick={() => setOpen(false)}
                  to="/business/account"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
                >
                  <User size={18} /> Account
                </NavLink>

              </nav>
            </aside>
          </div>
        )}
      </div>

      {/* ------------------------------------------- */}
      {/* 🧊 MAIN CONTENT (rechts neben Sidebar) */}
      {/* ------------------------------------------- */}
      <main className="flex-1 lg:ml-72 px-4 md:px-10 py-10">
        {children}
      </main>
    </div>
  );
}
