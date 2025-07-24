import { motion } from "framer-motion";

function PaginatedList({
  totalcount,
  limit,
  currentPage,
  onPageChange,
}: {
  totalcount: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalcount / limit);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={handlePrev}
        className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map((num) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded ${
            currentPage === num
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {num}
        </motion.button>
      ))}
      <button
        onClick={handleNext}
        className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default PaginatedList;
