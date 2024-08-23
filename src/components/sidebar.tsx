"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
import { LuMail } from "react-icons/lu";
import { IoIosContacts } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import React from "react";

export const Sidebar = () => {
  const pathname = usePathname();

  const menus = [
    {
      name: "Chat with Nezum",
      link: "/Nezum",
      icon: IoChatboxEllipsesOutline,
    },
    { name: "Campaign", link: "/Campaign", icon: CiLocationArrow1 },
    { name: "Mail", link: "/Mail", icon: LuMail },
    { name: "Leads", link: "/Leads", icon: IoIosContacts },
    { name: "Settings", link: "/Settings", icon: IoMdSettings },
  ];

  return (
    <div className="bg-white w-72 text-black font-semibold border-r-2 px-2 flex justify-between flex-col pb-2">
      <span className="flex justify-center items-center h-12 text-lg font-bold">
        SHODEN
      </span>
      <div className="mt-4 flex flex-col gap-4 relative p-1">
        {menus.map((menu, i) => (
          <Link
            href={menu.link}
            key={i}
            className={`flex items-center gap-3.5 p-2.5 rounded-lg ${
              pathname === menu.link ? "bg-purple-300" : ""
            }`}
          >
            <div>{React.createElement(menu.icon, { size: 26 })}</div>
            <h2 className="whitespace-pre">{menu.name}</h2>
          </Link>
        ))}
      </div>
      <div className="mt-auto p-4">
        <div className="flex justify-center items-center bg-purple-400 rounded-lg p-2.5">
          <h1>Profile</h1>
        </div>
      </div>
    </div>
  );
};
