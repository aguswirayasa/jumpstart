import prismadb from "@/lib/prismadb";
import { Profile } from "@/types";
import { NextRequest, NextResponse } from "next/server";

interface UpdateProfileRequest {
  profile: Profile;
  uid: string;
}

export async function POST(request: NextRequest) {
  const { profile, uid }: UpdateProfileRequest = await request.json();
  try {
    const response = await prismadb.users.update({
      data: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthday: profile.birthDay,
        gender: profile.gender,
      },
      where: {
        id: uid,
      },
    });
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  } finally {
    await prismadb.$disconnect();
  }
}
