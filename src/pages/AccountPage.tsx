import { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Upload, Globe, Bell, Lock, ImageIcon, User, Building } from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const TABS = [
    { id: "profile", label: "Profil", icon: <User size={18} /> },
    { id: "company", label: "Unternehmen", icon: <Building size={18} /> },
    { id: "branding", label: "Branding", icon: <ImageIcon size={18} /> },
    { id: "subdomain", label: "Inside Subdomain", icon: <Globe size={18} /> },
    { id: "notifications", label: "Benachrichtigungen", icon: <Bell size={18} /> },
    { id: "password", label: "Passwort ändern", icon: <Lock size={18} /> },
  ];

  return (
    <DashboardLayout>
      <div className="p-10 max-w-5xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-white mb-10">Mein Account</h1>

        {/* TAB NAV */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-5 py-2.5 flex items-center gap-2 rounded-xl font-medium transition
                ${activeTab === tab.id
                  ? "bg-white text-gray-900 shadow"
                  : "bg-white/20 text-white hover:bg-white/30"}
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10">

          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "company" && <CompanyTab />}
          {activeTab === "branding" && <BrandingTab />}
          {activeTab === "subdomain" && <SubdomainTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "password" && <PasswordTab />}

        </div>
      </div>
    </DashboardLayout>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    PROFIL                                  */
/* -------------------------------------------------------------------------- */

function ProfileTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Persönliche Daten</h2>

      <div className="flex items-center gap-6 mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <Upload className="text-gray-500" size={28} />
        </div>

        <button className="bg-gray-900 hover:bg-violet-600 text-white px-5 py-2 rounded-xl transition">
          Bild hochladen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Input label="Vorname" placeholder="Dein Vorname" />
        <Input label="Nachname" placeholder="Dein Nachname" />

        <Input label="E-Mail" placeholder="beispiel@mail.com" />
        <Input label="Telefon (optional)" placeholder="+41 ..." />

      </div>

      <SaveButton />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 UNTERNEHMEN                                */
/* -------------------------------------------------------------------------- */

function CompanyTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Unternehmen</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Input label="Firmenname" placeholder="Muster GmbH" />
        <Input label="Branche" placeholder="z.B. Marketing, Handel, Beratung" />

        <Input label="Unternehmensgröße" placeholder="z.B. 1–10 Mitarbeitende" />
        <Input label="Land" placeholder="Schweiz" />

        <Input label="Website" placeholder="https://deinefirma.ch" />
        
        <textarea
          className="col-span-2 w-full p-4 border rounded-xl border-gray-300 focus:ring-2 focus:ring-violet-500"
          placeholder="Unternehmensbeschreibung (optional)"
          rows={4}
        />

      </div>

      <SaveButton />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   BRANDING                                 */
/* -------------------------------------------------------------------------- */

function BrandingTab() {
  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Branding</h2>

      {/* LOGO UPLOAD */}
      <div className="mb-8">
        <p className="font-medium mb-2">Logo Upload</p>

        <div className="flex items-center gap-6">
          <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center">
            <ImageIcon className="text-gray-400" size={32} />
          </div>

          <button className="bg-gray-900 hover:bg-violet-600 text-white px-5 py-2 rounded-xl">
            Logo hochladen
          </button>
        </div>
      </div>

      {/* BRAND COLORS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Input label="Primärfarbe" placeholder="#6C5CE7" />
        <Input label="Sekundärfarbe" placeholder="#00CEC9" />
        <Input label="Textfarbe" placeholder="#222222" />

      </div>

      {/* FONTS */}
      <div>
        <p className="font-medium mb-2">Schriftart</p>
        <select className="w-full p-3 border rounded-xl border-gray-300 focus:ring-2 focus:ring-violet-500">
          <option>Inter</option>
          <option>Manrope</option>
          <option>Lato</option>
          <option>Poppins</option>
        </select>
      </div>

      <SaveButton />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              INSIDE SUBDOMAIN                              */
/* -------------------------------------------------------------------------- */

function SubdomainTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Inside Subdomain</h2>

      <p className="text-gray-600 text-sm mb-4">
        Deine Kunden füllen die Inside.mii Umfrage über deine eigene Subdomain aus.
      </p>

      <div className="flex items-center gap-2">
        <input
          className="flex-grow p-3 border rounded-xl border-gray-300 focus:ring-2 focus:ring-violet-500"
          placeholder="z.B. musterfirma"
        />
        <span className="text-gray-500 font-medium">.inside.reportmii.com</span>
      </div>

      <SaveButton />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                BENACHRICHTIGUNGEN                          */
/* -------------------------------------------------------------------------- */

function NotificationsTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Benachrichtigungen</h2>

      <Checkbox label="E-Mail erhalten bei neuen Reports" />
      <Checkbox label="E-Mail erhalten bei neuen Teamteilnehmern" />
      <Checkbox label="Newsletter & Updates" />

      <SaveButton />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                PASSWORT                                    */
/* -------------------------------------------------------------------------- */

function PasswordTab() {
  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Passwort ändern</h2>

      <Input type="password" label="Aktuelles Passwort" />
      <Input type="password" label="Neues Passwort" />
      <Input type="password" label="Neues Passwort wiederholen" />

      <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-semibold transition">
        Passwort aktualisieren
      </button>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              GENERISCHE COMPONENTS                          */
/* -------------------------------------------------------------------------- */

function Input({ label, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500"
      />
    </div>
  );
}

function Checkbox({ label }) {
  return (
    <label className="flex items-center gap-3 text-gray-700">
      <input type="checkbox" className="w-5 h-5 accent-violet-600" />
      {label}
    </label>
  );
}

function SaveButton() {
  return (
    <div>
      <button className="bg-gray-900 hover:bg-violet-600 text-white px-8 py-3 rounded-xl font-semibold transition">
        Änderungen speichern
      </button>
    </div>
  );
}
