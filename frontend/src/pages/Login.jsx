import { Box, Container, Typography, Paper } from "@mui/material";
import { AutoStories as BooksIcon } from "@mui/icons-material";
import LoginCard from "../components/LoginCard";
import Footer from "../components/layout/Footer";

export default function Login() {
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
            background: "radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)",
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
            Biblioteca Comunitária Digital
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            Acesso gratuito a livros de domínio público para estudo, pesquisa e desenvolvimento pessoal.
          </Typography>
        </Box>
      </Box>

      {/* Right - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
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
              {/* Mobile branding */}
              <Box
                sx={{
                  display: { xs: "block", md: "none" },
                  textAlign: "center",
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: "#4F46E5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1.5,
                  }}
                >
                  <BooksIcon sx={{ fontSize: 24, color: "#fff" }} />
                </Box>
                <Typography
                  fontWeight={700}
                  fontSize="1.1rem"
                  sx={{ mb: 0.5, color: "text.primary" }}
                >
                  Biblioteca Comunitária Digital
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Acesso gratuito a livros de domínio público para estudo,
                  pesquisa e desenvolvimento pessoal.
                </Typography>
              </Box>

              <LoginCard />
            </Paper>
          </Container>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
