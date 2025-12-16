import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ✅ Check: Session MUSS über Recovery-Link vorhanden sein
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setError("Auth session missing. Please open the reset link from the email.");
      }
    };
    checkSession();
  }, []);

  const handleSavePassword = async () => {
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

    if (password !== passwordRepeat) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // 🔁 Nach Reset sauber zurück zum Login
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">Reset your password</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Choose a new password to securely regain access.
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full rounded-xl border px-4 py-3"
        />

        <input
          type="password"
          placeholder="Repeat new password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          className="mb-4 w-full rounded-xl border px-4 py-3"
        />

        <label className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          I confirm that I am the owner of this account.
        </label>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {success && (
          <p className="mb-4 text-sm text-green-600">
            Password updated successfully. Redirecting…
          </p>
        )}

        <button
          onClick={handleSavePassword}
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
