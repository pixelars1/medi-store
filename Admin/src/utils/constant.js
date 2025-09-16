export const brand = {
  primary: "from-green-500 to-emerald-600",
  hover: "hover:from-green-600 hover:to-emerald-700",
  ring: "focus:ring-2 focus:ring-emerald-400",
};


const mockVisitors = [
  { day: "Mon", visitors: 420, conversions: 31 },
  { day: "Tue", visitors: 530, conversions: 45 },
  { day: "Wed", visitors: 610, conversions: 52 },
  { day: "Thu", visitors: 700, conversions: 48 },
  { day: "Fri", visitors: 880, conversions: 62 },
  { day: "Sat", visitors: 760, conversions: 57 },
  { day: "Sun", visitors: 640, conversions: 41 },
];

const mockSearches = [
  { term: "pain relief tablets", count: 182 },
  { term: "vitamin d3", count: 140 },
  { term: "blood pressure", count: 127 },
  { term: "adderall 30mg", count: 66 },
  { term: "skin cream", count: 58 },
];

const mockUsers = [
  { id: "u1", name: "Aman Verma", email: "aman@example.com", lastSeen: "2025-08-28 18:25", visits: 6 },
  { id: "u2", name: "Priya Singh", email: "priya@example.com", lastSeen: "2025-08-29 10:11", visits: 2 },
  { id: "u3", name: "Rahul Sharma", email: "rahul@example.com", lastSeen: "2025-08-30 08:05", visits: 11 },
];

const mockOrders = [
  { id: "o-1001", user: "Rahul Sharma", productId: "p1", product: "Adderall 30mg", qty: 1, total: 509.0, status: "Payment Pending", placedAt: "2025-08-28" },
  { id: "o-1002", user: "Aman Verma", productId: "p1", product: "Adderall 30mg", qty: 1, total: 389.0, status: "Processing", placedAt: "2025-08-29" },
];

const mockNotifications = [
  { id: "n1", type: "order", title: "New order received", message: "Order o-1002 placed.", read: false, createdAt: "2025-08-29 10:30" },
  { id: "n2", type: "stock", title: "Low stock warning", message: "Adderall 30mg below threshold.", read: false, createdAt: "2025-08-29 17:45" },
  { id: "n3", type: "security", title: "Compliance reminder", message: "Verify prescription on all controlled items.", read: true, createdAt: "2025-08-27 09:00" },
];
const initialProducts = [
  {
    id: "p1",
    name: "Adderall 30mg",
    category: "Stronger One",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    price: "$389.00 – $509.00",
    originalPrice: "$509.00",
    description:
      "Adderall 30mg is a prescription stimulant used to treat ADHD and narcolepsy. It is a controlled substance and must be dispensed only against a valid prescription. Include safety guidance and storage instructions in product details.",
    prescriptionRequired: true,
    controlledSubstance: true,
    stock: 120,
    active: true,
  },
];
export default { mockVisitors, mockSearches, mockUsers, mockOrders, mockNotifications, initialProducts };