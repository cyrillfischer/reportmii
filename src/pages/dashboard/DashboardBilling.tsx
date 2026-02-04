import { motion } from "framer-motion";
import {
  CreditCard,
  FileText,
  BadgePercent,
  CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------ */
/* FAKE DATA – später Stripe / Supabase             */
/* ------------------------------------------------ */

const CUSTOMER_STATUS = {
  isReturningCustomer: true,
  discountPercent: 10,
  discountValidUntil: "31.03.2026",
};

const INVOICES = [
  {
    id: "inv_001",
    product: "Business.mii Analyse",
    date: "12.01.2026",
    amount: "497.– €",
    status: "paid",
  },
  {
    id: "inv_002",
    product: "Inside.mii Analyse – 25 Mitarbeitende",
    date: "20.01.2026",
    amount: "1’297.– €",
    status: "paid",
  },
];

/* ------------------------------------------------ */
/* COMPONENT                                       */
/* ------------------------------------------------ */

export default function DashboardBilling() {
  return (
    <div className="space-y-14">

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="inline-flex text-sm bg-[#dff7f5] px-3 py-1 rounded-full mb-3">
          Abrechnung
        </span>

        <h1 className="text-4xl font-semibold text-[#1b1f23] mb-2">
          Abrechnung & Rechnungen
        </h1>

        <p className="text-gray-600 max-w-2xl">
          Hier findest du alle Rechnungen zu deinen Analysen sowie deinen
          aktuellen Kundenstatus und Rabatte.
        </p>
      </motion.div>

      {/* ================= CUSTOMER STATUS ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start gap-4">
        <BadgePercent className="text-[#7eb6b8]" />

        <div>
          <h3 className="font-medium mb-1">
            Dein Kundenstatus
          </h3>

          {CUSTOMER_STATUS.isReturningCustomer ? (
            <p className="text-sm text-gray-700">
              🎉 Vielen Dank für deine letzte Analyse!
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Noch kein aktiver Rabatt vorhanden.
            </p>
          )}
        </div>
      </div>

      {/* ================= INVOICES ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-medium mb-4">
          Rechnungen
        </h3>

        <div className="space-y-3">
          {INVOICES.map((inv) => (
            <div
              key={inv.id}
              className="
                flex flex-col sm:flex-row
                sm:justify-between sm:items-center
                gap-3 sm:gap-0
                px-4 py-3 rounded-xl border
              "
            >
              {/* LEFT */}
              <div>
                <p className="text-sm font-medium">
                  {inv.product}
                </p>
                <p className="text-xs text-gray-500">
                  {inv.date}
                </p>
              </div>

              {/* RIGHT */}
              <div className="
                flex flex-wrap sm:flex-nowrap
                items-center gap-4 sm:gap-6
              ">
                <span className="text-sm font-medium">
                  {inv.amount}
                </span>

                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 size={16} />
                  Bezahlt
                </div>

                <button
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1b1f23] transition"
                  title="Rechnung herunterladen"
                >
                  <FileText size={16} />
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PAYMENT INFO ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start gap-4">
        <CreditCard className="text-[#7eb6b8]" />

        <div>
          <h3 className="font-medium mb-1">
            Zahlungsmethode
          </h3>
          <p className="text-sm text-gray-600">
            Die Abrechnung erfolgt sicher über Stripe.  
            Alle Zahlungen wurden erfolgreich verarbeitet.
          </p>
        </div>
      </div>

    </div>
  );
}
