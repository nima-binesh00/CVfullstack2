"use client";

import React from "react";
import * as simpleIcons from "simple-icons";
import LogoLoop from "./LogoLoop";
import { useTranslation } from "./UseTranslation";
import DataEN from "../app/locales/en.json";
import DataFA from "../app/locales/fa.json";
import { useSelector } from "react-redux";

export default function Skillsusers() {
  const { language } = useTranslation();
  const heahertext = useSelector((state) => {
    return language == "en"
      ? state.Data.SkillsIcon.en
      : state.Data.SkillsIcon.fn;
  });
  return (
    <section className="w-full dark:bg-gray-800">
      <span className="block text-center text-5xl mt-10 dark:text-sky-200 p-5">
        {language === "fa" ? "مهارت‌های من" : "My Skills"}
      </span>

      {/* لوگو لوپ */}
      <article className="w-full pt-3 container m-auto">
        <LogoLoop />
      </article>

      {/* لیست مهارت‌ها */}
      <section className="grid grid-cols-12 w-full justify-center py-5 gap-y-8 md:gap-10 container m-auto mt-6 pt-6">
        {heahertext.map((skill, key) => {
          const icon = simpleIcons[skill.icon];
          if (!icon) {
            console.warn(`❌ Icon not found for: ${skill.icon}`);
            return null;
          }

          return (
            <article
              key={key}
              className=" relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex flex-col items-center justify-center rounded-xl 
                            transition ease-linear transform hover:scale-105
                            shadow-md hover:shadow-sm
                            dark:shadow-blue-400 dark:hover:shadow-none` "
            >
              <div
                className={`flex flex-col items-center p-2`}
                style={{ color: `#${icon.hex}` }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                  style={{
                    width: "50px",
                    height: "50px",
                    fill: `#${icon.hex}`,
                  }}
                />

                <h3 className="mt-2 font-semibold text-center">
                  {language === "fa" ? skill.name : skill.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 text-center mt-1">
                  {language === "fa" ? skill.description : skill.description}
                </p>
              </div>
            </article>
          );
        })}
      </section>
    </section>
  );
}
