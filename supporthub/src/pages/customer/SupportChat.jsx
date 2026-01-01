// src/pages/customer/SupportChat.jsx

import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  IconButton,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import SendRounded from "@mui/icons-material/SendRounded";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";
import PersonOutline from "@mui/icons-material/PersonOutline";
import SmartToyOutlined from "@mui/icons-material/SmartToyOutlined";

import { BRAND } from "../../data/supportChat.data";
import { useSupportChat } from "../../hooks/useSupportChat";

export default function SupportChat() {
  const {
    message,
    setMessage,
    messages,
    mode,
    sendMessage,
    bottomRef,
  } = useSupportChat();

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          mb: 2,
          p: 2.5,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${BRAND}, #23124f)`,
          color: "#fff",
          boxShadow: "0 10px 30px rgba(45,27,105,0.35)",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Support Chat
        </Typography>

        <Stack direction="row" spacing={1} mt={1} alignItems="center">
          <Chip
            size="small"
            icon={
              mode === "bot" ? (
                <SmartToyOutlined />
              ) : (
                <SupportAgentOutlined />
              )
            }
            label={
              mode === "bot"
                ? "Bot assisting you"
                : mode === "handoff"
                ? "Connecting to agent..."
                : "Agent connected"
            }
            sx={{
              bgcolor: "rgba(255,255,255,0.18)",
              color: "#fff",
              fontWeight: 500,
            }}
          />
        </Stack>
      </Box>

      {/* ================= CHAT CONTAINER ================= */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          background:
            "linear-gradient(180deg, #fafafa 0%, #f4f2fa 100%)",
        }}
      >
        {/* ================= MESSAGES ================= */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            overflowY: "auto",
          }}
        >
          <Stack spacing={2.5}>
            {messages.map((m, i) => (
              <ChatBubble key={i} message={m} />
            ))}
            <div ref={bottomRef} />
          </Stack>
        </Box>

        <Divider />

        {/* ================= INPUT ================= */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <TextField
            fullWidth
            size="medium"
            value={message}
            disabled={mode === "handoff"}
            placeholder={
              mode === "handoff"
                ? "Connecting to agent..."
                : "Type your message…"
            }
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "#f9fafb",
              },
            }}
          />

          <IconButton
            onClick={sendMessage}
            disabled={mode === "handoff"}
            sx={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              background: `linear-gradient(135deg, ${BRAND}, #23124f)`,
              color: "#fff",
              boxShadow: "0 6px 18px rgba(45,27,105,0.35)",
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: "0 10px 24px rgba(45,27,105,0.45)",
              },
            }}
          >
            <SendRounded />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

/* ================= MESSAGE BUBBLE ================= */

function ChatBubble({ message }) {
  const isUser = message.from === "user";
  const isAgent = message.from === "agent";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        gap: 1,
      }}
    >
      {!isUser && (
        <Avatar
          sx={{
            bgcolor: isAgent ? "#e0f2fe" : "#ede9fe",
            color: isAgent ? "#0369a1" : "#6d28d9",
            width: 36,
            height: 36,
          }}
        >
          {isAgent ? <SupportAgentOutlined /> : <SmartToyOutlined />}
        </Avatar>
      )}

      <Box
        sx={{
          maxWidth: "65%",
          px: 2,
          py: 1.5,
          borderRadius: 3,
          background: isUser
            ? `linear-gradient(135deg, ${BRAND}, #23124f)`
            : "#ffffff",
          color: isUser ? "#ffffff" : "#1f2937",
          boxShadow: isUser
            ? "0 8px 24px rgba(45,27,105,0.35)"
            : "0 4px 14px rgba(0,0,0,0.06)",
        }}
      >
        <Typography fontSize="0.95rem" lineHeight={1.45}>
          {message.text}
        </Typography>

        <Typography
          fontSize="0.7rem"
          sx={{
            mt: 0.5,
            opacity: 0.7,
            textAlign: "right",
          }}
        >
          {message.time}
        </Typography>
      </Box>

      {isUser && (
        <Avatar
          sx={{
            bgcolor: BRAND,
            width: 36,
            height: 36,
          }}
        >
          <PersonOutline />
        </Avatar>
      )}
    </Box>
  );
}
