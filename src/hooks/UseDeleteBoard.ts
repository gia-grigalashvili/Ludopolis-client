import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../service/product";

export const UseDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (Id: number) => deleteBoard(Id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Cardboards"] });
    },

    onError: (error) => {
      console.error("Error deleting user post:", error);
    },
  });
};
