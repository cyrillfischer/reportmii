// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";

// 🔐 Auth Context
import { AuthProvider } from "./contexts/AuthContext";

// 🧑‍💼 User Profile Context
import { UserProvider } from "./contexts/UserContext";

// 🌍 Language Context
import { LanguageProvider } from "./contexts/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
