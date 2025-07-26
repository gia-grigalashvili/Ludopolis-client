import Sidebar from "../../components/admin/Sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import LetterGlitch from "../../components/ui/letter-Glitch";
import TargetCursor from "@/components/ui/target-cursor";
export const Route = createFileRoute("/_authenticated/Admin")({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <div className="relative min-h-screen bg-[#0E0C15] mt-[80px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
          glitchColors={["#AD46FF", "#9C27B0", "#7E22CE"]}
        />
      </div>
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      <div className="relative z-10 flex">
        <div className="h-[100vh]">
          <Sidebar />
        </div>

        <main className="p-4 ml-0 text-white w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
