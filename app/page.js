"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "@/components/UseTranslation";
import Footer from "@/components/Footer";
import { Provider, useDispatch } from "react-redux";
import { persistor, store } from "@/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { fetchAllData } from "@/redux/Thunk";
import Headeruser from "@/components/Headeruser.jsx";
import About from "@/components/Aboutuser";
import Skillsusers from "@/components/Skillsusers.jsx";
import Comment from "../components/Connectuser.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUp } from "lucide-react"; // برای آیکون برگشت بالا
import { Lora } from "next/font/google";
import { Vazirmatn } from "next/font/google";
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const vazir = Vazirmatn({
  subsets: ["latin", "arabic"], // فارسی و لاتین
  weight: ["300", "400", "500", "700"], // وزن‌های دلخواه
  display: "swap",
});
function InitDataLoader() {
  const dispatch = useDispatch();
  const alreadyFetched = sessionStorage.getItem("dataFetched");

  if (!alreadyFetched) {
    console.log("✅ fetching all data for the first time...");
    dispatch(fetchAllData());
    sessionStorage.setItem("dataFetched", "true");
  } else {
    console.log("🟡 data already fetched, skipping...");
  }

  return null;
}

export default function Page() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // وقتی اسکرول زیاد شد، دکمه رو نشون بده
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // برگشت نرم به بالا
  const scrollToTop = () => {
    const element = document.getElementById("Header");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { language } = useTranslation();

  return (
    <div
      className={`relative dark:bg-gray-800 min-h-screen ${
        language === "en" ? lora.className : vazir.className
      }`}
      id="Header"
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <InitDataLoader />

          <Headeruser />
          <About />
          <Skillsusers />
          <Comment />
          <Footer />
        </PersistGate>
      </Provider>

      {/* 🔹 دکمه برگشت به بالا */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 backdrop-blur-md"
          data-aos="zoom-in"
        >
          <ArrowUp className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}
