import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddLinkModal({ isOpen, onClose, onSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const submitHandler = (data) => {
    setLoading(true);
    onSubmit(data); // دیتا رو بده بیرون
    reset();
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          Add New Link
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="e.g. GitHub"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Icon
            </label>
            <input
              {...register("icon", { required: true })}
              placeholder="The icons must be from **Simple Icons** only.
"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Link
            </label>
            <input
              {...register("link", { required: true })}
              placeholder="https://github.com/username"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
