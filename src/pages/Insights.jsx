import DashboardLayout from "@/components/layout/DashboardLayout";
import InsightsCard from "@/components/dashboard/InsightsCard";
import { useFinance } from "@/context/FinanceContext";

function Insights() {
  const { transactions } = useFinance();

  const averageTransaction = Math.round(
    transactions.reduce((sum, item) => sum + item.amount, 0) /
      transactions.length
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Insights</h1>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <InsightsCard
            title="Highest Spending Category"
            value="Shopping"
            subtitle="Most frequent expense category"
          />
          <InsightsCard
            title="Monthly Comparison"
            value="12% lower than last month"
            subtitle="Compared to previous month"
          />
          <InsightsCard
            title="Average Transaction"
            value={`₹${averageTransaction.toLocaleString()}`}
            subtitle="Across all transactions"
          />
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Insights;