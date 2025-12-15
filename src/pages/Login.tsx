import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setError(error?.message || "Login fehlgeschlagen");
      setLoading(false);
      return;
    }

    // ✅ LOGIN OK → DIREKT INS DASHBOARD
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Supabase Login mit direktem Redirect ins Dashboard
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
          disabled={loading}
          className="w-full rounded-xl bg-black text-white py-3 font-medium disabled:opacity-50"
        >
          {loading ? "Login läuft…" : "Login"}
        </button>

        {error && (
          <p className="mt-4 text-red-600 text-sm">
            ❌ {error}
          </p>
        )}
      </div>
    </div>
  );
}
