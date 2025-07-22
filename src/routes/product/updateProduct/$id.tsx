// routes/blog/updatedBlog/$id.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Update from "../../../components/admin/Update";
import { useState } from "react";

export const Route = createFileRoute("/product/updateProduct/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [, setIsModalOpen] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => axios.get(`/api/cardboards/${id}`).then((res) => res.data),
  });
  console.log(data);
  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError) return <div className="text-red-500">Error loading blog</div>;

  return (
    <div className="flex justify-center pt-10">
      <Update selectedBlog={data} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
