import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  AutoStories as BooksIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const DRAWER_WIDTH = 240;

const navItems = [
  { label: "Acervo", icon: <BooksIcon />, path: "/livros" },
];

export default function Sidebar({ open, onClose, mobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const muiTheme = useTheme();
  const isMdUp = useMediaQuery(muiTheme.breakpoints.up("md"));

  const content = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0F172A",
        color: "rgba(255,255,255,0.85)",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          px: 2.5,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              bgcolor: "#4F46E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            <BooksIcon sx={{ fontSize: 18, color: "#fff" }} />
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "-0.01em",
              color: "#fff",
            }}
          >
            Biblioteca
          </Typography>
        </Box>
        {mobile && (
          <IconButton onClick={onClose} sx={{ color: "rgba(255,255,255,0.5)" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Nav */}
      <List sx={{ px: 1.5, pt: 1.5, flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (mobile) onClose();
              }}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                px: 1.5,
                py: 1,
                color: active ? "#fff" : "rgba(255,255,255,0.55)",
                bgcolor: active ? "rgba(79,70,229,0.2)" : "transparent",
                "&:hover": {
                  bgcolor: active
                    ? "rgba(79,70,229,0.25)"
                    : "rgba(255,255,255,0.06)",
                  color: "#fff",
                },
                transition: "all 0.15s ease",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: active ? 600 : 400,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* User info */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.75)",
            fontWeight: 600,
            mb: 0.25,
          }}
        >
          {user.nome || user.email || (user.role === "ADMIN" ? "Administrador" : "Usuário")}
        </Typography>
        <Typography
          sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}
        >
          {user.role === "ADMIN" ? "Administrador" : "Usuário"}
        </Typography>
      </Box>
    </Box>
  );

  if (mobile) {
    return (
      <Drawer
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            border: "none",
          },
        }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          border: "none",
          bgcolor: "#0F172A",
        },
      }}
    >
      {content}
    </Drawer>
  );
}
