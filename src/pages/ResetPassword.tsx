import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSave = async () => {
    if (status !== "idle") return;

    setStatus("loading");

    // ⛔️ ABSICHTLICH KEIN SUPABASE
    // Wir simulieren hier NUR den UI-Flow
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

        <button
          onClick={handleSave}
          disabled={status === "loading"}
          className="w-full py-3 rounded-lg text-lg font-semibold bg-black text-white disabled:opacity-50"
        >
          {status === "idle" && "Passwort speichern →"}
          {status === "loading" && "Passwort wird gespeichert …"}
          {status === "success" && "Passwort gespeichert ✓"}
        </button>

        {status === "success" && (
          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full text-center underline text-gray-600"
          >
            Zurück zum Login
          </button>
        )}

        {status === "error" && (
          <p className="mt-4 text-red-600 text-center">
            Fehler beim Speichern
          </p>
        )}
      </div>
    </div>
  );
}
