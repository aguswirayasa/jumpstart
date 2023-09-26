"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "react-hot-toast";
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
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
    },
  });
  const { handleSubmit, control } = form;
  const { errors } = useFormState({ control });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/reset/password/${userId}`, {
        newPassword: values.newPassword,
      });
      if (response.status === 200) {
        router.push(`/sign-in?resetPasswordSuccess=true`);
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="New password"
                      {...field}
                    />
                  </FormControl>
                  <span
                    className="absolute top-0 right-0 p-2 cursor-pointer select-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <span
                    className="absolute top-0 right-0 p-2 cursor-pointer select-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <div className="text-red-500">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading || !!errors.confirmPassword} // Disable if loading or confirmPassword has an error
            className="bg-primary w-full rounded-full"
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewPasswordForm;
