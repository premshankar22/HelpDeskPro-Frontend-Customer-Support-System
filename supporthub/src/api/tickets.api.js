
let TICKETS_DB = [
  {
    id: "TCK-20240101-1001",
    subject: "Unable to login",
    category: "Account",
    priority: "High",
    status: "Open",
    description: "Login fails with correct password",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    attachments: [],
  },
];

/* ================= HELPERS ================= */

const delay = (ms = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

const generateId = () => {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `TCK-${d}-${Math.floor(1000 + Math.random() * 9000)}`;
};

/* ================= API ================= */

/* GET /tickets */
export async function fetchTickets() {
  await delay();
  return [...TICKETS_DB];
}

/* POST /tickets */
export async function createTicket(data) {
  await delay();

  const ticket = {
    id: data.id ?? generateId(),
    subject: data.subject,
    category: data.category,
    priority: data.priority,
    status: data.status ?? "Open",
    description: data.description ?? "",
    attachments: Array.isArray(data.attachments) ? data.attachments : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  TICKETS_DB = [ticket, ...TICKETS_DB];
  return ticket;
}

/* PATCH /tickets/:id */
export async function updateTicket(id, updates) {
  await delay();

  TICKETS_DB = TICKETS_DB.map(t =>
    t.id === id
      ? { ...t, ...updates, updatedAt: new Date().toISOString() }
      : t
  );

  return TICKETS_DB.find(t => t.id === id);
}

/* DELETE /tickets/:id */
export async function deleteTicket(id) {
  await delay();
  TICKETS_DB = TICKETS_DB.filter(t => t.id !== id);
  return true;
}

