"use client";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface AutoPlayCarouselProps {
  images: string[];
}

const AutoPlayCarousel = ({ images }: AutoPlayCarouselProps) => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      axis="horizontal"
      autoPlay={true}
      animationHandler="fade"
      infiniteLoop // Enable infinite loop
      className="w-full "
    >
      {images.map((imageUrl, index) => (
        <div key={index} className="max-h-[315px] w-full ">
          <Image
            src={imageUrl}
            alt={imageUrl}
            width={400}
            height={200}
            className=" w-full h-full  rounded-md"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default AutoPlayCarousel;
