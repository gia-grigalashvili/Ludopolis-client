import { useState } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { useGetCart } from "../../hooks/useGetCart";
import { useUpdateCart } from "../../hooks/useUpdateCart";

export default function Checkout() {
  const { data: user } = useGetMe();
  const { data: cart, isLoading, error } = useGetCart(user?.user?.id);
  const { mutate: updateCart } = useUpdateCart();

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (isLoading)
    return <div className="text-white text-center mt-10">Loading...</div>;

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">Failed to load cart.</div>
    );

  if (!cart || !cart.items.length)
    return (
      <div className="max-w-4xl mx-auto p-6 text-white text-center mt-10">
        Your cart is empty.
      </div>
    );

  const calculateTotal = () =>
    cart.items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );

  const clearCart = () => {
    if (!user?.user?.id || !cart?.items) return;
    cart.items.forEach((item) => {
      updateCart({
        userId: user.user.id,
        productId: item.productId._id,
        quantity: 0,
      });
    });
  };

  const handlePayNow = () => {
    if (
      !cardNumber.match(/^\d{16}$/) ||
      cardName.trim() === "" ||
      !expiry.match(/^\d{2}\/\d{2}$/) ||
      !cvv.match(/^\d{3,4}$/)
    ) {
      alert("Please enter valid card details");
      return;
    }

    setIsPaying(true);

    setTimeout(() => {
      if (user?.user?.id) {
        clearCart();
      }
      setIsPaying(false);
      setPaymentSuccess(true);
      alert("Payment successful!");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white bg-gradient-to-br  from-black via-gray-900 to-gray-800 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-[#ffffff]">Checkout</h1>

      <div className="space-y-4 mb-8">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-default"
          >
            <img
              src={item.productId.image}
              alt={item.productId.name}
              className="w-20 h-20 rounded-lg object-cover border border-gray-600 shadow-md"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.productId.name}</h2>
              <p className="text-sm text-gray-400">
                ${item.productId.price} each
              </p>
              <p className="text-sm text-gray-300">Quantity: {item.quantity}</p>
            </div>
            <div className="font-bold text-white text-lg">
              ${(item.productId.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* ჯამი */}
      <div className="mb-8 border-t border-gray-700 pt-6 flex justify-between items-center text-xl">
        <span className="font-bold text-[#00f715]">Total:</span>
        <span className="font-bold text-[#00f715]">
          ${calculateTotal().toFixed(2)}
        </span>
      </div>

      {/* გადახდის დეტალები */}
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Payment Details
        </h2>

        <div>
          <label className="block text-gray-300 mb-1">Cardholder Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength={16}
            value={cardNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setCardNumber(val.slice(0, 16));
            }}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-300 mb-1">Expiry (MM/YY)</label>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={expiry}
              onChange={(e) => {
                let val = e.target.value;
                if (/^\d{2}$/.test(val)) val = val + "/";
                if (val.length > 5) val = val.slice(0, 5);
                setExpiry(val);
              }}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 tracking-wide focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-300 mb-1">CVV</label>
            <input
              type="password"
              placeholder="123"
              maxLength={4}
              value={cvv}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setCvv(val.slice(0, 4));
              }}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 tracking-wide focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>
      </div>

      <button
        disabled={isPaying || paymentSuccess}
        onClick={handlePayNow}
        className={`mt-6 w-full bg-purple-700 hover:bg-purple-800 text-white py-4 rounded-xl font-semibold transition-shadow shadow-md ${
          isPaying ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
      >
        {isPaying ? "Processing..." : paymentSuccess ? "Paid ✓" : "Pay Now"}
      </button>
    </div>
  );
}
