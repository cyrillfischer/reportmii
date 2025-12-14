import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔐 Recovery-Session herstellen (korrekt + stabil)
  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenHash = params.get("token_hash");

      if (!tokenHash) {
        setError("Der Passwort-Link ist ungültig oder abgelaufen.");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token_hash: tokenHash,
      });

      if (error) {
        setError("Der Passwort-Link ist ungültig oder abgelaufen.");
        return;
      }

      setReady(true);
    };

    init();
  }, []);

  // 💾 Passwort speichern (KANN NICHT HÄNGEN)
  const savePassword = async () => {
    if (saving || saved) return;

    setError(null);

    if (!confirmed) {
      setError("Bitte bestätige die Checkbox.");
      return;
    }

    if (password.length < 6) {
      setError("Passwort mindestens 6 Zeichen.");
      return;
    }

    if (password !== password2) {
      setError("Passwörter stimmen nicht überein.");
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setSaved(true);
    } catch {
      setError("Fehler beim Speichern des Passworts.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Neues Passwort setzen
        </h1>

        {!ready && !error && (
          <p className="text-center text-sm text-gray-500 mt-6">
            Link wird geprüft…
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600 text-center mt-6">{error}</p>
        )}

        {ready && (
          <>
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">
                Neues Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Passwort wiederholen
              </label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">
                Ich bestätige, dass ich der Inhaber dieses Kontos bin.
              </span>
            </div>

            <button
              onClick={savePassword}
              disabled={saving || saved}
              className="w-full mt-6 bg-black text-white rounded-lg py-3 font-medium disabled:opacity-50"
            >
              {saving
                ? "Speichern…"
                : saved
                ? "Passwort wurde gespeichert"
                : "Passwort speichern →"}
            </button>

            {saved && (
              <div className="text-center mt-4">
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm underline text-gray-600"
                >
                  Zurück zum Login
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
