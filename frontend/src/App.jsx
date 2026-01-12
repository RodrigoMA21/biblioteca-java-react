import { useEffect, useState } from "react";
import api from "./services/api";
import Login from "./Login";
import Register from "./Register";

function App() {
  // Estado global do usuário
  const [user, setUser] = useState({
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null
  });

  const [telaCadastro, setTelaCadastro] = useState(false);

  // Livros e formulário
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  // ======= Funções =======
  function carregarLivros() {
    api.get("/livros")
      .then(res => setLivros(res.data))
      .catch(() => {
        alert("Erro ao carregar livros. Faça login novamente.");
        sair();
      });
  }

  useEffect(() => {
    if (user.token) carregarLivros();
  }, [user.token]);

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser({ token: null, role: null });
  }

  function editarLivro(livro) {
    setIdEmEdicao(livro.id);
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setAnoPublicacao(livro.anoPublicacao);
  }

  function limparFormulario() {
    setTitulo("");
    setAutor("");
    setAnoPublicacao("");
    setIdEmEdicao(null);
  }

  function salvarLivro(e) {
    e.preventDefault();

    const dados = {
      titulo,
      autor,
      anoPublicacao: Number(anoPublicacao),
      disponivel: true
    };

    if (idEmEdicao) {
      api.put(`/livros/${idEmEdicao}`, dados)
        .then(() => {
          limparFormulario();
          carregarLivros();
        });
    } else {
      api.post("/livros", dados)
        .then(() => {
          limparFormulario();
          carregarLivros();
        });
    }
  }

  function excluirLivro(id) {
    api.delete(`/livros/${id}`)
      .then(() => carregarLivros());
  }

  // Upload de PDF (apenas ADMIN)
  function uploadPdf(livroId) {
    const input = document.getElementById(`file-${livroId}`);
    const file = input.files[0];

    if (!file) {
      alert("Escolha um arquivo PDF para enviar");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    api.post(`/livros/${livroId}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(() => {
      alert("PDF enviado com sucesso!");
      carregarLivros();
      input.value = "";
    })
    .catch(() => alert("Erro ao enviar PDF"));
  }

  // Download PDF
  function baixarPdf(filename) {
    const url = `${api.defaults.baseURL}/livros/download/${filename}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  // ======= Telas não logado =======
  if (!user.token) {
    if (telaCadastro) {
      return <Register onRegisterSuccess={() => setTelaCadastro(false)} />;
    }
    return <Login setUser={setUser} irCadastro={() => setTelaCadastro(true)} />;
  }

  // ======= App principal logado =======
  return (
    <div
      style={{
        padding: "20px",
        backgroundImage: 'url("/fundo.png")', // fundo da página
        backgroundSize: "cover",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ textAlign: "center", color: "#fff" }}>📚 Biblioteca</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={sair}>Sair</button>
      </div>

      {/* Formulário só para ADMIN */}
      {user.role === "ADMIN" && (
        <form onSubmit={salvarLivro} style={{ marginBottom: "30px", textAlign: "center" }}>
          <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
          <input placeholder="Autor" value={autor} onChange={e => setAutor(e.target.value)} />
          <input placeholder="Ano" value={anoPublicacao} onChange={e => setAnoPublicacao(e.target.value)} />
          <button type="submit">{idEmEdicao ? "Atualizar" : "Salvar"}</button>
        </form>
      )}

      {/* Lista de livros estilo vitrine */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {livros.map(livro => (
          <div
            key={livro.id}
            style={{
              width: "180px",
              backgroundColor: "#0ea7ee",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {/* Capa do livro */}
            {livro.capaUrl ? (
              <img src={livro.capaUrl} alt={livro.titulo} style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "5px" }} />
            ) : (
              <div style={{ width: "100%", height: "220px", backgroundColor: "#ddd", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                Sem capa
              </div>
            )}

            <h4 style={{ margin: "10px 0 5px 0" }}>{livro.titulo}</h4>
            <p style={{ margin: "0 0 5px 0", fontSize: "0.9em" }}>{livro.autor}</p>
            <p style={{ margin: "0 0 10px 0", fontSize: "0.8em" }}>({livro.anoPublicacao})</p>

            {/* Botões ADMIN */}
            {user.role === "ADMIN" && (
              <>
                <button onClick={() => editarLivro(livro)}>Editar</button>
                <button onClick={() => excluirLivro(livro.id)}>Excluir</button>
                <input type="file" accept="application/pdf" id={`file-${livro.id}`} style={{ marginTop: "5px" }} />
                <button onClick={() => uploadPdf(livro.id)}>Enviar PDF</button>
              </>
            )}

            {/* Download PDF */}
            {livro.pdfUrl && (
              <button onClick={() => baixarPdf(livro.pdfUrl.split("/").pop())} style={{ marginTop: "5px" }}>
                📄 Baixar PDF
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
