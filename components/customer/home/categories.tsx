"use client";

import CategoryCard from "@/components/ui/category-card";
import Link from "next/link";
import React from "react";
import { Carousel } from "react-responsive-carousel";

interface CategoriesProps {
  categories: {
    thumbnail: string;
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

const Categories = ({ categories }: CategoriesProps) => {
  const cardsPerSlide = 16;

  const chunkArray = (array: any[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const chunkedCategory = chunkArray(categories, cardsPerSlide);
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showArrows={true}
      axis="horizontal"
      animationHandler={"slide"}
      renderIndicator={() => null}
    >
      {chunkedCategory.map((chunk, index) => (
        <div className="grid grid-cols-12 md:grid-cols-8 " key={index}>
          {chunk.map(
            (
              category: {
                name: string;
                thumbnail: string;
                id: string;
              },
              categoryIndex: React.Key | null | undefined
            ) => (
              <div
                className="col-span-3 sm:col-span-2 lg:col-span-1"
                key={categoryIndex}
              >
                <Link href={`/search?keyword=${category.name}`}>
                  <CategoryCard
                    name={category.name}
                    thumbnail={category.thumbnail}
                    id={category.id}
                  />
                </Link>
              </div>
            )
          )}
        </div>
      ))}
    </Carousel>
  );
};

export default Categories;
