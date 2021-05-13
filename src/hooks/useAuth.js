import React, { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const AuthToken = createContext("");

export function TokenProvider({ children }) {
  const [token, setToken] = useState("");

  async function getToken({ email, password }) {
    await api
      .post("/user/login", {
        email,
        password,
      })
      .then(({ headers }) => {
        localStorage.setItem("@FGAConnect:Token", headers.authtoken);
        setToken(headers.authtoken);
        window.location.reload();
      });
  }

  return (
    <AuthToken.Provider value={{ token, getToken }}>
      {children}
    </AuthToken.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthToken);
  return context;
}
