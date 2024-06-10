import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Initialize auth token from local storage if it exists
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const isAuth = () => !!authToken;

  const saveAuthToken = (token) => {
    localStorage.setItem("authToken", token); // Save token to local storage
    setAuthToken(token); // Update state
  };

  const clearAuthToken = () => {
    localStorage.removeItem("authToken"); // Clear token from local storage
    setAuthToken(null); // Update state
  };

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken: saveAuthToken, clearAuthToken, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
