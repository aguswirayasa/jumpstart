"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { BsFillCameraFill } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import CustomIcon from "../ui/icons";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/lib/store";

interface AddImageModalProps {
  uid: string;
}
export const AddImageModal: React.FC<AddImageModalProps> = ({ uid }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [image, setImage] = useState<string>("");
  const router = useRouter();
  const setAvatar = useProfileStore((state) => state.setAvatarUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateAvatar = async (image: string) => {
    console.log(uid, image);
    try {
    } catch (error) {}
    await axios
      .post("/api/user/update-avatar", {
        uid,
        avatarUrl: image,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Avatar updated successfully");
          setAvatar(image);
        } else {
          toast.error("Error updating avatar");
        }
      })
      .catch((error) => {
        toast.error("Error updating avatar");
      });
  };
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CldUploadWidget
        uploadPreset="jumpstart"
        onSuccess={(result: any) => {
          const { secure_url } = result.info;

          setImage(secure_url);
          updateAvatar(secure_url);
        }}
        onClose={() => router.refresh()}
      >
        {({ open }) => {
          function handleOnClick(e: React.FormEvent) {
            e.preventDefault();
            open();
          }
          return (
            <>
              <Button
                className="button absolute top-0 right-0 z-50 bg-black/30 rounded-full p-3"
                onClick={handleOnClick}
              >
                <CustomIcon
                  icon={BsFillCameraFill}
                  size="30"
                  color="text-white"
                />
              </Button>
            </>
          );
        }}
      </CldUploadWidget>
    </>
  );
};
