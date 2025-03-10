// src/services/authService.ts

import axios from "axios";

const API_URL =
  process.env.REACT_APP_TEST === "1"
    ? process.env.REACT_APP_BACKEND_URL_NGROK
    : process.env.REACT_APP_BACKEND_URL_NET;

interface TelegramAuthData {
  id: string;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  // Regular email/password login
  login: async (credentials: LoginCredentials) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    if (response.data.token) {
      authService.setSession(response.data);
    }
    return response.data;
  },

  // Telegram authentication
  telegramAuth: async (telegramData: TelegramAuthData) => {
    const response = await axios.post(
      `${API_URL}/api/auth/telegram`,
      telegramData
    );
    if (response.data.token) {
      authService.setSession(response.data);
    }
    return response.data;
  },

  // Get current user profile
  me: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`);
      return response;
    } catch (error) {
      authService.clearSession();
      throw error;
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          `${API_URL}/api/auth/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      authService.clearSession();
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    console.log("==========> !!(token && user)",!!(token && user))
    return !!(token && user);
  },

  // Get current user
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Set auth session
  setSession: (data: { token: string; user: any }) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  },

  // Clear auth session
  clearSession: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Get auth header
  getAuthHeader: () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

export const setupAxiosInterceptors = () => {
  // Request interceptor
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers["ngrok-skip-browser-warning"] = "true";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        authService.clearSession();
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
      return Promise.reject(error);
    }
  );

  // Set base URL
  axios.defaults.baseURL = API_URL;
};

// Export types for use in components
export type { TelegramAuthData, LoginCredentials };
