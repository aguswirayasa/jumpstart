import FilterBar from "@/components/customer/category/filterBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/ui/product-card";
import { getCategories, getProductByCategory } from "@/lib/server-utils";
import Link from "next/link";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: { categoryName: string };
}) => {
  const decodedCategoryName = decodeURIComponent(params.categoryName);
  const products = await getProductByCategory(decodedCategoryName);
  const categories = await getCategories();

  return (
    <div className=" m-24">
      <div className="grid grid-cols-12 gap-5">
        <Card className="col-span-3">
          <FilterBar categories={categories} />
        </Card>
        <Card className="col-span-9 grid grid-cols-4">
          {products.length === 0 ? (
            <div className="col-span-4 flex justify-center items-center">
              <div className="max-w-lg flex flex-col items-center space-x-3">
                <h2 className="text-center text-primary font-bold text-3xl">
                  No products in this category.
                </h2>
                <p className="text-center text-gray-500">
                  We will refill the product in this category soon, you can
                  browse other categories by click the button below
                </p>
                <Link href={"/"}>
                  <Button className="my-3">Browse Categories</Button>
                </Link>
              </div>
            </div>
          ) : (
            products.map((product) => (
              <>
                <div className="col-span-1" key={product.id}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    thumbnail={product.thumbnail}
                  />
                </div>
              </>
            ))
          )}
        </Card>
      </div>
    </div>
  );
};

export default CategoryPage;
