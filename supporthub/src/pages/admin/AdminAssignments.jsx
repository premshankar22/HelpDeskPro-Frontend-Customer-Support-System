import {
  Box,
  Typography,
  Paper,
  Stack,
  Grid,
  Chip,
  Avatar,
  Divider,
  Button,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import AssignmentOutlined from "@mui/icons-material/AssignmentOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import { useState, useMemo } from "react";

/* ================= THEME ================= */

const BRAND = "#2d1b69";

/* ================= MOCK DATA ================= */

const TICKETS = [
  {
    id: "TCK-1001",
    subject: "Payment not processed",
    priority: "high",
    slaRisk: true,
    created: "10 min ago",
    assignedTo: null,
  },
  {
    id: "TCK-1002",
    subject: "Login issue",
    priority: "normal",
    slaRisk: false,
    created: "30 min ago",
    assignedTo: null,
  },
];

const AGENTS = [
  { id: 1, name: "Agent Mike", workload: 3, status: "online" },
  { id: 2, name: "Agent Sarah", workload: 6, status: "busy" },
  { id: 3, name: "Agent John", workload: 0, status: "online" },
];

/* ================= MAIN COMPONENT ================= */

export default function AdminAssignments() {
  const [tickets, setTickets] = useState(TICKETS);
  const [assigning, setAssigning] = useState(null);
  const [agent, setAgent] = useState("");
  const [snackbar, setSnackbar] = useState(null);

  /* ===== AUTO SUGGEST AGENT ===== */
  const suggestedAgent = useMemo(() => {
    return AGENTS
      .filter((a) => a.status === "online")
      .sort((a, b) => a.workload - b.workload)[0];
  }, []);

  const assignTicket = () => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === assigning.id ? { ...t, assignedTo: agent } : t
      )
    );

    setSnackbar({
      type: "success",
      msg: `Ticket assigned to ${agent}`,
    });

    setAssigning(null);
    setAgent("");
  };

  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
        <AssignmentOutlined sx={{ color: BRAND }} />
        <Typography variant="h4" fontWeight={700} color="#111827">
          Ticket Assignment
        </Typography>
      </Stack>

      <Typography sx={{ mb: 3, maxWidth: 720, color: "#4b5563" }}>
        Assign unassigned tickets intelligently while balancing agent workload
        and minimizing SLA risk.
      </Typography>

      {/* ===== KPI ===== */}
      <Grid container spacing={3} mb={4}>
        <Kpi label="Unassigned Tickets" value={tickets.length} />
        <Kpi
          label="High SLA Risk"
          value={tickets.filter((t) => t.slaRisk).length}
          danger
        />
        <Kpi
          label="Online Agents"
          value={AGENTS.filter((a) => a.status === "online").length}
        />
      </Grid>

      {/* ===== TICKET LIST ===== */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2}>
          {tickets.map((t, index) => (
            <Box key={t.id}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ md: "center" }}
                spacing={2}
              >
                {/* LEFT */}
                <Box>
                  <Typography fontWeight={600}>{t.subject}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontSize="0.8rem" color="text.secondary">
                      {t.id}
                    </Typography>
                    <AccessTimeOutlined fontSize="small" />
                    <Typography fontSize="0.8rem">
                      {t.created}
                    </Typography>
                  </Stack>
                </Box>

                {/* CENTER */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={t.priority}
                    size="small"
                    color={t.priority === "high" ? "error" : "default"}
                  />
                  {t.slaRisk && (
                    <Chip
                      icon={<WarningAmberOutlined />}
                      label="SLA Risk"
                      color="error"
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Stack>

                {/* RIGHT */}
                <Button
                  variant="outlined"
                  startIcon={<SupportAgentOutlined />}
                  onClick={() => setAssigning(t)}
                >
                  Assign
                </Button>
              </Stack>

              {index !== tickets.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* ===== ASSIGN DIALOG ===== */}
      <Dialog
        open={!!assigning}
        onClose={() => setAssigning(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Assign Ticket</DialogTitle>

        <DialogContent>
          <Typography fontSize="0.9rem" mb={2}>
            Assign <strong>{assigning?.subject}</strong>
          </Typography>

          {suggestedAgent && (
            <Chip
              icon={<AutoAwesomeOutlined />}
              label={`Suggested: ${suggestedAgent.name}`}
              sx={{ mb: 2 }}
              color="success"
              variant="outlined"
            />
          )}

          <TextField
            select
            fullWidth
            label="Select Agent"
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
          >
            {AGENTS.map((a) => (
              <MenuItem
                key={a.id}
                value={a.name}
                disabled={a.status !== "online"}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ width: 26, height: 26 }}>
                    {a.name.charAt(0)}
                  </Avatar>
                  <Typography>
                    {a.name} — {a.workload} tickets
                  </Typography>
                </Stack>
              </MenuItem>
            ))}
          </TextField>

          {assigning?.slaRisk && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              This ticket is at risk of SLA breach. Assign promptly.
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setAssigning(null)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!agent}
            onClick={assignTicket}
          >
            Confirm Assignment
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== FEEDBACK ===== */}
      <Snackbar
        open={!!snackbar}
        autoHideDuration={2500}
        onClose={() => setSnackbar(null)}
      >
        <Alert severity={snackbar?.type} variant="filled">
          {snackbar?.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

/* ================= SUB ================= */

function Kpi({ label, value, danger }) {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Paper sx={{ p: 2.5, borderRadius: 3 }}>
        <Typography fontSize="0.8rem" color="text.secondary">
          {label}
        </Typography>
        <Typography
          fontSize="1.6rem"
          fontWeight={700}
          color={danger ? "error.main" : "#111827"}
        >
          {value}
        </Typography>
      </Paper>
    </Grid>
  );
}
