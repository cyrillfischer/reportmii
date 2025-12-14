import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

type Status = "verifying" | "ready" | "saving" | "success" | "error";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const token_hash = params.get("token_hash");
  const type = params.get("type");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [status, setStatus] = useState<Status>("verifying");
  const [errorMsg, setErrorMsg] = useState("");

  const hashParams = useMemo(() => {
    const raw = (location.hash || "").replace(/^#/, "");
    const sp = new URLSearchParams(raw);
    return {
      access_token: sp.get("access_token"),
      refresh_token: sp.get("refresh_token"),
      hash_type: sp.get("type"),
    };
  }, [location.hash]);

  // 1) Session herstellen (token_hash ODER access_token aus #hash)
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setErrorMsg("");
      setStatus("verifying");

      // Variante A: Supabase schickt access_token im Hash
      if (hashParams.access_token && hashParams.refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token: hashParams.access_token,
          refresh_token: hashParams.refresh_token,
        });

        if (cancelled) return;

        if (error) {
          setErrorMsg("Ungültiger oder abgelaufener Link.");
          setStatus("error");
          return;
        }

        setStatus("ready");
        return;
      }

      // Variante B: Dein Mail-Template nutzt token_hash
      if (!token_hash || type !== "recovery") {
        setErrorMsg("Ungültiger oder abgelaufener Link.");
        setStatus("error");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token_hash,
      });

      if (cancelled) return;

      if (error) {
        setErrorMsg("Ungültiger oder abgelaufener Link.");
        setStatus("error");
        return;
      }

      setStatus("ready");
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [token_hash, type, hashParams.access_token, hashParams.refresh_token]);

  // 2) Passwort speichern + danach signOut, damit Login mit neuem Passwort sauber klappt
  const handleSave = async () => {
    if (status !== "ready") return;

    setErrorMsg("");

    if (!confirmed) {
      setErrorMsg("Bitte bestätigen.");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Passwort muss min. 8 Zeichen haben.");
      return;
    }
    if (password !== password2) {
      setErrorMsg("Passwörter stimmen nicht überein.");
      return;
    }

    setStatus("saving");

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setErrorMsg("Fehler beim Speichern des Passworts.");
        setStatus("error");
        return;
      }

      // wichtig: Session sauber beenden, sonst wirkt Login manchmal "falsch"
      await supabase.auth.signOut();

      setStatus("success");
    } catch {
      setErrorMsg("Fehler beim Speichern des Passworts.");
      setStatus("error");
    }
  };

  const goLogin = () => navigate("/login", { replace: true });

  const isDisabled = status !== "ready";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-black pt-24 pb-24 text-center">
        <h1 className="text-white text-4xl font-bold">Neues Passwort setzen</h1>
        <p className="text-gray-300 mt-2">Wähle ein neues, sicheres Passwort.</p>
      </div>

      <div className="max-w-lg mx-auto -mt-20 bg-white shadow-xl rounded-2xl p-10 w-[92%]">
        {status === "error" && (
          <p className="text-red-500 text-sm mb-6">
            {errorMsg || "Ungültiger oder abgelaufener Link."}
          </p>
        )}

        {status === "verifying" && (
          <p className="text-gray-500 text-sm mb-6">Link wird geprüft …</p>
        )}

        {status !== "success" && (
          <>
            <div className="mb-6">
              <label className="text-sm font-semibold">Neues Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-xl mt-2 px-4 py-3"
                disabled={isDisabled}
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold">Passwort wiederholen</label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full border rounded-xl mt-2 px-4 py-3"
                disabled={isDisabled}
              />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                disabled={isDisabled}
              />
              <span className="text-sm">
                Ich bestätige, dass ich der Inhaber dieses Kontos bin.
              </span>
            </div>

            {status === "error" && errorMsg && (
              <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
            )}

            <button
              onClick={handleSave}
              disabled={status !== "ready" && status !== "saving"}
              className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold disabled:opacity-40"
            >
              {status === "saving" ? "Passwort wird gespeichert …" : "Passwort speichern →"}
            </button>

            <button
              onClick={goLogin}
              className="mt-6 text-center w-full text-gray-500 underline"
            >
              Zurück zum Login
            </button>
          </>
        )}

        {status === "success" && (
          <>
            <button
              onClick={goLogin}
              className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold"
            >
              Passwort gespeichert ✓
            </button>

            <button
              onClick={goLogin}
              className="mt-6 text-center w-full text-gray-500 underline"
            >
              Zurück zum Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
