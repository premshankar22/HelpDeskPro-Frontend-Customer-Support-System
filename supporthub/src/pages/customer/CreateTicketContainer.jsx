import { useEffect, useMemo, useState } from "react";
import { useTicketsContext } from "../../context/TicketsContext";
import { generateTicketId, suggestCategory } from "../../utils/ticketUtils";

export default function CreateTicketContainer({ children }) {
  const { addTicket } = useTicketsContext();

  const ticketId = useMemo(() => generateTicketId(), []);
  const createdAt = useMemo(() => new Date(), []);

  const [form, setForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [success, setSuccess] = useState(false);

  /* Auto-category suggestion */
  useEffect(() => {
    if (!form.category && form.subject) {
      const suggested = suggestCategory(form.subject);
      if (suggested) {
        setForm(f => ({ ...f, category: suggested }));
      }
    }
  }, [form.subject, form.category]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFiles = (files) => {
    setAttachments(Array.from(files));
  };

  const handleSubmit = async () => {
    await addTicket({
      id: ticketId,
      ...form,
      status: "Open",
      createdAt: createdAt.toISOString(),
      updatedAt: createdAt.toISOString(),
      attachments: attachments.map(f => f.name),
    });

    setSuccess(true);
    setForm({ subject: "", category: "", priority: "", description: "" });
    setAttachments([]);
  };

  return children({
    ticketId,
    createdAt,
    form,
    attachments,
    success,
    setSuccess,
    handleChange,
    handleFiles,
    handleSubmit,
  });
}
