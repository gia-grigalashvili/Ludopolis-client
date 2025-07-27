import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "../services/cart";
import toast from "react-hot-toast";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      productId,
    }: {
      userId: string;
      productId: string;
    }) => removeFromCart(userId, productId),
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}; 