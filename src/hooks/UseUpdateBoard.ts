import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatecardboards } from "../services/product";
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
    }: {
      id: Number;
      name: string;
      description: string;
      price: Number;
      image: string;
      category: string;
    }) =>
      updatecardboards({
        id,
        name,
        description,
        price,
        image,
        category,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Cardboards"] });
      queryClient.invalidateQueries({ queryKey: ["Boards"] });
      toast.success("Cardboard updated successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Error updating Cardboards");
    },
  });
};
