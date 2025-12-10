import { useState, useEffect } from "react";
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
  const [checkbox, setCheckbox] = useState(false);

  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadEmail() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user?.email)
        setEmail(sessionData.session.user.email);
    }
    loadEmail();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!password || !password2) {
      setErrorMsg("Bitte gib zweimal ein Passwort ein.");
      return;
    }

    if (password !== password2) {
      setErrorMsg("Passwörter stimmen nicht überein.");
      return;
    }

    if (!checkbox) {
      setErrorMsg("Bitte bestätige, dass du der Inhaber des Kontos bist.");
      return;
    }

    setLoading(true);

    try {
      console.log("verifyOtp gestartet...");

      // 1) Token validieren
      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash,
        type: "recovery",
      });

      if (verifyError) {
        console.error("verifyOtp error:", verifyError);
        setErrorMsg("Token ungültig oder abgelaufen.");
        setLoading(false);
        return;
      }

      console.log("Token gültig. Setze Passwort...");

      // 2) Neues Passwort setzen
      const { error: pwError } = await supabase.auth.updateUser({
        password: password,
      });

      if (pwError) {
        console.error("updateUser error:", pwError);
        setErrorMsg(
          "Passwort konnte nicht gesetzt werden. Bitte erneut versuchen."
        );
        setLoading(false);
        return;
      }

      console.log("Passwort gesetzt. Melde User an...");

      // 3) User erneut einloggen (Recovery erzeugt KEINE Session!)
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        console.error("Login error:", loginError);
        setErrorMsg("Passwort gesetzt, aber Login fehlgeschlagen.");
        setLoading(false);
        return;
      }

      console.log("Login erfolgreich. Weiterleitung...");

      navigate("/dashboard/overview");
    } catch (e) {
      console.error("Fehler:", e);
      setErrorMsg("Unbekannter Fehler. Bitte erneut versuchen.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Schwarzer Header */}
      <div className="bg-black py-20 text-center">
        <h1 className="text-white text-4xl font-bold">Neues Passwort setzen</h1>
        <p className="text-gray-300 mt-2">
          Wähle ein neues, sicheres Passwort und bestätige es unten.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-12 p-10 shadow-xl rounded-3xl bg-white"
      >
        {/* Password */}
        <label className="block mb-2 text-gray-700 font-semibold">
          Neues Passwort
        </label>
        <div className="relative mb-6">
          <input
            type="password"
            className="w-full p-3 rounded-xl border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Password confirm */}
        <label className="block mb-2 text-gray-700 font-semibold">
          Passwort wiederholen
        </label>
        <div className="relative mb-6">
          <input
            type="password"
            className="w-full p-3 rounded-xl border"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
          <span className="text-gray-600">
            Ich bestätige, dass ich der Inhaber dieses Kontos bin.
          </span>
        </label>

        {/* Error */}
        {errorMsg && (
          <p className="text-red-500 font-medium mb-4">{errorMsg}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl mt-4"
        >
          {loading ? "Passwort wird gespeichert..." : "Passwort speichern →"}
        </button>
      </form>
    </div>
  );
}
