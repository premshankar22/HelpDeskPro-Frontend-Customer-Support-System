import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Stack,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import PersonOutline from "@mui/icons-material/PersonOutline";
import { useState } from "react";
import { useAuth } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

/* ===== DESIGN TOKENS ===== */
const BRAND = "#2d1b69";
const BRAND_DARK = "#23124f";

const HEADER_BG =
  "linear-gradient(180deg, rgba(250,249,254,0.95), rgba(243,241,251,0.95))";
const BORDER = "rgba(45,27,105,0.15)";

const TEXT_PRIMARY = "#0f172a";   // slate-900
const TEXT_SECONDARY = "#475569"; // slate-600
const ICON = "#334155";           // slate-700

export default function Header() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  if (!auth) return null;

  const { user } = auth;
  const avatarLetter = user.name?.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100%",
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: HEADER_BG,
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${BORDER}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      {/* ================= LEFT ================= */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Logo */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.95rem",
            letterSpacing: "0.05em",
            boxShadow: "0 6px 18px rgba(45,27,105,0.45)",
          }}
        >
          HD
        </Box>

        {/* Brand */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              color: TEXT_PRIMARY,
              lineHeight: 1.1,
            }}
          >
            HelpDeskPro
          </Typography>
          <Typography
            sx={{
              fontSize: "0.7rem",
              color: TEXT_SECONDARY,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {user.role === "admin" ? "Admin Panel" : "Customer Portal"}
          </Typography>
        </Box>
      </Stack>

      {/* ================= CENTER ================= */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 1,
          px: 2.5,
          py: 0.9,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          border: `1px solid ${BORDER}`,
          minWidth: 340,
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}
      >
        <SearchOutlined sx={{ fontSize: 18, color: ICON }} />
        <InputBase
          placeholder="Search tickets, help articles…"
          sx={{
            fontSize: "0.85rem",
            color: TEXT_PRIMARY,
            width: "100%",
          }}
        />
      </Box>

      {/* ================= RIGHT ================= */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        {/* Notifications */}
        <IconButton
          sx={{
            bgcolor: "#ffffff",
            border: `1px solid ${BORDER}`,
            boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
            "&:hover": {
              bgcolor: "#f4f2fa",
            },
          }}
        >
          <Badge color="error" variant="dot">
            <NotificationsNoneOutlined sx={{ color: ICON }} />
          </Badge>
        </IconButton>

        <Divider orientation="vertical" flexItem sx={{ borderColor: BORDER }} />

        {/* User */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            cursor: "pointer",
            px: 1.5,
            py: 0.6,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            border: `1px solid ${BORDER}`,
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            "&:hover": {
              backgroundColor: "#f4f2fa",
            },
          }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
              color: "#fff",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(45,27,105,0.45)",
            }}
          >
            {avatarLetter}
          </Avatar>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: TEXT_PRIMARY,
              }}
            >
              {user.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: TEXT_SECONDARY,
                textTransform: "capitalize",
              }}
            >
              {user.role}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* ================= MENU ================= */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 3,
            border: `1px solid ${BORDER}`,
            boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
          },
        }}
      >
        <MenuItem onClick={() => navigate("/customer/profile")}>
          <PersonOutline sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: "error.main" }} onClick={handleLogout}>
          <LogoutOutlined sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
