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
  Chip,
  Tooltip,
} from "@mui/material";

import SearchOutlined from "@mui/icons-material/SearchOutlined";
import NotificationsActiveOutlined from "@mui/icons-material/NotificationsActiveOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import ShieldOutlined from "@mui/icons-material/ShieldOutlined";
import PersonOutline from "@mui/icons-material/PersonOutline";

import { useState } from "react";
import { useAuth } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

/* ================= THEME ================= */

const BRAND = "#2d1b69";
const HEADER_BG = "#ffffff";
const BORDER = "#e5e7eb";
const ICON = "#475569";
const TEXT_PRIMARY = "#0f172a";
const TEXT_SECONDARY = "#64748b";

export default function AdminHeader() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  if (!auth) return null;

  const { user } = auth;
  const avatarLetter = user.name?.charAt(0)?.toUpperCase() || "A";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={styles.root}>
      {/* ================= LEFT ================= */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Logo */}
        <Box sx={styles.logo}>HD</Box>

        {/* Brand */}
        <Box>
          <Typography sx={styles.brand}>HelpDeskPro</Typography>
          <Typography sx={styles.subBrand}>
            Admin Console
          </Typography>
        </Box>
      </Stack>

      {/* ================= CENTER ================= */}
      <Box sx={styles.search}>
        <SearchOutlined sx={{ fontSize: 18, color: ICON }} />
        <InputBase
          placeholder="Search users, tickets, logs…"
          sx={styles.searchInput}
        />
      </Box>

      {/* ================= RIGHT ================= */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        {/* System Alerts */}
        <Tooltip title="System Alerts">
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsActiveOutlined sx={{ color: ICON }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Role Badge */}
        <Chip
          icon={<ShieldOutlined />}
          label="ADMIN"
          size="small"
          sx={styles.roleChip}
        />

        <Divider orientation="vertical" flexItem />

        {/* User */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={styles.userBox}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Avatar sx={styles.avatar}>
            {avatarLetter}
          </Avatar>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography sx={styles.userName}>
              {user.name}
            </Typography>
            <Typography sx={styles.userRole}>
              System Administrator
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
      >
        <MenuItem onClick={() => navigate("/admin/profile")}>
          <PersonOutline sx={{ mr: 1 }} /> Profile
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{ color: "error.main" }}
        >
          <LogoutOutlined sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

/* ================= STYLES ================= */

const styles = {
  root: {
    height: "100%",
    px: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: HEADER_BG,
    borderBottom: `1px solid ${BORDER}`,
  },

  logo: {
    width: 38,
    height: 38,
    borderRadius: 2,
    background: `linear-gradient(135deg, ${BRAND}, #23124f)`,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    letterSpacing: "0.05em",
  },

  brand: {
    fontWeight: 700,
    fontSize: "0.95rem",
    color: TEXT_PRIMARY,
    lineHeight: 1.2,
  },

  subBrand: {
    fontSize: "0.72rem",
    color: TEXT_SECONDARY,
    letterSpacing: "0.06em",
  },

  search: {
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    gap: 1,
    px: 2,
    py: 0.7,
    borderRadius: 2,
    backgroundColor: "#f8fafc",
    border: `1px solid ${BORDER}`,
    minWidth: 320,
  },

  searchInput: {
    fontSize: "0.85rem",
    color: TEXT_PRIMARY,
    width: "100%",
  },

  roleChip: {
    bgcolor: "rgba(45,27,105,0.1)",
    color: BRAND,
    fontWeight: 600,
  },

  userBox: {
    cursor: "pointer",
    px: 1,
    py: 0.5,
    borderRadius: 2,
    "&:hover": {
      backgroundColor: "rgba(45,27,105,0.06)",
    },
  },

  avatar: {
    width: 34,
    height: 34,
    bgcolor: "rgba(45,27,105,0.15)",
    color: BRAND,
    fontWeight: 700,
  },

  userName: {
    fontSize: "0.82rem",
    fontWeight: 600,
    color: TEXT_PRIMARY,
  },

  userRole: {
    fontSize: "0.7rem",
    color: TEXT_SECONDARY,
  },
};
