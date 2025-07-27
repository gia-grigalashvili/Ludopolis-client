export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  [x: string]: any;
  _id: string;
  userId: string;
  productId: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Cart {
  items: CartItem[];
  total?: number;
  userId?: string;
}

export interface CartResponse {
  data: Cart;
  message?: string;
  success?: boolean;
} 