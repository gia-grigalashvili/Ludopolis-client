import { createFileRoute } from "@tanstack/react-router";
import Product from "../../components/admin/Product";
export const Route = createFileRoute("/product/")({
  component: () => <Product />,
});
