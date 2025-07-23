import { createFileRoute } from "@tanstack/react-router";
import AboutView from "@/components/home/about/view/about-view";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return <AboutView />;
}
