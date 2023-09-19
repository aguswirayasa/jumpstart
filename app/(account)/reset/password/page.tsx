/* eslint-disable react/no-unescaped-entities */
import NewPasswordForm from "@/components/account/new-password-form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="grid place-items-center p-10 max-w-xl mx-auto">
      <div className="space-y-3">
        <div className="text-center  grid place-items-center max-w-md">
          <h2 className="font-bold text-5xl">New Password</h2>
          <p className="font-semibold text-xl">Enter your new password</p>
        </div>
        <div>
          <NewPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default page;
