import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const prefilledEmail = (location.state as any)?.email ?? "";

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

    // ✅ IMMER nur auf /dashboard
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">Willkommen zurück</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Melde dich an, um auf dein Reportmii-Dashboard zuzugreifen.
        </p>

        <input
          type="email"
          placeholder="E-Mail-Adresse"
          className="mb-3 w-full px-4 py-3 rounded-xl border border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Passwort"
            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="mb-5 text-right">
          <Link to="/forgot-password" className="text-sm text-gray-500">
            Passwort vergessen?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-full bg-[#8bbbbb] py-3 font-semibold"
        >
          {loading ? "Anmelden…" : "Login"}
        </button>

        {error && <p className="mt-4 text-sm text-red-600">❌ {error}</p>}
      </div>
    </div>
  );
}
