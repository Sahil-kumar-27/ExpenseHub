import { useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { useFinance } from "@/context/FinanceContext";
import BalanceChart from "../components/dashboard/BalanceChart";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import IncomeExpenseBarChart from "@/components/dashboard/IncomeExpenseBarChart";

function Dashboard() {
  const { transactions } = useFinance();

  const monthlyData = [
    { month: "Jan", amount: 42000 },
    { month: "Feb", amount: 39000 },
    { month: "Mar", amount: 45000 },
    { month: "Apr", amount: 41000 },
  ];

  const categoryData = [
    { category: "Food", amount: 12000 },
    { category: "Transport", amount: 7000 },
    { category: "Shopping", amount: 15000 },
    { category: "Bills", amount: 10000 },
  ];

  const incomeExpenseData = [
    { month: "Nov", income: 82000, expense: 38000 },
    { month: "Dec", income: 81000, expense: 39000 },
    { month: "Jan", income: 135000, expense: 18000 },
    { month: "Feb", income: 79000, expense: 45000 },
    { month: "Mar", income: 74000, expense: 19000 },
    { month: "Apr", income: 12000, expense: 21000 },
  ];

  const { income, expenses, balance } = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const expenses = transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);


  return (
    <DashboardLayout>
    
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <SummaryCard
          title="Total Balance"
          amount={balance}
          subtitle="Updated from latest transactions"
        />
        <SummaryCard
          title="Total Income"
          amount={income}
          subtitle="All credited amounts"
        />
        <SummaryCard
          title="Total Expenses"
          amount={expenses}
          subtitle="All debit transactions"
        />
      </section>

     
      <section className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <BalanceChart data={monthlyData} />
        <ExpenseChart data={categoryData} />
      </section>

      <section className="mt-8">
        <IncomeExpenseBarChart data={incomeExpenseData} />
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;
