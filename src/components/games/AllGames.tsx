import { UseGetBoardPaginated } from "../../hooks/UseGetBoardPaginated";
import { useState } from "react";
import TableFooter from "../admin/TableFooter";
import GameCardSkeleton from "./skeleton/GameCardSkeleton";
import { useNavigate } from "@tanstack/react-router";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useGetMe } from "../../hooks/useGetMe";
import { ShoppingCart } from "lucide-react";

interface AllGamesProps {
  selectedCategories: string[];
  searchTerm: string;
}

export default function AllGames({
  selectedCategories,
  searchTerm,
}: AllGamesProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { data, isLoading, isError, error } = UseGetBoardPaginated(currentPage);
  const { data: user, isLoading: isUserLoading } = useGetMe();
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  if (isLoading || isUserLoading) return <GameCardSkeleton />;
  if (isError)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const items = data?.data || [];

  const filteredItems = items.filter(
    (item: { category: string; name: string; description: string }) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    }
  );

  const handleQuantityChange = (itemId: string, change: number) => {
    setQuantities((prev) => {
      const currentQuantity = prev[itemId] || 1;
      const newQuantity = Math.max(1, currentQuantity + change);
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item._id] || 1;
    addToCart({
      userId: user?.user?.id || "",
      productId: item._id,
      quantity,
    });
    setQuantities({});
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
        {filteredItems.map((item: any) => (
          <div key={item._id} className="group">
            <div className="bg-[#1f1f31] rounded-2xl backdrop-blur-sm border border-neutral-600 p-4 sm:p-5 hover:border-purple-400 hover:bg-[#383859] transition-all">
              <div
                className="aspect-square relative rounded-2xl overflow-hidden border-2 border-white/20 mb-3 sm:mb-4 cursor-pointer"
                onClick={() => navigate({ to: `/games/${item._id}` })}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:opacity-70 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-sm sm:text-lg">
                  View Card
                </div>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-200 mb-2 line-clamp-1">
                {item.name}
              </h4>
              <p className="text-xs sm:text-sm text-purple-300 mb-1">
                {item.category}
              </p>
              <div className="text-xs sm:text-sm text-gray-400 line-clamp-2 mb-3 sm:mb-4">
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg sm:text-xl font-bold text-gray-100">
                  ${item.price}
                </span>
                {user?.user && (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="flex items-center bg-gray-700 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="px-1.5 sm:px-2 py-1 text-white hover:bg-gray-600 rounded-l-md transition text-sm"
                        disabled={
                          quantities[item._id] === 1 || !quantities[item._id]
                        }
                      >
                        -
                      </button>
                      <span className="px-2 sm:px-3 py-1 text-white bg-gray-800 min-w-[30px] sm:min-w-[40px] text-center text-sm">
                        {quantities[item._id] || 1}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="px-1.5 sm:px-2 py-1 text-white hover:bg-gray-600 rounded-r-md transition text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={isAddingToCart}
                      className="bg-transparent hover:bg-purple-600 border border-purple-400 text-white px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition disabled:opacity-50"
                    >
                      {isAddingToCart ? (
                        <span className="hidden sm:inline">ADDING...</span>
                      ) : (
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {data && (
        <div className="p-4">
          <TableFooter
            currentPage={data.page}
            total={data.total}
            postsLength={filteredItems.length}
            limit={Math.ceil(data.total / data.totalPages)}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
