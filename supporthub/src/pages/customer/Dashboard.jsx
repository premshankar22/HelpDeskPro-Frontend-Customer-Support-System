import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Skeleton,
  Paper,
  Chip,
} from "@mui/material";
import {
  ConfirmationNumberOutlined,
  PendingActionsOutlined,
  CheckCircleOutline,
  AddCircleOutline,
  BoltOutlined,
} from "@mui/icons-material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTicketsContext } from "../../context/TicketsContext";

/* ================= THEME ================= */

const BRAND = "#2d1b69";
const BG_APP = "#f4f2fa";
const BG_CARD = "#ffffff";
const TEXT_PRIMARY = "#1f2937";
const TEXT_SECONDARY = "#6b7280";

/* ================= COMPONENT ================= */

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { tickets, loading } = useTicketsContext();

  /* ================= STATS ================= */
  const stats = useMemo(() => ({
    open: tickets.filter(t => t.status === "Open").length,
    progress: tickets.filter(t => t.status === "In Progress").length,
    resolved: tickets.filter(t => t.status === "Closed").length,
  }), [tickets]);

  /* ================= ACTIVITY ================= */
  const activity = useMemo(() => {
    return [...tickets]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5);
  }, [tickets]);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: BG_APP,
        p: 3,
        borderRadius: 4,
      }}
    >
      {/* ================= HERO HEADER ================= */}
      <Paper
        sx={{
          mb: 4,
          p: 3.5,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${BRAND}, #23124f)`,
          color: "#fff",
          boxShadow: "0 20px 50px rgba(45,27,105,0.35)",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Welcome Back 👋
            </Typography>
            <Typography sx={{ opacity: 0.9, mt: 0.5 }}>
              Here’s a quick overview of your support activity
            </Typography>
          </Box>

          <Chip
            icon={<BoltOutlined />}
            label="Live Support"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        </Stack>
      </Paper>

      {/* ================= SUMMARY ================= */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <SummaryStat
          title="Open Tickets"
          icon={<ConfirmationNumberOutlined />}
          value={stats.open}
          accent="#f59e0b"
          loading={loading}
        />
        <SummaryStat
          title="In Progress"
          icon={<PendingActionsOutlined />}
          value={stats.progress}
          accent="#3b82f6"
          loading={loading}
        />
        <SummaryStat
          title="Resolved"
          icon={<CheckCircleOutline />}
          value={stats.resolved}
          accent="#10b981"
          loading={loading}
        />
      </Grid>

      {/* ================= CONTENT ================= */}
      <Grid container spacing={3}>
        {/* ===== RECENT ACTIVITY ===== */}
        <Grid item xs={12} lg={9}>
          <Paper
            sx={{
              borderRadius: 4,
              p: 3,
              minHeight: 280,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <Typography fontWeight={700} mb={2} color={TEXT_PRIMARY}>
              Recent Activity
            </Typography>

            {loading ? (
              <Stack spacing={1.5}>
                <Skeleton height={54} />
                <Skeleton height={54} />
                <Skeleton height={54} />
              </Stack>
            ) : activity.length === 0 ? (
              <EmptyState />
            ) : (
              <Stack spacing={1.5}>
                {activity.map((t) => (
                  <ActivityItem key={t.id} ticket={t} />
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>

        {/* ===== QUICK ACTION ===== */}
        <Grid item xs={12} lg={3}>
          <Paper
            sx={{
              height: "100%",
              borderRadius: 4,
              p: 3,
              color: "#fff",
              background: `linear-gradient(160deg, ${BRAND}, #23124f)`,
              boxShadow: "0 15px 40px rgba(45,27,105,0.4)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography fontWeight={700} fontSize="1.05rem">
                Need Help?
              </Typography>
              <Typography sx={{ mt: 1, opacity: 0.9, fontSize: "0.9rem" }}>
                Create a ticket and our experts will assist you shortly.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={() => navigate("/customer/create-ticket")}
              sx={{
                mt: 3,
                backgroundColor: "#fff",
                color: BRAND,
                fontWeight: 700,
                borderRadius: 2.5,
                py: 1.2,
                "&:hover": { backgroundColor: "#f3f4f6" },
              }}
              fullWidth
            >
              Create Ticket
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

/* ================= SUB COMPONENTS ================= */

function SummaryStat({ title, icon, value, accent, loading }) {
  return (
    <Grid item xs={12} md={4}>
      <Paper
        sx={{
          borderRadius: 4,
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          borderLeft: `5px solid ${accent}`,
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "14px",
            backgroundColor: `${accent}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography fontSize="0.8rem" color={TEXT_SECONDARY}>
            {title}
          </Typography>

          {loading ? (
            <Skeleton width={40} height={28} />
          ) : (
            <Typography
              fontWeight={800}
              fontSize="1.6rem"
              color={TEXT_PRIMARY}
            >
              {value}
            </Typography>
          )}
        </Box>
      </Paper>
    </Grid>
  );
}

function ActivityItem({ ticket }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: "#f9fafb",
        border: "1px solid #eef0f4",
        transition: "0.2s",
        "&:hover": {
          backgroundColor: "#f3f4f6",
        },
      }}
    >
      <Typography fontSize="0.9rem" color={TEXT_PRIMARY}>
        <strong>{ticket.subject}</strong> was updated
      </Typography>
      <Typography fontSize="0.75rem" color={TEXT_SECONDARY} mt={0.4}>
        {new Date(ticket.updatedAt).toLocaleString()}
      </Typography>
    </Box>
  );
}

function EmptyState() {
  return (
    <Box
      sx={{
        height: 180,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: TEXT_SECONDARY,
        fontSize: "0.95rem",
      }}
    >
      No recent activity yet 🚀
    </Box>
  );
}
