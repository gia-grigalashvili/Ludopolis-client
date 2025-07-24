import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCategories } from "../services/categories";

export const UseCreateCategories = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ name }: { name: string }) =>
      createCategories({
        name,
      }),
    onSuccess: () => {
      toast.success("Categories created successfully!");
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create Categories: " + error.message);
    },
  });

  return mutation;
};
