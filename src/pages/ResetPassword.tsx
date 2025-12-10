import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token_hash = params.get("token_hash");
  const type = params.get("type"); // "recovery"

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess(false);

    if (!token_hash || type !== "recovery") {
      setErrorMsg("Ungültiger oder abgelaufener Link.");
      return;
    }

    if (password !== password2) {
      setErrorMsg("Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);

    console.log("Starte verifyOtp…");

    // 1️⃣ Token verifizieren → erzeugt Session
    const { error: verifyError, data: verifyData } = await supabase.auth.verifyOtp({
      token_hash,
      type: "recovery",
    });

    console.log("verifyOtp Ergebnis:", verifyData, verifyError);

    if (verifyError) {
      setLoading(false);
      setErrorMsg("Token ungültig oder abgelaufen.");
      return;
    }

    // 2️⃣ Session vorhanden → Passwort setzen
    console.log("Starte updateUser…");

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      console.log("updateUser Fehler:", updateError);
      setLoading(false);
      setErrorMsg("Fehler beim Speichern.");
      return;
    }

    setLoading(false);
    setSuccess(true);

    // 3️⃣ Weiterleiten
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    /* Dein komplettes Layout bleibt wie es ist! */
    <div className="reset-wrapper">

      {/* Dein Header, UI, Input-Felder usw */}

      <form onSubmit={handleReset}>

        {/* PASSWORT 1 */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* PASSWORT 2 */}
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        {/* FEHLERMELDUNG */}
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Passwort wird gespeichert…" : "Passwort speichern →"}
        </button>

        {success && <p className="text-green-600">Passwort erfolgreich geändert!</p>}
      </form>
    </div>
  );
}
