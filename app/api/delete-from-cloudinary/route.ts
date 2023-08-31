import { cloudinary } from "@/lib/cloudinaryConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { public_id } = await request.json();
  console.log("PUBLIC ID", public_id);
  let response = "";
  cloudinary.uploader.destroy(public_id).then((result) => (response = result));
  console.log(response);
  return NextResponse.json({ success: "success" }, { status: 200 });
}
