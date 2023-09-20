"use client";

import { useState } from "react";
import * as z from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CalendarIcon, Truck } from "lucide-react";
import { useHydration } from "@/hooks/useHydration";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface SetDeliveryModalProps {
  orderId: string;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
  orderStatus: string;
}
type DeliveryRequest = {
  deliveryDate: string;
};

const deliverySchema = z.object({
  deliveryDate: z.date({
    required_error: "A delivery date is required.",
  }),
});

export const DeliveryModal: React.FC<SetDeliveryModalProps> = ({
  orderId,
  setIsLoading,
  isLoading,
  orderStatus,
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const isMounted = useHydration();
  const router = useRouter();
  const form: UseFormReturn<DeliveryRequest> = useForm({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      deliveryDate: "",
    },
  });

  const orderStatusMutation = useMutation(
    async (data: DeliveryRequest) => {
      setIsLoading(true);
      const response = await axios.post(`/api/order/${orderId}/update`, {
        status: "ON_DELIVERY",
        deliveryDate: data.deliveryDate,
      });
      if (response.status === 200) {
        toast.success("Status updated successfully");
      } else {
        toast.error("Something went wrong, please try again");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("update");
        setOpen(false);
        setIsLoading(false);
        router.refresh();
      },
    }
  );

  const onSubmit = async (data: DeliveryRequest) => {
    orderStatusMutation.mutate(data);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        className="w-full flex gap-3 bg-yellow-400 text-black hover:bg-yellow-600"
        onClick={() => setOpen(true)}
        disabled={orderStatus === "ON_DELIVERY"}
      >
        Delivery
        <Truck />
      </Button>
      <Modal
        title="Update profile"
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
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Expected Delivery Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP") // Ensure field.value is a Date
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value as unknown as Date}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    {form.formState.errors.deliveryDate ? (
                      <p className={cn("text-sm font-medium text-destructive")}>
                        A delivery date is required.
                      </p>
                    ) : (
                      ""
                    )}
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={orderStatusMutation.isLoading}
                className="w-3/4 self-center mt-10"
              >
                {orderStatusMutation.isLoading
                  ? "Changing status..."
                  : "Change Status"}
              </Button>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
};
