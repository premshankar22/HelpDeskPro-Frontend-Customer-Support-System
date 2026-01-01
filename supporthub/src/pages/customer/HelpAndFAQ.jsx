import {
  Box,
  Typography,
  Paper,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Fab,
  Drawer,
  Divider,
} from "@mui/material";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import HelpOutline from "@mui/icons-material/HelpOutline";
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";
import BugReportOutlined from "@mui/icons-material/BugReportOutlined";
import PhoneInTalkOutlined from "@mui/icons-material/PhoneInTalkOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import ContactSupportOutlined from "@mui/icons-material/ContactSupportOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BRAND = "#2d1b69";

export default function HelpAndFAQ() {
  const navigate = useNavigate();
  const [openContact, setOpenContact] = useState(false);

  return (
    <Box sx={{ maxWidth: 960, position: "relative",  mx: "auto", }}>
      {/* ================= HEADER ================= */}
      <Paper
        sx={{
          mb: 3,
          p: 3.5,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${BRAND}, #23124f)`,
          color: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Help & Support Center
        </Typography>
        <Typography sx={{ opacity: 0.9, mt: 0.5 }}>
          Everything you need to know about tickets, chat & support
        </Typography>

        <Stack direction="row" spacing={1} mt={2}>
          <Chip label="24/7 Support" size="small" sx={chipStyle} />
          <Chip label="Secure" size="small" sx={chipStyle} />
          <Chip label="Fast Resolution" size="small" sx={chipStyle} />
        </Stack>
      </Paper>

      {/* ================= FAQ ================= */}
      <Stack spacing={2}>
        {/* ===== GENERAL ===== */}
        <FAQAccordion
          icon={<HelpOutline sx={{ color: "#6366f1" }} />}
          title="General Questions"
          subtitle="Basics about the platform"
          defaultExpanded
        >
          <FAQItem
            q="What is this platform?"
            a="This is a customer support system where users can create, track, and manage support tickets and chat with support."
          />
          <FAQItem
            q="Who can use this system?"
            a="Any registered customer can raise tickets and communicate with support agents."
          />
          <FAQItem
            q="Is this a real support system?"
            a="This is a frontend simulation designed to demonstrate real-world support workflows."
          />
        </FAQAccordion>

        {/* ===== TICKETS ===== */}
        <FAQAccordion
          icon={<ConfirmationNumberOutlined sx={{ color: "#f59e0b" }} />}
          title="Tickets & Requests"
          subtitle="How tickets work"
        >
          <FAQItem
            q="How do I create a ticket?"
            a="Navigate to Create Ticket, provide subject, category, priority, description, and submit."
          />
          <FAQItem
            q="What does ticket priority mean?"
            a="High priority tickets are handled first, followed by Medium and Low."
          />
          <FAQItem
            q="Can I attach files?"
            a="Yes, you can attach screenshots or documents while creating a ticket."
          />
          <FAQItem
            q="Can I edit or delete a ticket?"
            a="Currently, tickets cannot be edited after submission."
          />
        </FAQAccordion>

        {/* ===== CHAT ===== */}
        <FAQAccordion
          icon={<ChatOutlined sx={{ color: "#10b981" }} />}
          title="Support Chat"
          subtitle="Bot & agent interaction"
        >
          <FAQItem
            q="How does support chat work?"
            a="You first interact with a bot. If needed, the conversation is handed over to a human agent."
          />
          <FAQItem
            q="Is chat live?"
            a="Chat is simulated for demo purposes but mirrors real-world chat workflows."
          />

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate("/customer/support-chat")}
          >
            Open Support Chat
          </Button>
        </FAQAccordion>

        {/* ===== SECURITY ===== */}
        <FAQAccordion
          icon={<SecurityOutlined sx={{ color: "#ef4444" }} />}
          title="Security & Privacy"
          subtitle="Data & privacy information"
        >
          <FAQItem
            q="Is my data secure?"
            a="This demo runs fully on the frontend. No real user data is stored or transmitted."
          />
          <FAQItem
            q="Are chats recorded?"
            a="Chats exist only in the current session and are not persisted."
          />
        </FAQAccordion>

        {/* ===== ISSUES ===== */}
        <FAQAccordion
          icon={<BugReportOutlined sx={{ color: "#3b82f6" }} />}
          title="Issues & Feedback"
          subtitle="Report problems"
        >
          <Typography fontSize="0.9rem">
            If something doesn’t work as expected, please report it using a support ticket.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: BRAND,
              "&:hover": { bgcolor: "#23124f" },
            }}
            onClick={() => navigate("/customer/create-ticket")}
          >
            Report an Issue
          </Button>
        </FAQAccordion>
      </Stack>

      {/* ================= FLOATING CONTACT BUTTON ================= */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          bgcolor: BRAND,
          "&:hover": { bgcolor: "#23124f" },
        }}
        onClick={() => setOpenContact(true)}
      >
        <ContactSupportOutlined />
      </Fab>

      {/* ================= CONTACT DRAWER ================= */}
      <Drawer
        anchor="right"
        open={openContact}
        onClose={() => setOpenContact(false)}
      >
        <Box sx={{ width: 320, p: 3 }}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            Contact Support
          </Typography>

          <Typography color="text.secondary" mb={2}>
            Reach our customer care team
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={2}>
            <ContactRow
              icon={<PhoneInTalkOutlined color="primary" />}
              title="Customer Care"
              value="+91 98765 43210"
            />

            <ContactRow
              icon={<EmailOutlined color="primary" />}
              title="Email Support"
              value="support@helpdeskpro.com"
            />

            <ContactRow
              icon={<AccessTimeOutlined color="primary" />}
              title="Working Hours"
              value="Mon – Fri, 9:00 AM – 6:00 PM"
            />
          </Stack>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => setOpenContact(false)}
          >
            Close
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function FAQAccordion({ icon, title, subtitle, children, defaultExpanded }) {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {icon}
          <Box>
            <Typography fontWeight={600}>{title}</Typography>
            <Typography fontSize="0.75rem" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1.2}>{children}</Stack>
      </AccordionDetails>
    </Accordion>
  );
}

function FAQItem({ q, a }) {
  return (
    <Typography fontSize="0.9rem">
      <strong>{q}</strong>
      <br />
      {a}
    </Typography>
  );
}

function ContactRow({ icon, title, value }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {icon}
      <Box>
        <Typography fontWeight={600}>{title}</Typography>
        <Typography fontSize="0.85rem" color="text.secondary">
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}

const chipStyle = {
  bgcolor: "rgba(255,255,255,0.15)",
  color: "#fff",
};
