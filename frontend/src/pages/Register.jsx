import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Link,
} from "@mui/material";
import {
  PersonOutlined,
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
  AutoStories as BooksIcon,
} from "@mui/icons-material";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function cadastrar(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      await api.post("/auth/register", { nome, email, senha });
      navigate("/login");
    } catch {
      setErro("Erro ao cadastrar. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#F8F9FC",
      }}
    >
      {/* Left - Branding */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#0F172A",
          color: "#fff",
          p: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-50%",
            right: "-30%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)",
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 440, textAlign: "center" }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              bgcolor: "#4F46E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
              mx: "auto",
            }}
          >
            <BooksIcon sx={{ fontSize: 32, color: "#fff" }} />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Crie sua conta
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            Junte-se à comunidade e tenha acesso a livros de domínio público
            gratuitamente.
          </Typography>
        </Box>
      </Box>

      {/* Right - Form */}
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
            <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", justifyContent: "center", gap: 1.5, mb: 3 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BooksIcon sx={{ fontSize: 20, color: "#fff" }} />
              </Box>
              <Typography fontWeight={700} fontSize="1.1rem">
                Biblioteca Digital
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                textAlign: "center",
                mb: 0.5,
                letterSpacing: "-0.02em",
              }}
            >
              Criar conta
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Preencha os dados para se cadastrar
            </Typography>

            {erro && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {erro}
              </Alert>
            )}

            <Box component="form" onSubmit={cadastrar} width="100%">
              <TextField
                fullWidth
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined sx={{ fontSize: 20, color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={{ fontSize: 20, color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Senha"
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ fontSize: 20, color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        edge="end"
                        size="small"
                      >
                        {mostrarSenha ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.2, mb: 2, fontWeight: 600 }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : "Criar conta"}
              </Button>
              <Typography variant="body2" textAlign="center" color="text.secondary">
                Já tem uma conta?{" "}
                <Link
                  component="button"
                  onClick={() => navigate("/login")}
                  sx={{ fontWeight: 600, cursor: "pointer" }}
                >
                  Fazer login
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
