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
  const response = await instance.post("/api/blogs", {
    name,
    description,
    price,
    image,
    category,
    author,
  });

  if (!response) {
    throw new Error("Failed to create blog");
  }

  return response.data;
};
