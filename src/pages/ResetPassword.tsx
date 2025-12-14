import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [status, setStatus] = useState<
    "loading" | "ready" | "saving" | "success" | "error"
  >("loading");

  const [errorMsg, setErrorMsg] = useState("");

  // 🔐 Session aus URL setzen (ENTSCHEIDEND)
  useEffect(() => {
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (!access_token || !refresh_token) {
      setErrorMsg("Ungültiger oder abgelaufener Link.");
      setStatus("error");
      return;
    }

    supabase.auth
      .setSession({ access_token, refresh_token })
      .then(({ error }) => {
        if (error) {
          setErrorMsg("Session konnte nicht hergestellt werden.");
          setStatus("error");
        } else {
          setStatus("ready");
        }
      });
  }, [params]);

  // 💾 Passwort speichern
  const handleSave = async () => {
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

    setStatus("saving");
    setErrorMsg("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMsg("Fehler beim Speichern des Passworts.");
      setStatus("error");
      return;
    }

    // 🔒 Session bewusst beenden
    await supabase.auth.signOut();

    setStatus("success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

        {status === "ready" || status === "saving" ? (
          <>
            <div className="mb-4">
              <label>Neues Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <div className="mb-4">
              <label>Passwort wiederholen</label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              Ich bestätige, dass ich der Inhaber dieses Kontos bin.
            </label>

            {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

            <button
              onClick={handleSave}
              disabled={status === "saving"}
              className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
            >
              {status === "saving"
                ? "Passwort wird gespeichert …"
                : "Passwort speichern"}
            </button>
          </>
        ) : null}

        {status === "success" && (
          <>
            <button className="w-full bg-black text-white py-3 rounded">
              Passwort gespeichert ✓
            </button>
            <button
              onClick={() => navigate("/login")}
              className="mt-6 w-full underline text-gray-600"
            >
              Zurück zum Login
            </button>
          </>
        )}

        {status === "error" && (
          <p className="text-red-500 text-center">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
