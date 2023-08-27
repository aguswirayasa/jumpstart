/* eslint-disable react/no-unescaped-entities */
"use client";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const VefifyPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const initialTimer = sessionStorage.getItem("timer") || 30;
  const [timer, setTimer] = useState(Number(initialTimer));

  const timeOutCallback = useCallback(() => {
    setTimer((currTimer) => currTimer - 1);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(timeOutCallback, 1000);
      sessionStorage.setItem("timer", timer.toString());
    } else {
      sessionStorage.removeItem("timer");
    }
  }, [timer, timeOutCallback]);

  const resendEmail = async () => {
    if (timer === 0) {
      setTimer(30);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("timer", "30");
      }

      const response = await axios.post(`/api/resend-email/${id}`);
      if (response.status === 200) {
        toast.success("Email verification sent successfully!");
      } else {
        toast.error("Something went wrong, please try again");
      }
    } else {
      toast.error("Please wait for the timer to finish before resending.");
    }
  };

  return (
    <div className="grid place-content-center ">
      <Toaster />
      <Image
        src={"/email-verify.png"}
        alt="illustration"
        width={500}
        height={500}
        className="relative"
      />
      <div className="max-w-2xl text-center space-y-3">
        <h1 className="text-3xl font-bold">Verify Your Email</h1>
        <p className="text-lg ">
          An email verification link has been sent to your inbox. Please check
          your email and click the link to activate your Jumpstart account.
          Thank you!
        </p>
        <span className="flex justify-center">
          {timer ? (
            <> Please wait {timer} seconds before resending an email</>
          ) : (
            <>
              <p>Didn't receive an email yet? </p>

              <p
                className="cursor-pointer text-primary hover:underline "
                onClick={() => resendEmail()}
              >
                Resend Email
              </p>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default VefifyPage;
