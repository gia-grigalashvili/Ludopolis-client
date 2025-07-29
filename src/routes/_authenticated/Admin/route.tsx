import { createFileRoute, redirect } from "@tanstack/react-router";
import Sidebar from "@/components/admin/Sidebar";
import TargetCursor from "@/components/ui/target-cursor";
import DarkVeil from "@/components/ui/dark-veil";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/Admin")({
  beforeLoad: async ({ context }) => {
    const user = await context.getCurrentUser().catch(() => null);

    if (!user) {
      throw redirect({ to: "/signin" });
    }

    if (user.role !== "admin") {
      throw redirect({ to: "/" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="relative min-h-screen bg-[#0E0C15] overflow-hidden">
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

      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      <div className="relative z-10 flex">
        {/* გვერდითი მენიუ */}
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
