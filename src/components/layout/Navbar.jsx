import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { useState } from "react";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";

function Navbar({ onMenuClick }) {
  const { role, setRole, theme, setTheme } = useFinance();
  const [openModal, setOpenModal] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between border-b border-border px-6 py-4 shadow-sm backdrop-blur-md transition-colors duration-300"
      style={{ backgroundColor: "var(--topbar)" }}
    >
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg border border-border bg-card p-2 transition-colors hover:bg-muted md:hidden"
        >
          <Menu size={18} />
        </button>

        <h1 className="text-2xl font-bold tracking-tight">
          ExpenseHub
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          className="transition-all duration-200 hover:scale-[1.02]"
          onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </Button>

        {role === "admin" && (
          <Button
            onClick={() => setOpenModal(true)}
            className="transition-all duration-200 hover:scale-[1.02]"
          >
            Add Transaction
          </Button>
        )}

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 transition-colors duration-200"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <AddTransactionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </header>
  );
}

export default Navbar;