import AdminSideBar from "@/components/admin/navbar/admin-side-bar";
import Navbar from "@/components/customer/navigation/navbar";
import AuthFooter from "@/components/ui/auth-footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#f7f7f7] ">
      <AdminSideBar />
      <main className="m-14 w-full ">{children}</main>
    </div>
  );
};

export default AccountLayout;
