import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  InputAdornment,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  LibraryBooks as EmptyIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import BookCard from "../components/ui/BookCard";

export default function Livros() {
  const { user } = useAuth();
  const isAdmin = user.role === "ADMIN";

  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [salvando, setSalvando] = useState(false);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const carregarLivros = useCallback(async () => {
    try {
      const res = await api.get("/livros");
      setLivros(res.data);
    } catch {
      setSnackbar({ open: true, message: "Erro ao carregar livros", severity: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarLivros();
  }, [carregarLivros]);

  const filtered = livros.filter(
    (l) =>
      l.titulo?.toLowerCase().includes(search.toLowerCase()) ||
      l.autor?.toLowerCase().includes(search.toLowerCase())
  );

  // Modal handlers
  function abrirModal(livro = null) {
    if (livro) {
      setEditando(livro.id);
      setTitulo(livro.titulo);
      setAutor(livro.autor);
      setAnoPublicacao(String(livro.anoPublicacao));
    } else {
      setEditando(null);
      setTitulo("");
      setAutor("");
      setAnoPublicacao("");
    }
    setModalOpen(true);
  }

  async function salvarLivro(e) {
    e.preventDefault();
    setSalvando(true);
    const dados = { titulo, autor, anoPublicacao: Number(anoPublicacao), disponivel: true };

    try {
      if (editando) {
        await api.put(`/livros/${editando}`, dados);
        setSnackbar({ open: true, message: "Livro atualizado!", severity: "success" });
      } else {
        await api.post("/livros", dados);
        setSnackbar({ open: true, message: "Livro cadastrado!", severity: "success" });
      }
      setModalOpen(false);
      carregarLivros();
    } catch {
      setSnackbar({ open: true, message: "Erro ao salvar livro", severity: "error" });
    } finally {
      setSalvando(false);
    }
  }

  async function excluirLivro() {
    try {
      await api.delete(`/livros/${deleteTarget.id}`);
      setSnackbar({ open: true, message: "Livro excluído!", severity: "success" });
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
      carregarLivros();
    } catch {
      setSnackbar({ open: true, message: "Erro ao excluir livro", severity: "error" });
    }
  }

  async function uploadPdf(livroId, file) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await api.post(`/livros/${livroId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnackbar({ open: true, message: "PDF enviado!", severity: "success" });
      carregarLivros();
    } catch {
      setSnackbar({ open: true, message: "Erro ao enviar PDF", severity: "error" });
    }
  }

  async function uploadCapa(livroId, file) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await api.post(`/livros/${livroId}/uploadCapa`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnackbar({ open: true, message: "Capa enviada!", severity: "success" });
      carregarLivros();
    } catch {
      setSnackbar({ open: true, message: "Erro ao enviar capa", severity: "error" });
    }
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.25 }}>
            Acervo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {loading ? "Carregando..." : `${livros.length} livro${livros.length !== 1 ? "s" : ""} no acervo`}
          </Typography>
        </Box>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => abrirModal()}
            sx={{ height: 44, whiteSpace: "nowrap" }}
          >
            Adicionar livro
          </Button>
        )}
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Buscar por título ou autor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.disabled" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Loading */}
      {loading && (
        <Grid container spacing={2.5}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={i} sx={{ display: "flex" }}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.04)",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ pt: "140%", bgcolor: "#F3F4F6", flexShrink: 0 }} />
                <Box sx={{ p: 1.5, flex: 1 }}>
                  <Box sx={{ height: 14, bgcolor: "#F3F4F6", borderRadius: 1, mb: 1, width: "80%" }} />
                  <Box sx={{ height: 12, bgcolor: "#F3F4F6", borderRadius: 1, width: "60%" }} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <Box textAlign="center" py={8}>
          {search ? (
            <>
              <SearchIcon sx={{ fontSize: 56, color: "text.disabled", mb: 1.5 }} />
              <Typography variant="h6" color="text.secondary" mb={0.5}>
                Nenhum resultado encontrado
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Tente buscar por outro termo.
              </Typography>
            </>
          ) : (
            <>
              <EmptyIcon sx={{ fontSize: 56, color: "text.disabled", mb: 1.5 }} />
              <Typography variant="h6" color="text.secondary" mb={0.5}>
                Acervo vazio
              </Typography>
              <Typography variant="body2" color="text.disabled" mb={2}>
                Nenhum livro cadastrado ainda.
              </Typography>
              {isAdmin && (
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => abrirModal()}>
                  Adicionar primeiro livro
                </Button>
              )}
            </>
          )}
        </Box>
      )}

      {/* Books grid */}
      {!loading && filtered.length > 0 && (
        <Grid container spacing={2.5}>
          {filtered.map((livro) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={livro.id} sx={{ display: "flex" }}>
              <BookCard
                livro={livro}
                onEdit={(l) => abrirModal(l)}
                onDelete={(l) => {
                  setDeleteTarget(l);
                  setDeleteDialogOpen(true);
                }}
                onPdfUpload={uploadPdf}
                onCapaUpload={uploadCapa}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 0 },
        }}
      >
        <Box component="form" onSubmit={salvarLivro}>
          <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
            {editando ? "Editar livro" : "Adicionar livro"}
          </DialogTitle>
          <DialogContent sx={{ pb: 1 }}>
            <TextField
              fullWidth
              label="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              sx={{ mt: 1, mb: 2 }}
            />
            <TextField
              fullWidth
              label="Autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Ano de publicação"
              type="number"
              value={anoPublicacao}
              onChange={(e) => setAnoPublicacao(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setModalOpen(false)} variant="outlined">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" disabled={salvando}>
              {salvando ? <CircularProgress size={20} /> : editando ? "Atualizar" : "Salvar"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 600 }}>
          <WarningIcon color="error" />
          Confirmar exclusão
        </DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir <strong>{deleteTarget?.titulo}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={excluirLivro} variant="contained" color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          variant="standard"
          sx={{ borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
