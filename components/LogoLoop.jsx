"use client";
import React, { useState, useEffect } from "react";
import * as simpleIcons from "simple-icons";
import Data from "../app/locales/en.json";
import { useSelector } from "react-redux";
import { useTranslation } from "./UseTranslation";

export default function LogoScrollLoop() {
  const { language } = useTranslation();
  const heahertext = useSelector((state) => {
    return language == "en"
      ? state.Data.SkillsIcon.en
      : state.Data.SkillsIcon.fn;
  });
  const skills = heahertext;
  const [scrollX, setScrollX] = useState(0);
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    const updateDir = () => {
      const currentDir = document?.dir;
      setIsRTL(currentDir === "rtl");
    };

    updateDir(); // بار اول چک کن

    const observer = new MutationObserver(updateDir);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollX(window.scrollY * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loopedSkills = [...skills, ...skills];

  return (
    <div className="overflow-hidden w-full ">
      <div
        className={`flex gap-10 whitespace-nowrap ${
          isRTL ? "flex-row-reverse" : "flex-row"
        }`}
        style={{
          transform: `translateX(-${scrollX % (skills.length * 90)}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        {loopedSkills.map((skill, i) => {
          const icon = simpleIcons[skill.icon];
          if (!icon) return null;

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center r"
              style={{ color: `#${icon.hex}`, minWidth: "80px" }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: icon.svg }}
                style={{ width: "30px", height: "30px", fill: `#${icon.hex}` }}
              />
              <p className="text-xs mt-1 text-center">{skill.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
