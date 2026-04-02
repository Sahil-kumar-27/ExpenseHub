import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFinance } from "@/context/FinanceContext";
import { Trash2 } from "lucide-react";

function TransactionTable({ transactions }) {
  const { filteredTransactions, role, deleteTransaction } = useFinance();

  const tableData = transactions || filteredTransactions;

  if (!tableData.length) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        No transactions found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors duration-300">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Transactions
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            {role === "admin" && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {tableData.map((item) => (
            <TableRow
              key={item.id}
              className="transition-colors hover:bg-muted/40"
            >
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.category}</TableCell>

              <TableCell>
                <Badge
                  variant={
                    item.type === "income"
                      ? "default"
                      : "secondary"
                  }
                >
                  {item.type}
                </Badge>
              </TableCell>

              <TableCell>
                ₹{item.amount.toLocaleString()}
              </TableCell>

              {role === "admin" && (
                <TableCell>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteTransaction(item.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TransactionTable;