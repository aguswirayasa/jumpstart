import AutoPlayCarousel from "@/components/customer/home/auto-play-carousel";
import SpecialOfferCarousel from "@/components/customer/home/special-offer-carousel";
import { Separator } from "@/components/ui/separator";
import Categories from "@/components/customer/home/categories";
import prismadb from "@/lib/prismadb";
import {
  getAllActiveBanners,
  getAllProducts,
  getCategories,
} from "@/lib/server-utils";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getCategories();

  // Map and reshape the products array to match ProductCardProps
  const reshapedProducts = products.map((product) => ({
    id: product.product.id,
    thumbnail: product.product.thumbnail,
    name: product.product.name,
    price: product.product.price,
    averageRating: Number(product.product.averageRating),
    totalReviews: product.product.totalReviews,
  }));

  const images = await getAllActiveBanners();
  return (
    <main className="flex flex-col justify-center mx-5 lg:mx-20 my-10 ">
      <AutoPlayCarousel images={images} />
      <div className="flex flex-col justify-center items-center mt-10 gap-3 ">
        <h2 className="text-2xl font-bold self-start ">New Arrival</h2>
        <SpecialOfferCarousel products={reshapedProducts} />
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col justify-center items-center  gap-3 ">
        <h2 className="text-2xl font-bold self-start ">Special Offers</h2>
        <SpecialOfferCarousel products={reshapedProducts} />
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col justify-center items-center  gap-3 ">
        <h2 className="text-2xl font-bold self-start ">Categories</h2>
        <Categories categories={categories!} />
      </div>
    </main>
  );
}
