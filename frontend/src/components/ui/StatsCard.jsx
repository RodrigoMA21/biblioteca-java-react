import { Box, Paper, Typography } from "@mui/material";

export default function StatsCard({ icon, label, value, color = "#4F46E5" }) {
  return (
    <Paper
      sx={{
        p: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: `${color}12`,
          color: color,
          fontSize: 24,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
          {label}
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.2 }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
