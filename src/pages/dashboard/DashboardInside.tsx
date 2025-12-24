import { NavLink } from "react-router-dom";

export default function DashboardInside() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Inside Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Bereich für interne Analysen und anonyme Team-Auswertungen
        </p>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CARD: TEAM-ANALYSE */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">
            Team-Analysen
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Sammle anonymes Feedback deiner Mitarbeitenden und werte es aus.
          </p>
        </div>

        {/* CARD: TEILNAHME-LINK */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">
            Teilnahme-Link
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Teile deinen Inside-Link mit deinem Team für anonyme Befragungen.
          </p>
        </div>

        {/* CARD: ACCOUNT */}
        <NavLink
          to="/dashboard/account"
          className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-sm
                     hover:shadow-md transition"
        >
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#7eb6b8]">
            Einstellungen
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Verwalte Inside-Einstellungen und deine Organisation.
          </p>
        </NavLink>

      </div>
    </div>
  );
}
