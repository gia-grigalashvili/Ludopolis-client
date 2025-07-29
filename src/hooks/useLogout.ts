import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { logout } from "@/services/auth";
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      // Clear all cached data after logout
      queryClient.clear();
      queryClient.invalidateQueries({ queryKey: ['me'] });
      navigate({ to: "/" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
