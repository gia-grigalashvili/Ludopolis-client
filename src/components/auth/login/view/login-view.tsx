import { Link } from "@tanstack/react-router";
import { LoginForm } from "../login-form";
import TargetCursor from "@/components/ui/target-cursor";
import DarkVeil from "@/components/ui/dark-veil";
import { useLogin } from "@/hooks/useLogin";

export function LoginView() {
  const { mutate: login, isPending } = useLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    login({ email, password });
  };
  return (
    <div className="min-h-screen relative overflow-hidden">
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={290}
          noiseIntensity={0.1}
          scanlineIntensity={0.15}
          speed={0.8}
          scanlineFrequency={1.5}
          warpAmount={0.05}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-500 border-2 border-white transform rotate-12"></div>
              <h1 className="text-3xl font-black tracking-wide text-purple-100">
                LUDOPOLIS
              </h1>
            </div>
            <p className="text-lg text-purple-200">Enter the game realm</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-purple-100">
              SIGN IN
            </h2>

            <LoginForm onSubmit={handleLogin} isPending={isPending} />

            <div className="text-center mt-6">
              <p className="text-sm text-purple-300">
                Don't have an account?
                <Link
                  to="/signup"
                  className="cursor-target font-bold transition-colors hover:text-purple-200 text-purple-100"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-purple-400">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
