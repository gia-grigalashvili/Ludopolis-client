import { RegisterView } from "@/components/auth/register/view/register-view";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
  beforeLoad: async ({ context }) => {
    const user = await context.getCurrentUser().catch(() => null);
    if (user) {
      throw redirect({ to: "/" });
    }
  },
});

function SignUpPage() {
  return <RegisterView />;
}
