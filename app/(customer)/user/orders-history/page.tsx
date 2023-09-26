import Image from "next/image";
import { getServerSession } from "next-auth";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

import { OrderReceive } from "@/components/customer/home/receive-order-button";
import ReviewModal from "@/components/modal/review-modal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserOrderHistory } from "@/lib/server-utils";

const OrderHistoryPage = async () => {
  const session = await getServerSession();
  const email = session?.user.email || "";
  const orderHistory = await getUserOrderHistory(email);
  return (
    <div className="max-w-none md:max-w-5xl  m-10 md:mx-auto  md:my-20 min-h-screen">
      <h1 className="font-black text-3xl text-primary">My Orders</h1>
      {orderHistory.length === 0 ? (
        <div className="my-5 text-gray-500">
          <h2 className="text-xl font-semibold">You have no orders yet.</h2>
          <p className="mt-2">
            Start shopping and place your first order today.
          </p>
        </div>
      ) : (
        <>
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
                      {order.status === "COMPLETED" && (
                        <ReviewModal
                          orderItemsId={orderItem.id}
                          productImage={orderItem.product.thumbnail}
                          productName={orderItem.product.name}
                          productVariant={orderItem.productVariant || ""}
                          productId={orderItem.productId}
                          userEmail={email}
                          isReviewed={orderItem.isReviewed}
                        />
                      )}
                    </div>
                  </CardContent>
                </div>
              ))}

              <Separator className="my-3" />
              <CardFooter className="block md:grid grid-cols-5 justify-between gap-3">
                <span className="text-left font-medium  col-span-2">
                  {order.status === "PROCESSING" &&
                    "Your order is being process"}
                  {order.status === "ON_DELIVERY" &&
                    `Your order will be arrive on ${format(
                      order.expectedDelivery!,
                      "MMMM do, yyyy"
                    )}`}
                  {order.status === "COMPLETED" &&
                    `Order recieved on ${format(
                      order.completedDate!,
                      "MMMM do, yyyy"
                    )}`}
                </span>
                <div className="col-span-2">
                  {order.status === "ON_DELIVERY" && (
                    <OrderReceive
                      message="Order completed, thank for your order!"
                      orderId={order.id}
                    />
                  )}
                </div>
                <div className="space-x-3 w-full my-3 md:my-0 col-span-1 text-right">
                  <h3 className="font-bold">
                    Grand Total: ${order.totalPrice.toLocaleString("en-US")}
                  </h3>
                </div>
              </CardFooter>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderHistoryPage;
