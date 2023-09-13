"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { BsFillCameraFill } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Label } from "../ui/label";
import CustomIcon from "../ui/icons";

export const AddImageModal: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [image, setImage] = useState<string>("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CustomIcon
        icon={BsFillCameraFill}
        size="30"
        color="text-white"
        className="absolute top-0 right-0 z-50 bg-black/30 rounded-full p-3"
      />
      <Modal
        title="Add Profile Picture"
        description="Please select your profile picture"
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setImage("");
        }}
      >
        <div>
          <Label>Select profile picture</Label>
          <CldUploadWidget
            uploadPreset="jumpstart"
            onSuccess={(result: any) => {
              const { secure_url } = result.info;

              setImage(secure_url);
            }}
          >
            {({ open }) => {
              function handleOnClick(e: React.FormEvent) {
                e.preventDefault();
                open();
              }
              return (
                <>
                  <Button className="button my-3" onClick={handleOnClick}>
                    Upload a Thumbnail
                  </Button>
                </>
              );
            }}
          </CldUploadWidget>
        </div>
      </Modal>
    </>
  );
};
