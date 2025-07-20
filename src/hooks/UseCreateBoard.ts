import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createBoard } from "../service/product";

export const UseCreateBoard = () => {
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
      toast.success("cardboards created successfully!");
      queryClient.invalidateQueries({ queryKey: ["Cardboards"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create cardboards: " + error.message);
    },
  });

  return mutation;
};
