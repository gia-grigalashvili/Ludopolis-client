import { createFileRoute } from "@tanstack/react-router";
import { GetSingleBoard } from "@/services/product"; // გზას შენი პროექტის სტრუქტურას მიუსადაგე
import SingleGames from "@/components/games/SingleGames";

export const Route = createFileRoute("/games/$id")({
  loader: async ({ params }) => {
    const response = await GetSingleBoard(params.id);

    // აქ ვაბრუნებთ მარტო data-ს, არა მთელ response-ს
    return { Board: response.data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { Board } = Route.useLoaderData();
  return <SingleGames board={Board} />;
}
