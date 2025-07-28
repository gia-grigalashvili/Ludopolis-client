import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { getCurrentUser } from "../services/auth";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
  getCurrentUser: typeof getCurrentUser;
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  loader: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ["me"],
      queryFn: async () => {
        try {
          const response = await context.getCurrentUser();
          return { user: response };
        } catch {
          return null;
        }
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
    return { user };
  },
});

function RootComponent() {
  return (
    <React.Fragment>
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
}
