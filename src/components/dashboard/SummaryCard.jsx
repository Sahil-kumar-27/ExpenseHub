import { Card, CardContent } from "@/components/ui/card";

function SummaryCard({ title, amount, subtitle }) {
  return (
    <Card className="rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="mt-2 text-3xl font-bold">
          ₹{amount.toLocaleString()}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;