import AllBoard from "@/components/admin/AllBoard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product/All")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      {" "}
      <AllBoard />
    </div>
  );
}
