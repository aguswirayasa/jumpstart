import { getProductByCategory, searchProduct } from "@/lib/server-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { keyword: string };
  }
) {
  const keyword = params?.keyword;
  console.log(keyword);
  const response = await getProductByCategory(keyword);

  return NextResponse.json({ result: response }, { status: 200 });
}
