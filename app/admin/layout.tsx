import React from "react";

import AdminSideBar from "@/components/admin/navbar/admin-side-bar";
import "./style.css";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#f7f7f7] ">
      <AdminSideBar />
      <main className="m-14 w-full ">{children}</main>
    </div>
  );
};

export default AccountLayout;
