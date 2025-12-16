import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const savePassword = async () => {
    if (loading || saved) return;

    setError(null);

    if (!confirmed) {
      setError("Bitte bestätige, dass du der Inhaber dieses Accounts bist.");
      return;
    }

    if (password.length < 6) {
      setError("Das Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    if (password !== password2) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setSaved(true);

      // kurzer Moment für UX, dann zurück zum Login
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err: any) {
      setError(err?.message || "Passwort konnte nicht gespeichert werden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">Passwort zurücksetzen</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Wähle ein neues Passwort, um wieder Zugriff auf dein Konto zu erhalten.
        </p>

        <input
          type="password"
          placeholder="Neues Passwort"
          className="mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Neues Passwort wiederholen"
          className="mb-4"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <label className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          Ich bestätige, dass ich der Inhaber dieses Accounts bin.
        </label>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        {saved && (
          <p className="mb-4 text-sm text-green-600">
            Passwort gespeichert. Du wirst zum Login weitergeleitet …
          </p>
        )}

        <button
          onClick={savePassword}
          disabled={loading || saved}
          className="w-full rounded-full bg-[#8bbbbb] py-3 font-semibold disabled:opacity-50"
        >
          {loading ? "Speichern …" : saved ? "Gespeichert ✓" : "Neues Passwort speichern →"}
        </button>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => navigate("/login")}
            className="underline text-gray-600 hover:text-black"
          >
            Zurück zum Login
          </button>
        </div>
      </div>
    </div>
  );
}
