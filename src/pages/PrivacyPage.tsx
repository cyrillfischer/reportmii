// src/pages/PrivacyPage.tsx
import { Header } from "../components/Header";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Datenschutz</h1>

        <p className="text-gray-600 leading-relaxed">
          Dies ist ein Platzhaltertext. Die finale Datenschutzerklärung wird später
          basierend auf den tatsächlichen Funktionen und Datenflüssen von Reportmii
          erstellt.
        </p>

        <div className="mt-10 space-y-6 text-gray-700">
          <p><strong>Welche Daten wir verarbeiten:</strong> [Platzhalter]</p>
          <p><strong>Wie wir Daten speichern & schützen:</strong> [Platzhalter]</p>
          <p><strong>Rechte der Nutzer:</strong> [Platzhalter]</p>
        </div>
      </section>
    </div>
  );
}
