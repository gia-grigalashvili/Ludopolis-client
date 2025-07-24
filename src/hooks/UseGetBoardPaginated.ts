import { useQuery } from "@tanstack/react-query";
import { getBoardPaginated } from "../services/product";

export const UseGetBoardPaginated = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["Blogs", page, limit],
    queryFn: () => getBoardPaginated(page, limit),
    staleTime: 1000 * 60 * 5,
  });
};
