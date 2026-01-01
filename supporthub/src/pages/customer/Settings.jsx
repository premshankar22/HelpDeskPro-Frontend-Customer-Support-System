import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
} from "@mui/material";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import PaletteOutlined from "@mui/icons-material/PaletteOutlined";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

const BRAND = "#2d1b69";

export default function Settings() {
  /* ===== LOCAL STATE (Frontend only) ===== */
  const settings = {
    emailNotifications: true,
    ticketUpdates: true,
    darkMode: false,
    twoFactorAuth: false,
  };

  return (
    <Box sx={{ maxWidth: 820,  mx: "auto", }}>
      {/* ===== HEADER ===== */}
      <Paper
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${BRAND}, #23124f)`,
          color: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Settings
        </Typography>
        <Typography sx={{ opacity: 0.9, mt: 0.5 }}>
          Manage preferences and account configurations
        </Typography>
      </Paper>

      {/* ===== SETTINGS SECTIONS ===== */}
      <Stack spacing={2}>
        {/* ================= NOTIFICATIONS ================= */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <NotificationsOutlined sx={{ color: "#3b82f6" }} />
              <Box>
                <Typography fontWeight={600}>
                  Notifications
                </Typography>
                <Typography fontSize="0.75rem" color="text.secondary">
                  Control how we notify you
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>

          <AccordionDetails>
            <Stack spacing={1.5}>
              <FormControlLabel
                control={<Switch defaultChecked={settings.emailNotifications} />}
                label="Email notifications"
              />
              <FormControlLabel
                control={<Switch defaultChecked={settings.ticketUpdates} />}
                label="Ticket status updates"
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ================= APPEARANCE ================= */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PaletteOutlined sx={{ color: "#6366f1" }} />
              <Box>
                <Typography fontWeight={600}>
                  Appearance
                </Typography>
                <Typography fontSize="0.75rem" color="text.secondary">
                  UI & theme preferences
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>

          <AccordionDetails>
            <Stack spacing={1.5}>
              <FormControlLabel
                control={<Switch defaultChecked={settings.darkMode} />}
                label="Enable dark mode (UI only)"
              />
              <Chip
                size="small"
                label="Dark mode coming soon"
                sx={{ width: "fit-content" }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ================= SECURITY ================= */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <SecurityOutlined sx={{ color: "#10b981" }} />
              <Box>
                <Typography fontWeight={600}>
                  Security
                </Typography>
                <Typography fontSize="0.75rem" color="text.secondary">
                  Account protection settings
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>

          <AccordionDetails>
            <Stack spacing={1.5}>
              <FormControlLabel
                control={<Switch defaultChecked={settings.twoFactorAuth} />}
                label="Two-factor authentication"
              />

              <Typography fontSize="0.8rem" color="text.secondary">
                Extra security for your account login
              </Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ================= ABOUT ================= */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <InfoOutlined sx={{ color: "#f59e0b" }} />
              <Box>
                <Typography fontWeight={600}>
                  About
                </Typography>
                <Typography fontSize="0.75rem" color="text.secondary">
                  Application details
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>

          <AccordionDetails>
            <Stack spacing={0.8}>
              <Typography fontSize="0.85rem">
                <strong>App:</strong> HelpDeskPro
              </Typography>
              <Typography fontSize="0.85rem">
                <strong>Version:</strong> 1.0.0
              </Typography>
              <Typography fontSize="0.8rem" color="text.secondary">
                This is a frontend-only demo project.
              </Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>

      {/* ===== ACTION BAR ===== */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: BRAND,
            px: 4,
            "&:hover": { bgcolor: "#23124f" },
          }}
        >
          Save Preferences
        </Button>
      </Box>
    </Box>
  );
}
