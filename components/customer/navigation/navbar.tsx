"use client";

import React from "react";
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

interface NavbarProps {
  categories: { name: string }[];
}

const Navbar = ({ categories }: NavbarProps) => {
  const isMounted = useHydration();
  const [search, setSearch] = React.useState("");
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();
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
                <Image src="/logo.png" width={200} height={200} alt="Logo" />
              </div>
            </Link>

            <form className="flex flex-1 mx-4 relative" onSubmit={handleSubmit}>
              <Input
                className=" focus:outline-none w-full border-2 border-gray-300 text-base text-black font-medium  px-10 py-1 rounded-lg outline-none"
                placeholder="Search in Jumstart"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="absolute top-0 left-0 p-3 text-gray-500"
                type="submit"
              >
                <BsSearch />
              </button>
            </form>
            {user ? (
              <div className="flex space-x-10 justify-between items-center">
                <Link href={"/cart"}>
                  <span className="text-2xl">
                    <GrCart />
                  </span>
                </Link>
                <div className="flex gap-3 items-center">
                  <ProfileNav
                    avatar={user?.image || ""}
                    name={user?.name || ""}
                    email={user?.email || ""}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex">
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
          <div className="flex justify-center pb-3">
            <div className="flex items-center gap-3">
              {categories.slice(0, 5).map((category, index) => (
                <Link href={`/category/${category.name}`} key={index}>
                  <p className="text-gray-500 hover:text-primary font-medium text-xs md:text-base">
                    {category.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
