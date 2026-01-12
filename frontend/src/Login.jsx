import { useState } from "react"
import api from "./services/api"

function Login({ setLogado }) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  function fazerLogin(e) {
    e.preventDefault()

    api.post("/auth/login", {
  email: email,
  senha: senha
}).then(response => {
  console.log("Resposta login:", response.data)
  
  const token = response.data.token
  localStorage.setItem("token", token)

  setLogado(true)   // força trocar tela
}).catch(() => {
  alert("Login inválido")
})
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
    </div>
  )
}

export default Login
