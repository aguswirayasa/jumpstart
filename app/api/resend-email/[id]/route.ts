import { registerTemplete, resetEmailTemplate } from "@/lib/emailTemplete";
import { smtpTransport } from "@/lib/mailservice";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { isReset } = await request.json();

  const user = await prismadb.users.findUnique({
    where: {
      id,
    },
    include: { ActivateToken: true },
  });

  if (isReset) {
    const link =
      process.env.FRONTEND_STORE_URL + "/reset/password?id=" + user?.id;
    const templete = resetEmailTemplate(link);
    const mailOptions = {
      from: "whatyournameboys@gmail.com", // Sender's email address
      to: user?.email, // Recipient's email address
      subject: "Reset Password", // Email subject
      text: "Click here to reset your password", // Plain text content
      html: templete, // HTML content
    };
    await smtpTransport.sendMail(mailOptions);
  } else {
    const link =
      process.env.FRONTEND_STORE_URL +
      "/activate/${user?.ActivateToken[0]?.token}";
    const templete = registerTemplete(link);
    const mailOptions = {
      from: "whatyournameboys@gmail.com", // Sender's email address
      to: user?.email, // Recipient's email address
      subject: "Email Verification", // Email subject
      text: "Please verify your email", // Plain text content
      html: templete, // HTML content
    };
    const result = await smtpTransport.sendMail(mailOptions);
  }

  return NextResponse.json(
    { message: "email sended successfully" },
    { status: 200 }
  );
}
