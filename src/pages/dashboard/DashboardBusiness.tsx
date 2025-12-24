// src/pages/dashboard/DashboardBusiness.tsx

import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DashboardBusiness() {
  const userInitial = "C"; // später dynamisch

const navigate = useNavigate();

  return (
    <div className="relative space-y-16">

      {/* ------------------------------------------------ */}
      {/* USER PROFILE ICON (TOP RIGHT) */}
      {/* ------------------------------------------------ */}
       <button
        onClick={() => navigate("/dashboard/account")}
        className="fixed top-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-white shadow hover:bg-[#1b1f23] hover:text-white transition"
        title="Mein Account"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="6" r="3" />
          <path d="M3 16c0-3 12-3 12 0" />
        </svg>
      </button>

      {/* ------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------ */}
      <div className="space-y-4 relative">
        {/* Subtiler Spannungsanker */}
        <div className="absolute -left-4 top-4 h-14 w-[3px] rounded-full bg-[#a8d6d4]" />

        <span className="inline-flex items-center gap-2 text-sm
                         bg-[#dff7f5] text-[#1b1f23]
                         px-3 py-1 rounded-full
                         border border-gray-200 shadow-sm">
          Business.mii Dashboard
        </span>

        <h1 className="text-4xl font-semibold text-[#1b1f23] leading-tight">
          Klarheit für bessere Entscheidungen.
        </h1>

        <p className="text-gray-600 max-w-2xl">
          reportmii übersetzt komplexe Unternehmensdaten in klare Prioritäten,
          konkrete To-Dos und belastbare Entscheidungsgrundlagen.
        </p>
      </div>

      {/* ------------------------------------------------ */}
      {/* KPI OVERVIEW */}
      {/* ------------------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Aktive Analysen"
          value="0"
          subtitle="Bereit – starte deine erste Analyse"
          icon="/illustrations/business/12_business.mii_sales_performance.png"
        />
        <KpiCard
          title="Fertige Reports"
          value="0"
          subtitle="Dein erster Report entsteht automatisch"
          icon="/illustrations/business/20_business.mii_analyse.png"
        />
        <div className="rounded-2xl bg-[#a8d6d4] p-6 text-[#1b1f23]
                        flex flex-col justify-between
                        border border-gray-200 shadow-sm">
          <div>
            <p className="text-sm opacity-70">Letzte Aktivität</p>
            <p className="text-xl font-semibold mt-1">
              Noch nichts gestartet
            </p>
            <p className="text-sm opacity-70 mt-1">
              Jetzt ist der ideale Moment
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* NEXT STEP */}
      {/* ------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200
                        bg-white p-8 space-y-6 shadow-sm">
          <span className="inline-flex items-center gap-2 text-sm
                           bg-[#dff7f5] px-3 py-1 rounded-full
                           text-[#1b1f23]
                           border border-gray-200 shadow-sm">
            Dein nächster Schritt
          </span>

          <h2 className="text-2xl font-semibold text-[#1b1f23]">
            Starte deine Business.mii Analyse
          </h2>

          <p className="text-gray-600 max-w-xl">
            Beantworte gezielte Fragen und erhalte in weniger als 30 Minuten
            eine strukturierte Übersicht mit klaren Prioritäten.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <Step label="1. Setup" description="Unternehmen & Ziel definieren" />
            <Step label="2. Analyse" description="6 Kernbereiche bewerten" />
            <Step label="3. Report" description="Fokus & nächste Schritte" />
          </div>
        </div>

        {/* RIGHT CTA – HERO */}
        <div className="rounded-2xl bg-[#a8d6d4] p-8
                        flex flex-col justify-between
                        border border-gray-200
                        shadow-lg
                        hover:shadow-xl
                        hover:-translate-y-1
                        transition-all">

          <div className="space-y-4 text-center">
            <h3 className="text-xl font-semibold text-[#1b1f23]">
              Business.mii Analyse
            </h3>

            <img
              src="/illustrations/business/12_business.mii_sales_performance.png"
              alt="Business Analyse"
              className="w-40 mx-auto"
            />

            <p className="text-sm text-[#1b1f23]/80">
              Dein persönlicher Entscheidungs-Report –
              automatisch, klar priorisiert und sofort umsetzbar.
            </p>
          </div>

          <button className="mt-6 inline-flex items-center justify-center gap-2
                             bg-[#1b1f23] text-white
                             px-6 py-3 rounded-xl font-medium
                             hover:opacity-90
                             shadow-sm transition">
            Analyse starten <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* ANALYSEN & REPORTS */}
      {/* ------------------------------------------------ */}
      <div className="rounded-2xl bg-[#1b1f23] p-10 space-y-6
                      text-white border border-white/10 shadow-md">

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">
            Deine Analysen & Reports
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl">
            Hier entsteht deine Entscheidungs-Historie –
            jederzeit abrufbar und auf das Wesentliche fokussiert.
          </p>
        </div>

        <div className="rounded-xl bg-[#a7d6d5] p-8
                        grid grid-cols-1 lg:grid-cols-3 items-center gap-6
                        text-[#1b1f23] border border-gray-200 shadow-sm">

          <div className="space-y-2 max-w-xl lg:col-span-2">
            <p className="font-semibold">Noch keine Reports vorhanden</p>
            <p className="text-sm opacity-70">
              Schließe deine erste Analyse ab –
              dein persönlicher Report erscheint hier automatisch.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end pr-14">
            <img
              src="/illustrations/business/20_business.mii_analyse.png"
              alt="Report Illustration"
              className="w-40"
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* SUPPORT MAIL FLOATING BUTTON */}
      {/* ------------------------------------------------ */}
      <a
        href="mailto:info@reportmii.com"
        className="fixed bottom-6 right-6 z-50
                   inline-flex items-center justify-center
                   w-14 h-14 rounded-full
                   bg-[#1b1f23] text-white
                   shadow-lg hover:opacity-90
                   hover:-translate-y-0.5
                   transition-all"
        aria-label="Support kontaktieren"
      >
        <Mail size={22} />
      </a>
    </div>
  );
}

/* ------------------------------------------------ */
/* COMPONENTS */
/* ------------------------------------------------ */

function KpiCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6
                    flex justify-between items-center
                    shadow-sm hover:shadow-md transition-all">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-semibold mt-2 text-[#1b1f23]">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

      <img src={icon} alt={title} className="w-12 h-12" />
    </div>
  );
}

function Step({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-[#f0f7f7] p-4
                    shadow-sm hover:shadow-md transition-all">
      <p className="text-sm font-medium text-[#1b1f23]">{label}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
