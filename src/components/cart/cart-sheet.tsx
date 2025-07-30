import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Cart } from "@/types/cart";
import { useUpdateCart } from "@/hooks/useUpdateCart";
import { useRemoveFromCart } from "@/hooks/useRemoveFromCart";
import { useGetMe } from "@/hooks/useGetMe";
import { useNavigate } from "@tanstack/react-router";
import { CartData } from "./cart-data";

interface CartSheetProps {
  cart?: Cart;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onToggle?: () => void;
}

export function CartSheet({
  cart,
  isOpen,
  onOpenChange,
  onToggle,
}: CartSheetProps) {
  const { data: user } = useGetMe();
  const { mutate: updateCart, isPending: isUpdating } = useUpdateCart();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();

  const calculateTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (!user?.user?.id || newQuantity < 1) return;
    updateCart({
      userId: user.user.id,
      productId,
      quantity: newQuantity,
    });
  };

  const handleRemoveItem = (productId: string) => {
    if (!user?.user?.id) return;
    removeFromCart({
      userId: user.user.id,
      productId,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button
          onClick={onToggle}
          className="cursor-target hover:text-purple-300 transition-colors relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {cart?.items && cart.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cart.items.length}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="bg-[#1f1f31] border-purple-500/30 text-white flex flex-col h-full">
        <SheetHeader className="px-6 py-4 border-b border-gray-700">
          <SheetTitle className="text-white text-xl font-bold">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <CartData
            cart={cart || { items: [], total: 0 }}
            handleQuantityChange={handleQuantityChange}
            handleRemoveItem={handleRemoveItem}
            isUpdating={isUpdating}
            isRemoving={isRemoving}
          />
        </div>

        {cart?.items && cart.items.length > 0 && (
          <div className="border-t border-gray-700 bg-gray-800/30 p-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold text-gray-300">Subtotal:</span>
              <span className="font-bold text-white">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xl border-t border-gray-600 pt-3">
              <span className="font-bold text-white">Total:</span>
              <span className="font-bold text-purple-300 text-2xl">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => navigate({ to: "/checkout" })}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
