"use client";

import CategoryCard from "@/components/ui/category-card";
import React from "react";
import { Carousel } from "react-responsive-carousel";

const category = [
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
  {
    thumbnail:
      "https://res.cloudinary.com/drqn4yupq/image/upload/v1693483847/jumpstart-product/71NBQ2a52CL-removebg-preview_tyfkpb.png",
    name: "Gaming Console",
    id: "31h9h90h9h90",
  },
];

const Categories = () => {
  const cardsPerSlide = 16;

  const chunkArray = (array: any[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const chunkedCategory = chunkArray(category, cardsPerSlide);
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
        <div className="grid grid-cols-8" key={index}>
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
                <CategoryCard
                  name={category.name}
                  thumbnail={category.thumbnail}
                  id={category.id}
                />
              </div>
            )
          )}
        </div>
      ))}
    </Carousel>
  );
};

export default Categories;
