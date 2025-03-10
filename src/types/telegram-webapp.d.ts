interface TelegramMainButton {
  setText: (text: string) => void;
  show: () => void;
  hide: () => void;

  enable: () => void;
  disable: () => void;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  initDataUnsafe: any;
  BackButton: {
    show: () => void;
    hide: () => void;
  };
  MainButton: TelegramMainButton; // Ajoute cette ligne pour définir MainButton
  showAlert: (message: string) => void;
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp; }; }