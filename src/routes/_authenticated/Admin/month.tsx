import Month from "../../../components/admin/Month";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/Admin/month")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Month />;
}
