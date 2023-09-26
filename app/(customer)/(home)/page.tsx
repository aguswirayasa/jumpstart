import AutoPlayCarousel from "@/components/customer/home/auto-play-carousel";
import SpecialOfferCarousel from "@/components/customer/home/special-offer-carousel";
import { Separator } from "@/components/ui/separator";
import Categories from "@/components/customer/home/categories";
import {
  getAllActiveBanners,
  getCategories,
  getListOfBestSelling,
  getNewProducts,
} from "@/lib/server-utils";

export default async function Home() {
  const newArrival = await getNewProducts();
  const bestSeller = await getListOfBestSelling();
  const categories = await getCategories();

  const images = await getAllActiveBanners();
  return (
    <main className="flex flex-col justify-center mx-5 lg:mx-20 my-10 ">
      <AutoPlayCarousel images={images} />
      <div className="flex flex-col justify-center items-center mt-10 gap-3 ">
        <h2 className="text-2xl font-bold self-start ">New Arrival</h2>
        <SpecialOfferCarousel products={newArrival} />
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col justify-center items-center  gap-3 ">
        <h2 className="text-2xl font-bold self-start ">Best Sellers</h2>
        <SpecialOfferCarousel products={bestSeller} />
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col justify-center items-center  gap-3 ">
        <h2 className="text-2xl font-bold self-start ">Categories</h2>
        <Categories categories={categories!} />
      </div>
    </main>
  );
}
