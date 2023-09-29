"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { GrCart } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useHydration } from "@/hooks/useHydration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ProfileNav from "./profile-nav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomIcon from "@/components/ui/icons";
import { useProfileStore } from "@/lib/store";
import { ChevronDown, LogIn, Menu, ShoppingBag, UserPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

interface NavbarProps {
  categories: { name: string }[];
  email: string;
}

const Navbar = ({ categories, email }: NavbarProps) => {
  const isMounted = useHydration();
  const [search, setSearch] = React.useState("");
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);
  const setAvatar = useProfileStore((state) => state.setAvatarUrl);
  const setName = useProfileStore((state) => state.setName);
  const [isLoading, setIsLoading] = useState(false);
  const { avatarUrl, name } = useProfileStore();
  useEffect(() => {
    console.log(email);
    getUserInfo(email || "");
  }, [avatarUrl, name]);
  const getUserInfo = async (email: string) => {
    setIsLoading(true);
    const response = await axios.get(`/api/user/${email}/get-avatar`);
    setAvatar(response?.data?.result?.avatar || "");
    setName(response?.data?.result?.name || "");
    setIsLoading(false);
  };
  const handleSearch = (search: string) => {
    router.push(`/search?keyword=${search}`);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSearch(search);
  };
  return (
    <>
      {isMounted && (
        <nav className="shadow-md">
          <div className="flex items-center  py-2  px-10 ">
            <Link href={"/"}>
              <CustomIcon
                icon={IoMdArrowRoundBack}
                className="md:hidden block"
              />
              <div className="flex-shrink-0 hidden md:block">
                <Image
                  src="/logo.png"
                  width={200}
                  height={200}
                  alt="Logo"
                  loading="eager"
                />
              </div>
            </Link>

            <form className="flex flex-1 mx-4 relative" onSubmit={handleSubmit}>
              <Input
                className=" focus:outline-none w-full border-2 border-gray-300 text-base text-black font-medium  px-10 py-1 rounded-lg outline-none"
                placeholder="Search in Jumstart"
                onChange={(e) => setSearch(e.target.value)}
                required={true}
              />
              <button
                className="absolute top-0 left-0 p-3 text-gray-500"
                type="submit"
              >
                <BsSearch />
              </button>
            </form>

            <Menu
              className={`block sm:hidden ${
                show ? "rotate-90" : ""
              } duration-200 ease-in-out transition-transform cursor-pointer`}
              onClick={() => setShow(!show)}
            />

            {user ? (
              <div className="flex space-x-10 justify-between items-center">
                <Link href={"/cart"} className="hidden sm:block">
                  <span className="text-2xl">
                    <GrCart />
                  </span>
                </Link>
                <div className="flex gap-3 items-center">
                  <ProfileNav
                    avatar={avatarUrl || user.image}
                    name={name || user.name}
                    email={user?.email || ""}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="hidden sm:flex">
                  <Button
                    className=" px-4 py-2 rounded-md text-primary  mx-2"
                    variant={"outline"}
                    onClick={() => signIn()}
                  >
                    Sign In
                  </Button>
                  <Link href={"/sign-up"}>
                    <Button className=" px-4 py-2 rounded-md mx-2">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="hidden sm:flex justify-center pb-3">
            <div className="flex items-center gap-3">
              {categories.slice(0, 5).map((category, index) => (
                <Link href={`/search?keyword=${category.name}`} key={index}>
                  <p className="text-gray-500 hover:text-primary font-medium text-xs md:text-base">
                    {category.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
      <div
        className={`w-full shadow-lg bg-white z-30 block sm:hidden ${
          show ? "max-h-[500px]" : "max-h-0"
        } transition-all duration-200 ease-in-out overflow-hidden`}
      >
        <Separator />
        <ul className="text-lg">
          {!user ? (
            <>
              <li
                className="flex gap-3 border-b border-gray-300 p-3 items-center hover:bg-black/10"
                onClick={() => {
                  signIn();
                  setShow(false);
                }}
              >
                <LogIn /> Sign In
              </li>

              <Link href={"/sign-up"} onClick={() => setShow(false)}>
                <li className="flex gap-3 border-b border-gray-300 p-3 items-center hover:bg-black/10">
                  <UserPlus /> Sign Up
                </li>
              </Link>
            </>
          ) : (
            <Link href={"/cart"} onClick={() => setShow(false)}>
              <li className="flex gap-4 border-b border-gray-300 p-3 items-center hover:bg-black/10">
                <GrCart /> Cart
              </li>
            </Link>
          )}

          <li className="gap-1 border-b border-gray-300">
            <span
              className="flex items-center justify-between p-3 cursor-pointer select-none hover:bg-black/10"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="flex gap-3 ">
                <ShoppingBag />
                Categories
              </span>{" "}
              <ChevronDown
                className={`${
                  showDropdown ? "rotate-180" : ""
                } duration-200 transition-transform ease-in-out`}
              />
            </span>
            <div className={`dropdown ${showDropdown ? "open" : ""}`}>
              {categories.slice(0, 5).map((category, index) => (
                <Link
                  href={`/search?keyword=${category.name}`}
                  key={index}
                  onClick={() => setShow(false)}
                >
                  <li className="flex gap-1 border-b border-gray-300 p-3 items-center hover:bg-black/10">
                    {category.name}
                  </li>
                </Link>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
