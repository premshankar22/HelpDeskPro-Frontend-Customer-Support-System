import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Grid,
  Button,
  TextField,
  MenuItem,
  Divider,
  Avatar,
  Drawer,
  Tooltip,
  IconButton,
} from "@mui/material";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import PriorityHighOutlined from "@mui/icons-material/PriorityHighOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import { useState } from "react";

/* ================= CONSTANTS ================= */

const BRAND = "#2d1b69";

const CHAT_STATUSES = {
  waiting: "Waiting",
  active: "Active",
  escalated: "Escalated",
};

const AGENTS = ["Agent Mike", "Agent Sarah", "Agent John"];

/* ================= MOCK DATA ================= */

const CHATS = [
  {
    id: 1,
    user: "John Doe",
    status: "waiting",
    agent: null,
    lastActive: "2 min ago",
    priority: "high",
    messages: [
      { from: "user", text: "I can't login" },
      { from: "system", text: "Waiting for agent" },
    ],
  },
  {
    id: 2,
    user: "Alice Smith",
    status: "active",
    agent: "Agent Mike",
    lastActive: "Just now",
    priority: "normal",
    messages: [
      { from: "user", text: "Payment failed" },
      { from: "agent", text: "Checking now" },
    ],
  },
  {
    id: 3,
    user: "Premshankar",
    status: "escalated",
    agent: "Agent Sarah",
    lastActive: "5 min ago",
    priority: "high",
    messages: [
      { from: "user", text: "Urgent issue" },
      { from: "agent", text: "Escalating this" },
    ],
  },
];

/* ================= MAIN ================= */

export default function AdminChats() {
  const [filter, setFilter] = useState("all");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState(CHATS);

  const filtered =
    filter === "all" ? chats : chats.filter(c => c.status === filter);

  const updateChat = (id, updates) => {
    setChats(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  return (
    <Box>
      {/* HEADER */}
      <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
        <ChatOutlined sx={{ color: BRAND }} />
        <Typography variant="h4" fontWeight={700} color="#111827">
          Live Chats Monitoring
        </Typography>
      </Stack>

      <Typography mb={3} color="#4b5563" fontSize="0.95rem">
        Real-time supervision of customer conversations, agent actions, and
        escalations.
      </Typography>

      {/* KPIs */}
      <Grid container spacing={3} mb={4}>
        <Kpi label="Active Chats" value="8" />
        <Kpi label="Waiting Users" value="3" />
        <Kpi label="Avg Response" value="42s" />
        <Kpi label="Escalations" value="2" danger />
      </Grid>

      {/* FILTER */}
      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          select
          size="small"
          label="Status"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          sx={{ maxWidth: 200 }}
        >
          <MenuItem value="all">All</MenuItem>
          {Object.keys(CHAT_STATUSES).map(k => (
            <MenuItem key={k} value={k}>
              {CHAT_STATUSES[k]}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {/* CHAT LIST */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2}>
          {filtered.map(chat => (
            <Paper
              key={chat.id}
              sx={{
                p: 2,
                borderRadius: 2,
                transition: "0.2s",
                "&:hover": {
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                justifyContent="space-between"
              >
                {/* USER */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: BRAND }}>
                    <PersonOutlined />
                  </Avatar>
                  <Box>
                    <Typography fontWeight={600}>{chat.user}</Typography>
                    <Typography fontSize="0.8rem" color="text.secondary">
                      Agent: {chat.agent ?? "Unassigned"}
                    </Typography>
                  </Box>
                </Stack>

                {/* STATUS */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <StatusChip status={chat.status} />
                  {chat.priority === "high" && (
                    <Chip
                      icon={<PriorityHighOutlined />}
                      label="High"
                      color="error"
                      size="small"
                    />
                  )}
                </Stack>

                {/* ACTIONS */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Tooltip title="View transcript">
                    <IconButton onClick={() => setSelectedChat(chat)}>
                      <VisibilityOutlined />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Assign agent">
                    <TextField
                      select
                      size="small"
                      value={chat.agent ?? ""}
                      sx={{ minWidth: 130 }}
                      onChange={e =>
                        updateChat(chat.id, {
                          agent: e.target.value,
                          status: "active",
                        })
                      }
                    >
                      <MenuItem value="">Unassigned</MenuItem>
                      {AGENTS.map(a => (
                        <MenuItem key={a} value={a}>
                          {a}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Tooltip>

                  <Tooltip title="Escalate">
                    <IconButton
                      color="error"
                      onClick={() =>
                        updateChat(chat.id, { status: "escalated" })
                      }
                    >
                      <WarningAmberOutlined />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>

      {/* CHAT DRAWER */}
      <Drawer
        anchor="right"
        open={!!selectedChat}
        onClose={() => setSelectedChat(null)}
      >
        {selectedChat && (
          <Box sx={{ width: 360, p: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography fontWeight={700}>
                {selectedChat.user}
              </Typography>
              <IconButton onClick={() => setSelectedChat(null)}>
                <CloseOutlined />
              </IconButton>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1}>
              {selectedChat.messages.map((m, i) => (
                <Paper
                  key={i}
                  sx={{
                    p: 1.5,
                    bgcolor:
                      m.from === "user"
                        ? "#f3f4f6"
                        : "rgba(45,27,105,0.08)",
                  }}
                >
                  <Typography fontSize="0.85rem">{m.text}</Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}
      </Drawer>
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

function StatusChip({ status }) {
  const map = {
    waiting: "warning",
    active: "success",
    escalated: "error",
  };

  return (
    <Chip
      label={CHAT_STATUSES[status]}
      color={map[status]}
      size="small"
    />
  );
}
