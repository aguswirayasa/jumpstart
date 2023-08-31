import AddCategoryForm from "@/components/admin/products/add-category-form";
import Modal from "@/components/ui/modal";
import React from "react";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <div>
      <Toaster />
      <Modal buttonLabel="Add Category" title="Add Category">
        <AddCategoryForm />
      </Modal>
    </div>
  );
};

export default page;
