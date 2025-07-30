import { useState } from "react";
import { UseGetCategories } from "@/hooks/UseGetCategories";
import { IoMdClose } from "react-icons/io";
import { FiFilter, FiSearch } from "react-icons/fi";

interface FilterProps {
  onFilterChange: (selected: string[]) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
  const { data } = UseGetCategories();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (categoryName: string) => {
    const updated = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((c) => c !== categoryName)
      : [...selectedCategories, categoryName];

    setSelectedCategories(updated);
    onFilterChange(updated);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    onFilterChange([]);
  };

  const filteredCategories = data?.filter((cat: any) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Filter Toggle Button - Integrated with layout */}
      <div className="md:hidden bg-gradient-to-r from-gray-900 to-purple-900/50 p-4 border-b border-purple-500/20">
        <button
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <>
              <IoMdClose size={20} />
              <span className="text-sm font-medium">Close Filters</span>
            </>
          ) : (
            <>
              <FiFilter size={20} />
              <span className="text-sm font-medium">Show Filters</span>
              {selectedCategories.length > 0 && (
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {selectedCategories.length}
                </span>
              )}
            </>
          )}
        </button>
      </div>

    
      <aside
        className={`fixed top-0 left-0 bottom-0 w-80 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-gray-200 backdrop-blur-lg border-r border-purple-500/20 transition-transform duration-300 z-30 overflow-hidden flex flex-col shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:fixed md:z-20`}
        style={{ height: "100vh" }}
      >
    
        <div className="p-6 border-b border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FiFilter className="text-purple-400" size={24} />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Filters
              </span>
            </h2>
            <button
              className="md:hidden text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <IoMdClose size={24} />
            </button>
          </div>

          
          {selectedCategories.length > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
            >
              Clear all ({selectedCategories.length})
            </button>
          )}
        </div>

      
        <div className="p-6 pb-4">
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2d2d44]/50 text-gray-200 placeholder-gray-400 border border-purple-500/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

       
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-2">
            {filteredCategories?.map((cat: any, index: number) => (
              <div
                key={cat.id || cat._id || cat.name || index}
                onClick={() => toggleCategory(cat.name)}
                className={`p-3 cursor-pointer rounded-xl transition-all duration-200 border ${
                  selectedCategories.includes(cat.name)
                    ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-purple-400/50 text-white shadow-lg"
                    : "hover:bg-white/5 text-gray-300 border-transparent hover:border-purple-500/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{cat.name}</span>
                  {selectedCategories.includes(cat.name) && (
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredCategories?.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              <FiFilter size={48} className="mx-auto mb-4 opacity-50" />
              <p>No categories found</p>
            </div>
          )}
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
