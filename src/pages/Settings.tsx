// src/pages/Settings.tsx
import { motion } from "framer-motion";
import {
  Bell,
  Globe,
  Moon,
  Sun,
  Shield,
  FileText,
  ArrowRight,
  Mail,
  Languages,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useState } from "react";

export function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("de");
  const [emailReports, setEmailReports] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl mx-auto w-full">

        {/* ========================== */}
        {/* HEADER */}
        {/* ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Einstellungen
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-10">
            Passe dein Erlebnis an – Sprache, Benachrichtigungen, Datenschutz & mehr.
          </p>
        </motion.div>

        {/* ========================== */}
        {/* SETTINGS CARD */}
        {/* ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white border border-gray-200 rounded-2xl shadow p-8 md:p-10 space-y-12"
        >

          {/* ========================== */}
          {/* SPRACHE */}
          {/* ========================== */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Languages size={20} className="text-[#7eb6b8]" /> Sprache
            </h3>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="
                w-full md:w-60 px-4 py-3 rounded-xl border border-gray-300
                focus:ring-2 focus:ring-[#7eb6b8] outline-none
              "
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* ========================== */}
          {/* DESIGN / DARK MODE */}
          {/* ========================== */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              {darkMode ? (
                <Moon size={20} className="text-[#7eb6b8]" />
              ) : (
                <Sun size={20} className="text-[#7eb6b8]" />
              )}
              Design
            </h3>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="h-5 w-5 accent-[#7eb6b8]"
              />
              <span className="text-gray-700">Dark Mode aktivieren</span>
            </label>

            <p className="text-gray-500 text-sm mt-2">
              (Optional – wirkt sich aktuell nur auf das Dashboard aus)
            </p>
          </div>

          {/* ========================== */}
          {/* BENACHRICHTIGUNGEN */}
          {/* ========================== */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Bell size={20} className="text-[#7eb6b8]" /> E-Mail-Benachrichtigungen
            </h3>

            <div className="space-y-4">

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailReports}
                  onChange={() => setEmailReports(!emailReports)}
                  className="h-5 w-5 accent-[#7eb6b8]"
                />
                <span className="text-gray-700">
                  E-Mail erhalten, wenn ein Report fertig ist
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailReminders}
                  onChange={() => setEmailReminders(!emailReminders)}
                  className="h-5 w-5 accent-[#7eb6b8]"
                />
                <span className="text-gray-700">
                  Erinnerung senden, wenn Teilnehmer nicht antworten
                </span>
              </label>

            </div>
          </div>

          {/* ========================== */}
          {/* DATENSCHUTZ */}
          {/* ========================== */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield size={20} className="text-[#7eb6b8]" /> Datenschutz
            </h3>

            <p className="text-gray-700 mb-4">
              Verwalte, wie deine Daten verarbeitet werden.
            </p>

            <a
              href="/privacy"
              className="text-[#7eb6b8] hover:text-black font-medium flex items-center gap-1 transition"
            >
              Datenschutzerklärung öffnen <ArrowRight size={16} />
            </a>
          </div>

          {/* ========================== */}
          {/* EXPORT */}
          {/* ========================== */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-[#7eb6b8]" /> Export-Einstellungen
            </h3>

            <p className="text-gray-700 mb-4">
              Standardformat für Reports auswählen.
            </p>

            <select
              className="
                w-full md:w-60 px-4 py-3 rounded-xl border border-gray-300
                focus:ring-2 focus:ring-[#7eb6b8] outline-none
              "
            >
              <option value="pdf">PDF (Standard)</option>
              <option value="csv">CSV (Tabellen)</option>
            </select>
          </div>

          {/* ========================== */}
          {/* SICHERHEIT */}
          {/* ========================== */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Mail size={20} className="text-[#7eb6b8]" /> Login & Sicherheit
            </h3>

            <a
              href="/update-password"
              className="text-[#7eb6b8] hover:text-black font-medium flex items-center gap-1 transition"
            >
              Passwort ändern <ArrowRight size={16} />
            </a>
          </div>

        </motion.div>
      </div>
    </DashboardLayout>
  );
}
