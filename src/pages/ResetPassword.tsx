import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // 🔒 Sicherstellen, dass eine Recovery-Session existiert
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/login");
      }
    });
  }, [navigate]);

  const handleSave = async () => {
    if (!confirmed) {
      setErrorMsg("Bitte bestätige, dass du der Kontoinhaber bist.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Passwort muss mindestens 6 Zeichen haben.");
      return;
    }

    if (password !== password2) {
      setErrorMsg("Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setErrorMsg("Fehler beim Speichern des Passworts.");
      return;
    }

    setSuccess(true);

    // 🔑 Session sauber beenden
    await supabase.auth.signOut();

    // 🔁 HARTE Weiterleitung (kein Router-Zustand!)
    setTimeout(() => {
      window.location.href = "/login";
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-black pt-24 pb-24 text-center">
        <h1 className="text-white text-4xl font-bold">Neues Passwort setzen</h1>
        <p className="text-gray-300 mt-2">
          Wähle ein neues, sicheres Passwort.
        </p>
      </div>

      <div className="max-w-lg mx-auto -mt-20 bg-white shadow-xl rounded-xl p-10">
        <div className="mb-6">
          <label className="text-sm font-semibold">Neues Passwort</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg mt-2 px-4 py-3"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold">Passwort wiederholen</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="w-full border rounded-lg mt-2 px-4 py-3"
          />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <span className="text-sm">
            Ich bestätige, dass ich der Inhaber dieses Kontos bin.
          </span>
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
        )}

        {success && (
          <p className="text-green-600 font-semibold mb-4">
            Passwort gespeichert. Weiterleitung…
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold disabled:opacity-40"
        >
          {loading ? "Passwort wird gespeichert …" : "Passwort speichern →"}
        </button>
      </div>
    </div>
  );
}
