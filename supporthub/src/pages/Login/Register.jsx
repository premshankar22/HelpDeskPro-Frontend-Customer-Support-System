import { useState } from "react";
import { Box, TextField, Button, IconButton, Typography, InputAdornment } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  EmailOutlined,
  LockOutlined,
  PersonAddAlt1,
   PersonOutline,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import LoginLayout from "../../layouts/LoginLayout";
import { fakeRegister } from "../../Auth/authService";
import { useAuth } from "../../Auth/AuthContext";
import IconList from "../../components/common/IconList";


const BRAND = "#2d1b69";

export default function Register() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");


  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
    setError("Name is required");
    return;
  }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const data = await fakeRegister(name, email, password);
      login(data);               
      navigate("/customer");     
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };



  const form = (
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{
        width: "100%",
        maxWidth: 440,
        minHeight: 520,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2.8,
        padding: 2,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        boxShadow: "0 18px 45px rgba(0,0,0,0.10)",
      }}
    >
      {/* GO BACK */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          marginBottom: 1,
        }}
      >
        <IconButton
          component={Link}
          to="/login"
          sx={{ color: BRAND, padding: 0.5 }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography
          component={Link}
          to="/login"
          sx={{
            textDecoration: "none",
            fontWeight: 500,
            color: BRAND,
            fontSize: "0.95rem",
          }}
        >
          Go Back
        </Typography>
      </Box>

      {/* TITLE */}
      <Typography
        sx={{
          fontSize: "1.6rem",
          fontWeight: 600,
          color: BRAND,
          textAlign: "center",
          marginBottom: 1,
        }}
      >
        Create Account
      </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {/* NAME */}
<TextField
  label="Full Name"
  required
  fullWidth
  onChange={(e) => setName(e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <PersonOutline sx={{ color: BRAND }} />
      </InputAdornment>
    ),
  }}
/>


      {/* EMAIL */}
      <TextField
        label="Email"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlined sx={{ color: BRAND }} />
            </InputAdornment>
          ),
        }}
      />

      {/* PASSWORD */}
      <TextField
        label="Password"
        type="password"
        required
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined sx={{ color: BRAND }} />
            </InputAdornment>
          ),
        }}
      />

      {/* CONFIRM PASSWORD */}
      <TextField
        label="Confirm Password"
        type="password"
        required
        fullWidth
        onChange={(e) => setConfirm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined sx={{ color: BRAND }} />
            </InputAdornment>
          ),
        }}
      />

      {/* REGISTER BUTTON */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
        startIcon={<PersonAddAlt1 />}
        sx={{
          height: 48,
          fontSize: "1rem",
          backgroundColor: BRAND,
          "&:hover": { backgroundColor: "#241457" },
        }}
      >
         {loading ? "Creating Account..." : "Register"}
      </Button>

      {/* LOGIN LINK */}
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "0.95rem",
          color: BRAND,
        }}
      >
        Already have an account?{" "}
        <Button
          component={Link}
          to="/login"
          sx={{
            textTransform: "none",
            color: BRAND,
            fontWeight: 600,
            padding: 0,
            minWidth: "auto",
          }}
        >
          Login
        </Button>
      </Typography>

      {/* SOCIAL LOGIN ICONS */}
<IconList />
    </Box>
  );

  return <LoginLayout right={form} />;
}

