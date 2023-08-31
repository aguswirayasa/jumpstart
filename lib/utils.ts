import axios from "axios";
import { type ClassValue, clsx } from "clsx";
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
