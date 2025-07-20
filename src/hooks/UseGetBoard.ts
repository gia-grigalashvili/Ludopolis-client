import { GetBoard } from "../service/product";
import { useQuery } from "@tanstack/react-query";

export const UseGetBoard = () => {
  return useQuery({
    queryKey: ["Cardboards"],
    queryFn: () => GetBoard(),
  });
};
