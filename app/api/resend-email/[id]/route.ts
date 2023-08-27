import { registerTemplete } from "@/lib/emailTemplete";
import { smtpTransport } from "@/lib/mailservice";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await prismadb.users.findUnique({
    where: {
      id,
    },
    include: { ActivateToken: true },
  });
  const link = `http://localhost:3000/activate/${user?.ActivateToken[0]?.token}`;
  const templete = registerTemplete(link);
  const mailOptions = {
    from: "whatyournameboys@gmail.com", // Sender's email address
    to: user?.email, // Recipient's email address
    subject: "Email Verification", // Email subject
    text: "Please verify your email", // Plain text content
    html: templete, // HTML content
  };
  const result = await smtpTransport.sendMail(mailOptions);

  return NextResponse.json(
    { message: "email sended successfully" },
    { status: 200 }
  );
}
