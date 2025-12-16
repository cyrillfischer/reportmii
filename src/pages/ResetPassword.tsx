import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ⛔️ NICHT blockieren – Supabase setzt Session automatisch über den Link
  useEffect(() => {
    supabase.auth.getSession();
  }, []);

  const savePassword = async () => {
    if (loading || success) return;

    setError(null);

    if (!confirmed) {
      setError("Please confirm that you are the owner of this account.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // 🔁 sauber zurück zum Login
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">Reset your password</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Choose a new password to regain access to your account.
        </p>

        <input
          type="password"
          placeholder="New password"
          className="mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Repeat new password"
          className="mb-4"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <label className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          I confirm that I am the owner of this account.
        </label>

        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}

        {success && (
          <p className="mb-4 text-sm text-green-600">
            Password updated successfully. Redirecting…
          </p>
        )}

        <button
          onClick={savePassword}
          disabled={loading || success}
          className="w-full rounded-full bg-[#8bbbbb] py-3 font-semibold disabled:opacity-50"
        >
          {loading ? "Saving…" : "Save new password →"}
        </button>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => navigate("/login")}
            className="underline text-gray-600 hover:text-black"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
