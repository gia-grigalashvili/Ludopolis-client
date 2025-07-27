import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { logout } from "@/services/auth";
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate({ to: "/" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
