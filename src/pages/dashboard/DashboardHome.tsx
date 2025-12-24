import { NavLink } from "react-router-dom";

export default function DashboardHome() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Dashboard Übersicht
        </h1>
        <p className="text-gray-500 mt-2">
          Dein persönlicher Einstiegspunkt in Reportmii
        </p>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CARD: ANALYSEN */}
        <NavLink
          to="/dashboard/analyses"
          className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-sm
                     hover:shadow-md transition"
        >
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#7eb6b8]">
            Analysen
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Starte neue Analysen oder arbeite an bestehenden Auswertungen.
          </p>
        </NavLink>

        {/* CARD: REPORTS */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">
            Reports
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Greife auf automatisch generierte Reports zu.
          </p>
        </div>

        {/* CARD: ACCOUNT */}
        <NavLink
          to="/dashboard/account"
          className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-sm
                     hover:shadow-md transition"
        >
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#7eb6b8]">
            Account & Einstellungen
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Verwalte dein Profil, deine Organisation und Einstellungen.
          </p>
        </NavLink>

      </div>
    </div>
  );
}
