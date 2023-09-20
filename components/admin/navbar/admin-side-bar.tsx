"use client";

import * as React from "react";
import Link from "next/link";
import { FiShoppingCart, FiMail } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
import { PiHandbagBold } from "react-icons/pi";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { signOut } from "next-auth/react";

const navLinks = [
  {
    href: "/admin/dashboard",
    icon: <HiOutlineHome />,
    text: "Home",
  },
  {
    href: "/admin/products",
    icon: <BsBoxSeam />,
    text: "Products",
  },
  {
    href: "/admin/categories",
    icon: <PiHandbagBold />,
    text: "Categories",
  },
  {
    href: "/admin/orders",
    icon: <FiShoppingCart />,
    text: "Orders",
  },
  {
    href: "/admin/mails",
    icon: <FiMail />,
    text: "Mails",
  },
  {
    href: "/admin/banners",
    icon: <FaRegNewspaper />,
    text: "Banners",
  },
  // Add more navigation links as needed
];

export default function AdminSideBar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <div className="flex l">
      <div
        className={` ${
          open ? "w-16" : "w-60 "
        } flex flex-col  p-3 shadow-lg h-full duration-300 relative`}
      >
        <div className="space-y-1">
          <div
            className={`flex items-center ${
              open ? "justify-center" : "justify-between"
            }`}
          >
            <div
              className={`text-xl font-bold text-black ${
                open ? "hidden" : "block"
              }`}
            >
              <Image
                src={"/logo.png"}
                alt="Jumpstart"
                width={180}
                height={90}
              />
            </div>
            <button onClick={() => setOpen(!open)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-3 text-sm ">
              <TooltipProvider>
                {navLinks.map((link, index) => (
                  <Tooltip key={index}>
                    <li
                      className={`rounded-sm flex items-center ${
                        pathname.includes(link.href)
                          ? "bg-primary text-white"
                          : ""
                      }`}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center p-2 space-x-3 rounded-md"
                      >
                        <TooltipTrigger asChild>
                          <span className="text-[24px]">{link.icon}</span>
                        </TooltipTrigger>
                        {open && (
                          <TooltipContent side="right">
                            <TooltipArrow
                              className="fill-white drop-shadow-md"
                              width={10}
                              height={8}
                            />
                            <p>{link.text}</p>
                          </TooltipContent>
                        )}
                        {!open && <span>{link.text}</span>}
                      </Link>
                    </li>
                  </Tooltip>
                ))}
                <Tooltip>
                  <li className="rounded-sm flex items-center cursor-pointer select-none">
                    <span
                      className="flex items-center p-2 space-x-3 rounded-md"
                      onClick={() => signOut({ callbackUrl: "/sign-in" })}
                    >
                      <TooltipTrigger asChild>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                      </TooltipTrigger>
                      {open && (
                        <TooltipContent side="right">
                          <TooltipArrow
                            className="fill-white drop-shadow-md"
                            width={10}
                            height={8}
                          />
                          <p>Logout</p>
                        </TooltipContent>
                      )}
                      {!open && <span className="text-gray-700">Logout</span>}
                    </span>
                  </li>
                </Tooltip>
              </TooltipProvider>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
