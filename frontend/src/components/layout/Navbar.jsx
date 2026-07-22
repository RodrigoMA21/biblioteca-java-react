import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { user, sair } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
        {!isMdUp && (
          <IconButton edge="start" onClick={onToggleSidebar} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1.1rem",
            letterSpacing: "-0.01em",
            flex: 1,
          }}
        >
          {isMdUp ? "Biblioteca Comunitária Digital" : "Biblioteca"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {user.guest ? (
            <Button
              variant="contained"
              size="small"
              startIcon={<LoginIcon />}
              onClick={() => {
                sair();
                navigate("/login");
              }}
              sx={{ borderRadius: 2, fontSize: "0.8rem", px: 1.5, py: 0.5 }}
            >
              Fazer login
            </Button>
          ) : (
            <>
              {user.role === "ADMIN" && (
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<AdminIcon />}
                  disabled
                  sx={{
                    borderRadius: 2,
                    fontSize: "0.75rem",
                    px: 1.5,
                    py: 0.5,
                    borderColor: "rgba(79,70,229,0.2)",
                    color: "#4F46E5",
                    backgroundColor: "rgba(79,70,229,0.04)",
                    textTransform: "none",
                    "&.Mui-disabled": {
                      borderColor: "rgba(79,70,229,0.2)",
                      color: "#4F46E5",
                      opacity: 0.8,
                    },
                  }}
                >
                  ADMIN
                </Button>
              )}

              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ p: 0.5 }}
              >
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: "#4F46E5",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {(user.nome || user.email || "").charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 180,
                    borderRadius: 2,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {user.nome || user.email || (user.role === "ADMIN" ? "Administrador" : "Usuário")}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.role === "ADMIN" ? "Administrador" : "Usuário"}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={sair} sx={{ borderRadius: 1, mx: 0.5, my: 0.25 }}>
                  <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
                  Sair
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
