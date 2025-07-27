import { useState } from "react";
import { MdDelete, MdOutlineSystemUpdateAlt } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { UseDeleteBoard } from "../../hooks/UseDeleteBoard";
export default function SingleGame({
  Board,
  onUpdated,
}: {
  Board: any;
  onUpdated?: () => void;
}) {
  const [isModalDelete, setIsModalDelete] = useState(false);
  const navigate = useNavigate();

  const { mutate } = UseDeleteBoard();
  const handleDelete = () => {
    mutate(Board.data._id, {
      onSuccess: () => {
        setIsModalDelete(false);
        if (onUpdated) onUpdated();
      },
    });
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-[#1f1f2b] text-white rounded-xl shadow-lg relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            className="p-2 rounded-full bg-yellow-500/10 hover:bg-yellow-600/20 text-yellow-400 hover:text-yellow-500"
            onClick={(e) => {
              e.stopPropagation();
              navigate({
                to: `/admin/updateProduct/${Board.data._id}`,
              });
            }}
          >
            <MdOutlineSystemUpdateAlt size={20} />
          </button>
          <button
            onClick={() => setIsModalDelete(true)}
            className="p-2 rounded-full bg-red-500/10 hover:bg-red-600/20 text-red-400 hover:text-red-500"
          >
            <MdDelete size={20} />
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-4">{Board.data.name}</h1>

        <img
          src={Board.data.image}
          alt={Board.data.name}
          className="w-full max-h-96 object-cover rounded-lg mb-4"
        />
        <p
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: Board.data.description }}
        />
        <p className="italic text-gray-300 mb-2">
          კატეგორია: {Board.data.category}
        </p>
      </div>

      <AnimatePresence>
        {isModalDelete && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#25252586] bg-opacity-70 z-60 flex items-center justify-center"
          >
            <div className="bg-[#1f1f2b] text-white p-6 rounded-xl border border-[#AD46FF] shadow-2xl w-[90%] max-w-lg">
              <h3 className="text-xl font-bold mb-4">delete</h3>
              <p>
                Do you want to delete it <strong>"{Board.data.name}"</strong>?
              </p>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setIsModalDelete(false)}
                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
                >
                  Cancellation
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
