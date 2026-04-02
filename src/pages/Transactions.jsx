import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionTable from "@/components/transactions/TransactionTable";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import { useFinance } from "@/context/FinanceContext";

function Transactions() {
  const { filteredTransactions } = useFinance();

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <DashboardLayout>
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">Transactions</h1>

        <TransactionFilters />

        <TransactionTable transactions={paginatedTransactions} />

        {/* Pagination */}
        <div className="flex items-center justify-between rounded-xl border bg-card p-4">
          <button
            onClick={goToPrev}
            disabled={currentPage === 1}
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`rounded-lg px-3 py-2 border ${
                  currentPage === index + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-card"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Transactions;
