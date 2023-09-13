"use client";

import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/types";
import CustomIcon from "@/components/ui/icons";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";

interface FilterBarProps {
  categories: Category[];
}
const FilterBar = ({ categories }: FilterBarProps) => {
  const [show, setShow] = useState(true);
  return (
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
              <Link href={`/category/${category.name}`} key={category.id}>
                <p className="font-medium hover:text-primary transition-colors duration-200 select-none cursor-pointer">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
