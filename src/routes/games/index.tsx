import Games from "../../components/games/Games";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/")({
  component: () => <Games />,
});
