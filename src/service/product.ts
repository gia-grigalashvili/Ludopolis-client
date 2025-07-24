import instance from "../lib/axios";

export const createBoard = async ({
  name,
  description,
  price,
  image,
  category,
}: {
  name: string;
  description: string;
  price: Number;
  image: string;
  category: string;
}) => {
  const response = await instance.post("/cardboards", {
    name,
    description,
    price,
    image,
    category,
  });

  if (!response) {
    throw new Error("Failed to create cardboards");
  }

  return response.data;
};

export const GetBoard = async () => {
  const response = await instance.get("/cardboards");
  if (!response) {
    throw new Error("failed to create blog");
  }

  return response.data;
};
export const getBoardPaginated = async (
  page: number = 1,
  limit: number = 10
) => {
  const response = await instance.get("/cardboards", {
    params: {
      page,
      limit,
    },
  });

  if (!response || !response.data) {
    throw new Error("Failed to fetch paginated blogs");
  }

  return response.data;
};
export const GetSingleBoard = async (id: string | number) => {
  const response = await instance.get(`/cardboards/${id}`);
  console.log("PRgia:", response.data);
  if (!response) {
    throw new Error("Failed to fetch the cardboards");
  }
  return response.data;
};

export const deleteBoard = async (Id: number) => {
  const response = await instance.delete(`/cardboards/${Id}`);

  if (!response) {
    throw new Error("Failed to delete blog");
  }

  return response.data;
};

export const updatecardboards = async ({
  id,
  name,
  description,
  price,
  image,
  category,
}: {
  id: Number;
  name: string;
  description: string;
  price: Number;
  image: string;
  category: string;
}) => {
  const response = await instance.put(`/cardboards/${id}`, {
    id,
    name,
    description,
    price,
    image,
    category,
  });

  if (!response) {
    throw new Error("Failed to update cardboards");
  }

  return response.data;
};
