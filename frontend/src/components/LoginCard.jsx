import { useState } from "react"
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Paper
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import api from "../services/api"

export default function LoginCard({ setUser, irCadastro }) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  function fazerLogin(e) {
    e.preventDefault()

    api.post("/auth/login", { email, senha })
      .then(response => {
        const { token, role } = response.data

        localStorage.setItem("token", token)
        localStorage.setItem("role", role)

        setUser({ token, role })
      })
      .catch(() => {
        alert("Login inválido")
      })
  }

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 420,
        bgcolor: "#2a2a2a"
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5" mb={3}>
          Login
        </Typography>

        <Box component="form" onSubmit={fazerLogin} width="100%">
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>

          <Button
            fullWidth
            variant="text"
            onClick={irCadastro}
          >
            Criar conta
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
