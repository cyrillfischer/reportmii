// src/pages/ResetPassword.tsx
import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useState<string | null>(null);

  // --- TOKEN AUS URL EXTRAHIEREN ---
  useEffect(() => {
    const url = new URL(window.location.href);
    const t = url.searchParams.get("token_hash");
    setToken(t);
  }, []);

  const handleReset = async () => {
    setErrorMsg("");

    if (!token) {
      setErrorMsg("Ungültiger oder fehlender Token.");
      return;
    }

    if (password !== passwordRepeat) {
      setErrorMsg("Die Passwörter stimmen nicht überein.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Das Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ VERIFY OTP
      const { data: verifyData, error: verifyError } =
        await supabase.auth.verifyOtp({
          token_hash: token,
          type: "recovery",
        });

      if (verifyError) {
        setLoading(false);
        setErrorMsg("Token ungültig oder abgelaufen.");
        return;
      }

      // 2️⃣ UPDATE USER PASSWORD
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setLoading(false);
        setErrorMsg(updateError.message);
        return;
      }

      // 3️⃣ REDIRECT
      setLoading(false);
      navigate("/login");
    } catch (err: any) {
      setLoading(false);
      setErrorMsg("Ein Fehler ist aufgetreten. Bitte erneut versuchen.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* BLACK HEADER */}
      <div className="w-full bg-black py-24 text-center">
        <h1 className="text-white text-4xl font-bold">Neues Passwort setzen</h1>
        <p className="text-gray-300 mt-2">
          Wähle ein neues, sicheres Passwort.
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

          {/* NEW PASSWORD */}
          <label className="text-sm font-medium">Neues Passwort</label>
          <input
            type="password"
            className="w-full mt-1 mb-4 p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* REPEAT PASSWORD */}
          <label className="text-sm font-medium">Passwort wiederholen</label>
          <input
            type="password"
            className="w-full mt-1 mb-4 p-3 border rounded-lg"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />

          {/* CONFIRM CHECKBOX */}
          <div className="flex items-center mb-4">
            <input type="checkbox" defaultChecked className="mr-2" />
            <span className="text-sm">
              Ich bestätige, dass ich der Inhaber dieses Kontos bin.
            </span>
          </div>

          {/* ERROR */}
          {errorMsg && (
            <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Passwort wird gespeichert …" : "Passwort speichern"}
          </button>

          {/* BACK LINK */}
          <button
            onClick={() => navigate("/login")}
            className="block mx-auto mt-4 text-gray-600 underline text-sm"
          >
            Zurück zum Login
          </button>

        </div>
      </div>
    </div>
  );
}
