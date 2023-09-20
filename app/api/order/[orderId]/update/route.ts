import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { deliveryDate, status } = await request.json();
  console.log({ deliveryDate, status, orderId: params.orderId });
  try {
    if (status === "ON_DELIVERY") {
      await prismadb.orders.update({
        where: {
          id: params.orderId,
        },
        data: {
          expectedDelivery: deliveryDate,
          status,
        },
      });
    } else if (status === "COMPLETED") {
      await prismadb.orders.update({
        where: {
          id: params.orderId,
        },
        data: {
          completedDate: new Date(),
          status,
        },
      });
    } else {
      return NextResponse.json({ message: "invalid status" }, { status: 400 });
    }
    return NextResponse.json(
      { message: "update status completed" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "update status failed" },
      { status: 500 }
    );
  } finally {
    prismadb.$disconnect();
  }
}
