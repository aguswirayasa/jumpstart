"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Toaster, toast } from "react-hot-toast";

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
import { redirect, useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter your email.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password",
  }),
});

const montserrat = Montserrat({ subsets: ["latin"] });
const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    // Show toast when verification is successful
    if (searchParams.get("verificationSuccess")) {
      toast.success(
        "Email verification successful, You now can login to your account"
      );
    }
  }, []);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      console.log(response);

      if (response?.error) {
        const errorMessage = response.error.toString();
        if (errorMessage.startsWith("INACTIVE_USER:")) {
          const userId = errorMessage.split(":")[1]; // Extract user ID from error message
          router.push(`/verify-email?id=${userId}`); // Redirect with user ID
        } else {
          toast.error("Invalid email or password. Please try again.");
        }
      } else {
        router.push("/");
      }
      // Handle successful sign-in
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <div className="space-y-3">
      <Toaster />
      <div className="text-center  grid place-items-center">
        <Link href={"/"}>
          <Image src={"/icon.png"} width={100} height={100} alt="Jumstart" />
        </Link>
        <h2 className="font-bold text-5xl">Welcome Back</h2>
        <p className="font-semibold text-xl">
          Sign in to Jumstart or{" "}
          <Link href={"/sign-up"} className="underline">
            create an account
          </Link>
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Input placeholder="Password" {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary w-full rounded-full"
          >
            Continue
          </Button>
        </form>
      </Form>
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-t border-gray-300" />
        <span className="text-gray-500">or</span>
        <hr className="flex-1 border-t border-gray-300" />
      </div>

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
  );
};

export default LoginForm;
