import { type Cart } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CartData({
  cart,
  handleQuantityChange,
  handleRemoveItem,
  isUpdating,
  isRemoving,
}: {
  cart: Cart;
  handleQuantityChange: (productId: string, newQuantity: number) => void;
  handleRemoveItem: (productId: string) => void;
  isUpdating: boolean;
  isRemoving: boolean;
}) {
  // Prevent event bubbling to parent elements
  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  return (
    <>
      {cart?.items && cart.items.length > 0 ? (
        <div className="p-4">
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex items-start space-x-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 hover:bg-gray-800/70 transition-colors"
                // Prevent the entire cart item from triggering parent events
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  to="/games/$id"
                  params={{ id: item.productId._id }}
                  className="flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-16 h-16 object-cover rounded-lg border-2 border-gray-600 hover:border-purple-500 transition-colors cursor-pointer"
                  />
                </Link>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <Link
                    to="/games/$id"
                    params={{ id: item.productId._id }}
                    className="block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h4 className="text-sm font-semibold text-white line-clamp-2 leading-tight hover:text-purple-300 transition-colors cursor-pointer">
                      {item.productId.name}
                    </h4>
                  </Link>
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
                            onClick={(e) =>
                              handleButtonClick(e, () =>
                                handleQuantityChange(
                                  item.productId._id,
                                  item.quantity - 1
                                )
                              )
                            }
                            className="p-1 text-white hover:bg-gray-600 rounded-l-md transition disabled:opacity-50"
                            disabled={item.quantity === 1 || isUpdating}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-1 text-white bg-gray-800 min-w-[30px] text-center text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={(e) =>
                              handleButtonClick(e, () =>
                                handleQuantityChange(
                                  item.productId._id,
                                  item.quantity + 1
                                )
                              )
                            }
                            className="p-1 text-white hover:bg-gray-600 rounded-r-md transition disabled:opacity-50"
                            disabled={isUpdating}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={(e) =>
                          handleButtonClick(e, () =>
                            handleRemoveItem(item.productId._id)
                          )
                        }
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
              Add some amazing games to get started!
              <br />
              Browse our collection and find your next favorite.
            </p>
          </div>
        </div>
      )}
    </>
  );
}