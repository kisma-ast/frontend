// src/components/common/ui/TelegramLoginButton.tsx

import React, { useEffect, useRef } from "react";

interface TelegramLoginButtonProps {
  botName: string;
  onAuth: (user: any) => void;
  buttonSize?: "large" | "medium" | "small";
  cornerRadius?: number;
  requestAccess?: boolean;
}

const TelegramLoginButton: React.FC<TelegramLoginButtonProps> = ({
  botName,
  onAuth,
  buttonSize = "small",
  cornerRadius = 8,
  requestAccess = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!botName) {
      console.error("Bot name is not configured!");
      return;
    }

    // Clean bot name (remove @ if present)
    const cleanBotName = botName.replace("@", "");

    // Add Telegram widget script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", cleanBotName);
    script.setAttribute("data-size", buttonSize);
    script.setAttribute("data-radius", cornerRadius.toString());
    script.setAttribute("data-request-access", requestAccess.toString());
    script.setAttribute("data-userpic", "false");
    script.async = true;

    // Define callback function
    const callbackName = "onTelegramAuth" + Date.now();
    (window as any)[callbackName] = (user: any) => {
      onAuth(user);
    };
    script.setAttribute("data-onauth", `${callbackName}(user)`);

    // Add script to container
    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Clear previous content
      containerRef.current.appendChild(script);
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      delete (window as any)[callbackName];
    };
  }, [botName, onAuth, buttonSize, cornerRadius, requestAccess]);

  if (!botName) {
    return (
      <div className="text-red-500">
        Telegram bot not configured. Please check your environment variables.
      </div>
    );
  }

  return <div ref={containerRef} className="telegram-login-button"></div>;
};

export default TelegramLoginButton;
