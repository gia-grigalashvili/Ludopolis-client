import { createFileRoute } from "@tanstack/react-router";
import { GetSingleBoard } from "../../services/product";
import SingleGame from "../../components/admin/SingleGame";

export const Route = createFileRoute("/_authenticated/Admin/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const Board = await GetSingleBoard(params.id);
    return { Board };
  },
});

function RouteComponent() {
  const { Board } = Route.useLoaderData();
  return <SingleGame Board={Board} />;
}
