import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/button-components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/components/user";
import AutoPlayCarousel from "@/components/customer/home/auto-play-carousel";
import ProductCard from "@/components/ui/product-card";
import SpecialOfferCarousel from "@/components/customer/home/special-offer-carousel";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const images = [
    "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/8/24/d436f91b-8fc1-451d-91d3-6d375402fc00.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/8/25/8929d64a-65d9-4c3c-99ee-cc84b173973d.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/8/24/d436f91b-8fc1-451d-91d3-6d375402fc00.jpg.webp?ect=4g",
    "https://cf.shopee.co.id/file/id-50009109-e18ac9b8e3cc9e15a4092837cf0dbaa0_xxhdpi",
  ];
  return (
    <main className="flex flex-col justify-center mx-0 lg:mx-20 my-10 ">
      <AutoPlayCarousel images={images} />
      <div className="flex flex-col justify-center items-center mt-5 gap-3 relative">
        <h2 className="text-2xl font-bold self-start ">New Arrival</h2>
        <SpecialOfferCarousel />
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col justify-center items-center  gap-3 relative">
        <h2 className="text-2xl font-bold self-start ">Special Offers</h2>
        <SpecialOfferCarousel />
      </div>
    </main>
  );
}
