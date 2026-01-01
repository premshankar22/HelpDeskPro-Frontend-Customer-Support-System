import { Box, Typography, Stack } from "@mui/material";

const BRAND = "#2d1b69";

export default function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "13vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BRAND,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Logo */}
        <Box
          sx={{
            width: 44,
            height: 44,
             borderRadius: 2,
             background: `linear-gradient(135deg, ${BRAND}, #23124f)`,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "1.05rem",
            letterSpacing: "0.05em",
          }}
        >
          HD
        </Box>

        {/* Brand */}
        <Typography
          sx={{
            fontFamily:
              "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
            fontSize: "1.86rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#ffffff",
          }}
        >
          HelpDeskPro
        </Typography>
      </Stack>
    </Box>
  );
}
