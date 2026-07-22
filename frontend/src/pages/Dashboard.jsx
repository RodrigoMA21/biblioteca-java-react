import { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper, Skeleton } from "@mui/material";
import {
  AutoStories as BooksIcon,
  CheckCircle as AvailableIcon,
  SwapHoriz as LoanIcon,
  People as UsersIcon,
  TrendingUp as TrendingIcon,
  MenuBook as PopularIcon,
} from "@mui/icons-material";
import api from "../services/api";
import StatsCard from "../components/ui/StatsCard";

export default function Dashboard() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/livros")
      .then((res) => setLivros(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: livros.length,
    disponiveis: livros.filter((l) => l.disponivel).length,
    indisponiveis: livros.filter((l) => !l.disponivel).length,
    comPdf: livros.filter((l) => l.pdfUrl).length,
    comCapa: livros.filter((l) => l.capaUrl).length,
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Carregando...
        </Typography>
        <Grid container spacing={2.5}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Skeleton variant="rounded" height={100} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Visão geral do acervo da biblioteca
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={<BooksIcon />}
            label="Total de livros"
            value={stats.total}
            color="#4F46E5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={<AvailableIcon />}
            label="Disponíveis"
            value={stats.disponiveis}
            color="#10B981"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={<LoanIcon />}
            label="Indisponíveis"
            value={stats.indisponiveis}
            color="#F59E0B"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={<TrendingIcon />}
            label="Com PDF"
            value={stats.comPdf}
            color="#0EA5E9"
          />
        </Grid>
      </Grid>

      {/* Recent books */}
      <Paper sx={{ mt: 3, p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Livros adicionados recentemente
        </Typography>
        {livros.length === 0 ? (
          <Box textAlign="center" py={4}>
            <BooksIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
            <Typography color="text.secondary">
              Nenhum livro cadastrado ainda.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {livros.slice(-6).reverse().map((livro) => (
              <Grid item xs={6} sm={4} md={2} key={livro.id}>
                <Paper
                  sx={{
                    p: 1.5,
                    textAlign: "center",
                    borderRadius: 2,
                    border: "1px solid rgba(0,0,0,0.04)",
                    boxShadow: "none",
                  }}
                >
                  {livro.capaUrl ? (
                    <Box
                      component="img"
                      src={livro.capaUrl}
                      alt={livro.titulo}
                      sx={{
                        width: "100%",
                        aspectRatio: "3/4",
                        objectFit: "cover",
                        borderRadius: 1,
                        mb: 1,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        aspectRatio: "3/4",
                        bgcolor: "#F3F4F6",
                        borderRadius: 1,
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.disabled",
                        fontSize: "0.75rem",
                      }}
                    >
                      Sem capa
                    </Box>
                  )}
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    sx={{
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {livro.titulo}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {livro.autor}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
