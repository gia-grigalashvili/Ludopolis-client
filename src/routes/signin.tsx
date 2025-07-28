import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginView } from "@/components/auth/login/view/login-view";

export const Route = createFileRoute("/signin")({
  component: SignInPage,
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
      // User not authenticated, continue to signin page
    }
  },
});

function SignInPage() {
  return <LoginView />;
}
