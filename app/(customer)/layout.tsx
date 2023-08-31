import Navbar from "@/components/customer/navbar/navbar";
import AuthFooter from "@/components/ui/auth-footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <Navbar />
      <main className=" w-full">{children}</main>
    </div>
  );
};

export default AccountLayout;
