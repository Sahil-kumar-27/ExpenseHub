import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFinance } from "@/context/FinanceContext";

function TransactionFilters() {
  const {
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
  } = useFinance();

  return (
    <div className="mb-4 flex flex-col gap-4 lg:flex-row">
      <Input
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select
        value={categoryFilter}
        onValueChange={setCategoryFilter}
      >
        <SelectTrigger className="w-full lg:w-65">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Bills">Bills</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
          <SelectItem value="Transport">Transport</SelectItem>
          <SelectItem value="Investment">Investment</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TransactionFilters;