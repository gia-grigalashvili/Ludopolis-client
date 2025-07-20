import DarkVeil from "@/components/ui/dark-veil";
import { Header } from "@/components/header";
import { HomeHero } from "@/components/home/home-hero";
import { HomeFeatured } from "@/components/home/home-featured";
import { HomeCategories } from "@/components/home/home-categories";
import { Footer } from "@/components/footer";
export function HomeView() {
  return (
    <div className="min-h-screen relative overflow-hidden">
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
        <HomeHero />
        <HomeFeatured />
        <HomeCategories />
        <Footer />
      </div>
    </div>
  );
}
