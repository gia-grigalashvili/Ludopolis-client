import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { IoSearchSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete, MdOutlineSystemUpdateAlt } from "react-icons/md";
import type { ColumnDef } from "@tanstack/react-table";
import { UseGetBoard } from "../../hooks/UseGetBoard";
import toast from "react-hot-toast";

type Board = {
  _id: string;
  name: string;
  author: string;
  category: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
};

export default function AllBoard() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = UseGetBoard();

  const rawData = data?.data ?? [];

  const filteredData = useMemo(() => {
    if (!search.trim()) return rawData;
    return rawData.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [rawData, search]);

  const columns = useMemo<ColumnDef<Board>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Author",
        accessorKey: "author",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: (info) => `$${info.getValue()}`,
      },
      {
        header: "Created At",
        cell: (info) =>
          new Date(info.row.original.createdAt).toLocaleDateString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDelete = (board: Board) => {
    toast.error(`Deleted "${board.name}"`);
  };

  const handleUpdate = (board: Board) => {
    toast.success(`Updating "${board.name}"...`);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 py-6 border border-[#AD46FF] bg-[#1f1f2b] text-white shadow-2xl rounded-2xl"
    >
      <h2 className="text-2xl font-bold mb-6">All Boards</h2>

      <div className="relative w-full mb-6">
        <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="w-full bg-[#2c2c3a] text-white pl-10 pr-4 py-2 rounded-md border border-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD46FF] transition"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm text-left border-collapse bg-[#2a2a38]">
          <thead className="bg-[#34344a] text-gray-300 uppercase text-xs tracking-wider">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 border-b border-gray-700"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}

                <th className="px-4 py-3 text-center border-b border-gray-700 text-red-400">
                  Delete
                </th>
                <th className="px-4 py-3 text-center border-b border-gray-700 text-yellow-400">
                  Update
                </th>
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + 3} className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={columns.length + 3}
                  className="text-center text-red-500 p-6"
                >
                  Error loading boards.
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 3}
                  className="text-center p-6 text-gray-400"
                >
                  No boards found.
                </td>
              </tr>
            ) : (
              <AnimatePresence>
                {table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="hover:bg-[#34344a] transition"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 border-t border-gray-700 text-gray-100"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}

                    <td className="px-4 py-3 text-center border-t border-gray-700">
                      <button
                        onClick={() => handleDelete(row.original)}
                        className="p-2 rounded-full cursor-pointer bg-red-500/10 hover:bg-red-600/20 text-red-400 hover:text-red-500 transition"
                      >
                        <MdDelete size={18} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center border-t border-gray-700">
                      <button
                        onClick={() => handleUpdate(row.original)}
                        className="p-2 rounded-full cursor-pointer bg-yellow-500/10 hover:bg-yellow-600/20 text-yellow-400 hover:text-yellow-500 transition"
                      >
                        <MdOutlineSystemUpdateAlt size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
