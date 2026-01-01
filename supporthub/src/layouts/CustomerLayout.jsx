import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../pages/customer/CustomerSidebar";
import Footer from "../components/Footer";
import Header from "../pages/customer/Header";

const BRAND = "#2d1b69";

export default function CustomerLayout() {
  return (
    <Box sx={styles.root}>
      {/* HEADER */}
      <Box sx={styles.header}>
        <Header />
</Box>

      {/* BODY */}
      <Box sx={styles.body}>
        {/* SIDEBAR */}
         <CustomerSidebar />

        {/* MAIN CONTENT */}
        <Box sx={styles.main}>
          <Outlet />
        </Box>
      </Box>

      {/* FOOTER */}
      <Box sx={styles.footer}>
        <Footer />
      </Box>
    </Box>
  );
}

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
    backgroundColor: BRAND,
    width: "100%",
  },

  /* ===== BODY ===== */
  body: {
    display: "grid",
    gridTemplateColumns: "13% 87%", // Sidebar | Main
    overflow: "hidden",
  },


  /* ===== MAIN CONTENT ===== */
  main: {
    padding: 3,
    overflow: "auto",                 // scroll ONLY here
    scrollbarWidth: "none",            // Firefox
    "&::-webkit-scrollbar": {
      display: "none",                 // Chrome / Safari
    },
  },

  /* ===== FOOTER ===== */
  footer: {
    backgroundColor: "#ffffff",
    borderTop: "1px solid #e0e0e0",
  },
};

