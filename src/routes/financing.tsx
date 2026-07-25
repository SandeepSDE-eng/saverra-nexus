import { createFileRoute } from "@tanstack/react-router";
import { EmiCalculator } from "@/components/site/EmiCalculator";

export const Route = createFileRoute("/financing")({
  component: FinancingRoute,
});

function FinancingRoute() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <EmiCalculator />
    </div>
  );
}
