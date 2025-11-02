"use client";
import { TextAlignJustify, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import DarkModeToggle from "./DarkModeToggle";
import DesktopMenu from "./DesktopMenuuser";
import { useTranslation } from "./UseTranslation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Caveat } from "next/font/google";
const ctve = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
export default function Headeruser() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, language, changeLanguage } = useTranslation();

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const heahertext = useSelector((state) => {
    return language == "en" ? state.Data.header.en : state.Data.header.fn;
  });
  const languages = [
    { code: "fa", label: "فارسی", flag: "🇮🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ];

  // بستن منو وقتی بیرون کلیک شد
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed  w-full shadow-2xl drop-shadow-md shadow-slate-600 z-50 ">
      <section className="relative  dark:bg-slate-500 dark:text-white bg-slate-400 transition-all duration-300">
        <nav className="flex items-center justify-between p-5 relative z-50  container m-auto  ">
          {/* لوگو */}
          <span
            className={`text-3xl font-bold ${ctve.className}`}
            data-aos="fade-down"
            data-aos-easing="ease-in-out"
            data-aos-delay="100"
          >
            {heahertext[0]}
          </span>

          {/* منوی دسکتاپ */}
          <DesktopMenu language={language} />

          {/* بخش راست */}
          <div className="flex items-center gap-2">
            {/* انتخاب زبان */}
            <div
              className="relative"
              data-aos="fade-down"
              data-aos-easing="ease-in-out"
              data-aos-delay="600"
            >
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg"
              >
                {languages.find((l) => l.code === language)?.label}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {open && (
                <div className="absolute mt-2 w-32 border rounded-lg shadow-md bg-white dark:bg-slate-700 z-50 ">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        if (language !== l.code) changeLanguage(l.code);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-4 py-2 text-sm ${
                        language === l.code
                          ? "bg-gray-200 dark:bg-slate-600"
                          : "hover:bg-gray-100 dark:hover:bg-slate-600"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* دکمه دارک مد */}
            <span className="hidden sm:block">
              <DarkModeToggle />
            </span>

            {/* دکمه منوی موبایل */}
            <button
              data-aos="fade-down"
              data-aos-easing="ease-in-out"
              data-aos-delay="700"
              ref={buttonRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center p-2 w-10 h-10 text-gray-600 dark:text-amber-50 rounded-lg hover:bg-gray-100 transition"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <TextAlignJustify className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* منوی موبایل با انیمیشن باد */}
        <div
          ref={menuRef}
          className={`md:hidden absolute top-full left-0 w-full dark:bg-gray-500 dark:bg-opacity-65 bg-zinc-300 flex flex-col items-center py-4 gap-2 z-40 backdrop-blur-md  transform transition-all duration-500 ease-in-out origin-top  ${
            menuOpen
              ? "scale-y-100 "
              : "scale-y-0 opacity-0 pointer-events-none"
          }`}
        >
          {["home", "about", "services", "contact"].map((key) => (
            <Link
              key={key}
              href={`/${key}`}
              className="dark:text-white text-gray-900 p-2 cursor-pointer hover:bg-slate-700 rounded w-full text-center"
            >
              {t(key)}
            </Link>
          ))}

          <span className="dark:text-white text-gray-900 p-2 cursor-pointer sm:hidden hover:bg-slate-700 rounded">
            <DarkModeToggle />
          </span>
        </div>
      </section>
    </header>
  );
}
