export function generateTicketId() {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `TCK-${d}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function suggestCategory(subject = "") {
  const s = subject.toLowerCase();
  if (s.includes("login") || s.includes("account")) return "Account";
  if (s.includes("payment") || s.includes("bill")) return "Billing";
  if (s.includes("error") || s.includes("bug") || s.includes("crash"))
    return "Technical";
  return "";
}
