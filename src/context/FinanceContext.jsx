import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import transactionData from "@/data/transactions.json";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : transactionData;
  });

  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // ✅ Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // ✅ Add Transaction (normalized category)
  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [
      {
        id: Date.now(),
        ...newTransaction,
        category: newTransaction.category?.toLowerCase().trim(),
      },
      ...prev,
    ]);
  };

  // ✅ Delete Transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ✅ FIXED FILTER LOGIC
  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesSearch = item.description
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        item.category
          ?.toLowerCase()
          .trim()
          .includes(categoryFilter.toLowerCase().trim());

      return matchesSearch && matchesCategory;
    });
  }, [transactions, search, categoryFilter]);

  const value = {
    transactions,
    filteredTransactions,
    role,
    setRole,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    setTransactions,
    addTransaction,
    deleteTransaction,
    theme,
    setTheme,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}