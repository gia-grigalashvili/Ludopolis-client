import { useQuery } from "@tanstack/react-query";
import { Getcategories } from "@/service/Categories";
export const UseGetCategories = () => {
  return useQuery({
    queryKey: ["Categories"],
    queryFn: () => Getcategories(),
  });
};
