import { RegisterView } from "@/components/auth/register/view/register-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
});

function SignUpPage() {
  return <RegisterView />;
}
