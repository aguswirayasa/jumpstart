"use client";
import React from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";

import { useHydration } from "@/hooks/useHydration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Navbar = () => {
  const isMounted = useHydration();
  const session = useSession();
  console.log(session);
  const user = session.data?.user;
  return (
    <>
      {isMounted && (
        <nav className="flex items-center  px-4 py-2 shadow-md">
          <div className="flex-shrink-0">
            <Image src="/logo.png" width={200} height={200} alt="Logo" />
          </div>

          <div className="flex flex-1 mx-4 relative">
            <Input
              className=" focus:outline-none w-full border-2 border-gray-300 text-base text-black font-medium  px-10 py-1 rounded-lg outline-none"
              placeholder="Search in Jumstart"
            />
            <div className="absolute top-0 left-0 p-3 text-gray-500">
              <BsSearch />
            </div>
          </div>
          {session.data ? (
            <>
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage
                    src={user?.image || "/default-avatar.jpg"}
                    about="avatar"
                  />

                  <AvatarFallback>{user?.email || ""}</AvatarFallback>
                </Avatar>
                <p className="font-medium">{user?.name || ""}</p>
              </div>
            </>
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
        </nav>
      )}
    </>
  );
};

export default Navbar;
