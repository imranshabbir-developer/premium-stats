export const kpis = [
  {
    key: "po",
    label: "Purchase Orders",
    value: "128",
    caption: "raised this month",
    delta: "+12.3%",
    trend: "up" as const,
    tone: "primary" as const,
  },
  {
    key: "approval",
    label: "Pending Approvals",
    value: "14",
    caption: "awaiting sign-off",
    delta: "-3 vs last month",
    trend: "up" as const,
    tone: "warning" as const,
  },
  {
    key: "requisition",
    label: "Requisitions",
    value: "37",
    caption: "in processing",
    delta: "+8.1%",
    trend: "up" as const,
    tone: "info" as const,
  },
  {
    key: "delivery",
    label: "Deliveries",
    value: "18",
    caption: "in transit / due",
    delta: "+5 this week",
    trend: "up" as const,
    tone: "accent" as const,
  },
  {
    key: "payment",
    label: "Payments Pending",
    value: "$420K",
    caption: "across 23 invoices",
    delta: "-6.4%",
    trend: "down" as const,
    tone: "destructive" as const,
  },
  {
    key: "spend",
    label: "Total Spend",
    value: "$1.82M",
    caption: "month to date",
    delta: "+9.7%",
    trend: "up" as const,
    tone: "success" as const,
  },
];

export const monthlySpend = [
  { month: "Oct", spend: 1.12, budget: 1.4 },
  { month: "Nov", spend: 1.28, budget: 1.45 },
  { month: "Dec", spend: 1.62, budget: 1.6 },
  { month: "Jan", spend: 1.34, budget: 1.5 },
  { month: "Feb", spend: 1.41, budget: 1.55 },
  { month: "Mar", spend: 1.58, budget: 1.6 },
  { month: "Apr", spend: 1.49, budget: 1.65 },
  { month: "May", spend: 1.71, budget: 1.7 },
  { month: "Jun", spend: 1.66, budget: 1.75 },
  { month: "Jul", spend: 1.74, budget: 1.8 },
  { month: "Aug", spend: 1.69, budget: 1.8 },
  { month: "Sep", spend: 1.82, budget: 1.85 },
];

export const departmentSpend = [
  { name: "Operations", value: 540, share: 100 },
  { name: "IT", value: 320, share: 59 },
  { name: "HR", value: 185, share: 34 },
  { name: "Facilities", value: 142, share: 26 },
  { name: "Finance", value: 96, share: 18 },
];

export const poStatus = [
  { name: "Delivered", value: 74, color: "var(--chart-2)" },
  { name: "In transit", value: 18, color: "var(--chart-1)" },
  { name: "Awaiting approval", value: 14, color: "var(--chart-3)" },
  { name: "Overdue", value: 7, color: "var(--chart-5)" },
  { name: "On hold", value: 15, color: "var(--chart-4)" },
];

export const vendorMetrics = [
  { label: "On-time delivery", value: 87, target: 90 },
  { label: "Quality acceptance", value: 96, target: 95 },
  { label: "Invoice match rate", value: 92, target: 95 },
  { label: "Contract compliance", value: 94, target: 90 },
];

export const topVendors = [
  { name: "Nexa Logistics", category: "Freight", spend: "$318K", onTime: 94, rating: "A" },
  { name: "Corevo Systems", category: "IT Hardware", spend: "$276K", onTime: 91, rating: "A" },
  { name: "BlueLine Facilities", category: "Facilities", spend: "$188K", onTime: 86, rating: "B+" },
  { name: "Orbit Staffing", category: "HR Services", spend: "$154K", onTime: 82, rating: "B" },
  { name: "Vertex Supplies", category: "Office", spend: "$121K", onTime: 78, rating: "B-" },
];

export const attention = [
  {
    title: "7 overdue purchase orders",
    detail: "Oldest is 12 days past promised delivery date",
    severity: "high" as const,
  },
  {
    title: "4 invoice matches pending",
    detail: "3-way match blocked on goods receipt notes",
    severity: "medium" as const,
  },
  {
    title: "$420K payments pending",
    detail: "9 invoices cross their due date within 5 days",
    severity: "high" as const,
  },
  {
    title: "14 approvals older than 48h",
    detail: "Escalation ready for department heads",
    severity: "low" as const,
  },
];

export const cycleTime = [
  { stage: "Requisition", days: 1.4 },
  { stage: "Approval", days: 2.1 },
  { stage: "PO issue", days: 0.9 },
  { stage: "Delivery", days: 6.3 },
  { stage: "Payment", days: 4.2 },
];
