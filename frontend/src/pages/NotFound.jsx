import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SearchOff } from "@mui/icons-material";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        textAlign: "center",
      }}
    >
      <SearchOff sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
      <Typography variant="h5" fontWeight={600} mb={1}>
        Página não encontrada
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        A página que você procura não existe ou foi movida.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Voltar para Dashboard
      </Button>
    </Box>
  );
}
