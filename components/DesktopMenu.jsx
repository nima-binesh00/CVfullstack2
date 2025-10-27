"use client";
import { Cheange } from "@/redux/state";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
export default function DesktopMenu({ language }) {
  const pathname = usePathname();
  const heahertext = useSelector((state) => {
    return language == "en" ? state.Data.header.en : state.Data.header.fn;
  });
  const menuItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "contact", href: "/contact" },
  ];
  const dispatch = useDispatch();
  return (
    <article className="hidden md:flex md:justify-evenly md:flex-1">
      {menuItems.map((item, index) => (
        <Link
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(e) =>
            dispatch(
              Cheange({
                index: index + 1,
                text: e.currentTarget.textContent,
                language: language,
              })
            )
          }
          key={item.href}
          href="#Footer"
          scroll={false}
          onClick={(e) => {
            e.preventDefault(); // نذار Next.js بخواد مسیر عوض کنه
            const element = document.getElementById("Footer");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={`p-1 cursor-pointer transition-colors dark:text-white ${
            pathname === item.href
              ? "text-blue-700 font-semibold"
              : "text-gray-900 hover:text-blue-700"
          }`}
        >
          {heahertext[index + 1]}
        </Link>
      ))}
    </article>
  );
}
