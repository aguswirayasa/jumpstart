/* eslint-disable react/no-unescaped-entities */
"use client";
import "./search.css";
import FilterBar from "@/components/customer/category/filterBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/ui/product-card";
import { getCategories, searchProduct } from "@/lib/server-utils";
import { ProductCardProps } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const search = useSearchParams();
  const keyword = search.get("keyword") || "";
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = async (keyword: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/search/${keyword}`, {
        params: { keyword }, // Wrap the keyword in an object
      });
      const product = response.data.result;
      setProducts(product);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle the error as needed
    } finally {
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    const response = await axios.get("/api/admin/category/get-category");
    const categories = response.data.result;
    setCategories(categories);
  };

  useEffect(() => {
    getProduct(keyword);
    getCategories();
  }, [keyword]);

  return (
    <div className="m-5 md:m-24">
      <div className="grid grid-cols-12 gap-5">
        <Card className="hidden md:block col-span-3 ">
          <FilterBar categories={categories} />
        </Card>
        <div className="col-span-12 md:col-span-9 grid grid-cols-4 gap-5">
          {isLoading ? (
            <>
              <div className="col-span-4 flex justify-center items-center gap-5">
                <div className="w-full h-full bg-gray-300 animate-pulse col-span-1"></div>
                <div className="w-full h-full bg-gray-300 animate-pulse col-span-1"></div>
                <div className="w-full h-full bg-gray-300 animate-pulse col-span-1"></div>
                <div className="w-full h-full bg-gray-300 animate-pulse col-span-1"></div>
              </div>
            </>
          ) : (
            <>
              {products.length === 0 ? (
                <div className="col-span-4 flex justify-center items-center">
                  <div className="max-w-lg flex flex-col items-center space-x-3">
                    <h2 className="text-center text-primary font-bold text-3xl">
                      No result for products with keyword "{keyword}".
                    </h2>
                    <p className="text-center text-gray-500">
                      Please try searching for products with diffrent keyword
                    </p>
                    <Link href={"/"}>
                      <Button className="my-3">Browse Categories</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                products.map((product) => (
                  <>
                    <div className="col-span-2 md:col-span-1" key={product.id}>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
