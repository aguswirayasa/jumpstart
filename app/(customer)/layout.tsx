import Navbar from "@/components/customer/navbar/navbar";
import React from "react";

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <Navbar />
      <main className=" w-full">{children}</main>
    </div>
  );
};

export default AccountLayout;
