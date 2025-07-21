import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginView } from "@/components/auth/login/view/login-view";

export const Route = createFileRoute("/signin")({
  component: SignInPage,
  beforeLoad: async ({ context }) => {
    const user = await context.getCurrentUser().catch(() => null);
    if (user) {
      throw redirect({ to: "/" });
    }
  },
});

function SignInPage() {
  return <LoginView />;
}
