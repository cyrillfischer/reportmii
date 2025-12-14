import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BarChart3, FileText, Settings, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { dashboardTranslations } from "../i18n/dashboard";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const { language } = useLanguage();
  const t = dashboardTranslations[language];

  const menuItems = [
    { icon: Home, label: t.dashboard.home, path: "/dashboard" },
    { icon: BarChart3, label: t.dashboard.analyses, path: "/analyses" },
    { icon: FileText, label: t.dashboard.reports, path: "/reports" },
    { icon: Settings, label: t.dashboard.settings, path: "/settings" },
  ];

  const logout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
  <div className="min-h-screen bg-[#0b0d10] text-white relative">

      {/* ------------------------------------------------ */}
      {/* 🔝 TOP NAVIGATION BAR (Premium, clean, fixed) */}
      {/* ------------------------------------------------ */}
      <header
        className="
          fixed top-0 left-0 w-full z-50 
          backdrop-blur-xl bg-white/80 
          border-b border-gray-200
          h-16 flex items-center
        "
      >
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">

          {/* LOGO */}
          <div
            className="font-semibold text-xl tracking-tight cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Reportmii
          </div>

          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    flex items-center gap-2 px-2 py-2 text-sm font-medium
                    transition-all relative
                    ${active ? "text-violet-600" : "text-gray-700 hover:text-gray-900"}
                  `}
                >
                  <Icon size={18} />
                  {item.label}

                  {active && (
                    <span
                      className="
                        absolute left-0 right-0 -bottom-[6px]
                        h-[2px] bg-violet-600 rounded-full
                      "
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="
              flex items-center gap-2 text-sm font-medium
              text-red-500 hover:text-red-600 transition
            "
          >
            <LogOut size={18} />
            {t.auth.logout}
          </button>
        </div>
      </header>

      {/* ------------------------------------------------ */}
      {/* MAIN CONTENT */}
      {/* ------------------------------------------------ */}
      <main className="pt-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-6xl mx-auto pb-20"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
