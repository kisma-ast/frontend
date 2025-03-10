// src/index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import App from "./App";
import { TelegramWebApp } from "react-telegram-webapp";
import i18n from "./i18n/i18n";
import { I18nextProvider } from "react-i18next";
import { AuthProvider } from "./contexts/AuthContext";
import { setupAxiosInterceptors } from "./services/authService";

// Initialize axios interceptors
setupAxiosInterceptors();

async function validateHash() {
  return true;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
      
          <App />
        
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>
);
