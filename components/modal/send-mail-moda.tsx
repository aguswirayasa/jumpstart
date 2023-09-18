"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "../ui/modal";
import { Rating } from "react-simple-star-rating";
import { Badge } from "../ui/badge";
import axios from "axios";
import { ReviewRequest, UserData } from "@/types";
import toast from "react-hot-toast";
import { Loader2, Send } from "lucide-react";
import * as z from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useUserDataStore } from "@/lib/store";

type Mail = {
  mailSubject: string;
  mailBody: string;
};

const mailSchema = z.object({
  mailSubject: z.string().min(1, "Please provide a subject"),
  mailBody: z.string().min(1, "Please provide a body"),
});
const SendMailModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userData } = useUserDataStore();
  const form: UseFormReturn<Mail> = useForm({
    resolver: zodResolver(mailSchema),
    defaultValues: {
      mailBody: "",
      mailSubject: "",
    },
  });

  const sendMailMutation = useMutation(
    async (review: Mail) => {
      const response = await axios.post("/api/admin/mails", {
        mailSubject: review.mailSubject,
        mailBody: review.mailBody,
        userData,
      });

      if (response.status === 200) {
        toast.success("Email sended successfully");
      } else {
        toast.error("Something went wrong, please try again");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("reviews");
        form.reset();
        setOpen(false);
        router.refresh();
      },
      onError: () => {
        toast.error("Something went wrong, please try again");
      },
    }
  );

  const onSubmit = async (data: Mail) => {
    sendMailMutation.mutate(data);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Send className="mr-2 h-4 w-4" /> Send Email
      </Button>

      <Modal
        title="Send Promotion Email"
        description="Fill all the fields to send a promotion email"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <div className="flex flex-col space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-start gap-3"
            >
              <FormField
                control={form.control}
                name="mailSubject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mail Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Mail Subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mailBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mail Body</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mail Body"
                        {...field}
                        className="col-span-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Sended To:</FormLabel>
                <ul className="p-3">
                  {userData.map((user) => (
                    <li key={user.id}>
                      <p className="text-sm">{user.email}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                type="submit"
                disabled={sendMailMutation.isLoading}
                className="w-3/4 self-center mt-10"
              >
                {sendMailMutation.isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <p>Sending email...</p>
                  </>
                ) : (
                  "Send email"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default SendMailModal;
