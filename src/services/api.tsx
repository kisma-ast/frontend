import axios from "axios";
import { TokenService } from "./token";
import { BASE_URL } from "@/constant/app-constant";

const instance = axios.create({
  baseURL: `${BASE_URL}`,

  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

instance.interceptors.request.use(
  (config:any) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
