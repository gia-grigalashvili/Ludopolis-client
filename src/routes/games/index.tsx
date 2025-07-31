import Games from "../../components/games/Games";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/")({
  component: () => <Games />,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      categories: Array.isArray(search.categories) 
        ? search.categories.filter((item): item is string => typeof item === 'string')
        : typeof search.categories === 'string' 
        ? [search.categories]
        : undefined,
    };
  },
});
