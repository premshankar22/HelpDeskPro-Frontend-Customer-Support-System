import { createContext, useContext, useEffect, useState } from "react";
import { fetchTickets, createTicket } from "../api/tickets.api";

const TicketsContext = createContext(null);

export function TicketsProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets()
      .then(setTickets)
      .finally(() => setLoading(false));
  }, []);

  /* ===== CREATE ===== */
  const addTicket = async (ticket) => {
    const saved = await createTicket(ticket);
    setTickets((prev) => [saved, ...prev]);
  };

  /* ===== UPDATE ONE ===== */
  const updateTicket = (id, updates) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  /* ===== BULK UPDATE ===== */
  const bulkUpdateTickets = (ids, updates) => {
    setTickets((prev) =>
      prev.map((t) =>
        ids.includes(t.id) ? { ...t, ...updates } : t
      )
    );
  };

  return (
    <TicketsContext.Provider
      value={{
        tickets,
        loading,
        addTicket,
        updateTicket,
        bulkUpdateTickets,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
}

export function useTicketsContext() {
  const ctx = useContext(TicketsContext);
  if (!ctx) throw new Error("TicketsProvider missing");
  return ctx;
}
