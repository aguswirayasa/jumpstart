"use client";

import { Users } from "@/types";
import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

  if (session) {
    const user = session.user;

    return (
      <div className="bg-white shadow-md rounded-lg p-4 mx-auto max-w-xs">
        <img
          src={
            user.image
              ? user.image
              : "https://image.lexica.art/full_jpg/34e56304-34e0-44c6-8a56-4c1a83d0ef47"
          }
          alt="User"
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h1 className="text-xl font-semibold">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};
