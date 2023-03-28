import axios from "axios";

const DOMAIN = "https://tonder.fatcatweb.top";

export const USER = "user";
export const ACCESS_TOKEN = "accessToken";

export const http = axios.create({
  baseURL: DOMAIN,
});

// Cau hinh tat ca request gui di
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    config.headers["Authorization"] = token ? `Bearer ${token}` : "";

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
