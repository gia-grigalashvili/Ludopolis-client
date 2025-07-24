import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { UseCreateBoard } from "../../hooks/UseCreateBoard";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { UseGetCategories } from "../../hooks/UseGetCategories";
type FormValues = {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
};

export default function ProductForm() {
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { data: categories, isLoading: loadingCategories } = UseGetCategories();
  const { mutateAsync } = UseCreateBoard();

  const productForm = useForm<
    FormValues,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
    },
    onSubmit: async ({ value }) => {
      setSubmitAttempted(true);

      if (!value.name.trim()) return toast.error("Name is required");
      if (!value.description.trim())
        return toast.error("Description is required");
      if (!value.price.trim() || isNaN(Number(value.price)))
        return toast.error("Valid price is required");
      if (!value.image.trim()) return toast.error("Image is required");
      if (!value.category.trim()) return toast.error("Category is required");

      try {
        await mutateAsync({
          name: value.name,
          description: value.description,
          price: Number(value.price),
          image: value.image,
          category: value.category,
        });

        toast.success("Product created successfully!");
        productForm.reset();
        setImagePreview("");
        setSubmitAttempted(false);
      } catch (error) {
        toast.error("Failed to create product");
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        productForm.setFieldValue("image", base64);
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const showError = (field: keyof FormValues) => {
    const val = productForm.getFieldValue(field);
    return submitAttempted && (!val || !val.trim());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    productForm.handleSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-10 px-4 py-6 border border-[#AD46FF] rounded-2xl bg-[#1f1f2b] shadow-[0_10px_25px_-10px_rgba(173,70,255,0.5)] text-white"
    >
      <h2 className="text-2xl font-semibold mb-6">Create Product</h2>

      <productForm.Field name="name">
        {(field) => (
          <div className="mb-4">
            <label className="block mb-1">Name*</label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={`w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 focus:ring-2 focus:ring-orange-400/40 ${
                showError("name") ? "border-red-500" : ""
              }`}
              placeholder="Product name"
            />
            {showError("name") && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>
        )}
      </productForm.Field>

      <productForm.Field name="description">
        {(field) => (
          <div className="mb-4">
            <label className="block mb-1">Description*</label>
            <ReactQuill
              value={field.state.value || ""}
              onChange={(content) => {
                field.handleChange(content);
              }}
              className={`w-full rounded-md bg-white/5 backdrop-blur-sm border border-white/20 transition-all duration-200 focus-within:ring-2 focus-within:ring-orange-400/40 ${
                showError("description") ? "border-red-500" : ""
              }`}
              placeholder="Write your blog content..."
              theme="snow"
            />
            {showError("description") && (
              <p className="text-red-500 text-sm mt-1">
                Description is required
              </p>
            )}
          </div>
        )}
      </productForm.Field>

      <productForm.Field name="price">
        {(field) => (
          <div className="mb-4">
            <label className="block mb-1">Price*</label>
            <input
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={`w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 focus:ring-2 focus:ring-orange-400/40 ${
                showError("price") ? "border-red-500" : ""
              }`}
              placeholder="Product price"
            />
            {showError("price") && (
              <p className="text-red-500 text-sm mt-1">
                Valid price is required
              </p>
            )}
          </div>
        )}
      </productForm.Field>

      <productForm.Field name="category">
        {(field) => (
          <div className="mb-4">
            <label className="block mb-1">Category</label>

            {loadingCategories ? (
              <p className="text-sm text-gray-400">Loading</p>
            ) : (
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 focus:ring-2 focus:ring-orange-400/40 ${
                  showError("category") ? "border-red-500" : ""
                }`}
              >
                <option value="">Choose a category</option>
                {categories?.map((cat: { _id: string; name: string }) => (
                  <option
                    className="bg-[#1f1f2b]"
                    key={cat._id}
                    value={cat._id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            )}

            {showError("category") && (
              <p className="text-red-500 text-sm mt-1">Category is required</p>
            )}
          </div>
        )}
      </productForm.Field>

      <productForm.Field name="image">
        {(field) => (
          <div className="mb-4">
            <label className="block mb-1">Image URL or Upload*</label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => {
                field.handleChange(e.target.value);
                setImagePreview(e.target.value);
              }}
              className={`w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 focus:ring-2 focus:ring-orange-400/40 ${
                showError("image") ? "border-red-500" : ""
              }`}
              placeholder="https://example.com/image.jpg"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
            {showError("image") && (
              <p className="text-red-500 text-sm mt-1">Image is required</p>
            )}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-60 rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        )}
      </productForm.Field>

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-200"
      >
        Create Product
      </button>
    </form>
  );
}
