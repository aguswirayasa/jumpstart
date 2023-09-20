"use client";

import { useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Loader2, PackageCheck } from "lucide-react";
import { useHydration } from "@/hooks/useHydration";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/lib/store";

interface SetOrderReceiveProps {
  orderId: string;
  message: string;
}

export const OrderReceive: React.FC<SetOrderReceiveProps> = ({
  orderId,

  message,
}) => {
  const queryClient = useQueryClient();
  const isMounted = useHydration();
  const router = useRouter();

  const orderStatusMutation = useMutation(
    async () => {
      const response = await axios.post(`/api/order/${orderId}/update`, {
        status: "COMPLETED",
      });
      if (response.status === 200) {
        toast.success(message);
      } else {
        toast.error("Something went wrong, please try again");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("update");

        router.refresh();
      },
    }
  );

  const onSubmit = async () => {
    orderStatusMutation.mutate();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        className="w-full flex gap-3 bg-yellow-400 text-black hover:bg-yellow-600"
        onClick={() => onSubmit()}
        disabled={orderStatusMutation.isLoading}
      >
        {orderStatusMutation.isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            <p>Completing order...</p>
          </>
        ) : (
          <>
            Order Recieved
            <PackageCheck />
          </>
        )}
      </Button>
    </>
  );
};
