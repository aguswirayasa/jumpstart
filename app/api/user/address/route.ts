import { addAddress, updateAddress } from "@/lib/server-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { addressData, id, uid } = await request.json();

  try {
    if (id !== "" && id) {
      await updateAddress(addressData, id);
      return NextResponse.json(
        { message: "Address saved successfully" },
        { status: 200 }
      );
    }
    await addAddress(addressData, uid);
    return NextResponse.json(
      { message: "Address updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
