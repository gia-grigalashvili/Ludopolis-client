import { createFileRoute, redirect } from "@tanstack/react-router";
import { RegisterView } from "@/components/auth/register/view/register-view";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
  beforeLoad: async ({ context }) => {
    try {
      const userData = await context.queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: async () => {
          const response = await context.getCurrentUser();
          return { user: response };
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
      });
      
      if (userData?.user) {
        throw redirect({ to: "/" });
      }
    } catch {
      // User not authenticated, continue to signup page
    }
  },
});

function SignUpPage() {
  return <RegisterView />;
}
