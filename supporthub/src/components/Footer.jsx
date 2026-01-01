import {
  Box,
  Typography,
  Stack,
  Link,
  Divider,
} from "@mui/material";
import PrivacyTipOutlined from "@mui/icons-material/PrivacyTipOutlined";
import GavelOutlined from "@mui/icons-material/GavelOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";

const BRAND = "#2d1b69";

export default function Footer() {
  return (
    <Box
      sx={{
        height: "100%",
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      {/* TOP GRADIENT LINE */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "2px",
          background: `linear-gradient(90deg, ${BRAND}, #6d5bd0)`,
        }}
      />

      {/* LEFT */}
      <Typography
        sx={{
          fontSize: "0.8rem",
          color: "text.secondary",
          letterSpacing: "0.02em",
        }}
      >
        © {new Date().getFullYear()}{" "}
        <strong style={{ color: BRAND }}>HelpDeskPro</strong>
        . All rights reserved.
      </Typography>

      {/* CENTER */}
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
      >
        <FooterLink
          icon={<PrivacyTipOutlined fontSize="small" />}
          label="Privacy"
        />
        <FooterLink
          icon={<GavelOutlined fontSize="small" />}
          label="Terms"
        />
        <FooterLink
          icon={<SupportAgentOutlined fontSize="small" />}
          label="Support"
        />
      </Stack>

      {/* RIGHT */}
      <Typography
        sx={{
          fontSize: "0.75rem",
          px: 1.4,
          py: 0.3,
          borderRadius: 2,
          backgroundColor: "rgba(45,27,105,0.08)",
          color: BRAND,
          fontWeight: 600,
          letterSpacing: "0.04em",
        }}
      >
        v1.0.0
      </Typography>
    </Box>
  );
}

/* ================= LINK ================= */

function FooterLink({ icon, label }) {
  return (
    <Link
      href="#"
      underline="none"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.6,
        fontSize: "0.8rem",
        color: "text.secondary",
        transition: "all 0.2s ease",
        position: "relative",

        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: -2,
          width: 0,
          height: "1px",
          backgroundColor: BRAND,
          transition: "width 0.2s ease",
        },

        "&:hover": {
          color: BRAND,
          transform: "translateY(-1px)",

          "&::after": {
            width: "100%",
          },
        },
      }}
    >
      {icon}
      {label}
    </Link>
  );
}
