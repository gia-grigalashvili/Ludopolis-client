import { useState } from "react";
import { UseGetCategories } from "@/hooks/UseGetCategories";
import { IoMdMenu, IoMdClose } from "react-icons/io";

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

  const filteredCategories = data?.filter((cat: any) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#1f2937]/80 p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#1f1f2b]/80 text-gray-200 p-6 backdrop-blur-lg border-r border-white/10 transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          Categories
        </h2>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search category..."
            className="w-full pl-10 pr-3 py-2 rounded-md bg-[#2d2d44] text-gray-200 placeholder-gray-400 border border-white/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2 overflow-y-auto max-h-[70vh] pr-1">
          {filteredCategories?.map((cat: any, index: number) => (
            <div
              key={cat.id || cat._id || cat.name || index}
              onClick={() => toggleCategory(cat.name)}
              className={`p-2 cursor-pointer rounded transition ${
                selectedCategories.includes(cat.name)
                  ? "bg-purple-700/20 text-purple-300"
                  : "hover:bg-white/10 text-gray-300"
              }`}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
