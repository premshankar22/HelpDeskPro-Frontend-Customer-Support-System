import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Paper,
  Chip,
  Button,
  Stack,
  Card,
  CardContent,
  Skeleton,
  Pagination,
} from "@mui/material";
import { useTickets } from "../../hooks/useTickets";
import TicketDetailsDialog from "./TicketDetailsDialog";

/* ================= CONSTANTS ================= */

const STATUS_COLORS = {
  Open: "warning",
  "In Progress": "info",
  Closed: "success",
};

const PRIORITY_COLORS = {
  High: "error",
  Medium: "warning",
  Low: "default",
};

/* ================= COMPONENT ================= */

export default function MyTickets() {
  const {
    status,
    setStatus,
    priority,
    setPriority,
    search,
    setSearch,
    page,
    setPage,
    rowsPerPage,
    loading,
    tickets,
    total,
    resetFilters,
  } = useTickets();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const pageCount = Math.ceil(total / rowsPerPage);

  return (
    <Box>

        <Box
    sx={{
      mb: 3,
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: { sm: "center" },
      justifyContent: "space-between",
      gap: 2,
    }}
  >
      {/* ===== HEADER ===== */}
    <Box>
  <Typography
    variant="h4"
    sx={{
      fontWeight: 700,
      color: "text.primary",
      letterSpacing: "-0.5px",
    }}
  >
    My Tickets
  </Typography>

  <Typography
    sx={{
      mt: 0.5,
      fontSize: "0.95rem",
      color: "text.secondary",
      maxWidth: 520,
    }}
  >
    View and track all your support requests in one place
  </Typography>
</Box>


      <Button
      variant="contained"
      size="medium"
      sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
    >
      Create Ticket
    </Button>
  </Box>

        {/* ===== FILTER BAR ===== */}
  <Paper
    elevation={0}
    sx={{
      p: 2,
      mb: 3,
      borderRadius: 3,
      border: "1px solid",
      borderColor: "divider",
      backgroundColor: "background.paper",
    }}
  >
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "2fr 1fr 1fr auto",
        },
        gap: 2,
        alignItems: "center",
      }}
    >
      {/* SEARCH */}
      <TextField
        fullWidth
        placeholder="Search tickets by subject…"
        size="small"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      />

      {/* STATUS */}
      <TextField
        select
        size="small"
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {["All", "Open", "In Progress", "Closed"].map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>

      {/* PRIORITY */}
      <TextField
        select
        size="small"
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        {["All", "High", "Medium", "Low"].map((p) => (
          <MenuItem key={p} value={p}>
            {p}
          </MenuItem>
        ))}
      </TextField>

      {/* CLEAR */}
      <Button
        variant="text"
        color="secondary"
        onClick={resetFilters}
        sx={{ whiteSpace: "nowrap" }}
      >
        Clear
      </Button>
    </Box>
  </Paper>

      {/* ===== LIST ===== */}
      <Stack spacing={2}>
        {loading ? (
          [...Array(rowsPerPage)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={110}
            />
          ))
        ) : tickets.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: "center" }}>
            <Typography color="text.secondary">
              No tickets found
            </Typography>
          </Paper>
        ) : (
          tickets.map((t) => (
            <Card
              key={t.id}
              onClick={() => {
                setSelectedTicket(t);
                setOpenDialog(true);
              }}
              sx={{
                cursor: "pointer",
                borderLeft: `5px solid ${
                  t.status === "Open"
                    ? "#f59e0b"
                    : t.status === "In Progress"
                    ? "#3b82f6"
                    : "#10b981"
                }`,
                transition: "0.2s",
                "&:hover": {
                  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  spacing={2}
                >
                  {/* LEFT */}
                  <Box>
                    <Typography fontWeight={600}>
                      {t.subject}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={0.5}
                    >
                      Ticket ID: {t.id}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Last updated: {t.updatedAt}
                    </Typography>
                  </Box>

                  {/* RIGHT */}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Chip
                      label={t.status}
                      color={STATUS_COLORS[t.status]}
                      size="small"
                    />
                    <Chip
                      label={t.priority}
                      color={PRIORITY_COLORS[t.priority]}
                      size="small"
                      variant="outlined"
                    />

                    {Array.isArray(t.attachments) && t.attachments.length > 0 && (
                   <Chip
                    label={`${t.attachments.length} file(s)`}
                    size="small"
                    variant="outlined"
                   />
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      {/* ===== PAGINATION ===== */}
      {pageCount > 1 && (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={pageCount}
            page={page + 1}
            onChange={(_, p) => setPage(p - 1)}
            color="primary"
          />
        </Box>
      )}

      {/* ===== DETAILS DIALOG ===== */}
      <TicketDetailsDialog
        open={openDialog}
        ticket={selectedTicket}
        onClose={() => {
          setOpenDialog(false);
          setSelectedTicket(null);
        }}
      />
    </Box>
  );
}
