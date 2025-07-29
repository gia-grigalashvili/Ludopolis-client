import { useState } from "react";
import { UseGetCategories } from "../../hooks/UseGetCategories";
import { UseCreateCategories } from "../../hooks/UseCreateCategories";
import { Usedeletecategories } from "../../hooks/Usedeletecategories";
import { useUpdateCategories } from "../../hooks/useUpdateCategories";
import { toast } from "react-hot-toast";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function Categories() {
  const { data, isLoading } = UseGetCategories();
  const createMutation = UseCreateCategories();
  const deleteMutation = Usedeletecategories();
  const updateMutation = useUpdateCategories();

  const [newCategory, setNewCategory] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleCreate = () => {
    if (!newCategory.trim()) return;
    createMutation.mutate({ name: newCategory });
    setNewCategory("");
  };

  const handleUpdate = (id: string) => {
    if (!editValue.trim()) return;
    updateMutation.mutate({ id: Number(id), name: editValue });
    setEditId(null);
    setEditValue("");
    toast.success("კატეგორია განახლდა");
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(Number(id));
    toast.success("წაიშალა წარმატებით");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-12 bg-[#1f1f2b] shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">
        Manage categories
      </h2>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          className="flex-1 border border-purple-300 bg-[#2b2b3a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Add New Categories"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          <PlusIcon className="w-5 h-5" />
          Add
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-400">Loading..</p>
      ) : (
        <ul className="space-y-4">
          {data?.map((cat: { _id: string; name: string }) => (
            <li
              key={cat._id}
              className="flex justify-between items-center border border-purple-300 bg-[#2a2a39] text-white rounded-lg p-4 hover:shadow-md transition"
            >
              {editId === cat._id ? (
                <input
                  type="text"
                  className="flex-1 bg-[#1f1f2b] border border-purple-500 text-white rounded-lg px-3 py-1 mr-3"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <span className="text-lg text-purple-200 font-medium">
                  {cat.name}
                </span>
              )}

              <div className="flex gap-2">
                {editId === cat._id ? (
                  <button
                    onClick={() => handleUpdate(cat._id)}
                    className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    შენახვა
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditId(cat._id);
                      setEditValue(cat.name);
                    }}
                    className="p-2 text-purple-400 hover:text-purple-300"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(cat._id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
