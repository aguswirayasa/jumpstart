"use client";
import React, { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "../../ui/button";

const ExpiredTokenPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Function to request a new activation link
  const requestNewLink = async () => {
    setLoading(true);
    const token = searchParams.get("token");
    try {
      const response = await axios.post(`/api/refresh-token/${token}`);
      console.log(response.data);
      if (response.status === 200) {
        router.push(`/verify-email?id=` + response.data.id);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Toaster />
      <Image
        src={"/expired-email.png"}
        alt="illustration"
        width={400}
        height={400}
        className="relative"
      />
      <h1 className="text-4xl font-bold mb-4">Expired Activation Link</h1>
      <p className="text-lg mb-6 max-w-xl text-center">
        The activation link you received has expired. You can request a new
        activation link by clicking the button below:
      </p>
      <Button onClick={() => requestNewLink()} disabled={loading}>
        {loading ? "Sending email..." : "Request New Activation Link"}
      </Button>
    </div>
  );
};

export default ExpiredTokenPage;
