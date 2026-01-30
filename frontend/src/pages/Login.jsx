import { Grid, Box, Typography, Container } from "@mui/material"
import LoginCard from "../components/LoginCard"

export default function Login({ setUser, irCadastro }) {
  return (
    <Grid container minHeight="100vh" bgcolor="#121212">
      {/* TEXTO */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={6}
      >
        <Box maxWidth={500}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            📚 Biblioteca Comunitária Digital 
          </Typography>

          <Typography variant="h6" color="text.secondary" paragraph>
            Acesso gratuito a livros de domínio público para estudo,
            pesquisa e desenvolvimento pessoal.
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Um projeto open-source criado para fortalecer a comunidade
            e democratizar o conhecimento por meio da tecnologia.
          </Typography>
        </Box>
      </Grid>

      {/* LOGIN */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <LoginCard
            setUser={setUser}
            irCadastro={irCadastro}
          />
        </Container>
      </Grid>
    </Grid>
  )
}
