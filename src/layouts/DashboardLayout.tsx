import { ReactNode, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "../supabase/supabaseClient";

type DashboardLayoutProps = {
  children: ReactNode;
};

type AnalysisStatus = "active" | "completed" | null;

export function DashboardLayout({ children }: DashboardLayoutProps) {
  /* ------------------------------------------------------------------ */
  /* ANALYSIS / REPORT STATUS (FINAL – SUPABASE)                         */
  /* ------------------------------------------------------------------ */

  const [latestAnalysisId, setLatestAnalysisId] = useState<string | null>(null);
  const [analysisStatus, setAnalysisStatus] =
    useState<AnalysisStatus>(null);
  const [hideReportDot, setHideReportDot] = useState(true);

  /* ---------------- MOBILE MENU ---------------- */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadLatestAnalysis = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("analyses")
        .select("id, status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error || !data) return;

      setLatestAnalysisId(data.id);
      setAnalysisStatus(data.status);

      const seenId = localStorage.getItem("reports_seen_analysis_id");

      if (seenId !== data.id) {
        setHideReportDot(false);
      } else {
        setHideReportDot(true);
      }
    };

    loadLatestAnalysis();
  }, []);

  const handleReportsClick = () => {
    if (latestAnalysisId) {
      localStorage.setItem(
        "reports_seen_analysis_id",
        latestAnalysisId
      );
      setHideReportDot(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f6f8f7] text-[#1b1f23]">
      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>
        <span className="font-semibold">reportmii</span>
        <div className="w-8" />
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-64 bg-[#1b1f23] text-white flex flex-col px-5 py-6
          transform transition-transform duration-300
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:h-screen
        `}
      >
        {/* Mobile close */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        <div className="text-xl font-semibold tracking-tight mb-10">
          reportmii
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <NavLink
            to="/dashboard/business"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                  : "text-gray-300 hover:bg-[#e6f7f6] hover:text-[#1b1f23]"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Übersicht
          </NavLink>

          <NavLink
            to="/dashboard/analyses"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                  : "text-gray-300 hover:bg-[#e6f7f6] hover:text-[#1b1f23]"
              }`
            }
          >
            <BarChart3 size={18} />
            Analysen
          </NavLink>

          <NavLink
            to="/dashboard/reports"
            onClick={() => {
              handleReportsClick();
              setMobileMenuOpen(false);
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                  : "text-gray-300 hover:bg-[#e6f7f6] hover:text-[#1b1f23]"
              }`
            }
          >
            <FileText size={18} />
            <div className="flex items-center gap-2">
              <span>Reports</span>
              {!hideReportDot && analysisStatus === "active" && (
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
              )}
              {!hideReportDot && analysisStatus === "completed" && (
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              )}
            </div>
          </NavLink>

          <NavLink
            to="/dashboard/team"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                  : "text-gray-300 hover:bg-[#e6f7f6] hover:text-[#1b1f23]"
              }`
            }
          >
            <Users size={18} />
            Team & Einladungen
          </NavLink>

          <NavLink
            to="/dashboard/billing"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                  : "text-gray-300 hover:bg-[#e6f7f6] hover:text-[#1b1f23]"
              }`
            }
          >
            <CreditCard size={18} />
            Abrechnung
          </NavLink>

          <NavLink
            to="/dashboard/account"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-[#7eb6b8] text-[#1b1f23] font-medium"
                  : "text-gray-300 hover:bg-[#e6f7f6] hover:text-[#1b1f23]"
              }`
            }
          >
            <User size={18} />
            Mein Account
          </NavLink>
        </nav>

        <div className="flex-1" />

        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-[#e6f7f6] hover:text-[#1b1f23] transition">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 overflow-y-auto px-4 md:px-10 py-6 md:py-10 pt-20 md:pt-10">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
