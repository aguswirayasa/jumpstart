import AddProductForm from "@/components/admin/products/add-product-form";
import prismadb from "@/lib/prismadb";
import { getCategories, getProductById } from "@/lib/server-utils";
import { Toaster } from "react-hot-toast";

const addProductPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const categories = await getCategories();
  const products = await getProductById(params.productId);
  return (
    <div className=" text-black">
      <h1 className="font-bold text-2xl mb-3">Update Product</h1>
      <AddProductForm categories={categories} />
    </div>
  );
};

export default addProductPage;
