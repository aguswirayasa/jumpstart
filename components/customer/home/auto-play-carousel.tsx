"use client";
import { BannersColumn } from "@/components/admin/banners/table/columns";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface AutoPlayCarouselProps {
  images: BannersColumn[];
}

const AutoPlayCarousel = ({ images }: AutoPlayCarouselProps) => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      axis="horizontal"
      autoPlay={true}
      interval={3000}
      animationHandler="fade"
      infiniteLoop // Enable infinite loop
      className="w-full "
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="h-[160px] md:h-[315px] lg:h-[400px] w-full relative"
        >
          <Image src={image.url} alt={""} fill className="  rounded-md" />
        </div>
      ))}
    </Carousel>
  );
};

export default AutoPlayCarousel;
