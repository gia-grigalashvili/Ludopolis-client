import { useMutation } from "@tanstack/react-query";
import { Login } from "@/services/auth";
import toast from "react-hot-toast";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      Login({ email, password }),
    onSuccess: () => {
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
