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
  CircularProgress,
  Link,
} from "@mui/material";
import { EmailOutlined, ArrowBack, LockReset } from "@mui/icons-material";
import api from "../services/api";
import Footer from "../components/layout/Footer";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(false);

  async function enviar(e) {
    e.preventDefault();
    setMensagem(null);
    setErro(false);
    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMensagem(res.data.message);
    } catch {
      setErro(true);
      setMensagem("Erro ao processar solicitação.");
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
                Recuperar senha
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Digite seu email e enviaremos instruções para redefinir sua senha.
              </Typography>
            </Box>

            {mensagem && (
              <Alert severity={erro ? "error" : "success"} sx={{ mb: 2 }}>
                {mensagem}
              </Alert>
            )}

            <Box component="form" onSubmit={enviar}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={{ fontSize: 20, color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.2, mb: 1.5, fontWeight: 600 }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : "Enviar instruções"}
              </Button>
              <Button
                fullWidth
                variant="text"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/login")}
                sx={{ color: "text.secondary" }}
              >
                Voltar para login
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
