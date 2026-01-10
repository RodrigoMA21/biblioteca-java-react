import { useEffect, useState } from "react"
import api from "./services/api"

function App() {

  const [livros, setLivros] = useState([])

  const [titulo, setTitulo] = useState("")
  const [autor, setAutor] = useState("")
  const [anoPublicacao, setAnoPublicacao] = useState("")

  function carregarLivros() {
    api.get("/livros")
      .then(response => {
        setLivros(response.data)
      })
  }

  useEffect(() => {
    carregarLivros()
  }, [])

  function salvarLivro(e) {
    e.preventDefault()

    api.post("/livros", {
      titulo: titulo,
      autor: autor,
      anoPublicacao: Number(anoPublicacao)
    }).then(() => {
      setTitulo("")
      setAutor("")
      setAnoPublicacao("")
      carregarLivros()
    })
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Biblioteca</h1>

      {/* FORMULÁRIO */}
      <form onSubmit={salvarLivro}>
        <input
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />

        <input
          placeholder="Autor"
          value={autor}
          onChange={e => setAutor(e.target.value)}
        />

        <input
          placeholder="Ano de publicação"
          value={anoPublicacao}
          onChange={e => setAnoPublicacao(e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>

      <hr />

      {/* LISTA */}
      {livros.map(livro => (
        <div key={livro.id}>
          <strong>{livro.titulo}</strong> — {livro.autor}
        </div>
      ))}
    </div>
  )
}

export default App
