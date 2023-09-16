export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "sin1";

import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { decrementStock, incrementSaleAmount } from "@/lib/server-utils";
import { Address } from "@/types";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log("WEBHOOK");
  console.log(session.metadata?.shippingAddress);
  const shippingAddress: Address = JSON.parse(
    session?.metadata?.shippingAddress || ""
  );
  console.log(shippingAddress);
  const addressComponents = [
    shippingAddress.street,
    shippingAddress.city,
    shippingAddress.state,
    shippingAddress.country,
    shippingAddress.postalCode,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const orderDataJSON = session.metadata?.orderData;
    const totalPrice = Number(session.metadata?.totalPrice);
    if (orderDataJSON) {
      try {
        const orderItems = JSON.parse(orderDataJSON);
        // Create a new order in your database
        const newOrder = await prismadb.orders.create({
          data: {
            isPaid: true, // You can set this based on the event
            phone: session.customer_details?.phone || "",
            address: addressString || "",
            userEmail: session.metadata?.email, // Associate the order with the user
            totalPrice: Number((totalPrice / 100).toFixed(2)) || 0,
          },
        });

        for (const orderItem of orderItems) {
          await decrementStock(
            orderItem.productId,
            orderItem.variantName,
            orderItem.quantity
          );
          await prismadb.orderItem.create({
            data: {
              productId: orderItem.productId,
              quantity: orderItem.quantity,
              orderId: newOrder.id,
              productVariant: !orderItem.variantName.includes("true")
                ? orderItem.variantName
                : "",
            },
          });
          await incrementSaleAmount(Number((totalPrice / 100).toFixed(2)) || 0);
        }

        console.log("Order created:", newOrder);
      } catch (error: any) {
        console.error(`Error parsing order data JSON: ${error.message}`);
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
