// src/contexts/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  authService,
  type TelegramAuthData,
  type LoginCredentials,
} from "../services/authService";


interface User {
  id: number;
  email: string;
  fullname: string;
  role?: Role;
  telegramId?: string;
}
interface Role{
  caption :string,
  id: number
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  telegramAuth: (data: TelegramAuthData) => Promise<Boolean>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  updateAuthState: (token: string, user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authCheckRef = useRef<boolean>(false);
  const initRef = useRef(false);

  const updateAuthState = useCallback((token: string, user: User) => {
    // Store the token (you might want to use a secure storage method)
    localStorage.setItem("token", token);

    // Update the user data
    setUser(user);

    // Update authentication state
    setIsAuthenticated(true);
  }, []);

  const checkAuth = useCallback(async () => {
    if (authCheckRef.current || user) return true;
    try {
      authCheckRef.current = true;
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      } else {
      }

      // Only make API call if we don't have user data
      if (!user) {
        const response = await authService.me();
        if (response) {
          // Get the stored user data to access telegramId
          const storedUser = localStorage.getItem("user");
          let enrichedUser = response.data;

          if (storedUser) {
            const parsedStoredUser = JSON.parse(storedUser);
            // Enrich the user data with telegramId from localStorage
            enrichedUser = {
              ...response.data,
              telegramId: parsedStoredUser.telegramId || "",
            };
          }

          setUser(enrichedUser);
          setIsAuthenticated(true);

          return true;
        }
      } else {
        return true;
      }

      return false;
    } catch (error) {
      console.error("Auth check failed:", error);
      return false;
    } finally {
      authCheckRef.current = false;
    }
  }, [user]);

  useEffect(() => {
    if (!initRef.current) {
      const initAuth = async () => {
        try {
          await checkAuth();
        } finally {
          setIsLoading(false);
          initRef.current = true;
        }
      };
      initAuth();
    }
  }, [checkAuth]);

  const telegramAuth = async (telegramData: TelegramAuthData) => {
    try {
      setIsLoading(true);
      const response = await authService.telegramAuth(telegramData);
      if (response.token) {
        localStorage.setItem("token", response.token.token);
        setUser(response.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Telegram auth failed:", error);
      localStorage.removeItem("token");
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
      //return false;
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    telegramAuth,
    login,
    logout,
    checkAuth,
    updateAuthState,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Type exports for use in components
export type { User, AuthContextType };
