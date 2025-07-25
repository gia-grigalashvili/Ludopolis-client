import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

import TargetCursor from "@/components/ui/target-cursor";

import Waves from "../../components/ui/Waves";
import Aurora from "../../components/ui/Aurora";
import Silk from "../../components/ui/Silk";
import Particles from "../../components/ui/Particles";

export const Route = createFileRoute("/games")({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <div className="relative min-h-screen">
      {/* Waves should fill entire height of page */}
      <div className="absolute inset-0 z-0">
        {/* <Waves
          lineColor="#ffffff"
          backgroundColor="#7E22CE"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        /> */}
        {/* <Aurora
          colorStops={["#7E22CE", "#7E22CE", "#7E22CE"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        /> */}
        {/* <Silk
          speed={5}
          scale={1}
          color="#7E22CE"
          noiseIntensity={1.5}
          rotation={0}
        /> */}
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
