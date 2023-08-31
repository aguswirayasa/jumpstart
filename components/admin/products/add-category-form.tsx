"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "react-query";
import { UseFormReturn, useForm } from "react-hook-form";

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

const categorySchema = z.object({
  name: z.string().min(2, "Please enter category name"),
});
const AddCategoryForm = () => {
  const queryClient = useQueryClient();

  const form: UseFormReturn<Category> = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });
  const addCategoryMutation = useMutation(
    async (categoryData: Category) => {
      const response = await axios.post(
        "/api/admin/category/add-category",
        categoryData
      );
      if (response.status === 200) {
        toast.success("Category added successfully");
      } else {
        toast.error("Something went wrong, please try again");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("category");
        form.reset();
      },
    }
  );

  const onSubmit = async (data: Category) => {
    addCategoryMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start w-full"
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

        <Button
          type="submit"
          disabled={addCategoryMutation.isLoading}
          className="w-3/4 self-center mt-10"
        >
          {addCategoryMutation.isLoading
            ? "Saving category..."
            : "Save Category"}
        </Button>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
