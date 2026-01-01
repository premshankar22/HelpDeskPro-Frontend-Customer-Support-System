import { Box, Typography } from "@mui/material";
import {
  DashboardOutlined,
  ConfirmationNumberOutlined,
  GroupOutlined,
  SupportAgentOutlined,
  ChatOutlined,
  BarChartOutlined,
  SettingsOutlined,
  SecurityOutlined,
  BuildOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";

/* ================= THEME ================= */

const BRAND = "#2d1b69";
const TEXT = "#ffffff";
const MUTED = "rgba(255,255,255,0.55)";
const HOVER = "rgba(255,255,255,0.10)";
const ACTIVE_BG = "rgba(255,255,255,0.16)";
const ACTIVE_BAR = "#a78bfa"; // soft violet accent

/* ================= COMPONENT ================= */

export default function AdminSidebar() {
  const { auth } = useAuth();

  if (!auth || auth.user.role !== "admin") return null;

  return (
    <Box sx={styles.sidebar}>
      <NavSection title="OVERVIEW">
        <Item icon={DashboardOutlined} label="Dashboard" to="/admin/admin_dashboard" />
      </NavSection>

      <NavSection title="TICKET MANAGEMENT">
        <Item icon={ConfirmationNumberOutlined} label="All Tickets" to="/admin/admin_tickets" />
        <Item icon={SupportAgentOutlined} label="Assign Tickets" to="/admin/admin_assignments" />
      </NavSection>

      <NavSection title="USERS & AGENTS">
        <Item icon={GroupOutlined} label="Customers" to="/admin/admin_customers" />
        <Item icon={SupportAgentOutlined} label="Agents" to="/admin/admin_agents" />
      </NavSection>

      <NavSection title="COMMUNICATION">
        <Item icon={ChatOutlined} label="Live Chats" to="/admin/admin_chats" />
      </NavSection>

      <NavSection title="ANALYTICS & REPORTS">
        <Item icon={BarChartOutlined} label="Reports" to="/admin/admin_reports" />
      </NavSection>

      <NavSection title="SYSTEM">
        <Item icon={SettingsOutlined} label="Settings" to="/admin/admin_settings" />
        <Item icon={SecurityOutlined} label="Audit Logs" to="/admin/admin_logs" />
      </NavSection>

      <NavSection title="ADMIN UTILITIES">
        <Item icon={BuildOutlined} label="System Tools" to="/admin/admin_tools" />
      </NavSection>
    </Box>
  );
}

/* ================= SUB COMPONENTS ================= */

function NavSection({ title, children }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={styles.section}>{title}</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
        {children}
      </Box>
    </Box>
  );
}

function Item({ icon, label, to }) {
  const IconComponent = icon; // ✅ ESLint now detects usage correctly

  return (
    <Box
      component={NavLink}
      to={to}
      sx={({ isActive }) => ({
        ...styles.item,
        backgroundColor: isActive ? ACTIVE_BG : "transparent",
        textDecoration: "none",
        "&::before": {
          content: '""',
          width: 4,
          height: "60%",
          backgroundColor: isActive ? ACTIVE_BAR : "transparent",
          borderRadius: 4,
        },
      })}
    >
      <Box sx={styles.iconBox}>
        <IconComponent sx={styles.icon} />
      </Box>

      <Typography sx={styles.label}>{label}</Typography>
    </Box>
  );
}



/* ================= STYLES ================= */

const styles = {
  sidebar: {
    height: "100%",
    background: "linear-gradient(180deg, #2d1b69 0%, #23124f 100%)",
    px: 1.5,
    py: 2,
    overflowY: "auto",
  },

  section: {
    fontSize: "0.65rem",
    fontWeight: 700,
    letterSpacing: "0.16em",
    color: MUTED,
    px: 1,
    mb: 0.6,
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: 1.4,
    px: 1.5,
    py: 1,
    borderRadius: 1.5,
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: TEXT,
    "&:hover": {
      backgroundColor: HOVER,
    },
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: "10px",
    backgroundColor: "rgba(255,255,255,0.14)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 20,
    color: TEXT,
  },

  label: {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: TEXT,
    whiteSpace: "nowrap",
  },
};
