import { Card, CardContent } from "../ui/card";

function InsightsCard({ title, value, subtitle }) {
  return (
    <Card className="rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="mt-2 text-2xl font-bold">{value}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export default InsightsCard;
