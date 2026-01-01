import {
  Box,
  Typography,
  Paper,
  Avatar,
  Stack,
  TextField,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import PersonOutline from "@mui/icons-material/PersonOutline";
import ShieldOutlined from "@mui/icons-material/ShieldOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { useAuth } from "../../Auth/AuthContext";

const BRAND = "#2d1b69";

export default function Profile() {
  const { auth } = useAuth();
  const user = auth?.user;


  return (
    <Box
      sx={{
        maxWidth: 880,
        mx: "auto",
      }}
    >
      {/* ================= HERO HEADER ================= */}
      <Paper
        sx={{
          mb: 4,
          p: 3.5,
          borderRadius: 4,
          background: `
            linear-gradient(135deg, ${BRAND} 0%, #23124f 60%),
            radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent)
          `,
          color: "#fff",
          boxShadow: "0 18px 40px rgba(45,27,105,0.35)",
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          {/* Avatar with ring */}
          <Box
            sx={{
              p: 0.7,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #c7d2fe, #818cf8)",
            }}
          >
            <Avatar
              sx={{
                width: 78,
                height: 78,
                bgcolor: BRAND,
              }}
            >
              <PersonOutline fontSize="large" />
            </Avatar>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              {user.name}
            </Typography>
            <Typography sx={{ opacity: 0.85 }}>
              {user.email}
            </Typography>

            <Stack direction="row" spacing={1.2} mt={1.5}>
              <Chip
                label={user.role}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  fontWeight: 500,
                }}
              />
              <Chip
                label={`Joined ${user.joined}`}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* ================= ACCORDIONS ================= */}
      <Stack spacing={2.5}>
        {/* ========= PERSONAL INFO ========= */}
        <StyledAccordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <SectionHeader
              icon={<InfoOutlined color="primary" />}
              title="Personal Information"
              subtitle="Update your basic profile details"
            />
          </AccordionSummary>

          <AccordionDetails>
            <Stack spacing={2.5}>
              <TextField
                label="Full Name"
                defaultValue={user.name}
                fullWidth
              />

              <TextField
                label="Email Address"
                defaultValue={user.email}
                fullWidth
                disabled
              />
            </Stack>
          </AccordionDetails>
        </StyledAccordion>

        {/* ========= ROLE & ACCESS ========= */}
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <SectionHeader
              icon={<ShieldOutlined sx={{ color: "#10b981" }} />}
              title="Role & Access"
              subtitle="Permissions & system access"
            />
          </AccordionSummary>

          <AccordionDetails>
            <Stack spacing={2}>
              <TextField
                label="User Role"
                value={user.role}
                disabled
                fullWidth
              />

              <Typography fontSize="0.85rem" color="text.secondary">
                Your role defines what features you can access across
                the platform.
              </Typography>
            </Stack>
          </AccordionDetails>
        </StyledAccordion>

        {/* ========= ACCOUNT DETAILS ========= */}
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <SectionHeader
              icon={<PersonOutline sx={{ color: "#6366f1" }} />}
              title="Account Details"
              subtitle="System-generated information"
            />
          </AccordionSummary>

          <AccordionDetails>
            <Stack spacing={1}>
              <Typography fontSize="0.9rem">
                <strong>Member Since:</strong> {user.joined}
              </Typography>

              <Typography
                fontSize="0.85rem"
                color="text.secondary"
              >
                These details are managed automatically by the system.
              </Typography>
            </Stack>
          </AccordionDetails>
        </StyledAccordion>
      </Stack>

      {/* ================= ACTION BAR ================= */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{
            px: 4.5,
            py: 1.2,
            borderRadius: 2,
            fontWeight: 600,
            bgcolor: BRAND,
            boxShadow: "0 10px 25px rgba(45,27,105,0.35)",
            "&:hover": {
              bgcolor: "#23124f",
              transform: "translateY(-1px)",
            },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

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

/* ================= STYLED ACCORDION ================= */

function StyledAccordion({ children, ...props }) {
  return (
    <Accordion
      elevation={0}
      disableGutters
      sx={{
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        transition: "0.25s",
        "&:before": { display: "none" },
        "&:hover": {
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        },
      }}
      {...props}
    >
      {children}
    </Accordion>
  );
}
