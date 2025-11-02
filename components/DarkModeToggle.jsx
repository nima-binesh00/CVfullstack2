"use client";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // بارگذاری اولیه حالت دارک از localStorage یا سیستم
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (
      savedMode === "dark" ||
      (!savedMode && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <button
      data-aos="fade-down"
      data-aos-easing="ease-in-out"
      data-aos-delay="700"
      onClick={toggleDarkMode}
      className="flex items-center justify-center p-2 w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
    >
      {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
}
