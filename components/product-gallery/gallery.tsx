"use client";

import React from "react";

import { Image as Images } from "@/types";
import { Tab } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import Image from "next/image";

interface ProductGalleryProps {
  images: Images[];
  thumbnail: string;
}

const ProductGallery = ({ images, thumbnail }: ProductGalleryProps) => {
  return (
    <Tab.Group as="div" className="flex justify-center   ">
      <div className="   w-[200px]  md:block lg:max-w-none">
        <Tab.List className="flex flex-col gap-3 justify-center py-10">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="mx-10 my-auto aspect-square w-full max-w-lg max-h-[600px] ">
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Image
                fill
                src={image.url}
                alt="Image"
                className="object-contain object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default ProductGallery;
