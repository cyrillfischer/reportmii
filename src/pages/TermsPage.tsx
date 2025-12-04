// src/pages/TermsPage.tsx
import { Header } from "../components/Header";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">AGB</h1>

        <p className="text-gray-600 leading-relaxed">
          Die endgültigen Allgemeinen Geschäftsbedingungen werden später erstellt,
          sobald Preise, Leistungen, Partnerrollen und Systemfunktionen final sind.
        </p>

        <div className="mt-10 space-y-6 text-gray-700">
          <p><strong>1. Geltungsbereich:</strong> [Platzhalter]</p>
          <p><strong>2. Leistungen:</strong> [Platzhalter]</p>
          <p><strong>3. Zahlungsbedingungen:</strong> [Platzhalter]</p>
          <p><strong>4. Haftung:</strong> [Platzhalter]</p>
        </div>
      </section>
    </div>
  );
}
