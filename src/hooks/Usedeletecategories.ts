import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletecategories } from "../services/categories";

export const Usedeletecategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (Id: number) => deletecategories(Id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },

    onError: (error) => {
      console.error("Error deleting user post:", error);
    },
  });
};
