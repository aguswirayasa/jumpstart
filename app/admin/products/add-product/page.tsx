import AddProductForm from "@/components/admin/products/add-product-form";
import prismadb from "@/lib/prismadb";
import { Toaster } from "react-hot-toast";

const addProductPage = async () => {
  async function getAllCategories() {
    "use server";
    return await prismadb.category.findMany();
  }
  const categories = await getAllCategories();
  return (
    <div className=" text-black">
      <Toaster />
      <h1 className="font-bold text-2xl mb-3">Add Product</h1>
      <AddProductForm categories={categories} />
    </div>
  );
};

export default addProductPage;
