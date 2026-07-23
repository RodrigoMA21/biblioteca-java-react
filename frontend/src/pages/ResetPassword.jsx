import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff, LockReset } from "@mui/icons-material";
import api from "../services/api";
import Footer from "../components/layout/Footer";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  if (!token) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#F8F9FC" }}>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", p: 3 }}>
          <Container maxWidth="xs">
            <Paper sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
              <Alert severity="error" sx={{ mb: 2 }}>
                Link inválido. O token de recuperação não foi encontrado.
              </Alert>
              <Button variant="text" onClick={() => navigate("/login")}>
                Voltar para login
              </Button>
            </Paper>
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }

  async function resetar(e) {
    e.preventDefault();
    setMensagem(null);
    setErro(false);

    if (senha !== confirmarSenha) {
      setErro(true);
      setMensagem("As senhas não conferem.");
      return;
    }

    if (senha.length < 6) {
      setErro(true);
      setMensagem("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, senha });
      setSucesso(true);
      setMensagem("Senha redefinida com sucesso!");
    } catch (err) {
      setErro(true);
      setMensagem(err.response?.data?.message || "Erro ao redefinir senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F8F9FC",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Container maxWidth="xs">
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            <Box textAlign="center" mb={3}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2.5,
                  bgcolor: "rgba(79,70,229,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  color: "#4F46E5",
                }}
              >
                <LockReset sx={{ fontSize: 28 }} />
              </Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 0.5, letterSpacing: "-0.01em" }}
              >
                Redefinir senha
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Digite sua nova senha.
              </Typography>
            </Box>

            {mensagem && (
              <Alert severity={erro ? "error" : "success"} sx={{ mb: 2 }}>
                {mensagem}
              </Alert>
            )}

            <Box component="form" onSubmit={resetar}>
              <TextField
                fullWidth
                label="Nova senha"
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                disabled={sucesso}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ fontSize: 20, color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setMostrarSenha(!mostrarSenha)} edge="end" size="small">
                        {mostrarSenha ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Confirmar nova senha"
                type={mostrarSenha ? "text" : "password"}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                disabled={sucesso}
                sx={{ mb: 2.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ fontSize: 20, color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                }}
              />
              {!sucesso && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.2, mb: 1, fontWeight: 600 }}
                >
                  {loading ? <CircularProgress size={22} color="inherit" /> : "Redefinir senha"}
                </Button>
              )}
              <Button
                fullWidth
                variant="text"
                onClick={() => navigate("/login")}
                sx={{ color: "text.secondary" }}
              >
                {sucesso ? "Ir para login" : "Voltar para login"}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
