import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { RegisterRequest } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { smtpTransport } from "@/lib/mailservice";
import { registerTemplete } from "@/lib/emailTemplete";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const { email, password, firstName, lastName }: RegisterRequest =
    await request.json();

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Check if user with the email exists
  const existingUser = await prismadb.users.findFirst({
    where: { email: email },
  });

  if (existingUser) {
    // User with the email already exists, return a bad request response
    return new NextResponse(
      JSON.stringify({ error: "Email has already been used" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // User doesn't exist, insert the data into the database
  const newUser = await prismadb.users.create({
    data: {
      email: email,
      password: hashedPassword, // Store the hashed password
      firstName: firstName,
      lastName: lastName,
      role: "CUSTOMER",
    },
  });
  if (newUser) {
    const activeToken = await prismadb.activateToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        userId: newUser.id,
      },
    });
    const link = `http://localhost:3000/activate/${activeToken.token}`;
    const templete = registerTemplete(link);
    const mailOptions = {
      from: "whatyournameboys@gmail.com", // Sender's email address
      to: email, // Recipient's email address
      subject: "Email Verification", // Email subject
      text: "Please verify your email", // Plain text content
      html: templete, // HTML content
    };
    const result = await smtpTransport.sendMail(mailOptions);
  }
  prismadb.$disconnect;
  // Return a success response
  return new NextResponse(
    JSON.stringify({ message: "User registered successfully", id: newUser.id }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
