import {
  Box,
  Typography,
  Paper,
  Stack,
  Grid,
  Chip,
  Divider,
  TextField,
  MenuItem,
  Button,
  Avatar,
  Checkbox,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import PriorityHighOutlined from "@mui/icons-material/PriorityHighOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import AssignmentIndOutlined from "@mui/icons-material/AssignmentIndOutlined";
import TimerOutlined from "@mui/icons-material/TimerOutlined";
import { useState } from "react";
import { useTickets } from "../../hooks/useTickets";

/* ================= THEME ================= */

const BRAND = "#2d1b69";

/* ================= MAIN ================= */

export default function AdminTickets() {
  const {
    loading,
  tickets,
  total,
  status,
  setStatus,
  search,
  setSearch,
  resetFilters,
  updateTicket,
  bulkUpdateTickets,
  } = useTickets();

  const [selected, setSelected] = useState([]);

  

  const allSelected =
  tickets.length > 0 && selected.length === tickets.length;

 const toggleSelectAll = (checked) => {
  setSelected(checked ? tickets.map((t) => t.id) : []);
 };


 const handleBulkEscalate = () => {
  bulkUpdateTickets(selected, {
    status: "escalated",
    priority: "high",
  });
  setSelected([]);
};

 const handleAssign = (ticketId) => {
  updateTicket(ticketId, {
    assignedTo: "Agent Mike",
    status: "pending",
  });
};
 

const handleBulkAssign = () => {
  bulkUpdateTickets(selected, {
    assignedTo: "Agent Mike",
    status: "pending",
  });
  setSelected([]);
};


const getSlaColor = (min) => {
  if (min <= 5) return "error";
  if (min <= 15) return "warning";
  return "default";
};


const handleView = (ticket) => {
  console.log("VIEW TICKET:", ticket);
};




  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
        <ConfirmationNumberOutlined sx={{ color: BRAND }} />
        <Typography variant="h4" fontWeight={700} color="#111827">
          All Support Tickets
        </Typography>
      </Stack>

      <Typography sx={{ mb: 3, maxWidth: 720, color: "#4b5563" }}>
        Centralized operational view with SLA tracking, ownership, and escalation
        intelligence.
      </Typography>

      {/* ===== FILTERS ===== */}
      <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Search ticket subject…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          size="small"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="escalated">Escalated</MenuItem>
        </TextField>

        <Button size="small" variant="text" onClick={resetFilters}>
          Reset
        </Button>

        {selected.length > 0 && (
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" onClick={handleBulkAssign}>
              Bulk Assign
            </Button>
            <Button size="small" color="error" variant="outlined" onClick={handleBulkEscalate}>
              Escalate
            </Button>
          </Stack>
        )}
      </Stack>

      {/* ===== CONTENT ===== */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        {loading ? (
          <Stack alignItems="center" py={6}>
            <CircularProgress />
            <Typography mt={2} color="text.secondary">
              Loading tickets…
            </Typography>
          </Stack>
        ) : tickets.length === 0 ? (
          <Typography color="text.secondary">
            No tickets match the current filters.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {tickets.map((t, index) => (
              <Box key={t.id}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  alignItems={{ md: "center" }}
                  justifyContent="space-between"
                >
                  {/* LEFT */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Checkbox
                      checked={allSelected}
                      indeterminate={selected.length > 0 && !allSelected}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                    />


                    <Avatar sx={{ bgcolor: BRAND }}>
                      <PersonOutlined />
                    </Avatar>

                    <Box>
                      <Typography fontWeight={600}>{t.subject}</Typography>
                      <Typography fontSize="0.8rem" color="text.secondary">
                        {t.id} • {t.customer} • {t.created}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* CENTER */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={t.status}
                      size="small"
                      color={
                        t.status === "escalated"
                          ? "error"
                          : t.status === "pending"
                          ? "warning"
                          : "default"
                      }
                    />

                    <Chip
                      icon={<PriorityHighOutlined />}
                      label={t.priority}
                      size="small"
                      color={t.priority === "high" ? "error" : "default"}
                    />

                    {typeof t.slaMinutesLeft === "number" && (
                      <Tooltip title="Minutes left before SLA breach">
                        <Chip
                          icon={<TimerOutlined />}
                          label={`${t.slaMinutesLeft} min`}
                          size="small"
                           color={getSlaColor(t.slaMinutesLeft)}
                          variant="outlined"
                        />
                      </Tooltip>
                    )}

                    <Chip
                      icon={<AssignmentIndOutlined />}
                      label={t.assignedTo ?? "Unassigned"}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>

                  {/* RIGHT */}
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined"  onClick={() => handleView(t)}>
                      View
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ bgcolor: BRAND }}
                      onClick={() => handleAssign(t.id)}
                    >
                      Assign
                    </Button>
                  </Stack>
                </Stack>

                {index !== tickets.length - 1 && (
                  <Divider sx={{ mt: 2 }} />
                )}
              </Box>
            ))}
          </Stack>
        )}
      </Paper>

      {/* ===== FOOTER META ===== */}
      {!loading && (
        <Typography mt={2} fontSize="0.8rem" color="text.secondary">
          Showing {tickets.length} of {total} tickets
        </Typography>
      )}
    </Box>
  );
}
