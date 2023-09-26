/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <>
      <div className="text-center  grid place-items-center place-content-center space-y-3">
        <Image src={"/404.svg"} alt="404" width={400} height={400} />
        <h2 className="font-black text-3xl text-primary">Not Found</h2>
        <p className="text-lg font-medium max-w-xl">
          It seems like you've taken a wrong turn. The page you're looking for
          isn't here. Don't worry, it happens to the best of us.
        </p>
        <p className="text-lg font-normal">
          Go back to{" "}
          <Link href={"/"} className="text-primary font-semibold">
            Homepage
          </Link>
        </p>
      </div>
    </>
  );
}
