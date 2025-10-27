"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "./UseTranslation";
import { useSelector } from "react-redux";

export default function About() {
  const { t, language } = useTranslation(); // ← بدون "en" یا "fa"
  const heahertext = useSelector((state) => {
    return language == "en" ? state.Data.about.en : state.Data.about.fn;
  });
  return (
    <section className="pt-20 w-full bg-zinc-300  dark:bg-slate-400">
      <section className="w-full grid md:grid-cols-2 grid-flow-row py-5 p-1 justify-items-center gap-3 container m-auto grid-cols-1  grid-rows-2 md:grid-rows-1">
        <article className=" row-span-1 flex align-middle">
          <Image
            src="/Profile.webp"
            alt="Profile image"
            width={400}
            height={400}
            className="object-cover"
            priority
          />
        </article>
        <article className="flex flex-col row-span-1 px-2 md:px-0">
          <span className="italic font-extrabold py-5 text-3xl">
            {heahertext[0]}
          </span>
          <p
            dir={language === "fa" ? "rtl" : "ltr"}
            className={
              language === "fa"
                ? "text-right text-base lg:text-2xl"
                : "text-left text-base lg:text-2xl"
            }
          >
            {heahertext[1]}
          </p>
          <article className="flex mt-5 gap-4 justify-end">
            <button className="w-fit transition delay-150 duration-300 ease-in-out rounded-2xl p-2 bg-indigo-500 text-white">
              {heahertext[2]}
            </button>
            <button className="w-fit transition delay-150 duration-300 ease-in-out rounded-2xl w-36 p-2 bg-black text-white font-bold">
              {heahertext[3]}
            </button>
          </article>
        </article>
      </section>
    </section>
  );
}
