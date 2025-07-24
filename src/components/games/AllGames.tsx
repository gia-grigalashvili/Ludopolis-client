// AllGames.tsx
import { UseGetBoardPaginated } from "../../hooks/UseGetBoardPaginated";
import { useState } from "react";

interface AllGamesProps {
  selectedCategories: string[];
}

export default function AllGames({ selectedCategories }: AllGamesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = UseGetBoardPaginated(currentPage);

  if (isLoading) return <p className="text-center text-white">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const items = data?.data || [];

  const filteredItems =
    selectedCategories.length === 0
      ? items
      : items.filter((item) => selectedCategories.includes(item.category));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredItems.map((item) => (
        <div key={item.id} className="group">
          <div className="bg-[#1f1f2b]/70 rounded-2xl backdrop-blur-sm border border-purple-500/50 p-5 hover:border-purple-400 hover:bg-black/60 transition-all">
            <div className="aspect-square relative rounded-2xl overflow-hidden border-2 border-white/20 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:opacity-70 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg">
                View Card
              </div>
            </div>
            <h4 className="text-xl font-bold text-purple-100 mb-2 line-clamp-1">
              {item.name}
            </h4>
            <p className="text-sm text-purple-300 mb-1">{item.category}</p>
            <p className="text-sm text-purple-200 line-clamp-2 mb-4">
              {item.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-white text-xl font-bold">
                ${item.price}
              </span>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
