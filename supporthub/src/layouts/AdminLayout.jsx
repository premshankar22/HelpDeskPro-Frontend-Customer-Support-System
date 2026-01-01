import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../pages/admin/AdminSidebar";
import AdminHeader from "../pages/admin/AdminHeader";
import Footer from "../components/Footer";

const BRAND = "#2d1b69";

export default function AdminLayout() {
  return (
    <Box sx={styles.root}>
      {/* ================= HEADER ================= */}
      <Box sx={styles.header}>
        <AdminHeader />
      </Box>

      {/* ================= BODY ================= */}
      <Box sx={styles.body}>
        {/* SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <Box sx={styles.main}>
          <Outlet />
        </Box>
      </Box>

      {/* ================= FOOTER ================= */}
      <Box sx={styles.footer}>
        <Footer />
      </Box>
    </Box>
  );
}

/* ================= STYLES ================= */

const styles = {
  /* ===== ROOT LAYOUT ===== */
  root: {
    height: "100vh",
    display: "grid",
    gridTemplateRows: "8vh 1fr 5vh", // Header | Content | Footer
    overflow: "hidden",
    backgroundColor: "#f4f2fa",
  },

  /* ===== HEADER ===== */
  header: {
    width: "100%",
    backgroundColor: BRAND,
  },

  /* ===== BODY ===== */
  body: {
    display: "grid",
    gridTemplateColumns: "15% 85%", // Sidebar | Main
    overflow: "hidden",
  },

  /* ===== MAIN CONTENT ===== */
  main: {
    padding: 3,
    overflow: "auto", // ✅ scroll ONLY content
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  /* ===== FOOTER ===== */
  footer: {
    backgroundColor: "#ffffff",
    borderTop: "1px solid #e0e0e0",
  },
};
