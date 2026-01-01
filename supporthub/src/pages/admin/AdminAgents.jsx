import {
  Box,
  Typography,
  Paper,
  Stack,
  Grid,
  Chip,
  Avatar,
  Divider,
  Tooltip,
  IconButton,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  LinearProgress,
} from "@mui/material";
import GroupOutlined from "@mui/icons-material/GroupOutlined";
import CircleOutlined from "@mui/icons-material/CircleOutlined";
import WorkOutlineOutlined from "@mui/icons-material/WorkOutlineOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import BlockOutlined from "@mui/icons-material/BlockOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import { useState } from "react";

/* ================= THEME ================= */

const BRAND = "#2d1b69";

/* ================= MOCK AGENT DATA ================= */

const AGENTS = [
  {
    id: 1,
    name: "Agent Mike",
    role: "Senior Agent",
    status: "online",
    workload: 3,
    avgResponse: "32s",
    skills: ["Billing", "Payments"],
  },
  {
    id: 2,
    name: "Agent Sarah",
    role: "Agent",
    status: "busy",
    workload: 6,
    avgResponse: "58s",
    skills: ["Technical", "Account"],
  },
  {
    id: 3,
    name: "Agent John",
    role: "Junior Agent",
    status: "offline",
    workload: 0,
    avgResponse: "--",
    skills: ["General"],
  },
];

/* ================= MAIN ================= */

export default function AdminAgents() {
  const [agents, setAgents] = useState(AGENTS);
  const [confirmAgent, setConfirmAgent] = useState(null);
  const [viewAgent, setViewAgent] = useState(null);

  const toggleStatus = (id) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "offline" ? "online" : "offline" }
          : a
      )
    );
    setConfirmAgent(null);
  };

  const updateRole = (id, role) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, role } : a))
    );
  };

  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
        <GroupOutlined sx={{ color: BRAND }} />
        <Typography variant="h4" fontWeight={700} color="#111827">
          Agent Management
        </Typography>
      </Stack>

      <Typography sx={{ mb: 3, maxWidth: 720, color: "#4b5563" }}>
        Manage agents, monitor workload risk, availability, and operational
        efficiency in real time.
      </Typography>

      {/* ===== KPI ===== */}
      <Grid container spacing={3} mb={4}>
        <Kpi label="Total Agents" value={agents.length} />
        <Kpi label="Online" value={agents.filter(a => a.status === "online").length} />
        <Kpi label="Busy" value={agents.filter(a => a.status === "busy").length} />
        <Kpi label="Offline" value={agents.filter(a => a.status === "offline").length} />
      </Grid>

      {/* ===== AGENT LIST ===== */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2}>
          {agents.map((agent, index) => {
            const risk =
              agent.workload >= 6 ? "high" :
              agent.workload >= 4 ? "medium" : "low";

            return (
              <Box key={agent.id}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  justifyContent="space-between"
                  alignItems={{ md: "center" }}
                >
                  {/* LEFT */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: BRAND }}>
                      {agent.name.charAt(0)}
                    </Avatar>

                    <Box>
                      <Typography fontWeight={600}>{agent.name}</Typography>
                      <Typography fontSize="0.8rem" color="text.secondary">
                        {agent.role}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* CENTER */}
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <StatusBadge status={agent.status} />

                    <Chip
                      icon={<WorkOutlineOutlined />}
                      label={`${agent.workload} tickets`}
                      size="small"
                      color={risk === "high" ? "error" : risk === "medium" ? "warning" : "default"}
                    />

                    <Chip
                      icon={<AccessTimeOutlined />}
                      label={agent.avgResponse}
                      size="small"
                    />

                    {risk === "high" && (
                      <Chip
                        icon={<WarningAmberOutlined />}
                        label="Overloaded"
                        size="small"
                        color="error"
                        variant="outlined"
                      />
                    )}
                  </Stack>

                  {/* RIGHT */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                      select
                      size="small"
                      value={agent.role}
                      onChange={(e) =>
                        updateRole(agent.id, e.target.value)
                      }
                      sx={{ minWidth: 150 }}
                    >
                      <MenuItem value="Junior Agent">Junior Agent</MenuItem>
                      <MenuItem value="Agent">Agent</MenuItem>
                      <MenuItem value="Senior Agent">Senior Agent</MenuItem>
                    </TextField>

                    <Tooltip title="View activity">
                      <IconButton onClick={() => setViewAgent(agent)}>
                        <VisibilityOutlined />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Enable / Disable agent">
                      <IconButton
                        color="error"
                        onClick={() => setConfirmAgent(agent)}
                      >
                        <BlockOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>

                {/* SKILLS */}
                <Stack direction="row" spacing={1} mt={1.5} ml={7}>
                  {agent.skills.map((s) => (
                    <Chip key={s} label={s} size="small" variant="outlined" />
                  ))}
                </Stack>

                {index !== agents.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            );
          })}
        </Stack>
      </Paper>

      {/* ===== CONFIRM DIALOG ===== */}
      <Dialog open={!!confirmAgent} onClose={() => setConfirmAgent(null)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          Disable access for <strong>{confirmAgent?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmAgent(null)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => toggleStatus(confirmAgent.id)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== ACTIVITY DRAWER (SIMULATED) ===== */}
      <Dialog open={!!viewAgent} onClose={() => setViewAgent(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{viewAgent?.name} — Activity</DialogTitle>
        <DialogContent>
          <Typography fontSize="0.9rem" mb={2}>
            Recent workload & performance snapshot
          </Typography>

          <Typography fontSize="0.8rem">Capacity</Typography>
          <LinearProgress
            variant="determinate"
            value={(viewAgent?.workload || 0) * 15}
            sx={{ mb: 2 }}
          />

          <Typography fontSize="0.8rem" color="text.secondary">
            Avg Response Time: {viewAgent?.avgResponse}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewAgent(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/* ================= SUB ================= */

function Kpi({ label, value }) {
  return (
    <Grid item xs={12} sm={6} lg={3}>
      <Paper sx={{ p: 2.5, borderRadius: 3 }}>
        <Typography fontSize="0.8rem" color="text.secondary">
          {label}
        </Typography>
        <Typography fontSize="1.6rem" fontWeight={700}>
          {value}
        </Typography>
      </Paper>
    </Grid>
  );
}

function StatusBadge({ status }) {
  const map = {
    online: { label: "Online", color: "success" },
    busy: { label: "Busy", color: "warning" },
    offline: { label: "Offline", color: "default" },
  };

  return (
    <Chip
      icon={<CircleOutlined />}
      label={map[status].label}
      color={map[status].color}
      size="small"
    />
  );
}
