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
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { deleteImageFromCloudinary } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoryFormProps {
  category?: Category;
  message: string;
}

const categorySchema = z.object({
  name: z.string().min(2, "Please enter category name"),
  thumbnail: z.string().min(2, "Please enter category thumbnail"),
});
const AddCategoryForm = ({ category, message }: CategoryFormProps) => {
  const queryClient = useQueryClient();
  const [thumbnail, setThumbnail] = useState<string>(category?.thumbnail || "");
  const router = useRouter();
  const form: UseFormReturn<Category> = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      thumbnail: category?.thumbnail || "",
    },
  });
  const addCategoryMutation = useMutation(
    async (categoryData: Category) => {
      const response = await axios.post("/api/admin/category/add-category", {
        name: categoryData.name,
        thumbnail: categoryData.thumbnail,
        id: category?.id || "",
      });
      if (response.status === 200) {
        toast.success(message);
      } else {
        toast.error("Something went wrong, please try again");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("category");
        setThumbnail("");
        form.reset();
        router.push("/admin/categories");
      },
    }
  );

  const onSubmit = async (data: Category) => {
    addCategoryMutation.mutate(data);
  };
  const addImage = (thumbnail: string) => {
    form.setValue("thumbnail", thumbnail);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start w-96"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Category Name"
                  {...field}
                  className="col-span-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="">
          <CldUploadWidget
            uploadPreset="jumpstart"
            onSuccess={(result: any) => {
              const { secure_url } = result.info;

              setThumbnail(secure_url);
              addImage(secure_url);
              form.clearErrors("thumbnail");
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
                      Upload a Thumbnail
                    </Button>
                  )}
                </>
              );
            }}
          </CldUploadWidget>

          <p className="text-sm font-medium ">Thumbnail :</p>
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.thumbnail?.message}
          </p>
          {thumbnail && (
            <div className="flex flex-wrap gap-3 my-3">
              <div className="relative">
                <CldImage
                  width="300"
                  height="300"
                  src={thumbnail}
                  className="rounded-lg object-center aspect-video h-[300px]  select-none"
                  alt="Description of my image"
                />
                <span
                  className="bg-gray-600/40 rounded-full m-1 text-white absolute top-0 right-0 cursor-pointer"
                  onClick={() => {
                    deleteImageFromCloudinary(thumbnail);

                    form.setValue("thumbnail", "");
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
          disabled={addCategoryMutation.isLoading}
          className="w-3/4 self-center mt-10"
        >
          {addCategoryMutation.isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              <p>Saving category...</p>
            </>
          ) : (
            "Save Category"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
