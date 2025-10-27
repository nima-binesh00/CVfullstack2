"use client";
import { useDispatch, useSelector } from "react-redux";
import { saveHeader } from "@/redux/Thunk"; // مسیر درست به فایل thunk

import Image from "next/image";
import React from "react";
import { useTranslation } from "./UseTranslation";
import { Changebody } from "@/redux/state";
import Link from "next/link";

export default function About() {
  const { language } = useTranslation(); // ← بدون "en" یا "fa"
  const dispatch = useDispatch();
  const header = useSelector((state) => state.Data);

  const heahertext = useSelector((state) => {
    // console.log(state);

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
          <span
            className="italic font-extrabold py-5 text-3xl"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={(e) =>
              dispatch(
                Changebody({
                  index: 0,
                  text: e.currentTarget.textContent,
                  language: language,
                })
              )
            }
          >
            {heahertext[0]}
          </span>
          <p
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={(e) =>
              dispatch(
                Changebody({
                  index: 1,
                  text: e.currentTarget.textContent,
                  language: language,
                })
              )
            }
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
            <button
              className="w-fit transition delay-150 duration-300 ease-in-out rounded-2xl p-2 bg-indigo-500 text-white"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                dispatch(
                  Changebody({
                    index: 2,
                    text: e.currentTarget.textContent,
                    language: language,
                  })
                )
              }
            >
              {heahertext[2]}
            </button>
            <button
              className="w-fit transition delay-150 duration-300 ease-in-out rounded-2xl p-2 bg-black text-white font-bold"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                dispatch(
                  Changebody({
                    index: 3,
                    text: e.currentTarget.textContent,
                    language: language,
                  })
                )
              }
            >
              {heahertext[3]}
            </button>
          </article>
        </article>
      </section>
      <button
        className="w-[100px] fixed top-40  z-50 transition delay-150 duration-300 ease-in-out rounded-md font-bold p-2 bg-green-800 text-white"
        onClick={() => dispatch(saveHeader(header))}
      >
        Apply
      </button>
      <Link href="/">
        <button className="w-[100px] fixed top-52  z-50 transition delay-150 duration-300 ease-in-out rounded-md font-bold p-2 bg-red-600 text-white">
          Exit
        </button>
      </Link>
    </section>
  );
}
