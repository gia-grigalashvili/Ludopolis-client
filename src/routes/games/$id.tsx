import { createFileRoute } from "@tanstack/react-router";
import { GetSingleBoard } from "../../services/product";
import SingleGames from "../../components/games/SingleGames";

export const Route = createFileRoute("/games/$id")({
  loader: async ({ params }) => {
    const Board = await GetSingleBoard(params.id);
    return { Board };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { Board } = Route.useLoaderData();
  return (
    <div>
      <h1>zdzd</h1>
    </div>
  );
}
