import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

function getEmailFromToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.sub || "";
  } catch {
    return "";
  }
}

function getInitialUser() {
  const guest = localStorage.getItem("guest") === "true";
  if (guest) {
    return { guest: true, token: null, role: null, nome: "Convidado", email: "" };
  }
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const raw = localStorage.getItem("nome");
  const nome = raw && raw !== "undefined" ? raw : "";
  const email = getEmailFromToken(token);
  return { guest: false, token, role, nome, email };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  useEffect(() => {
    if (user.token && !user.nome) {
      api.get("/auth/me")
        .then((res) => {
          const { nome, role, email } = res.data;
          localStorage.setItem("nome", nome || "");
          localStorage.setItem("role", role);
          setUser((prev) => ({ ...prev, nome: nome || "", role, email: email || prev.email }));
        })
        .catch(() => {});
    }
  }, []);

  function login(token, role, nome) {
    localStorage.removeItem("guest");
    const nomeSafe = nome || "";
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("nome", nomeSafe);
    setUser({ guest: false, token, role, nome: nomeSafe, email: getEmailFromToken(token) });
  }

  function entrarComoConvidado() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("nome");
    localStorage.setItem("guest", "true");
    setUser({ guest: true, token: null, role: null, nome: "Convidado", email: "" });
  }

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("nome");
    localStorage.removeItem("guest");
    setUser({ guest: false, token: null, role: null, nome: "", email: "" });
  }

  return (
    <AuthContext.Provider value={{ user, login, entrarComoConvidado, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve estar dentro de AuthProvider");
  return ctx;
}
