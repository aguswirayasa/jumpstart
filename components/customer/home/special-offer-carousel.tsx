"use client";

import ProductCard from "@/components/ui/product-card";
import { useWindowDimensions } from "@/hooks/useWindowDimentions";
import { ProductCardProps } from "@/types";
import React from "react";
import { Carousel } from "react-responsive-carousel";

interface SpecialOfferCarouselProps {
  products: {
    averageRating: string;
    totalReviews: number;
    id: string;
    name: string;
    thumbnail: string;
    price: number;
    sold?: number;
  }[];
}

const SpecialOfferCarousel = ({ products }: SpecialOfferCarouselProps) => {
  const { height, width } = useWindowDimensions();

  // Define the number of cards per slide based on screen width
  let cardsPerSlide = 6; // Default for desktop

  // Media query to adjust cardsPerSlide on tablet
  if (width! <= 1024) {
    cardsPerSlide = 4;
  }

  // Media query to adjust cardsPerSlide on mobile
  if (width! <= 768) {
    cardsPerSlide = 2;
  }

  const chunkArray = (array: any[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const chunkedProducts = chunkArray(products, cardsPerSlide);

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showArrows={true}
      axis="horizontal"
      animationHandler={"slide"}
      renderIndicator={() => null}
    >
      {chunkedProducts.map((chunk, index) => (
        <div className="grid grid-cols-6 w-full gap-1 md:gap-3 " key={index}>
          {chunk.map(
            (
              product: {
                id: string;
                name: string;
                price: number;
                thumbnail: string;
                averageRating: number;
                totalReviews: number;
                sold: number;
              },
              productIndex: React.Key | null | undefined
            ) => (
              <div
                className="col-span-3 sm:col-span-2 lg:col-span-1 "
                key={productIndex}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  thumbnail={product.thumbnail}
                  averageRating={product.averageRating}
                  totalReviews={product.totalReviews}
                  sold={product.sold}
                />{" "}
                {/* Pass productImages as a prop */}
              </div>
            )
          )}
        </div>
      ))}
    </Carousel>
  );
};

export default SpecialOfferCarousel;
