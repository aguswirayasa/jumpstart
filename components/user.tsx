"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

  if (session) {
    const user = session.user;

    return (
      <div className="bg-white shadow-md rounded-lg p-4 mx-auto max-w-xs">
        <img
          src={user.image}
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
