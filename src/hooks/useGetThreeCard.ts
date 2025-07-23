import { useQuery } from "@tanstack/react-query";
import { getThreeCardBoards } from "@/services/cardboards";

export const useGetThreeCard = () => {
  return useQuery({
    queryKey: ["three-cardboards"],
    queryFn: getThreeCardBoards,
    staleTime: 1000 * 60 * 5,
  });
};
