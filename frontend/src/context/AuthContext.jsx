import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

function getInitialUser() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const nome = localStorage.getItem("nome");
  return { token, role, nome: nome || "" };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  useEffect(() => {
    if (user.token && !user.nome) {
      api.get("/auth/me")
        .then((res) => {
          const { nome, role } = res.data;
          localStorage.setItem("nome", nome);
          localStorage.setItem("role", role);
          setUser((prev) => ({ ...prev, nome, role }));
        })
        .catch(() => {});
    }
  }, []);

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
