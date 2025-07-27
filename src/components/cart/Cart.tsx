import { useGetCart } from "../../hooks/useGetCart";
import { useUpdateCart } from "../../hooks/useUpdateCart";
import { useRemoveFromCart } from "../../hooks/useRemoveFromCart";
import { useGetMe } from "../../hooks/useGetMe";
import { Minus, Plus, Trash2 } from "lucide-react";

export function Cart() {
  const { data: user } = useGetMe();
  const userId = user?.user?.id;
  const { data: cartData, isLoading } = useGetCart(userId);
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: removeFromCart } = useRemoveFromCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCart({ userId: userId!, productId, quantity: newQuantity });
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart({ userId: userId!, productId });
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const cartItems = cartData?.items || [];
  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-400 mb-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
            🛒
          </div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Your cart is empty
          </h3>
          <p className="text-sm text-gray-500">
            Add some games to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {cartItems.map((item: any) => (
            <div
              key={item.product._id}
              className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate">
                  {item.product.name}
                </h4>
                <p className="text-xs text-gray-400">{item.product.category}</p>
                <p className="text-sm font-bold text-purple-300">
                  ${item.product.price}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-gray-700 rounded">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product._id, item.quantity - 1)
                    }
                    className="p-1 text-white hover:bg-gray-600 rounded-l"
                    disabled={item.quantity === 1}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-2 py-1 text-white bg-gray-800 min-w-[30px] text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product._id, item.quantity + 1)
                    }
                    className="p-1 text-white hover:bg-gray-600 rounded-r"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.product._id)}
                  className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Cart Footer */}
      <div className="border-t border-gray-700 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Total:</span>
          <span className="text-xl font-bold text-purple-300">
            ${total.toFixed(2)}
          </span>
        </div>
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
} 