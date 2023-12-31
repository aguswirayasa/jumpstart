"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Montserrat } from "next/font/google";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter your email.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password",
  }),
  firstName: z.string().min(1, {
    message: "Please enter your first name",
  }),
  lastName: z.string().min(1, {
    message: "Please enter your last name",
  }),
});
const montserrat = Montserrat({ subsets: ["latin"] });
const RegistrationForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });
  const queryClient = useQueryClient();

  const signupMutation = useMutation(
    async (formData: z.infer<typeof formSchema>) => {
      try {
        const response = await axios.post("/api/sign-up", formData);

        console.log(response);
        console.log(response.status);
        if (response.data.id) {
          router.push(`/verify-email?id=${response.data.id}`);
          toast.success("Registration email has been to your email address");
        }
      } catch (error: any) {
        if (error?.response?.status === 400) {
          toast.error("Email has been used");
        } else {
          toast.error("Something went wrong,please try again");
        }
      }
    },

    {
      onSuccess: () => {
        // Invalidate and refetch data after successful mutation if needed
        queryClient.invalidateQueries("userData");
      },
    }
  );
  function onSubmit(values: z.infer<typeof formSchema>) {
    signupMutation.mutate(values);
  }
  return (
    <div className="space-y-3 ">
      <div className="text-center mb-10 grid place-items-center">
        {successMessage && (
          <div className="text-success text-green-500">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-error text-red-500">{errorMessage}</div>
        )}
        <Link href={"/"}>
          <Image src={"/icon.png"} width={100} height={100} alt="Jumstart" />
        </Link>
        <h2 className="font-bold text-3xl md:text-5xl">Create an account</h2>
        <p className="font-semibold text-base md:text-xl max-w-xl">
          Join us for exclusive deals and personalized shopping experiences.
        </p>
      </div>
      <div className="grid grid-cols-12 p-5">
        <div className="col-span-12 md:col-span-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          {...field}
                          className="col-span-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last Name"
                          {...field}
                          className="col-span-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} className="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        className=""
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={signupMutation.isLoading} // Disable the button when loading
                className="bg-primary w-full rounded-full"
              >
                {signupMutation.isLoading ? "Loading..." : "Continue"}
              </Button>
              <span className="flex justify-center items-center gap-1">
                <p className="font-normal text-sm md:text-base">
                  Already have an account?
                </p>
                <p
                  onClick={() => signIn()}
                  className="cursor-pointer hover:text-primary font-normal text-sm md:text-base"
                >
                  Sign in
                </p>
              </span>
            </form>
          </Form>
        </div>
        <div className="flex flex-col items-center gap-4 col-span-12 md:col-span-2">
          <hr className="flex-1 border-e border-gray-300" />
          <span className="text-gray-500">or</span>
          <hr className="flex-1 border-e border-gray-300" />
        </div>
        <div className="col-span-12 md:col-span-5 grid place-items-center">
          <GoogleLoginButton
            onClick={() =>
              signIn("google", {
                redirect: true,
                callbackUrl: "/",
              })
            }
            style={{ borderRadius: "9999px" }}
            align="center"
            text="Continue with Google"
            className={`${montserrat.className} font-medium`}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
