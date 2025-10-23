import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axiosInstance from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useState(() => {
    try {
      return localStorage.getItem("tokens")
        ? JSON.parse(localStorage.getItem("tokens"))
        : null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      return authTokens ? jwtDecode(authTokens.access) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("tokens");
    navigate("/login");
  }, [navigate]);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    try {
      const response = await axiosInstance.post("/api/auth/token/refresh/", {
        refresh: authTokens?.refresh,
      });

      const data = response.data;
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("tokens", JSON.stringify(data));
      return data;
    } catch {
      logoutUser();
      return null;
    }
  }, [authTokens?.refresh, logoutUser]);

  // Check token expiration
  useEffect(() => {
    if (loading) setLoading(false);

    const fourMinutes = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (authTokens) {
        refreshToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading, refreshToken]);

  const loginUser = async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/auth/login/", {
        email,
        password,
      });

      const data = response.data;
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("tokens", JSON.stringify(data));
        navigate("/dashboard");
        return { ok: true };
      } else {
        return { ok: false, message: data.detail || "Login failed" };
      }
    } catch {
      return { ok: false, message: "Network error" };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, authTokens, loginUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
