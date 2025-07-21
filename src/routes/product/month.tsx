import Month from "../../components/admin/Month";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product/month")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Month />;
}
