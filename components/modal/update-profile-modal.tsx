"use client";

import { useState } from "react";
import * as z from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CalendarIcon, Pencil } from "lucide-react";
import { useHydration } from "@/hooks/useHydration";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "react-query";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Profile } from "@/types";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/lib/store";

const profileSchema = z.object({
  firstName: z.string().min(2, "Please enter First Name"),
  lastName: z.string().min(2, "Please enter Last Name"),
  birthDay: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.string().min(2, "Please enter Gender"),
});

export const UpdateProfileModal: React.FC<Profile> = ({
  uid,
  firstName,
  lastName,
  birthDay,
  gender,
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const isMounted = useHydration();
  const router = useRouter();
  const setName = useProfileStore((state) => state.setName);
  const form: UseFormReturn<Profile> = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      birthDay: birthDay || "",
      gender: gender || "",
    },
  });

  const updateProfileMutation = useMutation(
    async (profile: Profile) => {
      const response = await axios.post("/api/user/update-profile", {
        profile,
        uid,
      });
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setName(profile.firstName + " " + profile.lastName);
      } else {
        toast.error("Something went wrong, please try again");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("update");
        setOpen(false);

        router.refresh();
      },
    }
  );

  const onSubmit = async (data: Profile) => {
    updateProfileMutation.mutate(data);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button className="w-full flex gap-3" onClick={() => setOpen(true)}>
        <Pencil />
        Edit Profile
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
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
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDay"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
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
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    {form.formState.errors.birthDay ? (
                      <p className={cn("text-sm font-medium text-destructive")}>
                        A date of birth is required.
                      </p>
                    ) : (
                      ""
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={gender || "Select Gender"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">MALE</SelectItem>
                        <SelectItem value="FEMALE">FEMALE</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={updateProfileMutation.isLoading}
                className="w-3/4 self-center mt-10"
              >
                {updateProfileMutation.isLoading
                  ? "Saving Profile..."
                  : "Save Profile"}
              </Button>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
};
