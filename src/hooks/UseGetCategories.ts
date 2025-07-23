import { Getcategories } from "../service/Categories";
import { useQuery } from "@tanstack/react-query";

export const UseGetCategories = () => {
  return useQuery({
    queryKey: ["Categories"],
    queryFn: () => Getcategories(),
  });
};
