import instance from "@/lib/axios";

export const Register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await instance.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const Login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await instance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getCurrentUser = async () => {
  const response = await instance.get("/auth/me");
  if (!response.data.user) {
    throw new Error("User not found");
  }
  return response.data.user;
};

export const logout = async () => {
  try {
    const response = await instance.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getMe = async () => {
  try {
    const response = await instance.get("/auth/me");
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export type User = Awaited<ReturnType<typeof getCurrentUser>>;
