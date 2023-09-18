import { promotionEmailTemplate } from "@/lib/emailTemplete";
import { smtpTransport } from "@/lib/mailservice";
import { UserData } from "@/types";
import { NextRequest, NextResponse } from "next/server";

interface MailRequest {
  mailSubject: string;
  mailBody: string;
  userData: UserData[];
}

export async function POST(request: NextRequest) {
  const { mailSubject, mailBody, userData }: MailRequest = await request.json();
  console.log("mailSubject", mailSubject);
  console.log("mailBody", mailBody);
  console.log("userData", userData);
  const link = process.env.FRONTEND_STORE_URL || "/";
  const templete = promotionEmailTemplate(mailSubject, mailBody, link);

  userData.forEach((user) => {
    const mailOptions = {
      from: "whatyournameboys@gmail.com", // Sender's email address
      to: user.email, // Recipient's email address
      subject: mailSubject, // Email subject
      text: mailBody, // Plain text content
      html: templete, // HTML content
    };
    smtpTransport.sendMail(mailOptions!);
    console.log("email sended to " + user.email);
  });

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
