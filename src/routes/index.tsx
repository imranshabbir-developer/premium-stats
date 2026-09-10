import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Area,
  ComposedChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  Gauge,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  attention,
  cycleTime,
  departmentSpend,
  kpis,
  monthlySpend,
  poStatus,
  topVendors,
  vendorMetrics,
} from "@/components/dashboard/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SCM Executive Dashboard | IPS BPO Procurement Insights" },
      {
        name: "description",
        content:
          "Executive supply chain dashboard: purchase orders, approvals, deliveries, payments, department spend and vendor performance at a glance.",
      },
      { property: "og:title", content: "SCM Executive Dashboard | IPS BPO" },
      {
        property: "og:description",
        content:
          "Live procurement statistics: $1.82M spend, 128 purchase orders, vendor performance and items needing attention.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const toneStyles: Record<string, { icon: ReactNode; ring: string; text: string; bg: string }> = {
  primary: {
    icon: <FileText className="h-5 w-5" />,
    ring: "ring-primary/20",
    text: "text-primary",
    bg: "bg-primary/10",
  },
  warning: {
    icon: <ClipboardList className="h-5 w-5" />,
    ring: "ring-warning/25",
    text: "text-warning",
    bg: "bg-warning/12",
  },
  info: {
    icon: <Boxes className="h-5 w-5" />,
    ring: "ring-info/20",
    text: "text-info",
    bg: "bg-info/10",
  },
  accent: {
    icon: <Truck className="h-5 w-5" />,
    ring: "ring-accent/25",
    text: "text-accent",
    bg: "bg-accent/12",
  },
  destructive: {
    icon: <CreditCard className="h-5 w-5" />,
    ring: "ring-destructive/20",
    text: "text-destructive",
    bg: "bg-destructive/10",
  },
  success: {
    icon: <Wallet className="h-5 w-5" />,
    ring: "ring-success/25",
    text: "text-success",
    bg: "bg-success/12",
  },
};

function ChartFrame({ height, children }: { height: number; children: ReactNode }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        {children as never}
      </ResponsiveContainer>
    </div>
  );
}

function ChartTip({ active, payload, label, suffix = "" }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-popover/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
      {label ? <p className="mb-1 font-semibold text-popover-foreground">{label}</p> : null}
      {payload.map((entry: any) => (
        <p key={entry.name} className="flex items-center gap-2 text-muted-foreground">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: entry.color ?? entry.payload?.color }}
          />
          <span className="capitalize">{entry.name}</span>
          <span className="ml-auto font-semibold text-popover-foreground">
            {entry.value}
            {suffix}
          </span>
        </p>
      ))}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`surface-card p-5 sm:p-6 ${className}`}>
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground sm:text-lg">{title}</h3>
          {subtitle ? <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{subtitle}</p> : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

function Dashboard() {
  const [period, setPeriod] = useState("This Month");

  return (
    <main className="min-h-screen bg-background pb-14">
      {/* Header */}
      <div className="brand-gradient sheen relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-primary-foreground ring-1 ring-white/25">
                <Gauge className="h-5.5 w-5.5" />
              </span>
              <div className="text-primary-foreground">
                <p className="text-xs tracking-[0.22em] uppercase opacity-80">IPS BPO · Supply Chain</p>
                <h1 className="text-xl font-semibold sm:text-2xl">SCM Executive Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  aria-label="Reporting period"
                  className="appearance-none rounded-full border border-white/25 bg-white/15 py-2 pr-9 pl-4 text-sm font-medium text-primary-foreground outline-none backdrop-blur"
                >
                  {["This Month", "Last Month", "This Quarter", "Year to Date"].map((p) => (
                    <option key={p} value={p} className="text-foreground">
                      {p}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-primary-foreground/80">
                  ▼
                </span>
              </div>
              <ThemeToggle />
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <HeroStat
              icon={<Wallet className="h-4 w-4" />}
              label="Spend under management"
              value="$1.82M"
              note="63% of annual budget"
            />
            <HeroStat
              icon={<ShieldCheck className="h-4 w-4" />}
              label="Cost savings realised"
              value="$214K"
              note="11.7% vs baseline pricing"
            />
            <HeroStat
              icon={<BadgeCheck className="h-4 w-4" />}
              label="Active vendors"
              value="42"
              note="96% quality acceptance"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* KPI row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {kpis.map((kpi) => {
            const tone = toneStyles[kpi.tone]!;
            return (
              <article
                key={kpi.key}
                className={`surface-card ring-1 ${tone.ring} p-5 transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.bg} ${tone.text}`}>
                    {tone.icon}
                  </span>
                  <span
                    className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                      kpi.trend === "up" ? "bg-success/12 text-success" : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {kpi.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {kpi.delta}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-foreground sm:text-[1.7rem]">{kpi.value}</p>
                <p className="mt-1 text-sm font-medium text-foreground/80">{kpi.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{kpi.caption}</p>
              </article>
            );
          })}
        </div>

        {/* Spend + departments */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Panel
            title="Monthly Spend vs Budget"
            subtitle="Rolling 12 months, values in $ millions"
            className="lg:col-span-2"
            action={
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-chart-1" /> Spend
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-chart-3" /> Budget
                </span>
              </div>
            }
          >
            <ChartFrame height={300}>
              <ComposedChart data={monthlySpend} margin={{ left: -18, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip content={<ChartTip suffix="M" />} />
                <Area
                  type="monotone"
                  dataKey="spend"
                  stroke="var(--chart-1)"
                  strokeWidth={3}
                  fill="url(#spendFill)"
                  dot={{ r: 0 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="budget"
                  stroke="var(--chart-3)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </ComposedChart>
            </ChartFrame>
          </Panel>

          <Panel title="Department Spend" subtitle="Allocation for the selected period">
            <ul className="space-y-4">
              {departmentSpend.map((dept, i) => (
                <li key={dept.name}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium text-foreground">{dept.name}</span>
                    <span className="font-semibold text-foreground">${dept.value}K</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${dept.share}%`,
                        background: `var(--chart-${(i % 5) + 1})`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-surface-strong p-4">
              <p className="text-xs text-muted-foreground">Top 3 departments cover</p>
              <p className="text-lg font-semibold text-foreground">
                75% <span className="text-sm font-normal text-muted-foreground">of total spend</span>
              </p>
            </div>
          </Panel>
        </div>

        {/* Vendor performance + attention */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Panel
            title="Vendor Performance"
            subtitle="42 active vendors scored against SLA targets"
            className="lg:col-span-2"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {vendorMetrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-border bg-surface-strong p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{metric.label}</span>
                    <span
                      className={`text-base font-semibold ${
                        metric.value >= metric.target ? "text-success" : "text-warning"
                      }`}
                    >
                      {metric.value}%
                    </span>
                  </div>
                  <div className="relative mt-3 h-2 rounded-full bg-muted">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary"
                      style={{ width: `${metric.value}%` }}
                    />
                    <span
                      className="absolute -top-1 h-4 w-0.5 rounded bg-foreground/50"
                      style={{ left: `${metric.target}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Target {metric.target}%</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Attention Required"
            subtitle="Items that need a decision this week"
            action={
              <span className="flex items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-warning">
                <AlertTriangle className="h-3.5 w-3.5" /> 4 alerts
              </span>
            }
          >
            <ul className="space-y-3">
              {attention.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-3 rounded-xl border border-border bg-surface-strong p-4 transition-colors hover:border-primary/40"
                >
                  <span
                    className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                      item.severity === "high"
                        ? "bg-destructive"
                        : item.severity === "medium"
                          ? "bg-warning"
                          : "bg-info"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* PO status + cycle time */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Panel title="Purchase Order Status" subtitle="128 orders in the current cycle">
            <ChartFrame height={230}>
              <PieChart>
                <Pie
                  data={poStatus}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={3}
                  stroke="none"
                >
                  {poStatus.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTip />} />
              </PieChart>
            </ChartFrame>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {poStatus.map((s) => (
                <li key={s.name} className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  {s.name}
                  <span className="ml-auto font-semibold text-foreground">{s.value}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            title="Procure-to-Pay Cycle Time"
            subtitle="Average days per stage · 14.9 days end to end"
            className="lg:col-span-2"
          >
            <ChartFrame height={286}>
              <BarChart data={cycleTime} margin={{ left: -14, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 6" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="stage" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip content={<ChartTip suffix=" days" />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
                <Bar dataKey="days" radius={[8, 8, 0, 0]} maxBarSize={54}>
                  {cycleTime.map((entry, i) => (
                    <Cell key={entry.stage} fill={`var(--chart-${(i % 5) + 1})`} />
                  ))}
                </Bar>
              </BarChart>
            </ChartFrame>
          </Panel>
        </div>

        {/* Top vendors table */}
        <Panel
          title="Top Vendors by Spend"
          subtitle="Ranked for the selected period"
          className="mt-6"
          action={
            <span className="flex items-center gap-1.5 rounded-full bg-success/12 px-3 py-1 text-xs font-semibold text-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> 96% quality acceptance
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-left text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="pb-3 font-medium">Vendor</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Spend</th>
                  <th className="pb-3 font-medium">On-time</th>
                  <th className="pb-3 text-right font-medium">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topVendors.map((v) => (
                  <tr key={v.name} className="border-t border-border">
                    <td className="py-3 font-medium text-foreground">{v.name}</td>
                    <td className="py-3 text-muted-foreground">{v.category}</td>
                    <td className="py-3 font-semibold text-foreground">{v.spend}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${v.onTime >= 90 ? "bg-success" : v.onTime >= 85 ? "bg-accent" : "bg-warning"}`}
                            style={{ width: `${v.onTime}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{v.onTime}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        {v.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Figures shown are sample data for review · IPS BPO Supply Chain Management
        </p>
      </div>
    </main>
  );
}

function HeroStat({
  icon,
  label,
  value,
  note,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-primary-foreground backdrop-blur">
      <p className="flex items-center gap-2 text-xs opacity-85">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="text-xs opacity-80">{note}</p>
    </div>
  );
}
