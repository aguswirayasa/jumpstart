import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const url = request.nextUrl.clone();
  const { token } = params;
  try {
    const user = await prismadb.users.findFirst({
      where: {
        ActivateToken: {
          some: {
            AND: {
              activatedAt: null,
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
              token,
            },
          },
        },
      },
    });
    if (!user) {
      const isUserActive = await prismadb.users.findFirst({
        where: {
          active: true, // Only retrieve active users
          ActivateToken: {
            some: {
              token: token,
            },
          },
        },
      });

      if (isUserActive) {
        url.pathname = "/sign-in?verificationSuccess=true";
        return NextResponse.redirect(url);
      }
      url.pathname = `/expired-token?expired=true&token=${encodeURIComponent(
        token
      )}`;
      return NextResponse.redirect(url);
    }
    await prismadb.users.update({
      where: {
        id: user.id,
      },
      data: {
        active: true,
      },
    });

    await prismadb.activateToken.update({
      where: {
        token,
      },
      data: {
        activatedAt: new Date(),
      },
    });
    url.pathname = "/sign-in?verificationSuccess=true";
    return NextResponse.redirect(url);
  } catch (error) {
    console.log(error);
  }
}
