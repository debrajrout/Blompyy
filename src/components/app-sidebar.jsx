"use client";
import Link from "next/link";
import React from "react";
import { ImProfile } from "react-icons/im";
import { IoIosSettings, IoMdAnalytics } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { Separator } from "./ui/separator";
import Logout from "./logout";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const router = usePathname();

  return (
    <nav className="mt-16 flex h-full flex-wrap   gap-6 px-6  ">
      <Link
        href="/account"
        className={
          "flex  items-center  justify-end gap-3 py-2 " +
          (router === "/account" ? "font-bold text-blue-500" : "")
        }
      >
        <ImProfile className="h-5 w-5" />
        <span>My page</span>
      </Link>
      <Link
        href="/analytics"
        className={
          "flex  items-center  justify-end gap-3 py-2 " +
          (router === "/analytics" ? "font-bold text-blue-500" : "")
        }
      >
        <IoMdAnalytics className="h-5 w-5" />
        <span>Analytics</span>
      </Link>
      <Link
        href="/settings"
        className={
          "flex  items-center  justify-end gap-3 py-2 " +
          (router === "/settings" ? "font-bold text-blue-500" : "")
        }
      >
        <IoIosSettings className=" h-5 w-5" />
        <span>Settings</span>
      </Link>

      <Link href="/" className="flex  items-center justify-end gap-3 py-2 ">
        <span className="flex flex-row items-center gap-2  ">
          <MdOutlineKeyboardDoubleArrowLeft className="h-6 w-6" />
          <span className="text-sm">Back Home</span>
        </span>
      </Link>
      <Separator className="bg-gray-600" />
      <Logout className=" h-7 w-28 bg-transparent text-black outline outline-1 outline-offset-2" />
    </nav>
  );
}
