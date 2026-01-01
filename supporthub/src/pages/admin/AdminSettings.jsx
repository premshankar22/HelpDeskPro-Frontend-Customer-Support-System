import {
  Box,
  Typography,
  Paper,
  Stack,
  Switch,
  Divider,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import PaletteOutlined from "@mui/icons-material/PaletteOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import HistoryOutlined from "@mui/icons-material/HistoryOutlined";
import { useState } from "react";

/* ================= THEME ================= */

const BRAND = "#2d1b69";

/* ================= DEFAULT SETTINGS ================= */

const DEFAULT_SETTINGS = {
  maintenanceMode: false,
  forceLogout: false,
  emailAlerts: true,
  auditLogging: true,
  darkTheme: false,
  betaFeatures: false,
};

/* ================= MAIN COMPONENT ================= */

export default function AdminSettings() {
  const role = "admin"; // frontend-only permission simulation

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [confirmKey, setConfirmKey] = useState(null);
  const [history, setHistory] = useState([]);

  const toggle = (key) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };

      setHistory((h) => [
        {
          id: Date.now(),
          label: key,
          value: updated[key],
          time: new Date().toLocaleTimeString(),
        },
        ...h.slice(0, 4),
      ]);

      return updated;
    });

    setSaved(true);
  };

  const handleDangerToggle = (key) => {
    setConfirmKey(key);
  };

  const confirmDanger = () => {
    toggle(confirmKey);
    setConfirmKey(null);
  };

  const resetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setSaved(true);
  };

  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
        <SettingsOutlined sx={{ color: BRAND }} />
        <Typography variant="h4" fontWeight={700} sx={{ color: "#111827" }}>
          System Settings
        </Typography>
        <Chip label="Admin Only" size="small" color="primary" />
      </Stack>

      <Typography sx={{ mb: 4, color: "#4b5563", maxWidth: 720 }}>
        Control system behavior, security policies, and feature availability.
        Changes are applied immediately.
      </Typography>

      {/* ===== SETTINGS SECTIONS ===== */}
      <Stack spacing={3}>
        <SettingsSection
          icon={<SecurityOutlined />}
          title="Security Controls"
          desc="Sensitive security and compliance options."
        >
          <SettingItem
            label="Audit Logging"
            desc="Track all admin and system actions."
            checked={settings.auditLogging}
            onChange={() => toggle("auditLogging")}
          />
          <SettingItem
            label="Force Logout on Policy Change"
            desc="Immediately sign out all users after security updates."
            checked={settings.forceLogout}
            onChange={() => toggle("forceLogout")}
            disabled={role !== "admin"}
          />
        </SettingsSection>

        <SettingsSection
          icon={<WarningAmberOutlined />}
          title="System Operations"
          desc="High-impact operational settings."
        >
          <SettingItem
            label="Maintenance Mode"
            desc="Disable user access during maintenance."
            checked={settings.maintenanceMode}
            onChange={() => handleDangerToggle("maintenanceMode")}
            danger
          />
        </SettingsSection>

        <SettingsSection
          icon={<NotificationsOutlined />}
          title="Notifications"
          desc="Admin communication preferences."
        >
          <SettingItem
            label="Email Alerts"
            desc="Receive system alerts via email."
            checked={settings.emailAlerts}
            onChange={() => toggle("emailAlerts")}
          />
        </SettingsSection>

        <SettingsSection
          icon={<PaletteOutlined />}
          title="Feature Flags"
          desc="Control experimental and beta features."
        >
          <SettingItem
            label="Enable Beta Features"
            desc="Access preview features before public release."
            checked={settings.betaFeatures}
            onChange={() => toggle("betaFeatures")}
          />
          <SettingItem
            label="Dark Theme (Preview)"
            desc="Enable experimental dark mode."
            checked={settings.darkTheme}
            onChange={() => toggle("darkTheme")}
          />
        </SettingsSection>
      </Stack>

      {/* ===== CHANGE HISTORY ===== */}
      {history.length > 0 && (
        <Paper sx={{ mt: 4, p: 3, borderRadius: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <HistoryOutlined sx={{ color: BRAND }} />
            <Typography fontWeight={600}>Recent Changes</Typography>
          </Stack>

          <Stack spacing={0.6}>
            {history.map((h) => (
              <Typography key={h.id} fontSize="0.85rem">
                • <strong>{h.label}</strong> set to{" "}
                <strong>{String(h.value)}</strong>{" "}
                <span style={{ color: "#6b7280" }}>({h.time})</span>
              </Typography>
            ))}
          </Stack>
        </Paper>
      )}

      {/* ===== ACTIONS ===== */}
      <Stack direction="row" spacing={2} mt={4}>
        <Button variant="outlined" onClick={resetDefaults}>
          Reset to Defaults
        </Button>
      </Stack>

      {/* ===== CONFIRMATION ===== */}
      <Dialog open={!!confirmKey} onClose={() => setConfirmKey(null)}>
        <DialogTitle sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <WarningAmberOutlined color="error" />
          Confirm Dangerous Action
        </DialogTitle>
        <DialogContent>
          <Typography>
            Enabling this setting may affect active users.
            Are you sure you want to proceed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmKey(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDanger}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== FEEDBACK ===== */}
      <Snackbar open={saved} autoHideDuration={2500} onClose={() => setSaved(false)}>
        <Alert severity="success" variant="filled">
          Settings updated successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}

/* ================= SUB COMPONENTS ================= */

function SettingsSection({ icon, title, desc, children }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={1} mb={2}>
        <Stack direction="row" spacing={1.2} alignItems="center">
          {icon}
          <Typography fontWeight={600}>{title}</Typography>
        </Stack>
        <Typography fontSize="0.85rem" color="text.secondary">
          {desc}
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>{children}</Stack>
    </Paper>
  );
}

function SettingItem({
  label,
  desc,
  checked,
  onChange,
  danger,
  disabled,
}) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography fontWeight={500}>{label}</Typography>
        <Typography fontSize="0.8rem" color="text.secondary">
          {desc}
        </Typography>
      </Box>

      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        color={danger ? "error" : "primary"}
      />
    </Stack>
  );
}
