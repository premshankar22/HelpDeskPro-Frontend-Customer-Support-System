// src/hooks/useSupportChat.js

import { useEffect, useRef, useState } from "react";
import {
  now,
  INITIAL_MESSAGES,
  needsAgent,
  BOT_DEFAULT_REPLY,
  HANDOFF_MESSAGE,
  AGENT_GREETING,
  AGENT_REPLIES,
  TYPING_DELAY,
} from "../data/supportChat.data";

export function useSupportChat() {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("bot"); // bot | handoff | agent
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const bottomRef = useRef(null);
  const agentReplyIndex = useRef(0);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg = {
      from: "user",
      text: message,
      time: now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage("");

    const userCount =
      messages.filter(m => m.from === "user").length + 1;

    if (mode === "bot") handleBot(message, userCount);
    if (mode === "agent") handleAgent();
  };

  /* ================= BOT LOGIC ================= */
  function handleBot(text, userCount) {
    if (needsAgent(text, userCount)) {
      startHandoff();
      return;
    }

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text: BOT_DEFAULT_REPLY,
          time: now(),
        },
      ]);
    }, TYPING_DELAY.BOT);
  }

  /* ================= HANDOFF ================= */
  function startHandoff() {
    setMode("handoff");

    setMessages(prev => [
      ...prev,
      {
        from: "system",
        text: HANDOFF_MESSAGE.text,
        time: now(),
      },
    ]);

    setTimeout(() => {
      setMode("agent");
      setMessages(prev => [
        ...prev,
        {
          from: "agent",
          text: AGENT_GREETING.text,
          time: now(),
        },
      ]);
    }, 2000);
  }

  /* ================= AGENT LOGIC ================= */
  function handleAgent() {
    const reply =
      AGENT_REPLIES[agentReplyIndex.current % AGENT_REPLIES.length];

    agentReplyIndex.current += 1;

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          from: "agent",
          text: reply,
          time: now(),
        },
      ]);
    }, TYPING_DELAY.AGENT);
  }

  return {
    message,
    setMessage,
    messages,
    mode,
    sendMessage,
    bottomRef,
  };
}
