import { createFileRoute } from "@tanstack/react-router";
import { FaqSection } from "@/components/site/FaqSection";

export const Route = createFileRoute("/faq")({
  component: FaqRoute,
});

function FaqRoute() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <FaqSection />
    </div>
  );
}
