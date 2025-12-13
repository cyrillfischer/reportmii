import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token_hash = params.get("token_hash");
  const type = params.get("type");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);

  // -----------------------------
  // Token EINMAL prüfen
  // -----------------------------
  useEffect(() => {
    const verify = async () => {
      if (!token_hash || type !== "recovery") {
        setErrorMsg("Ungültiger oder abgelaufener Link.");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token_hash,
      });

      if (error) {
        setErrorMsg("Token ungültig oder abgelaufen.");
        return;
      }

      setTokenChecked(true);
    };

    verify();
  }, [token_hash, type]);

  // -----------------------------
  // Passwort speichern → LOGIN
  // -----------------------------
  const handleSave = async () => {
    if (!tokenChecked) return;

    if (!confirmed) {
      setErrorMsg("Bitte bestätigen.");
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

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setLoading(false);
      setErrorMsg("Fehler beim Speichern.");
      return;
    }

    // WICHTIG: Session beenden
    await supabase.auth.signOut();

    // HARTE Weiterleitung → Login
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-black pt-24 pb-24 text-center">
        <h1 className="text-white text-4xl font-bold">
          Neues Passwort setzen
        </h1>
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
          <label className="text-sm font-semibold">
            Passwort wiederholen
          </label>
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

        <button
          onClick={handleSave}
          disabled={loading || !tokenChecked}
          className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold disabled:opacity-40"
        >
          {loading ? "Passwort wird gespeichert …" : "Passwort speichern →"}
        </button>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 text-center w-full text-gray-500 underline"
        >
          Zurück zum Login
        </button>
      </div>
    </div>
  );
}
