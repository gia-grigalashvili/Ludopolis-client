import Sidebar from "../../components/admin/Sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import LetterGlitch from "../../components/ui/letter-Glitch";

export const Route = createFileRoute("/product")({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <div className="relative min-h-screen bg-[#0E0C15] mt-[80px] overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 z-0">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
          glitchColors={["#AD46FF", "#9C27B0", "#7E22CE"]}
        />
      </div>

      {/* Main layout */}
      <div className="relative z-10 flex">
        {/* Sidebar - full height */}
        <div className="h-[100vh]">
          <Sidebar />
        </div>

        {/* Page content */}
        <main className="p-4 ml-0 text-white w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
