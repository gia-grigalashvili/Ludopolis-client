// import Particles from "@/components/ui/Particles";
import Checkout from "../../components/checkout/Checkout";
import { createFileRoute } from "@tanstack/react-router";
import TargetCursor from "@/components/ui/target-cursor";
import { Header } from "../../components/header";
import DarkVeil from "../../components/ui/dark-veil";
export const Route = createFileRoute("/checkout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative text-white min-h-screen">
      <div
        style={{ pointerEvents: "none" }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <DarkVeil
          hueShift={290}
          noiseIntensity={0.15}
          scanlineIntensity={0.25}
          speed={1.2}
          scanlineFrequency={2.5}
          warpAmount={0.08}
        />
      </div>
      <Header />
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      <div className="p-6 relative z-10">
        <Checkout />
      </div>
    </div>
  );
}
