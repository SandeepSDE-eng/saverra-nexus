import { createFileRoute } from "@tanstack/react-router";
import { Amenities } from "@/components/site/Amenities";

export const Route = createFileRoute("/amenities")({
  component: AmenitiesRoute,
});

function AmenitiesRoute() {
  return (
    <div className="pt-24 min-h-screen">
      <Amenities />
    </div>
  );
}
