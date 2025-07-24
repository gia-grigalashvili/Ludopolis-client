import DarkVeil from "@/components/ui/dark-veil";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import TargetCursor from "@/components/ui/target-cursor";
import AboutHero from "@/components/home/about/about-hero";
import AboutStory from "@/components/home/about/about-story";
import AboutOffer from "@/components/home/about/about-offer";
import AboutMission from "@/components/home/about/about-mission";

export default function AboutView() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={290}
          noiseIntensity={0.15}
          scanlineIntensity={0.25}
          speed={1.2}
          scanlineFrequency={2.5}
          warpAmount={0.08}
        />
      </div>

      <div className="relative z-10 text-white">
        <Header />
        <AboutHero />
        <AboutStory />
        <AboutOffer />
        <AboutMission />
        <Footer />
      </div>
    </div>
  );
}
