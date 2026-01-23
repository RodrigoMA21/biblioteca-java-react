import { useEffect, useState } from "react";
import api from "./services/api";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [user, setUser] = useState({
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null
  });

  const [telaCadastro, setTelaCadastro] = useState(false);
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  // ======= Carregar livros =======
  async function carregarLivros() {
    try {
      const res = await api.get("/livros");
      setLivros(res.data);
    } catch {
      alert("Erro ao carregar livros. Faça login novamente.");
      sair();
    }
  }

  useEffect(() => {
    if (user.token) carregarLivros();
  }, [user.token]);

  // ======= Logout =======
  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser({ token: null, role: null });
  }

  // ======= Formulário =======
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

  async function salvarLivro(e) {
    e.preventDefault();
    const dados = {
      titulo,
      autor,
      anoPublicacao: Number(anoPublicacao),
      disponivel: true
    };

    try {
      if (idEmEdicao) {
        await api.put(`/livros/${idEmEdicao}`, dados);
      } else {
        await api.post("/livros", dados);
      }
      limparFormulario();
      carregarLivros();
    } catch {
      alert("Erro ao salvar livro");
    }
  }

  async function excluirLivro(id) {
    try {
      await api.delete(`/livros/${id}`);
      carregarLivros();
    } catch {
      alert("Erro ao excluir livro");
    }
  }

  // ======= Upload PDF =======
  async function uploadPdf(livroId) {
    const input = document.getElementById(`file-${livroId}`);
    const file = input.files[0];
    if (!file) return alert("Escolha um PDF");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(`/livros/${livroId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("PDF enviado!");
      carregarLivros();
      input.value = "";
    } catch {
      alert("Erro ao enviar PDF");
    }
  }

  // ======= Upload Capa =======
  async function uploadCapa(livroId) {
    const input = document.getElementById(`capa-${livroId}`);
    const file = input.files[0];
    if (!file) return alert("Escolha uma imagem");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(`/livros/${livroId}/uploadCapa`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Capa enviada!");
      carregarLivros();
      input.value = "";
    } catch {
      alert("Erro ao enviar capa");
    }
  }

  // ======= Telas Login / Registro =======
  if (!user.token) {
    return telaCadastro
      ? <Register onRegisterSuccess={() => setTelaCadastro(false)} />
      : <Login setUser={setUser} irCadastro={() => setTelaCadastro(true)} />;
  }

  // ======= Render =======
  return (
    <div style={{
      padding: "20px",
      minHeight: "100vh",
      width: "100vw",
      backgroundImage: 'url("/fundo.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      overflowX: "hidden"
    }}>

      <h1 style={{ textAlign: "center", color: "#fff" }}>📚 Biblioteca</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={sair}>Sair</button>
      </div>

      {user.role === "ADMIN" && (
        <form onSubmit={salvarLivro} style={{ textAlign: "center", marginBottom: "30px" }}>
          <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
          <input placeholder="Autor" value={autor} onChange={e => setAutor(e.target.value)} />
          <input placeholder="Ano" value={anoPublicacao} onChange={e => setAnoPublicacao(e.target.value)} />
          <button type="submit">{idEmEdicao ? "Atualizar" : "Salvar"}</button>
        </form>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {livros.map(livro => (
          <div key={livro.id} style={{
            width: "180px",
            backgroundColor: "#0ea7ee",
            padding: "10px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
          }}>

            {livro.capaUrl ? (
              <img
                src={livro.capaUrl}
                alt={livro.titulo}
                style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "5px" }}
              />
            ) : (
              <div style={{
                width: "100%",
                height: "220px",
                backgroundColor: "#ddd",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>Sem capa</div>
            )}

            <h4>{livro.titulo}</h4>
            <p>{livro.autor}</p>
            <p>({livro.anoPublicacao})</p>

            {user.role === "ADMIN" && (
              <>
                <button onClick={() => editarLivro(livro)}>Editar</button>
                <button onClick={() => excluirLivro(livro.id)}>Excluir</button>

                <input type="file" accept="application/pdf" id={`file-${livro.id}`} />
                <button onClick={() => uploadPdf(livro.id)}>Enviar PDF</button>

                <input type="file" accept="image/*" id={`capa-${livro.id}`} />
                <button onClick={() => uploadCapa(livro.id)}>Enviar Capa</button>
              </>
            )}

            {livro.pdfUrl && (
              <button
                onClick={() => window.open(livro.pdfUrl, "_blank")}
                style={{ marginTop: "5px" }}
              >
                📄 Abrir PDF
              </button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
