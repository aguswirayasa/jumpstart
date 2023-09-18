import WishlistCard from "@/components/ui/wishliat-card";
import { getWishlist } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession();
  const email = session?.user.email || "";
  const wishlist = await getWishlist(email);

  return (
    <div className="m-10 md:m-24 min-h-screen">
      <h1 className="font-black text-3xl text-primary">Wishlist</h1>
      <div className="grid grid-cols-12 my-5 gap-5">
        {wishlist.map((wishlist) => (
          <div
            className=" col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2  text-left"
            key={wishlist.id}
          >
            <WishlistCard
              id={wishlist.id}
              name={wishlist.product.name}
              price={wishlist.product.price}
              productId={wishlist.product.id}
              thumbnail={wishlist.product.thumbnail}
              userEmail={wishlist.userEmail}
              rating={Number(wishlist.product.averageRating)}
              totalReview={wishlist.product.totalReviews}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
