import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ⚠️ WICHTIG:
  // Supabase setzt die Recovery-Session AUTOMATISCH,
  // wir prüfen nur, ob sie existiert – ohne die Seite zu blockieren
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setError(
          "Bitte öffne den Passwort-zurücksetzen-Link direkt aus der E-Mail."
        );
      }
    });
  }, []);

  const savePassword = async () => {
    if (loading || success) return;

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

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // bewusst KEIN Auto-Redirect erzwingen
    // User klickt selbst auf "Zurück zum Login"
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">
          Passwort zurücksetzen
        </h1>

        <p className="text-gray-500 mb-6 text-sm">
          Wähle ein neues Passwort, um wieder Zugriff auf dein Konto zu erhalten.
        </p>

        <input
          type="password"
          placeholder="Neues Passwort"
          className="mb-3 w-full rounded-xl border px-4 py-3 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Neues Passwort wiederholen"
          className="mb-4 w-full rounded-xl border px-4 py-3 text-sm"
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

        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}

        {success && (
          <p className="mb-4 text-sm text-green-600">
            Passwort erfolgreich gespeichert.
          </p>
        )}

        <button
          onClick={savePassword}
          disabled={loading || success}
          className="w-full rounded-full bg-[#8bbbbb] py-3 font-semibold disabled:opacity-50"
        >
          {loading
            ? "Speichern …"
            : success
            ? "Gespeichert ✓"
            : "Neues Passwort speichern →"}
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
