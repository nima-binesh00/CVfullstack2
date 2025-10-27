"use client";

import * as simpleIcons from "simple-icons";
import React, { useState } from "react";
import DataEN from "../app/locales/en.json";
import DataFA from "../app/locales/fa.json";
import { Linkedin, ListFilterPlus, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "./UseTranslation";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeConnectdescription,
  ChangeConnectname,
  CheangeConnect,
  DeleteLink,
  newLink,
} from "@/redux/state";
import AddLinkModal from "./AddLinkModal";

export default function Connect() {
  const { language } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleNewLink = (data) => {
    // console.log("✅ New Link Added:", data);
    dispatch(newLink({ text: data, language: language }));
    // اینجا می‌تونی dispatch بزنی به ریداکس یا بفرستی به API
  };
  const heahertext = useSelector((state) => {
    console.log(state.Data.Connect);

    return language == "en" ? state.Data.Connect.en : state.Data.Connect.fn;
  });
  const Data = useSelector((state) => {
    return language == "en"
      ? state.Data.Connect.Link.en
      : state.Data.Connect.Link.fn;
  });
  console.log(Data);

  return (
    <section className="container mx-auto w-full mt-10">
      <section className="grid grid-cols-2 gap-2 p-0 lg:px-16">
        {/* متن اصلی */}
        <article
          className={`flex flex-col align-middle pt-10 p-2 lg:p-16 col-span-2 md:col-span-1 ${
            language === "fa" ? "text-right" : "text-left"
          }`}
        >
          <span
            className="text-5xl font-bold mb-4 text-cyan-400"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={(e) =>
              dispatch(
                CheangeConnect({
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
            className="mb-6 text-wrap text-black dark:text-sky-300"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={(e) =>
              dispatch(
                CheangeConnect({
                  index: 1,
                  text: e.currentTarget.textContent,
                  language: language,
                })
              )
            }
          >
            {heahertext[1]}
          </p>
          <button
            className="transition duration-300 ease-in-out rounded-2xl w-36 p-2 bg-black text-white font-bold hover:bg-gray-800 dark:hover:bg-teal-700 dark:text-white dark:bg-cyan-600"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={(e) =>
              dispatch(
                CheangeConnect({
                  index: 2,
                  text: e.currentTarget.textContent,
                  language: language,
                })
              )
            }
          >
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
            <Linkedin size={50} />
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
                className="relative w-full sm:w-[400px] flex align-middle p-1 my-4 gap-1 sm:gap-x-5 shadow-md shadow-gray-400 rounded-md transition hover:-translate-y-1 hover:scale-110 delay-150 duration-300 ease-in-out dark:shadow-indigo-700 dark:text-teal-300"
              >
                <span
                  className={`hover:text-red-600 absolute top-5 ${
                    language === "fa" ? "left-5" : "right-5"
                  }`}
                  onClick={() => {
                    dispatch(
                      DeleteLink({
                        index: key,
                        language: language,
                      })
                    );
                    return null;
                  }}
                >
                  <Trash2 />
                </span>
                <div
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                  style={{
                    width: "50px",
                    height: "50px",
                    fill: `#${icon.hex}`,
                  }}
                />
                <span className="align-bottom text-wrap sm:text-nowrap">
                  <span
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) =>
                      dispatch(
                        ChangeConnectname({
                          index: key,
                          text: e.currentTarget.textContent,
                          language: language,
                        })
                      )
                    }
                  >
                    {skill.name}
                  </span>
                  <br />
                  <span
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) =>
                      dispatch(
                        ChangeConnectdescription({
                          index: key,
                          text: e.currentTarget.textContent,
                          language: language,
                        })
                      )
                    }
                  >
                    {skill.link}
                  </span>
                </span>
              </article>
            );
          })}
          <article
            className=" h-max w-full sm:w-[400px] flex align-middle p-1 my-4 gap-1 sm:gap-x-5 shadow-md shadow-gray-400 rounded-md transition hover:-translate-y-1 hover:scale-110 delay-150 duration-300 ease-in-out dark:shadow-indigo-700 dark:text-teal-300"
            onClick={() => setIsModalOpen(true)}
          >
            <ListFilterPlus size={52} />
            <p>Add new list / CLICK</p>
          </article>
        </article>
      </section>
      <AddLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewLink}
      />
    </section>
  );
}
