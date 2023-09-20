/* eslint-disable react/no-unescaped-entities */
"use client";
import "./search.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CustomIcon from "@/components/ui/icons";
import ProductCard from "@/components/ui/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { sortProducts } from "@/lib/utils";
import { Category, ProductCardProps } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
const SearchPage = () => {
  const search = useSearchParams();
  const keyword = search.get("keyword") || "";
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(true);
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
          <div>
            <h2 className="font-black text-primary text-center text-2xl my-5">
              Filter
            </h2>
            <Separator />
            <div className="p-5">
              <span
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setShow(!show)}
              >
                <p className="text-xl font-bold ">Categories</p>
                <CustomIcon
                  icon={RiArrowDropDownLine}
                  size="30px"
                  className={`${show && "rotate-180"}`}
                />
              </span>
              {show && (
                <div className="px-3">
                  {categories.map((category) => (
                    <Link
                      href={`/search?keyword=${category.name}`}
                      key={category.id}
                    >
                      <p className="font-medium hover:text-primary transition-colors duration-200 select-none cursor-pointer">
                        {category.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Separator />
            <div className="p-5">
              <p className="text-xl font-bold ">Sort By</p>
              <Select
                onValueChange={(value: string) => {
                  const sortedProducts = sortProducts(products, value);
                  setProducts(sortedProducts);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={"Select sort options"} />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Highest">Highest Price</SelectItem>
                  <SelectItem value="Lowest">Lowest Price</SelectItem>
                  <SelectItem value="Newest">Newest</SelectItem>
                  <SelectItem value="Oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
        <div className="col-span-12 md:col-span-9 ">
          <div className="grid grid-cols-4 gap-5">
            {isLoading ? (
              <>
                <div className="col-span-4 grid grid-cols-4 place-items-center place-content-center gap-5">
                  <div className="w-[230px] h-[320px] bg-gray-300 animate-pulse col-span-1"></div>
                  <div className="w-[230px] h-[320px] bg-gray-300 animate-pulse col-span-1"></div>
                  <div className="w-[230px] h-[320px] bg-gray-300 animate-pulse col-span-1"></div>
                  <div className="w-[230px] h-[320px] bg-gray-300 animate-pulse col-span-1"></div>
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
                    </div>
                  </div>
                ) : (
                  products.map((item) => (
                    <>
                      <div
                        className="col-span-2 md:col-span-1"
                        key={item.product.id}
                      >
                        <ProductCard
                          id={item.product.id}
                          name={item.product.name}
                          price={item.product.price}
                          thumbnail={item.product.thumbnail}
                          averageRating={Number(item.product.averageRating)}
                          totalReviews={item.product.totalReviews}
                          sold={item.product.sold}
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
    </div>
  );
};

export default SearchPage;
