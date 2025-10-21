// src/api/axios.js
import axios from "axios";

const baseURL = "http://localhost:8000"; // آدرس سرور Django

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// این بخش برای اضافه کردن توکن قبل از هر درخواست
axiosInstance.interceptors.request.use((config) => {
  const tokens = localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens"))
    : null;

  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }

  return config;
});

export default axiosInstance;
