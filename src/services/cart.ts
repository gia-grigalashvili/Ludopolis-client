import instance from "@/lib/axios";
import type { Cart, CartResponse } from "@/types/cart";

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<CartResponse> => {
  try {
    const response = await instance.post("/cart/add", {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCart = async (userId: string): Promise<Cart> => {
  try {
    const response = await instance.get(`/cart/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const removeFromCart = async (
  userId: string,
  productId: string
): Promise<CartResponse> => {
  try {
    const response = await instance.delete(`/cart/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateCartQuantity = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<CartResponse> => {
  try {
    const response = await instance.put(`/cart/update/${userId}`, {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
