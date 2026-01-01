import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

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

export default function TicketDetailsDialog({ open, ticket, onClose }) {
  if (!ticket) return null;

  const hasAttachments =
    Array.isArray(ticket.attachments) && ticket.attachments.length > 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* ===== HEADER ===== */}
      <DialogTitle
        sx={{
          fontWeight: 700,
          pb: 1,
        }}
      >
        Ticket Details
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* ===== TOP CARD ===== */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2,
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(236,254,255,0.9))",
            }}
          >
            <Stack spacing={1.2}>
              <Typography fontSize="0.75rem" color="text.secondary">
                Ticket ID
              </Typography>

              <Typography fontWeight={600}>
                {ticket.id}
              </Typography>

              <Typography
                variant="h6"
                sx={{ mt: 1 }}
              >
                {ticket.subject}
              </Typography>

              <Stack direction="row" spacing={1} mt={1}>
                <Chip
                  label={ticket.status}
                  color={STATUS_COLORS[ticket.status]}
                  size="small"
                />
                <Chip
                  label={ticket.priority}
                  color={PRIORITY_COLORS[ticket.priority]}
                  size="small"
                  variant="outlined"
                />
              </Stack>
            </Stack>
          </Paper>

          {/* ===== META ===== */}
          <Stack direction="row" spacing={4}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Created At
              </Typography>
              <Typography variant="body2">
                {ticket.createdAt}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body2">
                {ticket.updatedAt}
              </Typography>
            </Box>
          </Stack>

          {/* ===== DESCRIPTION ===== */}
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Description
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                mt: 1,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#fafafa",
              }}
            >
              <Typography variant="body2">
                {ticket.description || "No description provided"}
              </Typography>
            </Paper>
          </Box>

          {/* ===== ATTACHMENTS ===== */}
          {hasAttachments && (
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                mb={1}
                display="block"
              >
                Attachments
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {ticket.attachments.map((file, index) => (
                  <Chip
                    key={index}
                    icon={<AttachFileOutlinedIcon />}
                    label={file}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </DialogContent>

      {/* ===== ACTIONS ===== */}
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
