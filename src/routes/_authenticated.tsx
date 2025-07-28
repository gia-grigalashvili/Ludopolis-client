import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
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
      
      if (!userData?.user) {
        throw redirect({ to: "/signin" });
      }
    } catch {
      throw redirect({ to: "/signin" });
    }
  },
});
