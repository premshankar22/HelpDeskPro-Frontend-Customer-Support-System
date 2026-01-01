// src/data/supportChat.data.js

/* ================= BRAND ================= */

export const BRAND = "#2d1b69";

/* ================= TIME ================= */

export function now() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ================= MESSAGE TYPES ================= */
/*
from:
- "user"
- "bot"
- "agent"
- "system"
*/

export const MESSAGE_FROM = {
  USER: "user",
  BOT: "bot",
  AGENT: "agent",
  SYSTEM: "system",
};

/* ================= INITIAL CHAT ================= */

export const INITIAL_MESSAGES = [
  {
    id: "m-1",
    from: MESSAGE_FROM.BOT,
    text: "Hi 👋 I’m Support Bot. How can I help you today?",
    time: now(),
  },
];

/* ================= BOT LOGIC ================= */

export const BOT_KEYWORDS = {
  ACCOUNT: ["login", "password", "account", "signin"],
  BILLING: ["payment", "bill", "invoice", "refund"],
  TECHNICAL: ["error", "bug", "issue", "crash", "not working"],
};

export function needsAgent(text, userCount) {
  const escalationWords = [
    "agent",
    "human",
    "support",
    "real person",
    "help",
    "complaint",
  ];

  return (
    escalationWords.some(k => text.toLowerCase().includes(k)) ||
    userCount >= 3
  );
}

/* ================= BOT REPLIES ================= */

export const BOT_REPLIES = {
  ACCOUNT: [
    "It looks like an account-related issue 🔐",
    "Have you recently tried resetting your password?",
  ],
  BILLING: [
    "Billing issues can be frustrating 💳",
    "Could you confirm if the payment was completed successfully?",
  ],
  TECHNICAL: [
    "I understand you're facing a technical issue 🛠️",
    "Can you tell me what error message you see?",
  ],
  GENERIC: [
    "Thanks for the details 😊",
    "I’m checking this for you now…",
    "Could you please provide a bit more information?",
  ],
};

/* Fallback bot message */
export const BOT_DEFAULT_REPLY =
  "Thanks! I’m checking this for you 😊";

/* ================= HANDOFF ================= */

export const HANDOFF_MESSAGE = {
  id: "handoff-1",
  from: MESSAGE_FROM.SYSTEM,
  text: "Connecting you to a support agent…",
};

/* ================= AGENT ================= */

export const AGENT_PROFILE = {
  id: "agent-101",
  name: "Alex",
  role: "Support Specialist",
  avatarColor: "#0369a1",
};

export const AGENT_GREETING = {
  id: "agent-hello",
  from: MESSAGE_FROM.AGENT,
  text: "Hi, I’m Alex from support. I’ll take it from here 🙂",
};

export const AGENT_REPLIES = [
  "Thanks for reaching out. I’m here to help.",
  "Could you please share your ticket ID?",
  "Let me check this for you right away.",
  "Thanks for your patience 🙏",
];

/* ================= SYSTEM MESSAGES ================= */

export const SYSTEM_MESSAGES = {
  CONNECTING: "Connecting to agent…",
  CONNECTED: "You are now connected to a support agent",
  ENDED: "Chat ended",
};

/* ================= UI TIMING ================= */

export const TYPING_DELAY = {
  BOT: 800,
  AGENT: 1200,
};

/* ================= MOCK HISTORY (OPTIONAL) ================= */
/* Useful for demos, testing scroll, UI stress */

export const SAMPLE_CHAT_HISTORY = [
  {
    id: "h-1",
    from: MESSAGE_FROM.USER,
    text: "I can’t log into my account",
    time: now(),
  },
  {
    id: "h-2",
    from: MESSAGE_FROM.BOT,
    text: "It looks like an account-related issue 🔐",
    time: now(),
  },
];
