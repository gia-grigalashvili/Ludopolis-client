import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatecategories } from "../service/Categories";
import { toast } from "react-hot-toast";
export const useUpdateCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: Number; name: string }) =>
      updatecategories({
        id,
        name,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },

    onError: (error: any) => {
      toast.error(error.message || "Error updating categories");
    },
  });
};
