import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function IncomeExpenseBarChart({ data }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">
        Income vs Expenses
      </h2>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          barGap={8}
          barCategoryGap="20%"
        >
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="month"
            stroke="var(--foreground)"
          />

          <YAxis stroke="var(--foreground)" />

          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              color: "var(--foreground)",
            }}
          />

          <Legend wrapperStyle={{ color: "var(--foreground)" }} />

          <Bar
            dataKey="income"
            fill="var(--chart-1)"
            radius={[8, 8, 0, 0]}
          />

          <Bar
            dataKey="expense"
            fill="var(--chart-5)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeExpenseBarChart;