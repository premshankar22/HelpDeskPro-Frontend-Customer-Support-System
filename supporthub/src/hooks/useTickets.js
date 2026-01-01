import { useEffect, useMemo, useState } from "react";
import { useTicketsContext } from "../context/TicketsContext";

/* ================= DEBOUNCE ================= */
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value.trim()), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

/* ================= HOOK ================= */
export function useTickets() {
 const { tickets, loading, updateTicket, bulkUpdateTickets } =
  useTicketsContext();

  /* ===== UI STATE ===== */
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const rowsPerPage = 5;
  const debouncedSearch = useDebounce(search);

  /* ===== FILTER ===== */
  const filtered = useMemo(() => {
    if (!Array.isArray(tickets)) return [];

    return tickets.filter((t) => {
      if (!t?.subject) return false;

      return (
        (status === "All" || t.status === status) &&
        (priority === "All" || t.priority === priority) &&
        t.subject.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    });
  }, [tickets, status, priority, debouncedSearch]);

  /* ===== PAGE SAFETY ===== */
  useEffect(() => {
    if (page * rowsPerPage >= filtered.length) {
      setPage(0);
    }
  }, [filtered.length, page, rowsPerPage]);

  /* ===== PAGINATION ===== */
  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  /* ===== RESET ===== */
  const resetFilters = () => {
    setStatus("All");
    setPriority("All");
    setSearch("");
    setPage(0);
  };

  return {
    /* data */
    loading,
    tickets: paginated,
    total: filtered.length,

    /* pagination */
    page,
    setPage,
    rowsPerPage,

    /* filters */
    status,
    setStatus,
    priority,
    setPriority,
    search,
    setSearch,

    /* actions */
     resetFilters,
     updateTicket,
     bulkUpdateTickets,
  };
}
