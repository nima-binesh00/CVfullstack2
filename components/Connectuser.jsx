"use client";

import * as simpleIcons from "simple-icons";
import React from "react";
import DataEN from "../app/locales/en.json";
import DataFA from "../app/locales/fa.json";
import { Linkedin } from "lucide-react";
import { useTranslation } from "./UseTranslation";
import { useSelector } from "react-redux";

export default function Connect() {
  const { language } = useTranslation();
  const heahertext = useSelector((state) => {
    return language == "en" ? state.Data.Connect.en : state.Data.Connect.fn;
  });
  const Data = useSelector((state) => {
    return language == "en"
      ? state.Data.Connect.Link.en
      : state.Data.Connect.Link.fn;
  });
  return (
    <section className="container mx-auto w-full mt-10">
      <section className="grid grid-cols-2 gap-2 p-0 lg:px-16">
        {/* متن اصلی */}
        <article
          className={`flex flex-col align-middle pt-10 p-2 lg:p-16 col-span-2 md:col-span-1 ${
            language === "fa" ? "text-right" : "text-left"
          }`}
        >
          <span className="text-5xl font-bold mb-4 text-cyan-400">
            {heahertext[0]}
          </span>
          <p className="mb-6 text-wrap text-black dark:text-sky-300">
            {heahertext[1]}
          </p>
          <button className="transition duration-300 ease-in-out rounded-2xl w-36 p-2 bg-black text-white font-bold hover:bg-gray-800 dark:hover:bg-teal-700 dark:text-white dark:bg-cyan-600">
            {heahertext[2]}
          </button>
        </article>

        {/* لیست آیکون‌ها */}
        <article
          className={`flex justify-start items-center flex-col col-span-2 md:col-span-1 ${
            language === "fa" ? "text-right" : "text-left"
          }`}
        >
          <article className="w-full sm:w-[400px] flex align-middle p-1 my-4 gap-1 sm:gap-x-5 shadow-md shadow-gray-400 rounded-md transition hover:-translate-y-1 hover:scale-110 delay-150 duration-300 ease-in-out dark:shadow-indigo-700 dark:text-teal-300">
            <Linkedin />
            <span className="align-bottom text-wrap sm:text-nowrap">
              {language === "fa" ? "لینک دین " : "LinkedIn"}
              <br />
              https://www.linkedin.com/in/yourprofile
            </span>
          </article>

          {Data.map((skill, key) => {
            const icon = simpleIcons[skill.icon];
            if (!icon) {
              console.warn(`❌ Icon not found for: ${skill.icon}`);
              return null;
            }

            return (
              <article
                key={key}
                className="w-full sm:w-[400px] flex align-middle p-1 my-4 gap-1 sm:gap-x-5 shadow-md shadow-gray-400 rounded-md transition hover:-translate-y-1 hover:scale-110 delay-150 duration-300 ease-in-out dark:shadow-indigo-700 dark:text-teal-300"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                  style={{
                    width: "50px",
                    height: "50px",
                    fill: `#${icon.hex}`,
                  }}
                />
                <span className="align-bottom text-wrap sm:text-nowrap">
                  {language === "fa" ? skill.name : skill.name}
                  <br />
                  {skill.link}
                </span>
              </article>
            );
          })}
        </article>
      </section>
    </section>
  );
}
