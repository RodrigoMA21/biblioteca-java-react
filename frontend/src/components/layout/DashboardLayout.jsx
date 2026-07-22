import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DRAWER_WIDTH = 240;

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8F9FC" }}>
      <Sidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        mobile={!isMdUp}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          ml: isMdUp ? `${DRAWER_WIDTH}px` : 0,
          minWidth: 0,
        }}
      >
        <Navbar onToggleSidebar={() => setMobileOpen(!mobileOpen)} />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 3 },
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
