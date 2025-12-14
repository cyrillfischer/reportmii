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

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // 1️⃣ Verify recovery token (einmal!)
  useEffect(() => {
    const run = async () => {
      if (!token_hash || type !== "recovery") {
        setStatus("error");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token_hash,
      });

      if (error) {
        setStatus("error");
      }
    };

    run();
  }, [token_hash, type]);

  // 2️⃣ Passwort setzen → SOFORT logout
  const handleSave = async () => {
    if (status !== "idle") return;

    if (!confirmed || password.length < 6 || password !== password2) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      return;
    }

    // 🔴 KRITISCH: Session zerstören
    await supabase.auth.signOut();

    setStatus("success");
  };

  // 3️⃣ Fehlerfall
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">
          Ungültiger oder abgelaufener Link.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Neues Passwort setzen
        </h1>

        {status !== "success" && (
          <>
            <input
              type="password"
              placeholder="Neues Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />

            <input
              type="password"
              placeholder="Passwort wiederholen"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />

            <label className="flex items-center gap-2 mb-6 text-sm">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              Ich bestätige, dass ich der Inhaber dieses Kontos bin.
            </label>

            <button
              onClick={handleSave}
              disabled={status === "loading"}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {status === "loading"
                ? "Passwort wird gespeichert …"
                : "Passwort speichern →"}
            </button>
          </>
        )}

        {status === "success" && (
          <>
            <button
              className="w-full bg-black text-white py-3 rounded-lg font-semibold"
              disabled
            >
              Passwort gespeichert ✓
            </button>

            <button
              onClick={() => navigate("/login")}
              className="mt-6 w-full text-center underline text-gray-600"
            >
              Zurück zum Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
