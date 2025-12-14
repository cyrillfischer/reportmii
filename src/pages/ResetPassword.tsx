<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Reset Password – Reportmii</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Supabase v2 CDN -->
  <script src="https://unpkg.com/@supabase/supabase-js@2"></script>

  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }

    .card {
      width: 100%;
      max-width: 420px;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);
      background: #fff;
    }

    h1 {
      text-align: center;
      margin-bottom: 8px;
    }

    p.subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 24px;
      font-size: 14px;
    }

    .field {
      position: relative;
      margin-bottom: 16px;
    }

    .field input {
      width: 100%;
      padding: 12px 44px 12px 12px;
      border-radius: 8px;
      border: 1px solid #ddd;
      font-size: 14px;
    }

    .eye {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      font-size: 14px;
      color: #666;
    }

    .checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 20px 0;
      font-size: 14px;
      color: #444;
    }

    button {
      width: 100%;
      padding: 14px;
      border-radius: 10px;
      border: none;
      background: #000;
      color: #fff;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .success {
      color: #1a7f37;
      text-align: center;
      margin-top: 16px;
      font-size: 14px;
    }

    .error {
      color: #d32f2f;
      text-align: center;
      margin-top: 16px;
      font-size: 14px;
    }

    .link {
      text-align: center;
      margin-top: 12px;
      font-size: 14px;
    }

    .link a {
      color: #000;
      text-decoration: underline;
    }
  </style>
</head>

<body>
  <div class="card">
    <h1>Set new password</h1>
    <p class="subtitle">Choose a new, secure password.</p>

    <div class="field">
      <input id="password" type="password" placeholder="New password" />
      <span class="eye" onclick="toggle('password')">👁</span>
    </div>

    <div class="field">
      <input id="password2" type="password" placeholder="Repeat new password" />
      <span class="eye" onclick="toggle('password2')">👁</span>
    </div>

    <div class="checkbox">
      <input type="checkbox" id="human" />
      <label for="human">I confirm that I am a human and the account owner</label>
    </div>

    <button id="saveBtn" onclick="savePassword()">Save password</button>

    <div id="message"></div>

    <div class="link">
      <a href="/dashboard">Back to dashboard</a>
    </div>
  </div>

  <script>
    // 🔧 SUPABASE CONFIG
    const supabase = supabaseJs.createClient(
      "YOUR_SUPABASE_URL",
      "YOUR_SUPABASE_ANON_KEY"
    );

    // 👁 Toggle password visibility
    function toggle(id) {
      const input = document.getElementById(id);
      input.type = input.type === "password" ? "text" : "password";
    }

    // 🔑 Verify recovery token on load
    (async function initRecovery() {
      const params = new URLSearchParams(window.location.search);
      const tokenHash = params.get("token_hash");

      if (!tokenHash) {
        showError("Invalid or expired reset link.");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token_hash: tokenHash
      });

      if (error) {
        showError("Invalid or expired reset link.");
      }
    })();

    // 💾 Save new password
    async function savePassword() {
      const btn = document.getElementById("saveBtn");
      const msg = document.getElementById("message");

      const pw1 = document.getElementById("password").value;
      const pw2 = document.getElementById("password2").value;
      const human = document.getElementById("human").checked;

      msg.innerHTML = "";

      if (!human) return showError("Please confirm that you are human.");
      if (pw1.length < 6) return showError("Password must be at least 6 characters.");
      if (pw1 !== pw2) return showError("Passwords do not match.");

      btn.disabled = true;
      btn.textContent = "Saving…";

      try {
        const { error } = await supabase.auth.updateUser({ password: pw1 });
        if (error) throw error;

        btn.textContent = "Password saved";
        showSuccess("Your password has been saved successfully.");
      } catch {
        btn.disabled = false;
        btn.textContent = "Save password";
        showError("Failed to save password.");
      }
    }

    function showError(text) {
      document.getElementById("message").innerHTML =
        `<div class="error">${text}</div>`;
    }

    function showSuccess(text) {
      document.getElementById("message").innerHTML =
        `<div class="success">${text}</div>`;
    }
  </script>
</body>
</html>
