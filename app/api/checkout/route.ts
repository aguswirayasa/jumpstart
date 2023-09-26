import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { CartDetails } from "use-shopping-cart/core";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { Address } from "@/types";
import { isStockAvailable } from "@/lib/server-utils";

type OrderData = { productId: any; quantity: number; variantName: string };
interface CheckoutRequest {
  cartDetails: CartDetails;
  totalPrice: number;
  shippingAddress: Address;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  const { cartDetails, totalPrice, shippingAddress }: CheckoutRequest =
    await request.json();
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const orderData: OrderData[] = [];

  const auth = await getServerSession();
  if (!auth?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  for (const [itemId, itemDetail] of Object.entries(cartDetails)) {
    const stockAvailable = await isStockAvailable(
      itemDetail.sku,
      itemDetail.quantity,
      itemDetail.id
    );
    if (!stockAvailable) {
      // Return a 400 response when stock is not enough.
      return NextResponse.json(
        { message: "Stock not available" },
        { status: 400 }
      );
    }
    orderData.push({
      productId: itemDetail.sku,
      quantity: itemDetail.quantity,
      variantName: itemDetail.id,
    });
    line_items.push({
      quantity: itemDetail.quantity,

      price_data: {
        currency: itemDetail.currency,

        product_data: {
          images: [itemDetail.image!],
          name: itemDetail.id.includes("true")
            ? itemDetail.name
            : itemDetail.name + " " + "(" + itemDetail.id + ")",
        },
        unit_amount: itemDetail.price,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },

    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderData: JSON.stringify(orderData),
      email: auth?.user?.email,
      totalPrice: totalPrice,
      shippingAddress: JSON.stringify(shippingAddress),
    },
  });

  console.log("PAYMENT COMPLETED");

  return NextResponse.json(
    { url: session.url },
    {
      status: 200,
      headers: corsHeaders,
    }
  );
}
