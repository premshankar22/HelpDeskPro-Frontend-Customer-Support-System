import { Box, Typography } from "@mui/material";
import Header from "../components/Login/Header";
import loginImage from "../assets/Login/image1.png";

export default function LoginLayout({ left, right }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f2fa",
      }}
    >
      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
        }}
      >
        {/* LEFT IMAGE BOX */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: 2,
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* IMAGE */}
          <Box
            component="img"
            src={loginImage}
            alt="SupportHub Login"
            sx={{
              width: "100%",
              maxWidth: 520,
              margin: "0 auto",
              //borderRadius: 3,
              //boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            }}
          />

          {/* OPTIONAL OVERLAY TEXT */}
          <Box
            sx={{
              position: "absolute",
              bottom: 40,
              left: 40,
              color: "#333",
              maxWidth: 360,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              Manage customer support smarter
            </Typography>

            <Typography
              sx={{
                fontSize: "0.95rem",
                opacity: 0.85,
                marginTop: 1,
              }}
            >
              Track, resolve, and manage tickets efficiently with SupportHub.
            </Typography>
          </Box>
        </Box>

        {/* RIGHT FORM BOX */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            padding: 2,
          }}
        >
          {right}
        </Box>
      </Box>
    </Box>
  );
}
