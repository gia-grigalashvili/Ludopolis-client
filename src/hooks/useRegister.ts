import { useMutation } from "@tanstack/react-query";
import { Register } from "@/services/auth";
import toast from "react-hot-toast";

export const useRegister = () => {
  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => Register({ name, email, password }),
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
