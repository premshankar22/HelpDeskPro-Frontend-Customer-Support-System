import { Box, Typography, Divider } from "@mui/material";
import {
  DashboardOutlined,
  ConfirmationNumberOutlined,
  AddCircleOutline,
  ChatOutlined,
  PersonOutline,
  SettingsOutlined,
  HelpOutline,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const BRAND = "#2d1b69";

export default function CustomerSidebar() {
  return (
    <Box sx={styles.sidebar}>
      {/* TOP GROUP */}
      <Box>
        <SectionTitle title="MAIN" />
        <SidebarItem icon={DashboardOutlined} label="Dashboard" to="/customer/dashboard"/>
        <SidebarItem icon={ConfirmationNumberOutlined} label="My Tickets"   to="/customer/tickets" />
        <SidebarItem icon={AddCircleOutline} label="Create Ticket"  to="/customer/create-ticket"/>
        <SidebarItem icon={ChatOutlined} label="Support Chat" to="/customer/support-chat"/>
      </Box>

      <Divider sx={styles.divider} />

      {/* BOTTOM GROUP */}
      <Box>
        <SectionTitle title="ACCOUNT" />
        <SidebarItem icon={PersonOutline} label="Profile"  to="/customer/profile"/>
        <SidebarItem icon={SettingsOutlined} label="Settings" to="/customer/settings"/>
        <SidebarItem icon={HelpOutline} label="Help / FAQ" to="/customer/help"/>
      </Box>
    </Box>
  );
}

/* ===== SECTION TITLE ===== */
function SectionTitle({ title }) {
  return (
    <Typography sx={styles.sectionTitle}>
      {title}
    </Typography>
  );
}

/* ===== SIDEBAR ITEM ===== */
function SidebarItem({ icon, label, to }) {
  const IconComponent = icon;

  return (
    <Box
      component={NavLink}
      to={to}
      style={({ isActive }) => ({
        textDecoration: "none",
        borderRadius: 12,
        backgroundColor: isActive
          ? "rgba(255,255,255,0.18)"
          : "transparent",
      })}
      sx={styles.item}
    >
      <Box
        sx={{
          ...styles.iconWrapper,
          backgroundColor: "rgba(255,255,255,0.18)",
        }}
      >
        <IconComponent sx={styles.icon} />
      </Box>

      <Typography sx={styles.label}>{label}</Typography>
    </Box>
  );
}


const styles = {
  /* ===== SIDEBAR ===== */
  sidebar: {
    height: "100%",
    background: "linear-gradient(180deg, #2d1b69 0%, #23124f 100%)",
    paddingX: 1.5,
    paddingY: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  /* ===== SECTION TITLE ===== */
  sectionTitle: {
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    fontWeight: 600,
    color: "rgba(255,255,255,0.55)",
   // marginBottom: 1,
    marginTop: 1,
    paddingLeft: 1,
  },

  /* ===== ITEM ===== */
  item: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    paddingY: 1,
    paddingX: 1.5,
    borderRadius: 1.5,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.10)",
    },
  },

  /* ===== ICON CONTAINER ===== */
  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: "10px",
    backgroundColor: "rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 20,
    color: "#ffffff",
  },

  /* ===== LABEL ===== */
  label: {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#ffffff",
  },

  /* ===== DIVIDER ===== */
  divider: {
    borderColor: "rgba(255,255,255,0.15)",
    marginY: 2,
  },
};
