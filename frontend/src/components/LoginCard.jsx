import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, EmailOutlined, LockOutlined, PersonOutline } from "@mui/icons-material";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function LoginCard() {
  const { login, entrarComoConvidado } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function fazerLogin(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, senha });
      const { token, role, nome } = response.data;
      login(token, role, nome);
    } catch {
      setErro("Email ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box component="form" onSubmit={fazerLogin} width="100%">
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 0.5,
          letterSpacing: "-0.02em",
        }}
      >
        Bem-vindo
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        mb={3}
      >
        Entre com sua conta para continuar
      </Typography>

      {erro && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {erro}
        </Alert>
      )}

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
        sx={{ mb: 0.5 }}
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
                {mostrarSenha ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box textAlign="right" mb={2.5}>
        <Link
          component="button"
          type="button"
          variant="body2"
          onClick={() => navigate("/esqueci-senha")}
          sx={{ color: "primary.main", fontWeight: 500, cursor: "pointer" }}
        >
          Esqueceu sua senha?
        </Link>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{ py: 1.2, mb: 2, fontWeight: 600 }}
      >
        {loading ? <CircularProgress size={22} color="inherit" /> : "Entrar"}
      </Button>

      <Typography variant="body2" textAlign="center" color="text.secondary">
        Não tem uma conta?{" "}
        <Link
          component="button"
          onClick={() => navigate("/cadastro")}
          sx={{ fontWeight: 600, cursor: "pointer" }}
        >
          Criar conta
        </Link>
      </Typography>

      <Divider sx={{ my: 2.5, color: "text.disabled", fontSize: "0.8rem" }}>
        ou
      </Divider>

      <Button
        fullWidth
        variant="outlined"
        size="large"
        startIcon={<PersonOutline />}
        onClick={() => entrarComoConvidado()}
        sx={{ py: 1.2, fontWeight: 500, color: "text.secondary", borderColor: "rgba(0,0,0,0.12)" }}
      >
        Entrar como convidado
      </Button>
    </Box>
  );
}
