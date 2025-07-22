import { useForm } from "@tanstack/react-form";
import { toast } from "react-hot-toast";
import { UseUpdateBoard } from "../../hooks/UseUpdateBoard";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

interface UpdateProps {
  selectedBlog: any;
  setIsModalOpen: (open: boolean) => void;
}

type FormValues = {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
};

const cleanHtml = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export default function Update({ selectedBlog, setIsModalOpen }: UpdateProps) {
  const { mutate, isPending } = UseUpdateBoard();
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const blogData = selectedBlog?.data || {};

  const form = useForm({
    defaultValues: {
      name: blogData.name || "",
      description: blogData.description || "",
      price: blogData.price?.toString() || "",
      image: blogData.image || "",
      category: blogData.category || "",
    },
    onSubmit: async ({ value }) => {
      setSubmitAttempted(true);

      const plainText = cleanHtml(value.description);

      if (
        !value.name.trim() ||
        !plainText.trim() ||
        !value.image.trim() ||
        !value.category.trim() ||
        !value.price.trim()
      )
        return;

      const noChange =
        value.name === blogData.name &&
        value.description === blogData.description &&
        value.price === blogData.price?.toString() &&
        value.image === blogData.image &&
        value.category === blogData.category;

      if (noChange) {
        toast.error("No changes detected.");
        return;
      }

      mutate({
        id: blogData._id,
        name: value.name,
        description: plainText,
        price: Number(value.price),
        image: value.image,
        category: value.category,
        author: blogData.author,
      });

      setIsModalOpen(false);
      toast.success("Updated successfully!");
    },
  });

  const showError = <K extends keyof FormValues>(fieldName: K): boolean => {
    const value = form.getFieldValue(fieldName);
    return (
      submitAttempted &&
      (!value || (typeof value === "string" && !value.trim()))
    );
  };

  return (
    <div className="bg-[#1f1f2b] text-white p-6 rounded-xl border border-[#AD46FF] shadow-2xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Update Product</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field name="name">
          {(field) => (
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full bg-[#2b2b3c] text-white border px-4 py-2 rounded outline-none ${
                  showError("name") ? "border-red-500" : "border-gray-500"
                }`}
              />
              {showError("name") && (
                <p className="text-red-500 text-xs mt-1">Name is required</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <ReactQuill
                value={field.state.value}
                onChange={(val) => field.handleChange(val)}
                className=" bg-white/5 backdrop-blur-sm border border-white/20 rounded"
                theme="snow"
              />
              {showError("description") && (
                <p className="text-red-500 text-xs mt-1">
                  Description is required
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="price">
          {(field) => (
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full bg-[#2b2b3c] text-white border px-4 py-2 rounded outline-none ${
                  showError("price") ? "border-red-500" : "border-gray-500"
                }`}
              />
              {showError("price") && (
                <p className="text-red-500 text-xs mt-1">Price is required</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="image">
          {(field) => (
            <div>
              <label className="block mb-1 font-medium">Image URL</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full bg-[#2b2b3c] text-white border px-4 py-2 rounded outline-none ${
                  showError("image") ? "border-red-500" : "border-gray-500"
                }`}
              />
              {showError("image") && (
                <p className="text-red-500 text-xs mt-1">Image is required</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="category">
          {(field) => (
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full bg-[#2b2b3c] text-white border px-4 py-2 rounded outline-none ${
                  showError("category") ? "border-red-500" : "border-gray-500"
                }`}
              />
              {showError("category") && (
                <p className="text-red-500 text-xs mt-1">
                  Category is required
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-purple-600 rounded text-white hover:bg-purple-700"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
