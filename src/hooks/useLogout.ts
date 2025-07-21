import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/auth";
import toast from "react-hot-toast";

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
