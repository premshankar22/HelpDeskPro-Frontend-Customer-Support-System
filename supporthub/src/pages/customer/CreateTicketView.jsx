import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Stack,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FlagOutlined from "@mui/icons-material/FlagOutlined";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import AttachFileOutlined from "@mui/icons-material/AttachFileOutlined";

const BRAND = "#2d1b69";

export default function CreateTicketView({
  ticketId,
  createdAt,
  form,
  attachments,
  success,
  setSuccess,
  handleChange,
  handleFiles,
  handleSubmit,
}) {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      {/* ================= HEADER ================= */}
      <Paper
        sx={{
          mb: 4,
          p: 3.5,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${BRAND}, #23124f)`,
          color: "#fff",
          boxShadow: "0 18px 40px rgba(45,27,105,0.35)",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Create Support Ticket
        </Typography>
        <Typography sx={{ opacity: 0.9, mt: 0.5 }}>
          Raise a new request and our support team will assist you
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          mt={2}
          alignItems="center"
        >
          <Chip
            label={`Ticket ID: ${ticketId}`}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.18)",
              color: "#fff",
            }}
          />
          <Chip
            label="Status: Open"
            size="small"
            color="success"
            sx={{ bgcolor: "rgba(16,185,129,0.25)", color: "#fff" }}
          />
        </Stack>
      </Paper>

      {/* ================= FORM ================= */}
      <Paper
        sx={{
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        {/* ===== BASIC INFO ===== */}
        <StyledAccordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionHeader
              icon={<InfoOutlined color="primary" />}
              title="Basic Information"
              subtitle="Ticket subject and category"
            />
          </AccordionSummary>

          <AccordionDetails>
            <Stack spacing={2.5}>
              <TextField
                name="subject"
                label="Subject"
                placeholder="Brief summary of your issue"
                value={form.subject}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                select
                name="category"
                label="Category"
                value={form.category}
                onChange={handleChange}
                fullWidth
              >
                {["Account", "Billing", "Technical", "Account / Authentication Issues", "Other"].map(
                  c => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Stack>
          </AccordionDetails>
        </StyledAccordion>

        <Divider />

        {/* ===== PRIORITY ===== */}
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionHeader
              icon={<FlagOutlined sx={{ color: "#f59e0b" }} />}
              title="Priority Level"
              subtitle="How urgent is this issue?"
            />
          </AccordionSummary>

          <AccordionDetails>
            <TextField
              select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              fullWidth
            >
              {["Low", "Medium", "High"].map(p => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </AccordionDetails>
        </StyledAccordion>

        <Divider />

        {/* ===== DESCRIPTION ===== */}
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionHeader
              icon={<DescriptionOutlined sx={{ color: "#6366f1" }} />}
              title="Description"
              subtitle="Provide detailed information"
            />
          </AccordionSummary>

          <AccordionDetails>
            <TextField
              multiline
              rows={4}
              name="description"
              placeholder="Explain the issue in detail..."
              value={form.description}
              onChange={handleChange}
              fullWidth
            />
          </AccordionDetails>
        </StyledAccordion>

        <Divider />

        {/* ===== ATTACHMENTS ===== */}
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionHeader
              icon={<AttachFileOutlined />}
              title="Attachments"
              subtitle="Optional screenshots or files"
            />
          </AccordionSummary>

          <AccordionDetails>
            <Stack spacing={1.5}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<AttachFileOutlined />}
              >
                Upload Files
                <input
                  hidden
                  multiple
                  type="file"
                  onChange={e =>
                    handleFiles(e.target.files)
                  }
                />
              </Button>

              {attachments.length > 0 && (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {attachments.map(f => (
                    <Chip
                      key={f.name}
                      label={f.name}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          </AccordionDetails>
        </StyledAccordion>

        {/* ===== ACTION BAR ===== */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "flex-end",
            bgcolor: "#fafafa",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={Object.values(form).some(v => !v)}
            sx={{
              px: 4,
              py: 1.1,
              fontWeight: 600,
              bgcolor: BRAND,
              boxShadow: "0 10px 25px rgba(45,27,105,0.35)",
              "&:hover": { bgcolor: "#23124f" },
            }}
          >
            Submit Ticket
          </Button>
        </Box>
      </Paper>

      {/* ================= SUCCESS ================= */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" variant="filled">
          Ticket created successfully 🎉
        </Alert>
      </Snackbar>
    </Box>
  );
}

/* ================= REUSABLE UI ================= */

function SectionHeader({ icon, title, subtitle }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      {icon}
      <Box>
        <Typography fontWeight={600}>{title}</Typography>
        <Typography fontSize="0.75rem" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  );
}

function StyledAccordion({ children, ...props }) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      sx={{
        borderRadius: 0,
        "&:before": { display: "none" },
      }}
      {...props}
    >
      {children}
    </Accordion>
  );
}
