import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

import TargetCursor from "@/components/ui/target-cursor";
import Particles from "../../components/ui/Particles";

export const Route = createFileRoute("/games")({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#7E22CE", "#7E22CE"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      {/* Content on top */}
      <div className="relative z-10 flex">
        <main className="ml-0 text-white w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
