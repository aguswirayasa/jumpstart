import CartItem from "@/components/customer/cart/cart-item";
import CartSummary from "@/components/customer/cart/cart-summary";
import React from "react";

const page = () => {
  return (
    <div className="m-10 md:mx-40">
      <h1 className="text-2xl md:text-3xl font-bold my-5 ">Shopping Cart</h1>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-8">
          <CartItem />
        </div>

        <div className="col-span-12 md:col-span-4">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default page;
