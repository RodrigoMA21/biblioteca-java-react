import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    nome: localStorage.getItem("nome") || "",
  });

  function login(token, role, nome) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("nome", nome);
    setUser({ token, role, nome });
  }

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("nome");
    setUser({ token: null, role: null, nome: "" });
  }

  return (
    <AuthContext.Provider value={{ user, login, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve estar dentro de AuthProvider");
  return ctx;
}
