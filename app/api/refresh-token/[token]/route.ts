import { registerTemplete } from "@/lib/emailTemplete";
import { smtpTransport } from "@/lib/mailservice";
import prismadb from "@/lib/prismadb";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  const activateToken = await prismadb.activateToken.update({
    where: { token },
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      createdAt: new Date(),
    },
  });

  if (activateToken) {
    const user = await prismadb.users.findUnique({
      where: { id: activateToken.userId },
    });
    const link = `http://localhost:3000/activate/${activateToken.token}`;
    const templete = registerTemplete(link);
    const mailOptions = {
      from: "whatyournameboys@gmail.com", // Sender's email address
      to: user?.email, // Recipient's email address
      subject: "Email Verification", // Email subject
      text: "Please verify your email", // Plain text content
      html: templete, // HTML content
    };
    const result = await smtpTransport.sendMail(mailOptions);
    return NextResponse.json({ id: user?.id }, { status: 200 });
  }
  return NextResponse.json({ error: "Fail updating token" }, { status: 500 });
}
