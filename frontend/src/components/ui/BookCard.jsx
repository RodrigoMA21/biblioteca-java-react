import { Box, Card, CardMedia, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PictureAsPdf as PdfIcon,
  CloudUpload as UploadIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

export default function BookCard({ livro, onEdit, onDelete, onPdfUpload, onCapaUpload }) {
  const { user } = useAuth();
  const isAdmin = user.role === "ADMIN";

  return (
    <Card
      sx={{
        position: "relative",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Cover */}
      <Box sx={{ position: "relative", pt: "140%", bgcolor: "#F3F4F6" }}>
        {livro.capaUrl ? (
          <CardMedia
            component="img"
            image={livro.capaUrl}
            alt={livro.titulo}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.disabled",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <ImageIcon sx={{ fontSize: 40, opacity: 0.3 }} />
            <Typography variant="caption" color="text.disabled">
              Sem capa
            </Typography>
          </Box>
        )}

        {/* Status badge */}
        <Chip
          label={livro.disponivel ? "Disponível" : "Indisponível"}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: livro.disponivel ? "rgba(16,185,129,0.9)" : "rgba(239,68,68,0.9)",
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: 600,
          }}
        />
      </Box>

      {/* Info */}
      <Box sx={{ p: 1.5 }}>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            mb: 0.25,
          }}
        >
          {livro.titulo}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
          {livro.autor} • {livro.anoPublicacao}
        </Typography>

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 0.5, mt: 0.5, flexWrap: "wrap" }}>
          {livro.pdfUrl && (
            <Tooltip title="Abrir PDF">
              <IconButton
                size="small"
                onClick={() => window.open(livro.pdfUrl, "_blank")}
                sx={{ color: "#EF4444" }}
              >
                <PdfIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {isAdmin && (
            <>
              <Tooltip title="Editar">
                <IconButton size="small" onClick={() => onEdit(livro)} sx={{ color: "#6B7280" }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Excluir">
                <IconButton size="small" onClick={() => onDelete(livro)} sx={{ color: "#6B7280" }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Enviar PDF">
                <IconButton
                  size="small"
                  component="label"
                  sx={{ color: "#6B7280" }}
                >
                  <UploadIcon fontSize="small" />
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={(e) => {
                      if (e.target.files[0]) onPdfUpload(livro.id, e.target.files[0]);
                      e.target.value = "";
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Enviar Capa">
                <IconButton
                  size="small"
                  component="label"
                  sx={{ color: "#6B7280" }}
                >
                  <ImageIcon fontSize="small" />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      if (e.target.files[0]) onCapaUpload(livro.id, e.target.files[0]);
                      e.target.value = "";
                    }}
                  />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
    </Card>
  );
}
