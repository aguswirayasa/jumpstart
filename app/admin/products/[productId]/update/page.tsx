import RestockForm from "@/components/admin/products/restock-form";
import UpdateProductForm from "@/components/admin/products/update-product-form";
import { getCategories, getProductById } from "@/lib/server-utils";

const UpdateProductPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const categories = await getCategories();
  const products = await getProductById(params.productId);

  return (
    <div className=" text-black">
      <h1 className="font-bold text-2xl mb-3">Update Product</h1>
      <UpdateProductForm
        categories={categories}
        categoryId={products?.categoryId!}
        description={products?.description!}
        id={products?.id!}
        images={products?.images || []}
        name={products?.name!}
        price={products?.price! + ""}
        productThumbnail={products?.thumbnail!}
        specifications={products?.specifications || []}
      />
    </div>
  );
};

export default UpdateProductPage;
