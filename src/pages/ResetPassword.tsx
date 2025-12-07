// src/pages/ResetPassword.tsx
import { motion } from "framer-motion";

export default function ResetPassword() {
  // Alles, was wir tun: URL auslesen und anzeigen
  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace("#", ""));

  const queryToken = searchParams.get("token") || searchParams.get("token_hash");
  const hashToken =
    hashParams.get("access_token") ||
    hashParams.get("__token") ||
    hashParams.get("token") ||
    hashParams.get("token_hash");

  const token = queryToken || hashToken;
  const type = searchParams.get("type");
  const email = searchParams.get("email");

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* HEADER */}
      <section className="pt-40 pb-24 text-center bg-black text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-semibold mb-4"
        >
          Debug: Reset Passwort
        </motion.h1>

        <p className="text-white/70 max-w-xl mx-auto text-lg">
          Diese Seite zeigt dir nur, was aus der URL gelesen wird.
          Noch kein Supabase, keine Prüfung – nur Debug.
        </p>
      </section>

      {/* DEBUG-BLOCK */}
      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            URL-Parameter
          </h2>

          <div className="space-y-4 text-sm font-mono">
            <div>
              <span className="font-semibold">window.location.href:</span>
              <div className="mt-1 break-all text-gray-700">
                {window.location.href}
              </div>
            </div>

            <div>
              <span className="font-semibold">token (queryToken):</span>
              <div className="mt-1 break-all text-blue-700">
                {queryToken ?? "<null>"}
              </div>
            </div>

            <div>
              <span className="font-semibold">token (hashToken):</span>
              <div className="mt-1 break-all text-blue-700">
                {hashToken ?? "<null>"}
              </div>
            </div>

            <div>
              <span className="font-semibold">token (final):</span>
              <div className="mt-1 break-all text-green-700">
                {token ?? "<null>"}
              </div>
            </div>

            <div>
              <span className="font-semibold">type:</span>
              <div className="mt-1 text-purple-700">
                {type ?? "<null>"}
              </div>
            </div>

            <div>
              <span className="font-semibold">email:</span>
              <div className="mt-1 text-purple-700">
                {email ?? "<null>"}
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-500 text-sm">
            Wenn hier <code>token</code>, <code>type</code> und{" "}
            <code>email</code> korrekt stehen, ist das Problem nicht
            das Frontend-Auslesen, sondern die Supabase-Verifikation. <br />
            Wenn <code>token</code> hier <code>{"<null>"}</code> ist,
            kommt der Token gar nicht an.
          </p>
        </div>
      </section>
    </div>
  );
}
