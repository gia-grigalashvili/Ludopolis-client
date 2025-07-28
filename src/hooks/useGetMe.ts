import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const response = await getCurrentUser();
        return { user: response };
      } catch {
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};