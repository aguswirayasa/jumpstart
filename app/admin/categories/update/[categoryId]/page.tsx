import AddCategoryForm from "@/components/admin/products/add-category-form";
import { getCategoryById } from "@/lib/server-utils";
import React from "react";

const page = async ({ params }: { params: { categoryId: string } }) => {
  const category = await getCategoryById(params.categoryId);
  console.log(category);
  return (
    <div>
      <h2 className="text-2xl font-bold">Update Category</h2>
      <AddCategoryForm
        category={category!}
        message="Category updated successfully"
      />
    </div>
  );
};

export default page;
