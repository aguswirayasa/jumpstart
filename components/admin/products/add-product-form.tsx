"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "react-query";
import { UseFormReturn, useForm } from "react-hook-form";
import axios from "axios";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { IoClose } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { AiFillPlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { Categories, Image, Product, Specification, Variant } from "@/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "../../ui/badge";
import { deleteImageFromCloudinary } from "@/lib/utils";

const productSchema = z.object({
  name: z.string().min(2, "Please enter product name"),
  description: z.string().min(4, "Please enter product description"),
  price: z.string().min(1, "Please enter product price"),
  thumbnail: z.string().min(1, "Please enter product thumbnail"),
  stock: z.string().min(1, "Please enter product stock"),
  categoryId: z.string(),
  specifications: z
    .array(
      z.object({
        name: z.string().optional(),
        value: z.string().optional(),
      })
    )
    .nonempty("Please enter product specification"),
  images: z
    .array(
      z.object({
        url: z.string().optional(),
      })
    )
    .nonempty("Please upload an image"),
  variant: z.array(z.string()).optional(),
  variantOptions: z
    .array(
      z.object({
        name: z.string(),

        stock: z.string().min(0),
      })
    )
    .optional(),
});

const AddProductForm = ({ categories }: { categories: Categories[] }) => {
  const queryClient = useQueryClient();

  const [specName, setSpecName] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [displayedSpecifications, setDisplayedSpecifications] = useState<
    Specification[]
  >([]);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [variants, setVariants] = useState([
    {
      name: "",

      stock: 0,
    },
  ]);

  // Function to add a new empty variant object
  const addVariant = () => {
    setVariants([...variants, { name: "", stock: 0 }]);
  };

  const [uploadedImages, setUploadedImages] = useState<Image[]>([]);

  const form: UseFormReturn<Product> = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      thumbnail: "",
      stock: "",
      categoryId: "",
      specifications: [] as Specification[],
      images: [] as Image[],
      variantOptions: [] as Variant[],
    },
  });

  const addProductMutation = useMutation(
    async (productData: Product) => {
      try {
        const data = { ...productData, variants };
        const response = await axios.post(
          "/api/admin/product/add-product",
          data
        );

        if (response.status === 200) {
          toast.success("Product added successfully");
        } else {
          toast.error("Something went wrong, please try again");
        }
      } catch (error) {
        toast.error("Something went wrong, please try again");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        form.reset();
        setDisplayedSpecifications([]);
        setUploadedImages([]);
        setThumbnail("");
        setVariants([]);
      },
    }
  );
  const addSpecification = (newSpec: Specification) => {
    form.setValue(
      "specifications",
      form.getValues("specifications").concat(newSpec)
    );
  };
  const addImage = (newImage: Image) => {
    form.setValue("images", form.getValues("images").concat(newImage));
  };
  const addThumbnail = (thumbnail: string) => {
    form.setValue("thumbnail", thumbnail);
  };

  const onSubmit = async (data: Product) => {
    // Calculate the sum of stock in variants

    if (variants.length > 0) {
      const variantsStockSum = variants.reduce(
        (total, variant) => total + variant.stock,
        0
      );

      // Check if the sum matches the stock value
      if (variantsStockSum !== Number(form.getValues("stock"))) {
        toast.error(
          "The sum of variant stocks does not match the total stock."
        );
        return; // Prevent the mutation from executing
      }
    }

    addProductMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 w-full"
      >
        <div className="col-span-12 md:col-span-5 space-y-3">
          <h2 className="font-medium text-xl ">Product Information</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product Name"
                    {...field}
                    className="col-span-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormLabel>Product Category</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product Price"
                    {...field}
                    className="col-span-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Stock</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product Stock"
                    {...field}
                    className="col-span-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Product Description"
                    {...field}
                    className="col-span-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid">
            <FormLabel>Product Thumbnail</FormLabel>
            <CldUploadWidget
              uploadPreset="jumpstart"
              onSuccess={(result: any) => {
                console.log(result);
                const { secure_url } = result.info;
                setThumbnail(secure_url);
                addThumbnail(secure_url);
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
                      <Button
                        className="button my-3 w-fit"
                        onClick={handleOnClick}
                      >
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
        </div>
        <div className="flex flex-col items-center gap-4 col-span-12 md:col-span-2">
          <hr className="flex-1 border-e border-gray-300" />
        </div>
        <div className="col-span-12   flex flex-col   md:col-span-5">
          <div className="">
            <h2 className="font-medium text-xl">Product Images</h2>

            <CldUploadWidget
              uploadPreset="jumpstart"
              onSuccess={(result: any) => {
                const { secure_url } = result.info;
                setUploadedImages((prevImages) => [
                  ...prevImages,
                  { url: secure_url },
                ]);
                addImage({ url: secure_url });
                form.clearErrors("images");
              }}
            >
              {({ open }) => {
                function handleOnClick(e: React.FormEvent) {
                  e.preventDefault();
                  open();
                }
                return (
                  <Button className="button my-3" onClick={handleOnClick}>
                    Upload an Image
                  </Button>
                );
              }}
            </CldUploadWidget>
            <p className="text-sm font-medium ">Images :</p>
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.images?.message}
            </p>
            <div className="flex flex-wrap gap-3 my-3">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <CldImage
                    width="100"
                    height="100"
                    src={image.url}
                    className="rounded-lg object-center aspect-square relative select-none"
                    alt="Description of my image"
                  />
                  <span
                    className="bg-gray-600/40 rounded-full m-1 text-white absolute top-0 right-0 cursor-pointer"
                    onClick={() => {
                      deleteImageFromCloudinary(image.url);
                      const index = uploadedImages.indexOf(image);

                      if (index !== -1) {
                        // Create a copy of the array without the deleted image
                        const updatedImages = [...uploadedImages];
                        updatedImages.splice(index, 1);
                        form.setValue("images", updatedImages);
                        // Set the state with the updated array
                        setUploadedImages(updatedImages);
                      }
                    }}
                  >
                    <IoClose />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <h2 className="font-medium text-xl mb-3">Product Color Variant</h2>

            {variants.map((variant, index) => (
              <div key={index} className="flex gap-1 items-center mb-3">
                <p className="text-gray-400 text-sm">{index + 1}.</p>
                <Input
                  placeholder="Name"
                  value={variant.name}
                  onChange={(e) => {
                    const updatedVariants = [...variants];
                    updatedVariants[index].name = e.target.value;
                    setVariants(updatedVariants);
                  }}
                  className="col-span-1"
                />

                <Input
                  placeholder="Stock"
                  value={form.getValues(`variantOptions.${index}.stock`)}
                  onChange={(e) => {
                    const updatedVariants = [...variants];
                    updatedVariants[index].stock = parseInt(e.target.value);
                    setVariants(updatedVariants);
                  }}
                  className="col-span-1"
                />
                <span
                  className="text-red-500 text-xl cursor-pointer select-none"
                  onClick={() => {
                    const updatedVariants = [...variants];
                    updatedVariants.splice(index, 1); // Remove the variant at the specified index
                    setVariants(updatedVariants);
                  }}
                >
                  <TiDelete />
                </span>
              </div>
            ))}
            <span
              onClick={addVariant}
              className="flex gap-1 items-center select-none cursor-pointer text-primary"
            >
              <AiFillPlusCircle />
              <p>Add Variant Option</p>
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-medium text-xl ">Product Specification</h2>
            <div className="mb-3">
              <FormLabel>Specification Name</FormLabel>

              <Input
                placeholder="Specification Name"
                value={specName}
                onChange={(e) => setSpecName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <FormLabel>Specification Value</FormLabel>
              <Input
                placeholder="Specification Value"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
              />

              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.specifications?.message}
              </p>

              <Button
                className="self-start my-3"
                type="button"
                onClick={() => {
                  if (specName && specValue) {
                    const newSpec = {
                      name: specName,
                      value: specValue,
                    };
                    addSpecification(newSpec);
                    displayedSpecifications.push(newSpec);
                    setSpecName("");
                    setSpecValue("");
                    form.clearErrors("specifications");
                  }
                  return;
                }}
              >
                Add
              </Button>
              {displayedSpecifications.length >= 1 && (
                <div className="flex gap-3 my-2 flex-wrap">
                  <p className="text-sm font-medium ">Specifications :</p>
                  {displayedSpecifications.map((spec, index) => (
                    <Badge
                      key={index}
                      variant="default"
                      className="text-xs flex justify-between items-center gap-1 hover:bg-primary select-none"
                    >
                      <span>
                        {spec.name} {spec.value}
                      </span>
                      <span
                        className="text-lg font-bold cursor-pointer hover:bg-gray-600/60 rounded-full"
                        onClick={() => {
                          const updatedSpecifications =
                            displayedSpecifications.filter(
                              (_, i) => i !== index
                            );
                          setDisplayedSpecifications(updatedSpecifications);
                          form.setValue(
                            "specifications",
                            updatedSpecifications
                          );
                        }}
                      >
                        <IoClose />
                      </span>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={addProductMutation.isLoading}
            className="w-3/4 self-center mt-10"
          >
            {addProductMutation.isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                <p>Saving product...</p>
              </>
            ) : (
              "Save Product"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
