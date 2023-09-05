"use client";
import { Image as Images, Product } from "@/types";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

interface ProductCarouselProps {
  productImages: Images[];
}

const ProductCarousel = ({ productImages }: ProductCarouselProps) => {
  return (
    <div className="flex">
      <div className="w-3/4">
        <Carousel showArrows={true} showThumbs={false}>
          {productImages.map((image, index) => (
            <div key={index}>
              <CldImage
                src={image.url || "images/"}
                width={300}
                height={300}
                alt=""
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-1/4">
        {productImages.map((image, index) => (
          <div key={index} className="mb-2">
            <CldImage
              src={image.url || "images/"}
              width={100}
              height={100}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
