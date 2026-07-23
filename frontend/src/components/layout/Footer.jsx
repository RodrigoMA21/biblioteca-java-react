import { Box, Typography, IconButton, Tooltip, Stack } from "@mui/material";
import { LinkedIn, Email, GitHub, Language } from "@mui/icons-material";

const links = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/rodrigo-mayer-alves-a9255675", icon: <LinkedIn /> },
  { label: "Email", url: "mailto:rodxlr@gmail.com", icon: <Email /> },
  { label: "GitHub", url: "https://github.com/RodrigoMA21", icon: <GitHub /> },
  { label: "Portfólio", url: "https://rodrigomayer.vercel.app", icon: <Language /> },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2.5,
        px: 2,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
      }}
    >
      <Stack direction="row" justifyContent="center" spacing={0.5} mb={1}>
        {links.map((link) => (
          <Tooltip title={link.label} key={link.label}>
            <IconButton
              component="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: "text.secondary" }}
            >
              {link.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
      <Typography variant="caption" color="text.disabled">
        Desenvolvido por Rodrigo Mayer Alves · 2026
      </Typography>
    </Box>
  );
}
