import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
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

interface CartSheetProps {
  cart?: Cart;
}

export function CartSheet({ cart }: CartSheetProps) {
  const { data: user } = useGetMe();
  const { mutate: updateCart, isPending: isUpdating } = useUpdateCart();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  const calculateTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (total, item) => total + (item.productId.price * item.quantity),
      0
    );
  };

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
    <Sheet>
      <SheetTrigger asChild>
        <button className="cursor-target hover:text-purple-300 transition-colors relative">
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
          <SheetTitle className="text-white text-xl font-bold">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {cart?.items && cart.items.length > 0 ? (
            <div className="p-4">
              <div className="space-y-3">
                {cart.items.map((item) => (
                  <div key={item._id} className="flex items-start space-x-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 hover:bg-gray-800/70 transition-colors">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="w-16 h-16 object-cover rounded-lg border-2 border-gray-600 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <h4 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                        {item.productId.name}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-purple-300 font-medium">
                            ${item.productId.price} each
                          </p>
                          <p className="text-sm font-bold text-white">
                            ${(item.productId.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center bg-gray-700 rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                                className="p-1 text-white hover:bg-gray-600 rounded-l-md transition disabled:opacity-50"
                                disabled={item.quantity === 1 || isUpdating}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 py-1 text-white bg-gray-800 min-w-[30px] text-center text-xs">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                                className="p-1 text-white hover:bg-gray-600 rounded-r-md transition disabled:opacity-50"
                                disabled={isUpdating}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.productId._id)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition disabled:opacity-50"
                            disabled={isRemoving}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {cart.items.length > 5 && (
                <div className="text-center py-3">
                  <p className="text-xs text-gray-500">
                    {cart.items.length} items in cart
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-4xl border-2 border-gray-600">
                  🛒
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-3">
                  Your cart is empty
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Add some amazing games to get started!<br/>
                  Browse our collection and find your next favorite.
                </p>
              </div>
            </div>
          )}
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
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02]">
              Proceed to Checkout
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
