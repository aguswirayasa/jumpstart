"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "react-query";
import { UseFormReturn, useForm } from "react-hook-form";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { IoClose } from "react-icons/io5";

import { Category } from "@/types";
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
import { toast } from "react-hot-toast";
import axios from "axios";
import { deleteImageFromCloudinary } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Banner = {
  banner: string;
};

const bannerSchema = z.object({
  banner: z.string().min(2, "Please select banner"),
});
const AddBannerForm = () => {
  const queryClient = useQueryClient();
  const [thumbnail, setThumbnail] = useState<string>("");
  const form: UseFormReturn<Banner> = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      banner: "",
    },
  });
  const addBannerMutation = useMutation(
    async (banner: Banner) => {
      const response = await axios.post("/api/admin/banner/add-banner", banner);
      if (response.status === 200) {
        toast.success("Banner added successfully");
      } else {
        toast.error("Something went wrong, please try again");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("banner");
        setThumbnail("");
        form.reset();
      },
    }
  );

  const onSubmit = async (data: Banner) => {
    addBannerMutation.mutate(data);
  };
  const addImage = (banner: string) => {
    form.setValue("banner", banner);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start w-96"
      >
        <div className="">
          <CldUploadWidget
            uploadPreset="jumpstart"
            onSuccess={(result: any) => {
              const { secure_url } = result.info;

              setThumbnail(secure_url);
              addImage(secure_url);
              form.clearErrors("banner");
            }}
          >
            {({ open }) => {
              function handleOnClick(e: React.FormEvent) {
                e.preventDefault();
                open();
              }
              return (
                <>
                  {!thumbnail && (
                    <Button className="button my-3" onClick={handleOnClick}>
                      Upload a Banner
                    </Button>
                  )}
                </>
              );
            }}
          </CldUploadWidget>

          <p className="text-sm font-medium ">Banner :</p>
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.banner?.message}
          </p>
          {thumbnail && (
            <div className="flex flex-wrap gap-3 my-3">
              <div className="relative">
                <CldImage
                  width="600"
                  height="300"
                  src={thumbnail}
                  className="rounded-lg object-center object-contain max-h-[300px]  select-none"
                  alt="Description of my image"
                />
                <span
                  className="bg-gray-600/40 rounded-full m-1 text-white absolute top-0 right-0 cursor-pointer"
                  onClick={() => {
                    deleteImageFromCloudinary(thumbnail);

                    form.setValue("banner", "");
                    setThumbnail("");
                  }}
                >
                  <IoClose />
                </span>
              </div>
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={addBannerMutation.isLoading}
          className="w-3/4 self-center mt-10"
        >
          {addBannerMutation.isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              <p>Saving banner...</p>
            </>
          ) : (
            "Save Banner"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddBannerForm;
