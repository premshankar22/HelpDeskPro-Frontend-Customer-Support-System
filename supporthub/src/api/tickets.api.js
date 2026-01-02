/* ================= MOCK DATABASE ================= */

let TICKETS_DB = [
  {
    id: "TCK-20240101-1001",
    subject: "Unable to login to account",
    category: "Account",
    priority: "High",
    status: "Open",
    description: "Login fails even with correct credentials.",
    customer: "John Doe",
    assignedTo: null,
    slaMinutesLeft: 30,
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/* ================= HELPERS ================= */

const delay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const generateTicketId = () => {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `TCK-${d}-${Math.floor(1000 + Math.random() * 9000)}`;
};

/* ================= API METHODS ================= */

/**
 * GET /tickets
 * Fetch all tickets
 */
export async function fetchTickets() {
  await delay();
  return [...TICKETS_DB];
}

/**
 * POST /tickets
 * Create a new ticket
 */
export async function createTicket(data) {
  await delay();

  const ticket = {
    id: data.id ?? generateTicketId(),
    subject: data.subject,
    category: data.category ?? "General",
    priority: data.priority ?? "Medium",
    status: data.status ?? "Open",
    description: data.description ?? "",
    customer: data.customer ?? "Unknown",
    assignedTo: null,
    slaMinutesLeft: data.slaMinutesLeft ?? 60,
    attachments: Array.isArray(data.attachments)
      ? data.attachments
      : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  TICKETS_DB = [ticket, ...TICKETS_DB];
  return ticket;
}

/**
 * PATCH /tickets/:id
 * Update a single ticket
 */
export async function updateTicket(id, updates) {
  await delay();

  TICKETS_DB = TICKETS_DB.map((t) =>
    t.id === id
      ? {
          ...t,
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      : t
  );

  return TICKETS_DB.find((t) => t.id === id);
}

/**
 * PATCH /tickets/bulk
 * Bulk update multiple tickets
 */
export async function bulkUpdateTickets(ids, updates) {
  await delay();

  TICKETS_DB = TICKETS_DB.map((t) =>
    ids.includes(t.id)
      ? {
          ...t,
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      : t
  );

  return TICKETS_DB.filter((t) => ids.includes(t.id));
}

/**
 * DELETE /tickets/:id
 * Delete a ticket
 */
export async function deleteTicket(id) {
  await delay();

  TICKETS_DB = TICKETS_DB.filter((t) => t.id !== id);
  return true;
}
