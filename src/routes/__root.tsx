import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { getCurrentUser } from "../services/auth";

export const Route = createRootRouteWithContext<{
  getCurrentUser: typeof getCurrentUser;
}>()({
  component: RootComponent,
  loader: async ({ context }) => {
    const user = await context.getCurrentUser().catch(() => null);
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
