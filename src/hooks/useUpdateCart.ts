import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartQuantity } from "../services/cart";
import toast from "react-hot-toast";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      productId,
      quantity,
    }: {
      userId: string;
      productId: string;
      quantity: number;
    }) => updateCartQuantity(userId, productId, quantity),
    onSuccess: () => {
      toast.success("Cart updated");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}; 