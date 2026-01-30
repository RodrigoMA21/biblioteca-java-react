import { useState } from "react"
import api from "../services/api"

function Register({ onRegisterSuccess }) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  function cadastrar(e) {
    e.preventDefault()

    api.post("/auth/register", {
      nome: nome,
      email: email,
      senha: senha
    }).then(() => {
      alert("Usuário cadastrado com sucesso!")
      onRegisterSuccess()
    }).catch(() => {
      alert("Erro ao cadastrar usuário")
    })
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastro</h2>

      <form onSubmit={cadastrar}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

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

        <button type="submit">Cadastrar</button>
      </form>

      <p>
        Já tem conta?{" "}
        <button onClick={onRegisterSuccess}>Voltar para Login</button>
      </p>
    </div>
  )
}

export default Register
