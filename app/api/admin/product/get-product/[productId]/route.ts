import { getProductById } from "@/lib/server-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const result = await getProductById(params.productId);

  return NextResponse.json({ product: result }, { status: 200 });
}
