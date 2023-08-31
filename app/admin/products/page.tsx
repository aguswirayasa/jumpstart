import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Link href={"products/add-product"}>
        <Button>Add Product</Button>
      </Link>
    </div>
  );
};

export default page;
