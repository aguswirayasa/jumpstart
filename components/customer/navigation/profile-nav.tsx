"use client";

import React, { useState } from "react";
import { BsCartCheckFill, BsFillGearFill } from "react-icons/bs";
import { BiSolidBookmarkHeart } from "react-icons/bi";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
interface ProfileNavProps {
  name: string;
  avatar: string;
  email: string;
  isLoading: boolean;
}

const ProfileNav = ({ name, avatar, email, isLoading }: ProfileNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <HoverCard open={open}>
      <HoverCardTrigger
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {isLoading ? (
          <div className="w-[40px] h-[40px] bg-gray-300 animate-pulse rounded-full"></div>
        ) : (
          <Avatar>
            <AvatarImage src={avatar || "/default-avatar.jpg"} about="avatar" />
          </Avatar>
        )}
      </HoverCardTrigger>
      <HoverCardContent className="w-fit me-10 ">
        <div className="p-3">
          <div className="flex items-center gap-3  ">
            <Avatar>
              <AvatarImage
                src={avatar || "/default-avatar.jpg"}
                about="avatar"
              />
            </Avatar>
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-sm">{email}</p>
            </div>
          </div>
          <ul className="mt-5">
            <Link href={"/user/wishlist"} onClick={() => setOpen(false)}>
              <li className="flex text-gray-700 gap-2 items-center border-t-2 border-gray-100 p-1 cursor-pointer select-none">
                <BiSolidBookmarkHeart />
                <p className="text-black ">Wishlist</p>
              </li>
            </Link>
            <Link href={"/user/orders-history"} onClick={() => setOpen(false)}>
              <li className="flex text-gray-700 gap-2 items-center border-t-2 border-gray-100 p-1 cursor-pointer select-none">
                <BsCartCheckFill />
                <p className="text-black ">Orders </p>
              </li>
            </Link>
            <Link href={"/user/setting"} onClick={() => setOpen(false)}>
              <li className="flex text-gray-700 gap-2 items-center border-t-2 border-gray-100 p-1 cursor-pointer select-none">
                <BsFillGearFill />
                <p className="text-black ">Setting</p>
              </li>
            </Link>
            <li className="grid  gap-2 items-center border-t-2 border-gray-100 p-3">
              <Button
                variant={"destructive"}
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
              >
                Log Out
              </Button>
            </li>
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileNav;
