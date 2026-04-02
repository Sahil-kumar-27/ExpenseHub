import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function BalanceChart({ data }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">
        Monthly Expense Trend
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="4 4"
          />

          <XAxis dataKey="month" stroke="var(--foreground)" />
          <YAxis stroke="var(--foreground)" />

          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              color: "var(--foreground)",
            }}
          />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="var(--chart-1)"
            strokeWidth={4}
            dot={{
              fill: "var(--chart-2)",
              r: 5,
            }}
            activeDot={{
              r: 8,
              fill: "var(--chart-3)",
            }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BalanceChart;