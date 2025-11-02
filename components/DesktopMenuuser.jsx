"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function DesktopMenu({ language }) {
  const pathname = usePathname();

  const menuItems = [
    { key: "home", href: "#Header" },
    { key: "about", href: "#about" },
    { key: "services", href: "#Skill" },
    { key: "contact", href: "#Footer" },
  ];

  const heahertext = useSelector((state) =>
    language === "en" ? state.Data.header.en : state.Data.header.fn
  );

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <article className="hidden md:flex md:justify-evenly md:flex-1">
      {menuItems.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          scroll={false}
          onClick={(e) => handleScroll(e, item.href)}
          data-aos="fade-down"
          data-aos-easing="ease-in-out"
          data-aos-delay={`${(index + 1) * 100}`}
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
