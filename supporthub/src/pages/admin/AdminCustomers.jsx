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
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  LinearProgress,
} from "@mui/material";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import FlagOutlined from "@mui/icons-material/FlagOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";
import { useState } from "react";

/* ================= THEME ================= */

const BRAND = "#2d1b69";

/* ================= MOCK CUSTOMER DATA ================= */

const CUSTOMERS = [
  {
    id: 1,
    name: "John Doe",
    tier: "VIP",
    status: "active",
    tickets: 5,
    openTickets: 2,
    slaRisk: "medium",
    lastSeen: "2 min ago",
  },
  {
    id: 2,
    name: "Alice Smith",
    tier: "Standard",
    status: "active",
    tickets: 1,
    openTickets: 0,
    slaRisk: "low",
    lastSeen: "1 hour ago",
  },
  {
    id: 3,
    name: "Premshankar",
    tier: "Enterprise",
    status: "flagged",
    tickets: 12,
    openTickets: 6,
    slaRisk: "high",
    lastSeen: "Online",
  },
];

/* ================= MAIN COMPONENT ================= */

export default function AdminCustomers() {
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [flagCustomer, setFlagCustomer] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? customers
      : customers.filter((c) => c.tier === filter);

  const toggleFlag = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "flagged" ? "active" : "flagged" }
          : c
      )
    );
    setFlagCustomer(null);
  };

  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
        <PeopleOutlined sx={{ color: BRAND }} />
        <Typography variant="h4" fontWeight={700} color="#111827">
          Customer Management
        </Typography>
      </Stack>

      <Typography sx={{ mb: 3, maxWidth: 720, color: "#4b5563" }}>
        Monitor customers, track support load, SLA risks, and manage
        high-impact accounts.
      </Typography>

      {/* ===== KPI ===== */}
      <Grid container spacing={3} mb={4}>
        <Kpi label="Total Customers" value={customers.length} />
        <Kpi label="VIP / Enterprise" value={customers.filter(c => c.tier !== "Standard").length} />
        <Kpi label="Flagged Accounts" value={customers.filter(c => c.status === "flagged").length} danger />
        <Kpi label="High SLA Risk" value={customers.filter(c => c.slaRisk === "high").length} danger />
      </Grid>

      {/* ===== FILTER ===== */}
      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          select
          size="small"
          label="Customer Tier"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ maxWidth: 220 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Standard">Standard</MenuItem>
          <MenuItem value="VIP">VIP</MenuItem>
          <MenuItem value="Enterprise">Enterprise</MenuItem>
        </TextField>

        <TextField
          size="small"
          placeholder="Search customer…"
          sx={{ maxWidth: 260 }}
        />
      </Stack>

      {/* ===== CUSTOMER LIST ===== */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2}>
          {filtered.map((c, index) => (
            <Box key={c.id}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ md: "center" }}
              >
                {/* LEFT */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: BRAND }}>
                    {c.name.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography fontWeight={600}>{c.name}</Typography>
                    <Typography fontSize="0.8rem" color="text.secondary">
                      Last seen: {c.lastSeen}
                    </Typography>
                  </Box>
                </Stack>

                {/* CENTER */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip label={c.tier} size="small" />
                  <Chip
                    icon={<SupportAgentOutlined />}
                    label={`${c.openTickets}/${c.tickets} open`}
                    size="small"
                  />

                  {c.slaRisk === "high" && (
                    <Chip
                      icon={<WarningAmberOutlined />}
                      label="SLA Risk"
                      size="small"
                      color="error"
                      variant="outlined"
                    />
                  )}
                </Stack>

                {/* RIGHT */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Tooltip title="View profile">
                    <IconButton onClick={() => setViewCustomer(c)}>
                      <VisibilityOutlined />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Flag / Unflag">
                    <IconButton
                      color="error"
                      onClick={() => setFlagCustomer(c)}
                    >
                      <FlagOutlined />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>

              {index !== filtered.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* ===== VIEW DIALOG ===== */}
      <Dialog open={!!viewCustomer} onClose={() => setViewCustomer(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{viewCustomer?.name} — Account Overview</DialogTitle>
        <DialogContent>
          <Typography fontSize="0.9rem" mb={2}>
            Support load & SLA pressure
          </Typography>

          <Typography fontSize="0.8rem">Open Ticket Load</Typography>
          <LinearProgress
            variant="determinate"
            value={(viewCustomer?.openTickets || 0) * 15}
            sx={{ mb: 2 }}
          />

          <Typography fontSize="0.8rem" color="text.secondary">
            Tier: {viewCustomer?.tier}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewCustomer(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ===== FLAG CONFIRM ===== */}
      <Dialog open={!!flagCustomer} onClose={() => setFlagCustomer(null)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          Flag <strong>{flagCustomer?.name}</strong> for review?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFlagCustomer(null)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => toggleFlag(flagCustomer.id)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/* ================= SUB ================= */

function Kpi({ label, value, danger }) {
  return (
    <Grid item xs={12} sm={6} lg={3}>
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
