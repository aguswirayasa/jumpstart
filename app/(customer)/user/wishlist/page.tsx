import { getServerSession } from "next-auth";
import React from "react";

import { getWishlist } from "@/lib/server-utils";
import WishlistCard from "@/components/ui/wishliat-card";
import { redirect } from "next/navigation";

const WishlistPage = async () => {
  const session = await getServerSession();
  const email = session?.user.email || "";
  const wishlist = await getWishlist(email);
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="m-10 md:m-24 min-h-screen">
      <h1 className="font-black text-3xl text-primary">Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="my-5 text-gray-500">
          <h2 className="text-xl font-semibold">You have no wishlist yet.</h2>
          <p className="mt-2">
            Start adding products to your wishlist by browsing our collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-12 my-5 gap-5">
          {wishlist.map((item) => (
            <div
              className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 text-left"
              key={item.id}
            >
              <WishlistCard
                id={item.id}
                name={item.product.name}
                price={item.product.price}
                productId={item.product.id}
                thumbnail={item.product.thumbnail}
                userEmail={item.userEmail}
                rating={Number(item.product.averageRating)}
                totalReview={item.product.totalReviews}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
