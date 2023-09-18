"use client";

import { useState } from "react";
import * as z from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useHydration } from "@/hooks/useHydration";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { Input } from "../ui/input";
import { Address } from "@/types";
import { cn } from "@/lib/utils";

interface AddressModalProps {
  address?: Address;
  buttonText: string;
  buttonTextLoading: string;
  modalTitle: string;
  modalButton: React.ReactNode;
  className?: string;
  uid?: string;
}

const addressSchema = z.object({
  street: z.string().min(2, "Please provide street"),
  city: z.string().min(2, "Please provide city"),
  state: z.string().min(2, "Please provide state"),
  country: z.string().min(2, "Please provide country"),
  postalCode: z.string().min(2, "Please provide postalCode"),
});

export const AddressModal: React.FC<AddressModalProps> = ({
  address,
  buttonText,
  buttonTextLoading,
  modalTitle,
  modalButton,
  className,
  uid,
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const isMounted = useHydration();
  const router = useRouter();

  const form: UseFormReturn<Address> = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: address?.street || "",
      city: address?.city || "",
      country: address?.country || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
    },
  });

  const addressMutation = useMutation(
    async (addressData: Address) => {
      const response = await axios.post("/api/user/address", {
        addressData,
        id: address?.id || "",
        uid,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error("Something went wrong, please try again");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("address");
        setOpen(false);

        router.refresh();
      },
    }
  );

  const onSubmit = async (data: Address) => {
    addressMutation.mutate(data);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <span
        onClick={() => setOpen(true)}
        className={cn("cursor-pointer", className)}
      >
        {modalButton}
      </span>
      <Modal
        title={modalTitle}
        description="Please fill all the fields below"
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className=" space-x-2 flex flex-col justify-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-start gap-3"
            >
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={addressMutation.isLoading}
                className="w-3/4 self-center mt-10"
              >
                {addressMutation.isLoading ? buttonTextLoading : buttonText}
              </Button>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
};
