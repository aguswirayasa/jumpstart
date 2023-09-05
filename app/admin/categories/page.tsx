import AddCategoryForm from "@/components/admin/products/add-category-form";
import Modal from "@/components/ui/modal";
import React from "react";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <div>
      <Toaster />
      <h2 className="text-2xl font-bold">Add Category</h2>
      <AddCategoryForm />
    </div>
  );
};

export default page;
