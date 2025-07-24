import { useQuery } from "@tanstack/react-query";
import { Getcategories } from "@/services/categories";
export const UseGetCategories = () => {
  return useQuery({
    queryKey: ["Categories"],
    queryFn: () => Getcategories(),
  });
};
