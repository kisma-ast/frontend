declare global {
    interface Window {
      Telegram: {
        WebApp: {
          initDataUnsafe: any; // Vous pouvez spécifier un type plus précis si nécessaire
          // Ajoutez d'autres propriétés et méthodes de Telegram.WebApp ici si besoin
        };
      };
    }
  }
  
  export {};
  