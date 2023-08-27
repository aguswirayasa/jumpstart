import nodemailer from "nodemailer";
import { env } from "process";

export const smtpTransport = nodemailer.createTransport({
  host: env.MAIL_HOST, // Your SMTP server's hostname
  port: 2525, // Your SMTP server's port
  secure: false, // Set to true if you're using SSL/TLS
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASSWORD,
  },
});
