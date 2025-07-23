import instance from "../lib/axios";

export const createCategories = async ({ name }: { name: string }) => {
  const response = await instance.post("/api/categories", {
    name,
  });

  if (!response) {
    throw new Error("Failed to create Categories");
  }

  return response.data;
};
export const Getcategories = async () => {
  const response = await instance.get("/api/categories");
  if (!response) {
    throw new Error("failed to create categories");
  }

  return response.data;
};

export const deletecategories = async (Id: number) => {
  const response = await instance.delete(`/api/categories/${Id}`);

  if (!response) {
    throw new Error("Failed to delete categories");
  }

  return response.data;
};

export const updatecategories = async ({
  id,
  name,
}: {
  id: Number;
  name: string;
}) => {
  const response = await instance.put(`/api/categories/${id}`, {
    id,
    name,
  });

  if (!response) {
    throw new Error("Failed to update cardboards");
  }

  return response.data;
};
