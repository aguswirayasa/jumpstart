import ReviewModal from "@/components/modal/review-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserOrderHistory } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const session = await getServerSession();
  const email = session?.user.email || "";
  const orderHistory = await getUserOrderHistory(email);
  return (
    <div className="max-w-none md:max-w-5xl  m-10 md:mx-auto  md:my-20 min-h-screen">
      <h1 className="font-black text-3xl text-primary">Orders History</h1>
      {orderHistory.map((order, index) => (
        <Card className="my-5 shadow-lg" key={order.id}>
          {order.orderItems.map((orderItem, index) => (
            <div
              className=" relative grid md:flex justify-start items-start "
              key={orderItem.id}
            >
              <CardHeader className=" p-5 relative">
                <div className=" mx-auto  md:max-w-[300px] ">
                  <Image
                    src={orderItem.product.thumbnail}
                    alt={orderItem.product.name}
                    width={300}
                    height={300}
                    className=" max-h-[100px]  md:max-w-[200px] object-contain rounded-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-5 flex justify-between w-full">
                <div>
                  <Link
                    href={`/product/${orderItem.product.name}/${orderItem.productId}`}
                  >
                    <h3 className="font-bold">{orderItem.product.name}</h3>
                  </Link>
                  <p className="font-medium">${orderItem.product.price}</p>
                  {!orderItem.productVariant?.includes("true") &&
                    orderItem.productVariant && (
                      <Badge>{orderItem.productVariant}</Badge>
                    )}
                </div>
                <div className="">
                  <h3 className="font-bold">
                    ${orderItem.product.price} x {orderItem.quantity}
                  </h3>

                  <ReviewModal
                    orderItemsId={orderItem.id}
                    productImage={orderItem.product.thumbnail}
                    productName={orderItem.product.name}
                    productVariant={orderItem.productVariant || ""}
                    productId={orderItem.productId}
                    userEmail={email}
                    isReviewed={orderItem.isReviewed}
                  />
                </div>
              </CardContent>
            </div>
          ))}

          <Separator className="my-3" />
          <CardFooter className="block md:flex justify-between gap-3">
            <span className="bg-green-300 rounded-xl text-center px-3 py-1 md:px-10 text-green-700">
              Order Completed
            </span>
            <div className="space-x-3 flex items-center my-3 md:my-0">
              <h3 className="font-bold">Grand Total: ${order.totalPrice}</h3>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default page;
