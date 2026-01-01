import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
  Button,
  Divider,
  LinearProgress,
} from "@mui/material";
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import TrendingUpOutlined from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlined from "@mui/icons-material/TrendingDownOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";

/* ================= THEME ================= */

const BRAND = "#2d1b69";

/* ================= MOCK INTELLIGENCE ================= */

const METRICS = [
  {
    title: "Open Tickets",
    value: 24,
    trend: "up",
    icon: <ConfirmationNumberOutlined />,
  },
  {
    title: "SLA Risk",
    value: 5,
    trend: "up",
    danger: true,
    icon: <WarningAmberOutlined />,
  },
  {
    title: "Active Agents",
    value: "8 / 12",
    trend: "stable",
    icon: <SupportAgentOutlined />,
  },
  {
    title: "Live Chats",
    value: 6,
    trend: "down",
    icon: <ChatOutlined />,
  },
];

/* ================= MAIN ================= */

export default function AdminDashboard() {
  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Stack spacing={0.6} mb={4}>
        <Typography variant="h4" fontWeight={700} color="#111827">
          Admin Dashboard
        </Typography>
        <Typography color="text.secondary">
          Operational intelligence & system health overview
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <AccessTimeOutlined fontSize="small" />
          <Typography fontSize="0.75rem" color="text.secondary">
            Last updated: Just now
          </Typography>
        </Stack>
      </Stack>

      {/* ===== KPI INTELLIGENCE ===== */}
      <Grid container spacing={3} mb={4}>
        {METRICS.map((m) => (
          <Kpi key={m.title} {...m} />
        ))}
      </Grid>

      {/* ===== EXECUTIVE PANELS ===== */}
      <Grid container spacing={3}>
        {/* ===== SYSTEM HEALTH ===== */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography fontWeight={600} mb={2}>
              System Health & Confidence
            </Typography>

            <Stack spacing={2}>
              <HealthRow label="API Services" level={95} />
              <HealthRow label="Chat Infrastructure" level={92} />
              <HealthRow label="SLA Monitoring" level={78} warning />
              <HealthRow label="Audit Logging" level={100} />
            </Stack>
          </Paper>
        </Grid>

        {/* ===== RISK & ACTIONS ===== */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography fontWeight={600} mb={2}>
              Immediate Attention Required
            </Typography>

            <Stack spacing={2}>
              <Insight
                severity="critical"
                text="3 tickets predicted to breach SLA in < 10 minutes"
                action="View SLA Queue"
              />

              <Insight
                severity="warning"
                text="2 agents exceeding recommended workload"
                action="Balance Load"
              />

              <Insight
                severity="info"
                text="Escalation rate increased by 12% today"
                action="Review Chats"
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

/* ================= SUB COMPONENTS ================= */

function Kpi({ title, value, icon, trend, danger }) {
  const trendIcon =
    trend === "up" ? (
      <TrendingUpOutlined color={danger ? "error" : "success"} />
    ) : trend === "down" ? (
      <TrendingDownOutlined color="success" />
    ) : (
      <TrendingUpOutlined color="disabled" />
    );

  return (
    <Grid item xs={12} sm={6} lg={3}>
      <Paper
        sx={{
          p: 2.5,
          borderRadius: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography fontSize="0.75rem" color="text.secondary">
            {title}
          </Typography>

          <Typography
            fontSize="1.8rem"
            fontWeight={700}
            color={danger ? "error.main" : "#111827"}
          >
            {value}
          </Typography>

          <Stack direction="row" spacing={0.5} alignItems="center">
            {trendIcon}
            <Typography fontSize="0.75rem" color="text.secondary">
              {trend === "stable" ? "Stable" : trend === "up" ? "Increasing" : "Decreasing"}
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: "14px",
            bgcolor: danger ? "error.main" : BRAND,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </Paper>
    </Grid>
  );
}

function HealthRow({ label, level, warning }) {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={0.6}>
        <Typography fontSize="0.85rem">{label}</Typography>
        <Typography
          fontSize="0.8rem"
          color={warning ? "warning.main" : "text.secondary"}
        >
          {level}%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={level}
        color={warning ? "warning" : "success"}
        sx={{ height: 6, borderRadius: 4 }}
      />
    </Box>
  );
}

function Insight({ text, action, severity }) {
  const colorMap = {
    critical: "error",
    warning: "warning",
    info: "primary",
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={0.5}>
          <Chip
            label={severity.toUpperCase()}
            size="small"
            color={colorMap[severity]}
            sx={{ width: "fit-content" }}
          />
          <Typography fontSize="0.9rem">{text}</Typography>
        </Stack>

        <Button size="small" variant="outlined">
          {action}
        </Button>
      </Stack>

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
