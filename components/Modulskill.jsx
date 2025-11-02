import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import * as icons from "simple-icons";

export default function AddSkillModal({ isOpen, onClose, onSubmit }) {
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", icon: "", description: "" },
  });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const allIcons = Object.values(icons);

  const submitHandler = (data) => {
    setLoading(true);
    onSubmit(data);
    reset();
    setSelectedIcon(null);
    setSuggestions([]);
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
          Add New Skill
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Name */}
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

          {/* IconInput با Controller */}
          <Controller
            name="icon"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              const handleChange = (e) => {
                field.onChange(e); // فرم هم آپدیت میشه
                const value = e.target.value;
                if (!value.trim()) return setSuggestions([]);
                setSuggestions(
                  allIcons
                    .filter((icon) =>
                      icon.title.toLowerCase().includes(value.toLowerCase())
                    )
                    .slice(0, 10)
                );
              };

              const handleSelect = (icon) => {
                const entry = Object.entries(icons).find(
                  ([, v]) => v.slug === icon.slug
                );
                const exportName = entry ? entry[0] : icon.slug;
                field.onChange(exportName); // فرم بلافاصله آپدیت میشه
                setSelectedIcon(icon);
                setSuggestions([]);
              };

              return (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Icon
                  </label>
                  <input
                    {...field}
                    value={field.value}
                    onChange={handleChange}
                    placeholder="مثلاً: tailwindcss"
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
                  />

                  {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border rounded-lg mt-1 max-h-56 overflow-y-auto shadow-md">
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
                    <div className="flex flex-col items-center p-3 mt-3">
                      <div
                        dangerouslySetInnerHTML={{ __html: selectedIcon.svg }}
                        style={{
                          width: "50px",
                          height: "50px",
                          color: `#${selectedIcon.hex}`,
                          fill: `#${selectedIcon.hex}`,
                        }}
                      />
                      <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        {selectedIcon.title}
                      </span>
                    </div>
                  )}
                </div>
              );
            }}
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Description
            </label>
            <input
              {...register("description", { required: true })}
              placeholder="Building fast and responsive UI components"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Buttons */}
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
