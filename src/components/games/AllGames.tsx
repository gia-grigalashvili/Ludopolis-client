import { UseGetBoardPaginated } from "../../hooks/UseGetBoardPaginated";
import { useState } from "react";
import TableFooter from "../admin/TableFooter";
import GameCardSkeleton from "./skeleton/GameCardSkeleton";
import { useNavigate } from "@tanstack/react-router";


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
  const { data, isLoading, isError, error } = UseGetBoardPaginated(currentPage);

  if (isLoading) return <GameCardSkeleton />;
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

  return (
    <div>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="group">
            <div className="bg-[#1f1f31] rounded-2xl backdrop-blur-sm border border-neutral-600 p-5 hover:border-purple-400 hover:bg-[#383859]  transition-all">
              <div
                className="aspect-square relative rounded-2xl overflow-hidden border-2 border-white/20 mb-4 cursor-pointer"
                onClick={() => navigate({ to: `/games/${item._id}` })}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:opacity-70 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg">
                  View Card
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-200 mb-2 line-clamp-1">
                {item.name}
              </h4>
              <p className="text-sm text-purple-300 mb-1">{item.category}</p>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gray-100 text-xl font-bold">
                  ${item.price}
                </span>
                <button className="  bg-transparent hover:bg-purple-600 border-1 text-white px-4 py-2 rounded-md text-sm font-semibold transition">
                  ADD TO CART
                </button>
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
