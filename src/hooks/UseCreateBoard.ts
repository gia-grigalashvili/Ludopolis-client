import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createBoard } from "@/server/product";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      name,
      description,
      price,
      image,
      category,
      author,
    }: {
      name: string;
      description: string;
      price: Number;
      image: string;
      category: string;
      author: string;
    }) =>
      createBoard({
        name,
        description,
        price,
        image,
        category,
        author,
      }),
    onSuccess: () => {
      toast.success("Blog created successfully!");
      queryClient.invalidateQueries({ queryKey: ["Blogs"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create blog: " + error.message);
    },
  });

  return mutation;
};
