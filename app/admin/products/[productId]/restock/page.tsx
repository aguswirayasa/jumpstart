import RestockForm from "@/components/admin/products/restock-form";
import { getCategories, getProductById } from "@/lib/server-utils";

const RestockProductPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const products = await getProductById(params.productId);

  return (
    <div className=" text-black">
      <h1 className="font-bold text-2xl mb-3">Restock Product</h1>
      <RestockForm
        productStock={products?.stock + ""}
        variantOption={products?.variantOptions!}
        productId={products?.id || ""}
      />
    </div>
  );
};

export default RestockProductPage;
