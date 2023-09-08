import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { decrementStock } from "@/lib/server-utils";
import { getSession } from "next-auth/react";

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
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const orderDataJSON = session.metadata?.orderData;
    console.log("user id :", session.metadata?.userId);
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
              orderId: newOrder.id,
              productVariant: !orderItem.variantName.includes("true")
                ? orderItem.variantName
                : "",
            },
          });
        }

        console.log("Order created:", newOrder);
      } catch (error: any) {
        console.error(`Error parsing order data JSON: ${error.message}`);
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
