import { GetBoard } from "../services/product";
import { useQuery } from "@tanstack/react-query";

export const UseGetBoard = () => {
  return useQuery({
    queryKey: ["cardboards"],
    queryFn: () => GetBoard(),
  });
};
