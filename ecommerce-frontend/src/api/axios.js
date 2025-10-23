import axios from "axios";

const baseURL = "http://localhost:8000";
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;

    if (tokens?.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const tokens = JSON.parse(localStorage.getItem("tokens"));
      
      try {
        const response = await axiosInstance.post(`${baseURL}/api/auth/token/refresh/`, {
          refresh: tokens.refresh,
        });

        const { access } = response.data;
        localStorage.setItem(
          "tokens",
          JSON.stringify({ ...tokens, access })
        );

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${access}`;
        processQueue(null, access);
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("tokens");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 403) {
      // Handle forbidden errors
      console.error("Access forbidden:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
