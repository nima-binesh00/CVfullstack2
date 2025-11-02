"use client";

import React from "react";
import { useTranslation } from "./UseTranslation";

export default function Footer() {
  const { t, language } = useTranslation();

  return (
    <footer
      data-aos="zoom-in"
      data-aos-easing="ease-in-out"
      data-aos-delay="100"
      className="bg-white text-gray-800 py-10 dark:bg-gray-800 mt-100"
    >
      <div
        className={`container mx-auto text-center ${
          language === "fa" ? "rtl" : ""
        }`}
      >
        <h2 className="text-2xl font-bold text-purple-800 mb-2 p-3 z">Nima</h2>
        <p className="text-gray-600 mb-6">
          {language === "fa"
            ? "من عاشق خلق تجربه‌های دیجیتالی ساده، زیبا و کاربردی هستم. همیشه به دنبال ایده‌های تازه و الهام‌بخش برای دنیای آنلاینم."
            : "I love creating digital experiences that are simple, beautiful, and functional. Always seeking fresh and inspiring ideas for the online world."}
        </p>

        <nav className="mb-6">
          <ul
            className={`flex justify-center gap-6 text-gray-700 ${
              language === "fa" ? "flex-row-reverse" : ""
            }`}
          >
            <li>
              <a href="#about" className="hover:text-purple-800 transition">
                {language === "fa" ? "درباره من" : "About"}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-purple-800 transition">
                {language === "fa" ? "خدمات" : "Services"}
              </a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-purple-800 transition">
                {language === "fa" ? "نمونه‌کارها" : "Portfolio"}
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-purple-800 transition">
                {language === "fa" ? "تماس" : "Contact"}
              </a>
            </li>
          </ul>
        </nav>

        <p className="text-gray-500 text-sm">
          {language === "fa"
            ? "© ۲۰۲۵ نیما. تمامی حقوق محفوظ است."
            : "© 2025 Nima. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
