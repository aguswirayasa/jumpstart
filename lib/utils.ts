import { Product, ProductCardProps } from "@/types";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { env } from "process";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const deleteImageFromCloudinary = async (publicId: string) => {
  const cloudName = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; // Replace with your Cloudinary cloud name

  try {
    const response = await axios.post("/api/delete-from-cloudinary", {
      public_id: publicId,
    });

    if (response.status === 200) {
      console.log("Image deleted successfully");
    } else {
      console.error("Failed to delete image");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

export function formatOrder(orders: any[]) {
  const formattedItems = orders!.map((item) => {
    const products = item.orderItems
      .map((orderItem: { product: { name: any }; productVariant: any }) => {
        const productName = orderItem.product.name;
        const variantName = orderItem.productVariant;

        // Check if a variant name exists
        if (!variantName?.includes("true") && variantName) {
          return `${productName} (${variantName})`;
        } else {
          return productName;
        }
      })
      .join("\n");

    return {
      id: item.id,
      address: item.address,
      customerName: item.user?.firstName + " " + item.user?.lastName,
      phoneNumber: item.phone,
      status: item.isPaid ? "Completed" : "Unpaid",
      totalPrice: "$" + item.totalPrice,
      products: products,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });
  return formattedItems;
}
export const sortProducts = (
  products: ProductCardProps[],
  selectedSortOption: string
) => {
  const sortedProducts = [...products]; // Create a copy of the products array
  console.log("START", sortedProducts);
  console.log(selectedSortOption);
  switch (selectedSortOption) {
    case "Highest":
      sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case "Lowest":
      sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case "Newest":
      sortedProducts.sort(
        (a, b) =>
          new Date(b?.createdAt || 0).getTime() -
          new Date(a?.createdAt || 0).getTime()
      );

      break;

    case "Oldest":
      sortedProducts.sort(
        (a, b) =>
          new Date(a?.createdAt || 0).getTime() -
          new Date(b?.createdAt || 0).getTime()
      );
      break;

    default:
      // Default sorting option (e.g., no sorting)
      break;
  }
  console.log("END", sortedProducts);
  // Now, you have the sortedProducts array based on the selectedSortOption
  // You can use this sortedProducts array to render your products
  return sortedProducts;
};
