// src/pages/Login.tsx
import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setStatus("loading");
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setStatus("error");
      setError(error?.message || "Login fehlgeschlagen");
      return;
    }

    setStatus("success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-2">Login – Schritt 2</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Echter Supabase Login, kein Redirect, kein Dashboard
        </p>

        <input
          type="email"
          placeholder="E-Mail"
          className="mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Passwort"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={status === "loading"}
          className="w-full rounded-xl bg-black text-white py-3 font-medium disabled:opacity-50"
        >
          {status === "loading" ? "Login läuft…" : "Login testen"}
        </button>

        {/* STATUS */}
        {status === "success" && (
          <p className="mt-4 text-green-600 text-sm">
            ✅ Login erfolgreich – Session vorhanden
          </p>
        )}

        {status === "error" && (
          <p className="mt-4 text-red-600 text-sm">
            ❌ {error}
          </p>
        )}
      </div>
    </div>
  );
}
