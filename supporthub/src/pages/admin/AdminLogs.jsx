import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Divider,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { useMemo, useState } from "react";

/* ================= THEME ================= */

const BRAND = "#2d1b69";

/* ================= MOCK AUDIT LOGS ================= */

const LOGS = [
  {
    id: 1,
    action: "Admin Login",
    actor: "Admin User",
    severity: "info",
    time: "Today • 10:12 AM",
  },
  {
    id: 2,
    action: "Cache Cleared",
    actor: "Admin User",
    severity: "warning",
    time: "Today • 10:45 AM",
  },
  {
    id: 3,
    action: "Force Session Reset",
    actor: "Admin User",
    severity: "critical",
    time: "Earlier • 11:05 AM",
  },
];

/* ================= MAIN COMPONENT ================= */

export default function AdminLogs() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filteredLogs = useMemo(() => {
    return LOGS.filter((log) => {
      const matchSeverity =
        filter === "all" || log.severity === filter;

      const matchQuery =
        log.action.toLowerCase().includes(query.toLowerCase()) ||
        log.actor.toLowerCase().includes(query.toLowerCase());

      return matchSeverity && matchQuery;
    });
  }, [filter, query]);

  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Stack spacing={1.5} mb={3}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <SecurityOutlined sx={{ color: BRAND }} />
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: "#111827" }}
          >
            Audit Logs & Security
          </Typography>
        </Stack>

        <Typography
          sx={{
            maxWidth: 720,
            color: "#4b5563",
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}
        >
          Read-only audit trail of sensitive system actions. These logs
          cannot be modified and are retained for compliance and
          security monitoring.
        </Typography>
      </Stack>

      {/* ===== CONTROLS ===== */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={3}
      >
        <TextField
          size="small"
          placeholder="Search by action or actor"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 320 }}
        />

        <TextField
          select
          size="small"
          label="Severity"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="info">Info</MenuItem>
          <MenuItem value="warning">Warning</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
        </TextField>
      </Stack>

      {/* ===== LOG LIST ===== */}
      <Paper sx={{ p: 2.5, borderRadius: 3 }}>
        <Stack spacing={1.5}>
          {filteredLogs.map((log) => (
            <Paper
              key={log.id}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
                borderLeft: `4px solid ${severityColor(log.severity)}`,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                },
              }}
            >
              <SeverityIcon severity={log.severity} />

              <Box flex={1}>
                <Typography fontWeight={600}>
                  {log.action}
                </Typography>

                <Typography
                  fontSize="0.85rem"
                  color="text.secondary"
                >
                  {log.actor} • {log.time}
                </Typography>

                <Stack direction="row" spacing={1} mt={1}>
                  <Chip
                    icon={<LockOutlined />}
                    label="Immutable"
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label="System Generated"
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              </Box>

              <SeverityChip severity={log.severity} />
            </Paper>
          ))}

          {filteredLogs.length === 0 && (
            <Typography
              color="text.secondary"
              fontSize="0.9rem"
              sx={{ p: 2 }}
            >
              No logs match your search or filter.
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

/* ================= HELPERS ================= */

function SeverityChip({ severity }) {
  const map = {
    info: { label: "Info", color: "default" },
    warning: { label: "Warning", color: "warning" },
    critical: { label: "Critical", color: "error" },
  };

  const s = map[severity];

  return (
    <Chip
      label={s.label}
      color={s.color}
      size="small"
      variant="outlined"
    />
  );
}

function SeverityIcon({ severity }) {
  const map = {
    info: <InfoOutlined color="action" />,
    warning: <WarningAmberOutlined color="warning" />,
    critical: <SecurityOutlined color="error" />,
  };

  return map[severity];
}

function severityColor(sev) {
  return {
    info: "#c7d2fe",
    warning: "#fde68a",
    critical: "#fecaca",
  }[sev];
}
