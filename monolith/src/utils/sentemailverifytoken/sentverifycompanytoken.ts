// utils/sendEmail.ts
import nodemailer from "nodemailer";

export async function sendVerificationcomapnyEmail(
  email: string,
  token: string
): Promise<void> {
  try {
    // Create a transporter with your SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sanvisal2302@gmail.com",
        pass: "qjsljziuvucrjbij ",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send mail with defined transport object

    // const formattedExpiresAt = expiresAt.toLocaleString();
    await transporter.sendMail({
      from: "sanvisal2302@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Hello,\n\nPlease verify your email by clicking the following link: \n\nhttp://localhost:5000/company-auth/verify/${token}\n\n`,
    });

    console.log("Email sent: Check your inbox!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
}
