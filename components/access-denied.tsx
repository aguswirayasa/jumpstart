"use client";

import Image from "next/image";
import React from "react";

import { Button } from "./ui/button";

const AccessDenied = () => {
  const goBack = () => {
    // Go back to the previous page in the browser's history
    window.history.back();
  };
  return (
    <div className="grid place-items-center ">
      <Image
        src={"/403.png"}
        alt="illustration"
        width={500}
        height={500}
        className="relative"
      />
      <div className="max-w-2xl text-center space-y-3">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-lg ">
          You are logged in, but you do not have the required access level to
          view this page.
        </p>
        <Button className="w-full" onClick={goBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default AccessDenied;
