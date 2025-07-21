import instance from "../lib/axios";

export const createBoard = async ({
  name,
  description,
  price,
  image,
  category,
  author,
}: {
  name: string;
  description: string;
  price: Number;
  image: string;
  category: string;
  author: string;
}) => {
  const response = await instance.post("/api/cardboards", {
    name,
    description,
    price,
    image,
    category,
    author,
  });

  if (!response) {
    throw new Error("Failed to create cardboards");
  }

  return response.data;
};

export const GetBoard = async () => {
  const response = await instance.get("/api/cardboards");
  if (!response) {
    throw new Error("failed to create blog");
  }

  return response.data;
};

export const GetSingleBoard = async (id: string | number) => {
  const response = await instance.get(`/api/cardboards/${id}`);
  console.log("PRgia:", response.data);
  if (!response) {
    throw new Error("Failed to fetch the cardboards");
  }
  return response.data;
};

export const deleteBoard = async (Id: number) => {
  const response = await instance.delete(`/api/cardboards/${Id}`);

  if (!response) {
    throw new Error("Failed to delete blog");
  }

  return response.data;
};
