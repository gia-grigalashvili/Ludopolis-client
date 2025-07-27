import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Login } from "@/services/auth";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      Login({ email, password }),
    onSuccess: () => {
      toast.success("Logged in successfully");
      navigate({ to: "/" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
