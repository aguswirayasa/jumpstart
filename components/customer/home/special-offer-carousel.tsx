"use client";
import ProductCard from "@/components/ui/product-card";
import React from "react";
import { Carousel } from "react-responsive-carousel";

const products = [
  {
    url: "jumpstart-product/dp9hfum7dxyai7cp5rja",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/jnqmyzmqlelobwckmmnw",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/lqx9bhuhezeejbma7peg",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/wi2mcnytdtw0glnrumoj",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/fij3eey4w1auvzwf0k4x",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/dp9hfum7dxyai7cp5rja",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/dp9hfum7dxyai7cp5rja",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/jnqmyzmqlelobwckmmnw",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/lqx9bhuhezeejbma7peg",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/wi2mcnytdtw0glnrumoj",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/fij3eey4w1auvzwf0k4x",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/dp9hfum7dxyai7cp5rja",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/dp9hfum7dxyai7cp5rja",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/jnqmyzmqlelobwckmmnw",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/lqx9bhuhezeejbma7peg",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/wi2mcnytdtw0glnrumoj",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/fij3eey4w1auvzwf0k4x",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/dp9hfum7dxyai7cp5rja",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/dp9hfum7dxyai7cp5rja",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/jnqmyzmqlelobwckmmnw",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/lqx9bhuhezeejbma7peg",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
  {
    url: "jumpstart-product/wi2mcnytdtw0glnrumoj",
    title: `Seagate - Game Drive for PlayStation Consoles 2TB External USB 3.2 Gen
  1 Portable Hard Drive - Black`,
    price: "999.99",
  },
];

const SpecialOfferCarousel = () => {
  const cardsPerSlide = 6;

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
        <div className="grid grid-cols-6 w-full gap-3" key={index}>
          {chunk.map(
            (
              product: {
                url: string;
                id: string;
                title: string;
                price: string;
              },
              productIndex: React.Key | null | undefined
            ) => (
              <div
                className="col-span-3 sm:col-span-2 lg:col-span-1"
                key={productIndex}
              >
                <ProductCard
                  productImage={product.url}
                  productId={product.id}
                  productName={product.title}
                  productPrice={product.price}
                />
              </div>
            )
          )}
        </div>
      ))}
    </Carousel>
  );
};

export default SpecialOfferCarousel;
