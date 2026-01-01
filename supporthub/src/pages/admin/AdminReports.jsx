import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Button,
  MenuItem,
  TextField,
  Chip,
  Divider,
} from "@mui/material";
import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import TrendingUpOutlined from "@mui/icons-material/TrendingUpOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import DownloadOutlined from "@mui/icons-material/DownloadOutlined";
import ScheduleOutlined from "@mui/icons-material/ScheduleOutlined";
import { useState } from "react";

/* ================= THEME ================= */

const BRAND = "#2d1b69";

/* ================= MAIN COMPONENT ================= */

export default function AdminReports() {
  const [range, setRange] = useState("7d");

  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ md: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: "#111827" }}
          >
            Analytics & Reports
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              color: "#4b5563",
              maxWidth: 640,
              fontSize: "0.95rem",
            }}
          >
            Monitor system performance, ticket trends, and support efficiency.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <TextField
            select
            size="small"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="7d">Last 7 Days</MenuItem>
            <MenuItem value="30d">Last 30 Days</MenuItem>
          </TextField>

          <Button
            startIcon={<DownloadOutlined />}
            variant="outlined"
          >
            Export
          </Button>

          <Button
            startIcon={<ScheduleOutlined />}
            variant="contained"
            sx={{ bgcolor: BRAND }}
          >
            Schedule
          </Button>
        </Stack>
      </Stack>

      {/* ===== KPI CARDS ===== */}
      <Grid container spacing={3}>
        <KpiCard
          icon={<BarChartOutlined />}
          label="Total Tickets"
          value="1,248"
          trend="+12%"
        />
        <KpiCard
          icon={<CheckCircleOutlined />}
          label="Resolution Rate"
          value="92%"
          trend="+4%"
          positive
        />
        <KpiCard
          icon={<TrendingUpOutlined />}
          label="SLA Compliance"
          value="89%"
          trend="-2%"
        />
        <KpiCard
          icon={<PeopleOutlined />}
          label="Active Agents"
          value="24"
          trend="+3"
          positive
        />
      </Grid>

      {/* ===== CHART PLACEHOLDERS ===== */}
      <Grid container spacing={3} mt={1}>
        <ChartCard title="Ticket Volume Trend">
          <ChartPlaceholder />
        </ChartCard>

        <ChartCard title="Ticket Status Distribution">
          <ChartPlaceholder />
        </ChartCard>

        <ChartCard title="Agent Workload Overview">
          <ChartPlaceholder />
        </ChartCard>
      </Grid>

      {/* ===== FOOTER NOTE ===== */}
      <Paper sx={{ mt: 4, p: 2.5, borderRadius: 3 }}>
        <Typography fontSize="0.85rem" color="text.secondary">
          Reports are generated using simulated frontend data.  
          Backend analytics services can be integrated seamlessly.
        </Typography>
      </Paper>
    </Box>
  );
}

/* ================= SUB COMPONENTS ================= */

function KpiCard({ icon, label, value, trend, positive }) {
  return (
    <Grid item xs={12} sm={6} lg={3}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          height: "100%",
        }}
      >
        <Stack spacing={1}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${BRAND}, #23124f)`,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>

          <Typography fontSize="0.85rem" color="text.secondary">
            {label}
          </Typography>

          <Typography fontSize="1.5rem" fontWeight={700}>
            {value}
          </Typography>

          <Chip
            label={trend}
            size="small"
            color={positive ? "success" : "default"}
            sx={{ width: "fit-content" }}
          />
        </Stack>
      </Paper>
    </Grid>
  );
}

function ChartCard({ title, children }) {
  return (
    <Grid item xs={12} lg={4}>
      <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
        <Typography fontWeight={600} mb={1}>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {children}
      </Paper>
    </Grid>
  );
}

function ChartPlaceholder() {
  return (
    <Box
      sx={{
        height: 180,
        borderRadius: 2,
        background:
          "repeating-linear-gradient(45deg, #f3f4f6, #f3f4f6 10px, #e5e7eb 10px, #e5e7eb 20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#6b7280",
        fontSize: "0.85rem",
      }}
    >
        Chart will render here
    </Box>
  );
}
