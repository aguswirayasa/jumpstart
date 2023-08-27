import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;
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
      redirect("/sign-in?verificationSuccess=true");
    }

    redirect(`/expired-token?expired=true&token=${encodeURIComponent(token)}`);
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

  redirect("/sign-in?verificationSuccess=true");
}
