import { createFileRoute } from "@tanstack/react-router";
import { GetSingleBoard } from "@/services/product";
import SingleGames from "@/components/games/SingleGames";

export const Route = createFileRoute("/games/$id")({
  loader: async ({ params }) => {
    const response = await GetSingleBoard(params.id);
    return { Board: response.data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { Board } = Route.useLoaderData();
  return <SingleGames board={Board} />;
}
