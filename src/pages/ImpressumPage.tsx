// src/pages/ImpressumPage.tsx
import { Header } from "../components/Header";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Impressum</h1>

        <p className="text-gray-600 leading-relaxed">
          <strong>Hinweis:</strong> Dies ist ein Platzhalter. Die finalen Rechtstexte
          werden später ergänzt, sobald alle Inhalte definiert sind.
        </p>

        <div className="mt-10 space-y-6 text-gray-700">
          <p><strong>Firma:</strong> [Platzhalter]</p>
          <p><strong>Adresse:</strong> [Platzhalter]</p>
          <p><strong>UID:</strong> [Platzhalter]</p>
          <p><strong>Kontakt:</strong> [Platzhalter]</p>
        </div>
      </section>
    </div>
  );
}
