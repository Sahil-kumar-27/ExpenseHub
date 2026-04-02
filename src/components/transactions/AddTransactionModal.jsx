import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "@/components/ui/button";
import { useFinance } from "@/context/FinanceContext";

function AddTransactionModal({ open, onClose }) {
  const { addTransaction, transactions } = useFinance();

  const [form, setForm] = useState({
    date: "",
    description: "",
    category: "",
    type: "expense",
    amount: "",
  });

  const categoryOptions = [
    ...new Set(transactions.map((item) => item.category)),
  ];

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.description || !form.amount || !form.category) return;

    addTransaction({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      date: "",
      description: "",
      category: "",
      type: "expense",
      amount: "",
    });

    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm overflow-y-auto"
      onClick={onClose} // click outside to close
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2 className="mb-5 text-2xl font-bold">Add Transaction</h2>

        <div className="space-y-4">
          <input
            type="date"
            className="w-full rounded-lg border border-border bg-background p-3"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <input
            placeholder="Description"
            className="w-full rounded-lg border border-border bg-background p-3"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <select
            className="w-full rounded-lg border border-border bg-background p-3"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">Select Category</option>

            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="w-full rounded-lg border border-border bg-background p-3"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            className="w-full rounded-lg border border-border bg-background p-3"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default AddTransactionModal;