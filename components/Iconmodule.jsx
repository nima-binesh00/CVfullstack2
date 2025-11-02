import { useForm } from "react-hook-form";
import { useState } from "react";
import * as icons from "simple-icons";

export default function IconPickerModal({ isOpen, onClose, onSubmit }) {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [loading, setLoading] = useState(false);

  const iconValue = watch("icon") || "";
  const allIcons = Object.values(icons);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const value = e.target.value;
    setValue("icon", value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = allIcons
      .filter((icon) => icon.title.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 10);

    setSuggestions(filtered);
  };

  const handleSelect = (icon) => {
    const entry = Object.entries(icons).find(([, v]) => v.slug === icon.slug);
    const exportName = entry ? entry[0] : icon.slug;

    setValue("icon", exportName, { shouldValidate: true, shouldDirty: true });
    setSelectedIcon(icon);
    setSuggestions([]);
  };

  const handleFormSubmit = (data) => {
    setLoading(true);
    onSubmit(data);
    setTimeout(() => {
      setLoading(false);
      reset();
      setSelectedIcon(null);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          Select an Icon
        </h2>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4 relative"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Icon Name
            </label>
            <input
              {...register("icon", { required: true })}
              value={iconValue}
              onChange={handleChange}
              placeholder="مثلاً: github یا tailwindcss"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute z-20 w-full bg-white dark:bg-gray-800 border rounded-lg mt-1 max-h-56 overflow-y-auto shadow-md">
              {suggestions.map((icon) => (
                <li
                  key={icon.slug}
                  onClick={() => handleSelect(icon)}
                  className="flex items-center gap-3 p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700"
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: icon.svg }}
                    style={{
                      width: "24px",
                      height: "24px",
                      fill: `#${icon.hex}`,
                      color: `#${icon.hex}`,
                    }}
                  />
                  <span>{icon.title}</span>
                </li>
              ))}
            </ul>
          )}

          {selectedIcon && (
            <div className="flex flex-col items-center mt-4">
              <div
                dangerouslySetInnerHTML={{ __html: selectedIcon.svg }}
                style={{
                  width: "60px",
                  height: "60px",
                  fill: `#${selectedIcon.hex}`,
                  color: `#${selectedIcon.hex}`,
                }}
              />
              <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {selectedIcon.title}
              </span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                setSelectedIcon(null);
                onClose();
              }}
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
