import React, { createContext, useContext, useEffect, useState } from 'react';

// Définition du type des données de swap
interface SwapData {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  fromPhone: string;
  toPhone: string;
}

// Définition de l'interface du contexte
interface SwapContextType {
  swapData: SwapData | null;
  setSwapData: (data: SwapData) => void;
}

// Création du contexte
const SwapContext = createContext<SwapContextType | undefined>(undefined);

// Fournisseur du contexte
export const SwapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [swapData, setSwapData] = useState<SwapData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('swapData');
    if (storedData) {
      setSwapData(JSON.parse(storedData));
    }
  }, []);

  const updateSwapData = (data: SwapData) => {
    setSwapData(data);
    localStorage.setItem('swapData', JSON.stringify(data));
  };

  return (
    <SwapContext.Provider value={{ swapData, setSwapData: updateSwapData }}>
      {children}
    </SwapContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useSwapContext = () => {
  const context = useContext(SwapContext);
  if (context === undefined) {
    throw new Error('useSwapContext must be used within a SwapProvider');
  }
  return context;
};
