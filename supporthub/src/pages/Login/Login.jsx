import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Alert,
  Typography,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  Login as LoginIcon,
  PersonAddAlt1,
  VpnKeyOutlined,
} from "@mui/icons-material";

import LoginLayout from "../../layouts/LoginLayout";
import { fakeLogin } from "../../Auth/authService";
import { useAuth } from "../../Auth/AuthContext";
import IconList from "../../components/common/IconList";

const BRAND = "#2d1b69";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await fakeLogin(email, password);
      login(data);
      navigate(data.user.role === "admin" ? "/admin" : "/customer");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const LoginForm = (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        width: "100%",
        maxWidth: 440,
        minHeight: 520,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2.8,
        padding: 4,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        boxShadow: "0 18px 45px rgba(0,0,0,0.10)",
      }}
    >
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
        Welcome Back
      </Typography>

      {/* ERROR */}
      {error && (
        <Alert severity="error" icon>
          {error}
        </Alert>
      )}

      {/* EMAIL */}
      <TextField
        label="Email"
        type="email"
        required
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        type={showPwd ? "text" : "password"}
        required
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined sx={{ color: BRAND }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* REMEMBER + FORGOT */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              sx={{
                color: BRAND,
                "&.Mui-checked": { color: BRAND },
              }}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <VpnKeyOutlined sx={{ fontSize: 18, color: BRAND }} />
              <Typography sx={{ color: BRAND, fontSize: "0.95rem" }}>
                Remember me
              </Typography>
            </Box>
          }
        />

        <Button
          component={Link}
          to="/forgot-password"
          size="small"
          sx={{
            color: BRAND,
            textTransform: "none",
            fontWeight: 500,
            display: "flex",
            gap: 0.5,
          }}
        >
          <VpnKeyOutlined sx={{ fontSize: 18 }} />
          Forgot password?
        </Button>
      </Box>

      {/* LOGIN BUTTON */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
        startIcon={<LoginIcon />}
        sx={{
          height: 48,
          fontSize: "1rem",
          backgroundColor: BRAND,
          "&:hover": { backgroundColor: "#241457" },
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      {/* REGISTER LINK */}
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "0.95rem",
          color: BRAND,
        }}
      >
        Don’t have an account?{" "}
        <Button
          component={Link}
          to="/register"
          startIcon={<PersonAddAlt1 />}
          sx={{
            textTransform: "none",
            color: BRAND,
            fontWeight: 600,
            padding: 0,
            minWidth: "auto",
          }}
        >
          Register
        </Button>
      </Typography>
      {/* SOCIAL LOGIN ICONS */}
<IconList />
    </Box>
  );

  return <LoginLayout right={LoginForm} />;
}
