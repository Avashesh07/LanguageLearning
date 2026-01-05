import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SteamDeckContextType {
  isSteamDeckMode: boolean;
  toggleSteamDeckMode: () => void;
  setSteamDeckMode: (enabled: boolean) => void;
}

const SteamDeckContext = createContext<SteamDeckContextType | undefined>(undefined);

const STORAGE_KEY = 'finnish-steam-deck-mode';

export function SteamDeckProvider({ children }: { children: ReactNode }) {
  const [isSteamDeckMode, setIsSteamDeckMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isSteamDeckMode));
    } catch {
      // Ignore storage errors
    }
  }, [isSteamDeckMode]);

  const toggleSteamDeckMode = () => {
    setIsSteamDeckMode(prev => !prev);
  };

  const setSteamDeckMode = (enabled: boolean) => {
    setIsSteamDeckMode(enabled);
  };

  return (
    <SteamDeckContext.Provider value={{ isSteamDeckMode, toggleSteamDeckMode, setSteamDeckMode }}>
      {children}
    </SteamDeckContext.Provider>
  );
}

export function useSteamDeck() {
  const context = useContext(SteamDeckContext);
  if (context === undefined) {
    throw new Error('useSteamDeck must be used within a SteamDeckProvider');
  }
  return context;
}



