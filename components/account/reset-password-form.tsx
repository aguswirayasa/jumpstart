/* eslint-disable react/no-unescaped-entities */
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
import { signIn, useSession } from "next-auth/react";
import { Montserrat } from "next/font/google";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter your email.",
  }),
});

const ResetPasswordForm = () => {
  const auth = useSession();
  const user = auth.data?.user;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/reset", { email: values.email });
      if (response.status === 200) {
        router.push(`/verify-email?id=${response.data.id}&reset=true`);
      }
    } catch (error) {
      toast.error("Invalid email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-3">
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

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary w-full rounded-full"
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
