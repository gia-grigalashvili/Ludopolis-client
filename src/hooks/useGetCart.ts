import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/cart";
import type { Cart } from "@/types/cart";

export const useGetCart = (userId: string | undefined) => {
  return useQuery<Cart>({
    queryKey: ["cart", userId],
    queryFn: () => getCart(userId!),
    enabled: !!userId,
    retry: false,
  });
}; 