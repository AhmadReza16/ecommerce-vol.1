import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    authTokens ? jwtDecode(authTokens.access) : null
  );

  // ⛔ Login function → sends a request to the API
  const loginUser = async (email, password) => {
    const response = await fetch("http://localhost:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("tokens", JSON.stringify(data));
      navigate("/dashboard"); // ✅ ری‌دایرکت بعد از لاگین موفق
    } else {
      alert("ایمیل یا پسورد اشتباهه!");
    }
  };

  // ⛔ function Logout
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("tokens");
    navigate("/login");
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
