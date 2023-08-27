import AuthFooter from "@/components/ui/auth-footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid place-items-center h-screen">
      <nav className="flex justify-start w-full p-5">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="logo" width={200} height={200} />
        </Link>
      </nav>
      <main>{children}</main>
      <AuthFooter />
    </div>
  );
};

export default AccountLayout;
