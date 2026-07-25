import { createFileRoute } from "@tanstack/react-router";
import { InteractiveMap } from "@/components/site/InteractiveMap";

export const Route = createFileRoute("/neighborhood")({
  component: NeighborhoodRoute,
});

function NeighborhoodRoute() {
  return (
    <div className="pt-24 min-h-screen">
      <InteractiveMap />
    </div>
  );
}
