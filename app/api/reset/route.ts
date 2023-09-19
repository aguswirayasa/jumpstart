import { resetEmailTemplate } from "@/lib/emailTemplete";
import { smtpTransport } from "@/lib/mailservice";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  try {
    const user = await prismadb.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "No users found" }, { status: 400 });
    }
    const link =
      process.env.FRONTEND_STORE_URL + "/reset/password?id=" + user?.id;
    const templete = resetEmailTemplate(link);
    const mailOptions = {
      from: "whatyournameboys@gmail.com", // Sender's email address
      to: email, // Recipient's email address
      subject: "Reset Password", // Email subject
      text: "Click here to reset your password", // Plain text content
      html: templete, // HTML content
    };
    await smtpTransport.sendMail(mailOptions);
    return NextResponse.json({ id: user.id }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
