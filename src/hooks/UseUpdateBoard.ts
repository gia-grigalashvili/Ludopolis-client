import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatecardboards } from "../service/product";
import { toast } from "react-hot-toast";
export const UseUpdateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      name,
      description,
      price,
      image,
      category,
      author,
    }: {
      id: Number;
      name: string;
      description: string;
      price: Number;
      image: string;
      category: string;
      author: string;
    }) =>
      updatecardboards({
        id,
        name,
        description,
        price,
        image,
        category,
        author,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Cardboards"] });
    },

    onError: (error: any) => {
      toast.error(error.message || "Error updating Cardboards");
    },
  });
};
