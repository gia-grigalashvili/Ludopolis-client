import { createFileRoute } from "@tanstack/react-router";
import { HomeView } from "@/components/home/view/home-view";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <HomeView />;
}
