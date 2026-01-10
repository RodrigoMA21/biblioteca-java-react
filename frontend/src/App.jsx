import { useEffect, useState } from "react"
import api from "./services/api"

function App() {

  const [livros, setLivros] = useState([])

  const [titulo, setTitulo] = useState("")
  const [autor, setAutor] = useState("")
  const [anoPublicacao, setAnoPublicacao] = useState("")
  const [idEmEdicao, setIdEmEdicao] = useState(null)

  function carregarLivros() {
    api.get("/livros")
      .then(response => {
        setLivros(response.data)
      })
  }

  useEffect(() => {
    carregarLivros()
  }, [])

  function editarLivro(livro) {
    setIdEmEdicao(livro.id)
    setTitulo(livro.titulo)
    setAutor(livro.autor)
    setAnoPublicacao(livro.anoPublicacao)
  }

  function limparFormulario() {
    setTitulo("")
    setAutor("")
    setAnoPublicacao("")
    setIdEmEdicao(null)
  }

  function salvarLivro(e) {
    e.preventDefault()

    const dados = {
      titulo: titulo,
      autor: autor,
      anoPublicacao: Number(anoPublicacao),
      disponivel: true
    }

    if (idEmEdicao) {
      api.put(`/livros/${idEmEdicao}`, dados)
        .then(() => {
          limparFormulario()
          carregarLivros()
        })
    } else {
      api.post("/livros", dados)
        .then(() => {
          limparFormulario()
          carregarLivros()
        })
    }
  }

  function excluirLivro(id) {
    api.delete(`/livros/${id}`)
      .then(() => {
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

        <button type="submit">
          {idEmEdicao ? "Atualizar" : "Salvar"}
        </button>

        {idEmEdicao && (
          <button 
            type="button" 
            onClick={limparFormulario}
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </button>
        )}
      </form>

      <hr />

      {/* LISTA */}
      {livros.map(livro => (
        <div key={livro.id} style={{ marginBottom: "10px" }}>
          <strong>{livro.titulo}</strong> — {livro.autor} ({livro.anoPublicacao})

          <button 
            style={{ marginLeft: "10px" }}
            onClick={() => editarLivro(livro)}
          >
            Editar
          </button>

          <button 
            style={{ marginLeft: "10px" }}
            onClick={() => excluirLivro(livro.id)}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
