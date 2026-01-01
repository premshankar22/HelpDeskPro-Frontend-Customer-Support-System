import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  CircularProgress,
} from "@mui/material";
import BuildOutlined from "@mui/icons-material/BuildOutlined";
import StorageOutlined from "@mui/icons-material/StorageOutlined";
import RestartAltOutlined from "@mui/icons-material/RestartAltOutlined";
import BugReportOutlined from "@mui/icons-material/BugReportOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";   // ✅ ADD
import BarChartOutlined from "@mui/icons-material/BarChartOutlined"; 
import { useState, memo } from "react";
import { useAuth } from "../../Auth/AuthContext";


/* ================= THEME ================= */

const BRAND = "#2d1b69";
const DANGER = "#dc2626";

/* ================= TOOL CONFIG (SCALABLE) ================= */

const TOOLS = [
  /* ================= MAINTENANCE ================= */
  {
    id: "maintenance",
    title: "System Maintenance",
    desc: "Run scheduled health checks and cleanup routines.",
    icon: BuildOutlined,
    category: "Maintenance",
    danger: false,
    roles: ["admin"],
  },
  {
    id: "cache",
    title: "Cache Management",
    desc: "Clear or refresh cached application data.",
    icon: StorageOutlined,
    category: "Maintenance",
    danger: true,
    roles: ["admin"],
  },

  /* ================= SYSTEM ================= */
  {
    id: "restart",
    title: "Service Restart",
    desc: "Safely restart background services and workers.",
    icon: RestartAltOutlined,
    category: "System",
    danger: true,
    roles: ["admin"],
  },
  {
    id: "env_check",
    title: "Environment Status",
    desc: "Verify system environment configuration & versions.",
    icon: BuildOutlined,
    category: "System",
    danger: false,
    roles: ["admin"],
  },

  /* ================= DEBUG ================= */
  {
    id: "debug",
    title: "Debug Utilities",
    desc: "Access diagnostic and debug tools.",
    icon: BugReportOutlined,
    category: "Debug",
    danger: false,
    roles: ["admin"],
  },
  {
    id: "log_inspector",
    title: "Log Inspector",
    desc: "Inspect recent system logs and warnings.",
    icon: BugReportOutlined,
    category: "Debug",
    danger: false,
    roles: ["admin"],
  },

  /* ================= SECURITY ================= */
  {
    id: "session_reset",
    title: "Force Session Reset",
    desc: "Invalidate all active user sessions.",
    icon: WarningAmberOutlined,
    category: "Security",
    danger: true,
    roles: ["admin"],
  },
  {
    id: "permission_audit",
    title: "Permission Audit",
    desc: "Review role-based access configuration.",
    icon: SecurityOutlined,
    category: "Security",
    danger: false,
    roles: ["admin"],
  },

  /* ================= MONITORING ================= */
  {
    id: "health_monitor",
    title: "System Health Monitor",
    desc: "View real-time health indicators (CPU, memory, uptime).",
    icon: BarChartOutlined,
    category: "Monitoring",
    danger: false,
    roles: ["admin"],
  },

  /* ================= DATA ================= */
  {
    id: "data_integrity",
    title: "Data Integrity Check",
    desc: "Validate consistency of application data.",
    icon: StorageOutlined,
    category: "Data",
    danger: true,
    roles: ["admin"],
  },

  /* ================= COMPLIANCE ================= */
  {
    id: "compliance_check",
    title: "Compliance Validation",
    desc: "Run compliance & policy verification checks.",
    icon: SecurityOutlined,
    category: "Compliance",
    danger: false,
    roles: ["admin"],
  },
];

const CATEGORIES = [
  "Maintenance",
  "System",
  "Debug",
  "Security",
  "Monitoring",
  "Data",
  "Compliance",
];


/* ================= MAIN COMPONENT ================= */

export default function AdminTools() {
  const { auth } = useAuth();
  const role = auth?.user?.role;

  const [tab, setTab] = useState(0);
  const [confirmTool, setConfirmTool] = useState(null);
  const [loadingTool, setLoadingTool] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [activity, setActivity] = useState([]);

  const filteredTools = TOOLS.filter(
    (t) => t.category === CATEGORIES[tab] && t.roles.includes(role)
  );

  const executeTool = async (tool) => {
    setConfirmTool(null);
    setLoadingTool(tool.id);

    await new Promise((r) => setTimeout(r, 1200));

    const failed = Math.random() < 0.15; // simulated error

    if (failed) {
      setSnackbar({
        type: "error",
        msg: `${tool.title} failed. Please try again.`,
      });
    } else {
      setSnackbar({
        type: "success",
        msg: `${tool.title} executed successfully.`,
      });

      setActivity((prev) => [
        {
          id: Date.now(),
          text: tool.title,
          time: new Date().toLocaleTimeString(),
        },
        ...prev.slice(0, 4),
      ]);
    }

    setLoadingTool(null);
  };

  return (
    <Box>
      {/* ===== HEADER ===== */}
      {/* ===== HEADER ===== */}
<Box sx={{ mb: 3 }}>
  <Typography
    variant="h4"
    fontWeight={700}
    sx={{
      color: "#111827", // slate-900 → strong contrast
      letterSpacing: "-0.02em",
    }}
  >
    Admin Utilities
  </Typography>

  <Typography
    sx={{
      mt: 0.8,
      maxWidth: 640,
      fontSize: "0.95rem",
      color: "#4b5563", // slate-600 → readable but soft
      lineHeight: 1.6,
    }}
  >
    System-level tools for maintenance, diagnostics, safety checks,
    and operational control.
  </Typography>
</Box>


      {/* ===== CATEGORY TABS ===== */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 3 }}
      >
        {CATEGORIES.map((c) => (
          <Tab key={c} label={c} />
        ))}
      </Tabs>

      {/* ===== TOOLS GRID ===== */}
      <Grid container spacing={3}>
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            loading={loadingTool === tool.id}
            onOpen={() => setConfirmTool(tool)}
          />
        ))}
      </Grid>

      {/* ===== ACTIVITY LOG ===== */}
      {activity.length > 0 && (
        <Paper sx={{ mt: 4, p: 3, borderRadius: 3 }}>
          <Typography fontWeight={600} mb={1}>
            Recent Admin Activity
          </Typography>
          <Stack spacing={0.8}>
            {activity.map((a) => (
              <Typography key={a.id} fontSize="0.85rem">
                • {a.text} — <span style={{ color: "#6b7280" }}>{a.time}</span>
              </Typography>
            ))}
          </Stack>
        </Paper>
      )}

      {/* ===== CONFIRMATION DIALOG ===== */}
      <Dialog open={!!confirmTool} onClose={() => setConfirmTool(null)}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberOutlined color="error" />
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to execute{" "}
            <strong>{confirmTool?.title}</strong>? This action may impact active
            users.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmTool(null)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: DANGER }}
            onClick={() => executeTool(confirmTool)}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== SNACKBAR ===== */}
      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
      >
        <Alert severity={snackbar?.type} variant="filled">
          {snackbar?.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

/* ================= TOOL CARD ================= */

const ToolCard = memo(function ToolCard({ tool, loading, onOpen }) {
  const Icon = tool.icon;

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper
        sx={{
          p: 3,
          height: "100%",
          borderRadius: 3,
          position: "relative",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
          },
        }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              background: tool.danger
                ? `linear-gradient(135deg, ${DANGER}, #991b1b)`
                : `linear-gradient(135deg, ${BRAND}, #23124f)`,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon />
          </Box>

          <Typography fontWeight={600}>{tool.title}</Typography>

          <Typography fontSize="0.85rem" color="text.secondary">
            {tool.desc}
          </Typography>

          {tool.danger && (
            <Chip
              label="Dangerous Action"
              size="small"
              color="error"
              sx={{ width: "fit-content" }}
            />
          )}

          <Button
            size="small"
            variant="outlined"
            disabled={loading}
            aria-label={`Execute ${tool.title}`}
            onClick={onOpen}
            sx={{ width: "fit-content" }}
          >
            {loading ? <CircularProgress size={18} /> : "Open Tool"}
          </Button>
        </Stack>
      </Paper>
    </Grid>
  );
});
