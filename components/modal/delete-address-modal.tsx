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
import { Loader2, Trash2 } from "lucide-react";

interface AddressModalProps {
  addressId: string;
}

export const DeleteAddressModal: React.FC<AddressModalProps> = ({
  addressId,
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const isMounted = useHydration();
  const router = useRouter();

  const addressMutation = useMutation(
    async () => {
      const response = await axios.delete(
        `/api/user/address/${addressId}/delete`
      );
      if (response.status === 200) {
        toast.success("Address deleted successfully");
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

  const onClick = async () => {
    addressMutation.mutate();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {addressMutation.isLoading && (
        <div className="loading-overlay">
          <div className="flex gap-3 text-white text-xl">
            <Loader2 className="animate-spin" />
            <p>Deleting address...</p>
          </div>
        </div>
      )}
      <div
        className="font-medium text-red-500 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Trash2 />
      </div>
      <Modal
        title={"Are you sure you want to delete this address?"}
        description="This action cannot be undone."
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button
            disabled={addressMutation.isLoading}
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={addressMutation.isLoading}
            variant="destructive"
            onClick={onClick}
          >
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};
