import { useState } from "react";
import api from "./services/api";

function Login({ setUser, irCadastro }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function fazerLogin(e) {
    e.preventDefault();

    api.post("/auth/login", { email, senha })
      .then(response => {
        console.log("Resposta login:", response.data);

        const { token, role } = response.data;

        // salva token + role no localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        // atualiza estado global/contexto
        setUser({ token, role });
      })
      .catch(() => {
        alert("Login inválido");
      });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={fazerLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Não tem conta?{" "}
        <button onClick={irCadastro}>
          Criar conta
        </button>
      </p>
    </div>
  );
}

export default Login;
