import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // optionales Prefill (z. B. aus Reset / Register)
  const prefilledEmail =
    (location.state as any)?.email ?? "";

  const [email, setEmail] = useState(prefilledEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setError(
        "Die eingegebenen Zugangsdaten sind nicht korrekt. Bitte überprüfe E-Mail und Passwort."
      );
      setLoading(false);
      return;
    }

    // ✅ Login erfolgreich
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">
          Willkommen zurück
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          Melde dich an, um auf dein Reportmii-Dashboard zuzugreifen.
        </p>

        {/* E-Mail */}
        <input
          type="email"
          placeholder="E-Mail-Adresse"
          className="mb-3 w-full px-4 py-3 rounded-xl border border-gray-300
                     focus:ring-2 focus:ring-violet-400 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Passwort */}
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Passwort"
            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300
                       focus:ring-2 focus:ring-violet-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2
                       text-gray-400 hover:text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Passwort vergessen */}
        <div className="mb-5 text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Passwort vergessen?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-full bg-[#8bbbbb] py-3 font-semibold
                     disabled:opacity-50 transition"
        >
          {loading ? "Anmelden…" : "Login"}
        </button>

        {/* Fehler */}
        {error && (
          <p className="mt-4 text-sm text-red-600">
            ❌ {error}
          </p>
        )}
      </div>
    </div>
  );
}
