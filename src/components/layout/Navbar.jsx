import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { useState } from "react";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";

function Navbar({ onMenuClick }) {
  const { role, setRole, theme, setTheme } = useFinance();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-30 border-b border-border shadow-sm backdrop-blur-md transition-colors duration-300"
        style={{ backgroundColor: "var(--topbar)" }}
      >
        <div className="flex flex-col gap-4 px-4 py-4 sm:px-6">
         
          <div className="flex items-center justify-between">
           
            <div className="flex items-center gap-3">
              <button
                onClick={onMenuClick}
                className="rounded-xl border border-border bg-card p-2 transition-all hover:bg-muted md:hidden"
              >
                <Menu size={18} />
              </button>

              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                ExpenseHub
              </h1>
            </div>

           
            <div className="flex items-center gap-2 md:hidden">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded-xl border border-border bg-card px-2 py-1 text-xs"
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>

              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() =>
                  setTheme(theme === "light" ? "dark" : "light")
                }
              >
                {theme === "light" ? "🌙" : "☀️"}
              </Button>
            </div>

           
            <div className="hidden items-center gap-3 md:flex">
              <Button
                variant="outline"
                onClick={() =>
                  setTheme(theme === "light" ? "dark" : "light")
                }
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </Button>

              {role === "admin" && (
                <Button onClick={() => setOpenModal(true)}>
                  Add Transaction
                </Button>
              )}

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded-xl border border-border bg-card px-3 py-2"
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

         
          {role === "admin" && (
            <div className="md:hidden">
              <Button
                onClick={() => setOpenModal(true)}
                className="w-full rounded-xl"
              >
                Add Transaction
              </Button>
            </div>
          )}
        </div>
      </header>

      <AddTransactionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

export default Navbar;