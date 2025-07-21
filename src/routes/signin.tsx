import { createFileRoute } from "@tanstack/react-router";
import { LoginView } from "@/components/auth/login/view/login-view";

export const Route = createFileRoute("/signin")({
  component: SignInPage,
});

function SignInPage() {
  return <LoginView />;
}
