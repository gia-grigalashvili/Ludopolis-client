import Categories from "../../components/admin/Categories";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/Admin/categories")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Categories />
    </div>
  );
}
